import { useFetcher, useLoaderData } from "@remix-run/react";
import { Ratelimit } from "@upstash/ratelimit";
import type { ActionFunctionArgs } from "@vercel/remix";
import { json } from "@vercel/remix";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { getSlackClient } from "~/lib/slack.server";
import { redis } from "~/lib/upstash.server";
import { signTs, verifyTs } from "~/utils/formSig.server";
export const config = { runtime: "nodejs" };

const FORM_SALT = "contact-v1";
const VALID_SALTS = new Set([FORM_SALT]);
const MIN_FILL_MS = 3000;
const MAX_AGE_MS = 30 * 60 * 1000;

export async function loader() {
  const ts = Date.now().toString();
  const sig = signTs(ts, FORM_SALT);

  return json({
    ts,
    sig,
    salt: FORM_SALT,
  });
}

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "24 h"), // 2 submissions per day
  analytics: true,
});

export async function action({ request }: ActionFunctionArgs) {
  if (request.method.toUpperCase() !== "POST") {
    return json({ ok: true });
  }

  const formData = await request.formData();

  const ts = (formData.get("ts") || "").toString();
  const tsSig = (formData.get("ts_sig") || "").toString();
  const tsSalt = (formData.get("ts_salt") || "").toString();

  let tsOk = false;
  if (ts && tsSig && tsSalt && VALID_SALTS.has(tsSalt)) {
    tsOk = verifyTs(ts, tsSalt, tsSig);
  }

  if (!tsOk) {
    return json({ ok: true });
  }

  const tsNumber = Number.parseInt(ts, 10);
  if (!Number.isFinite(tsNumber) || !Number.isSafeInteger(tsNumber) || tsNumber <= 0) {
    return json({ ok: true });
  }

  const age = Date.now() - tsNumber;
  if (!(age >= MIN_FILL_MS && age <= MAX_AGE_MS)) {
    return json({ ok: true });
  }

  const honeypots = ["website", "phone", "fax", "title"] as const;
  for (const field of honeypots) {
    const value = formData.get(field);
    if (typeof value === "string" && value.trim().length > 0) {
      return json({ ok: true });
    }
  }

  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return json(
      { success: false, message: "Too many submissions" },
      { status: 429 }
    );
  }

  const nameEntry = formData.get("name");
  const emailEntry = formData.get("email");
  const companyEntry = formData.get("companyName");
  const messageEntry = formData.get("message");

  if (
    typeof nameEntry !== "string" ||
    typeof emailEntry !== "string" ||
    typeof companyEntry !== "string" ||
    typeof messageEntry !== "string"
  ) {
    return json(
      { success: false, message: "Invalid form submission" },
      { status: 400 }
    );
  }

  const name = nameEntry.trim();
  const email = emailEntry.trim();
  const company = companyEntry.trim();
  const message = messageEntry.trim();

  if (!name || !email || !company || !message) {
    return json(
      { success: false, message: "Invalid form submission" },
      { status: 400 }
    );
  }

  const slackClient = getSlackClient();
  await slackClient.sendMessage({
    channel: "#web-forms",
    text: "New lead 🎉",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `*New Contact Form Submission* 🥁\n\n` +
            `*Contact Information*\n` +
            `• Name: ${name}\n` +
            `• Email: ${email}\n` +
            `• Company: ${company}\n\n` +
            `*Message*\n` +
            `${message}`,
        },
      },
    ],
  });

  return json({ success: true, message: "Form submitted successfully" });
}

export default function Contact() {
  const fetcher = useFetcher<typeof action>();
  const { ts, sig, salt } = useLoaderData<typeof loader>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBot, setIsBot] = useState(false);
  useEffect(() => {
    if (fetcher.data?.success) {
      setIsSubmitted(true);
    }
  }, [fetcher.data]);

  return (
    <div className="flex flex-1 flex-col min-h-[calc(100vh-220px)]">
      <div className="mx-auto flex w-full flex-col px-4 md:px-6 max-w-4xl pt-36">
        <div className="flex flex-col gap-4 lg:items-center text-center mb-16">
          <h1 className="font-semibold text-3xl lg:text-6xl font-display uppercase tracking-tight bg-gradient-to-b from-zinc-300 to-zinc-800 bg-clip-text text-transparent">
            Build with us
          </h1>
        </div>
      </div>

      <div className="mx-auto flex flex-col w-full max-w-4xl mb-28 px-section">
        {/* Honeypot form - hidden from humans but visible to bots */}
        <div className="sr-only">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsBot(true);
            }}
          >
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="submit" />
          </form>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <div className="animate-bounce">
              <Check className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold animate-fade-in">
              Thank you for your interest!
            </h2>
            <p className="text-center text-muted-foreground animate-fade-in-delayed">
              We'll be in touch with you shortly.
            </p>
          </div>
        ) : (
          <fetcher.Form
            action="/contact"
            method={isBot ? "get" : "post"}
            className="flex flex-col gap-5"
          >
            <input type="hidden" name="ts" value={ts} />
            <input type="hidden" name="ts_sig" value={sig} />
            <input type="hidden" name="ts_salt" value={salt} />
            <div className="visually-hidden" aria-hidden="true">
              <label>
                Website
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
              <label>
                Fax
                <input
                  name="fax"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
              <label>
                Title
                <input
                  name="title"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="relative flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative flex flex-1">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="relative flex flex-col gap-2">
                <Label htmlFor="email">Work Email</Label>
                <div className="relative flex flex-1">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@acme.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="relative flex flex-col gap-2">
                <Label htmlFor="companyName">Company Name</Label>
                <div className="relative flex flex-1">
                  <Input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Acme, Inc."
                    required
                    autoComplete="organization"
                  />
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <div className="relative flex flex-1">
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Please tell us about yourself"
                  className="h-[113px]"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={fetcher.state !== "idle" || isBot}
              >
                Submit
              </Button>
            </div>
          </fetcher.Form>
        )}
      </div>
    </div>
  );
}

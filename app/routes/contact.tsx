import { Ratelimit } from "@upstash/ratelimit";
import { ActionFunctionArgs, json } from "@vercel/remix";
import { getSlackClient } from "~/lib/slack.server";
import { redis } from "~/lib/upstash.server";
export const config = { runtime: "nodejs" };

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "24 h"), // 2 submissions per day
  analytics: true,
});

export async function action({ request }: ActionFunctionArgs) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return json(
      { success: false, message: "Too many submissions" },
      { status: 429 }
    );
  }

  const formData = await request.formData();
  const name = String(formData.get("name"));
  const role = String(formData.get("role"));
  const email = String(formData.get("email"));
  const company = String(formData.get("companyName"));
  const message = String(formData.get("message"));

  if (!name || !email || !company || !message) {
    return json(
      { success: false, message: "Invalid form submission" },
      { status: 400 }
    );
  }

  const slackClient = getSlackClient();
  await slackClient.sendMessage({
    channel: "#leads",
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
            `• Role: ${role}\n` +
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

# NeoFactory Website

## Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
```bash
git clone https://github.com/your-username/neofactory-website.git
cd neofactory-website
npm install
```

### Development
```bash
npm run dev
```
The application will be available at http://localhost:3000

### Production
```bash
npm run build
npm start
```

### Deploying to Netlify

1. Push your code to a Git repository

2. Login to [Netlify](https://app.netlify.com/) and click "Add new site" > "Import an existing project"

3. Connect to your Git provider and select your repository

4. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build/client`
   - **Base directory**: Leave empty

5. Click "Deploy site"

Alternatively, use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Tech Stack
- [Remix](https://remix.run/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

## Project Structure
- `app/` - Application source code
  - `components/` - React components
  - `routes/` - Remix routes
  - `styles/` - CSS styles
  - `utils/` - Utility functions
  - `lib/` - Library code
  - `hooks/` - React hooks 
# ThemeForest Agent

A Next.js application that integrates with the Envato API to help ThemeForest authors manage their accounts, items, and sales data.

## Features

- **Envato OAuth Integration**: Secure authentication with Envato accounts
- **Dashboard**: View your account information and statistics
- **Modern UI**: Built with Tailwind CSS and Next.js 15
- **State Management**: Using Zustand with Immer for predictable state updates
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- [Next.js 15](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Immer](https://immerjs.github.io/immer/) for immutable state updates
- [Lucide React](https://lucide.dev/) for icons

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Envato API credentials (Client ID and Client Secret)

### Environment Setup

1. Clone the repository
2. Copy `.env-exam` to `.env.local` and fill in your Envato API credentials:

```
NEXT_PUBLIC_API_URL=https://api.envato.com
NEXT_PUBLIC_TF_APP_CLIENT_ID=your_client_id
NEXT_PUBLIC_TF_APP_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_TF_APP_REDIRECT_URI=http://localhost:3000
```

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Authentication Flow

1. User clicks "Login with Envato" on the homepage
2. User is redirected to Envato for authorization
3. After authorization, Envato redirects back to the application with an authorization code
4. The application exchanges the code for access and refresh tokens
5. User data is fetched and stored in cookies and Zustand store
6. User is redirected to the dashboard

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── app/         # App Router components and routes
│   │   ├── api/     # API routes
│   │   ├── callback/ # OAuth callback handler
│   │   ├── dashboard/ # Dashboard pages
│   │   ├── store/   # Zustand store
│   │   ├── layout.js # Root layout
│   │   └── page.js  # Homepage
│   └── middleware.js # Authentication middleware
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT

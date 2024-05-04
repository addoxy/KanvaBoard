<div align="center"><img src="public/logo.png" alt="logo"></div>

## KanvaBoard
A minimal project management app that lets you keep track of and sort your tasks using a drag and drop interface.

## Features
- Collection of templates: Simplify planning by leveraging a variety of ready-made templates tailored to different project needs
- Robust search: Quickly find the project you are looking for using our robust search feature and save the time spent scrolling through lists
- Powerful drag and drop: Easily sort your tasks or columns using our easy-to-use and powerful drag and drop feature
- Make it your own: Tailor your experience with the wide variety of preferences, putting you in control of the app's look and feel
- Toggle your sidebar: You can set your preferences to have a toggleable sidebar to ensure complete focus on the task at hand
- Favorites section: Add upto five projects to favorites and never lose sight of your most important projects
- Secure authentication using OAuth (Google, Github & Discord)
- Full mobile and desktop support

## Tech Stack
- Next.js 14
- Tailwind CSS
- Prisma
- NextAuth
- DND Kit
- React Query
- RadixUI and more

# To Run It Locally
```
pnpm install
```
then
```
pnpm dev
```

# Environment Variables
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=

DATABASE_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

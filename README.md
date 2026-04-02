# Akhil T V — Personal Portfolio

A personal portfolio website for **Akhil T V**, a Data Scientist & ML Engineer. The site showcases projects, skills, and a contact form, and is built as a modern single-page application.

## 🌐 Live Site

Deployed via [Vercel](https://vercel.com).

## 📌 Sections

- **Hero** — Introduction with profile photo, Download Resume button, and social links
- **About** — Brief background and professional focus
- **Skills** — Tools and technologies used
- **Projects** — Data science & ML project showcase with live and GitHub links
- **Contact** — SMTP-powered contact form

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui (Radix UI primitives) |
| Routing | React Router v6 |
| Form Handling | React Hook Form + Zod |
| Contact API | Vercel Serverless Function + Nodemailer (Gmail SMTP) |

## 🚀 Getting Started

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your GMAIL_USER and GMAIL_APP_PASSWORD in .env

# 4. Start the dev server
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file at the project root (see `.env.example`):

```env
GMAIL_USER=your.email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
```

> **Note:** Generate a Gmail App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). Do **not** use your regular Gmail password.

## ☁️ Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Add the environment variables (`GMAIL_USER`, `GMAIL_APP_PASSWORD`) in the Vercel project settings before deploying.
4. Vercel will automatically build the Vite app and serve the `/api/contact` serverless endpoint.

## 📁 Project Structure

```
├── api/
│   └── contact.ts          # Vercel serverless function (SMTP email)
├── public/
│   └── resume.pdf          # Resume file (served statically)
├── src/
│   ├── assets/             # Images and static assets
│   ├── components/         # React components (Navbar, sections, UI)
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utility functions
│   └── pages/              # Page-level components
```

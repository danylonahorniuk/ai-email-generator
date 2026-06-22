# MailMindAI — AI-Powered Email Generator

> MVP built as a test task for WebSolutions (Vibe Coder / AI-First Developer position).

**Live demo:** [your-url.vercel.app](https://your-url.vercel.app) _(update after deploy)_

---

## Features

- **Landing page** — Hero, features grid, testimonials, FAQ accordion, CTA sections, fully responsive
- **Authentication** — Sign up / Sign in / Sign out via Supabase Auth
- **Dashboard** — AI email generation form with tone, language, recipient, key points
- **AI Integration** — Claude API with mock-mode fallback (switch via `AI_MODE` env var)
- **Pricing page** — Free / Pro / Team tiers with feature lists
- **Profile page** — Account info, password change, sign out
- **Error handling** — API validation, auth guards, user-facing error messages

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth & DB | Supabase |
| AI | Claude API (Anthropic) |
| Icons | Lucide React |
| Deploy | Vercel |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/yourusername/ai-email-generator.git
cd ai-email-generator
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy your URL and anon key

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# For real AI: get key at console.anthropic.com
ANTHROPIC_API_KEY=sk-ant-...

# Switch between "mock" (no API key needed) and "claude"
AI_MODE=mock
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## AI Mode Switching

The architecture cleanly separates AI provider from business logic:

```
AI_MODE=mock    → uses deterministic mock generator (no API key needed)
AI_MODE=claude  → uses Claude claude-haiku-4-5-20251001 via Anthropic SDK
```

To switch to real AI: set `AI_MODE=claude` and add `ANTHROPIC_API_KEY` in your `.env.local` or Vercel dashboard.

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/       # Login page
│   ├── (auth)/signup/      # Sign up page
│   ├── api/generate-email/ # AI generation API route
│   ├── dashboard/          # Email generator dashboard
│   ├── pricing/            # Pricing tiers
│   ├── profile/            # User profile
│   └── page.tsx            # Landing page
├── components/
│   ├── dashboard/          # EmailGenerator component
│   ├── layout/             # Navbar
│   ├── profile/            # ProfileClient
│   └── ui/                 # Button, Input, Textarea, Select
├── lib/
│   ├── ai/                 # generate-email.ts (provider-agnostic)
│   ├── supabase/           # client.ts + server.ts
│   └── utils.ts
└── middleware.ts            # Auth route protection
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Then add environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## AI Development Report

### Development Process

This MVP was built using an AI-first development approach with Claude Code as the primary assistant:

1. **Architecture design** — Discussed requirements and designed the system before writing code
2. **Parallel implementation** — AI generated multiple files simultaneously (pages, components, API routes)
3. **Provider-agnostic AI layer** — `generate-email.ts` supports both mock and real AI with a single env var switch
4. **Iterative refinement** — Used AI to review and polish UI components for production quality

### Key AI-First Design Decisions

- **Mock mode first** — Built and validated UI/UX before connecting real AI, reducing API costs during development
- **Server/client separation** — Used Next.js App Router patterns correctly (server components for auth, client for interactivity)
- **Type safety** — Full TypeScript throughout with proper interfaces for all AI params

### Time Breakdown

| Phase | Time |
|-------|------|
| Project setup & scaffolding | ~30 min |
| Core UI components | ~1h |
| Pages (Landing, Auth, Dashboard, Pricing, Profile) | ~2h |
| AI integration layer | ~30 min |
| Error handling & polish | ~30 min |
| Deploy & README | ~30 min |
| **Total** | **~5 hours** |

### What I Would Add Next

- Email history saved to Supabase DB
- Stripe payment integration for Pro/Team plans
- Email templates library
- Rate limiting per user (based on plan)
- Usage analytics dashboard

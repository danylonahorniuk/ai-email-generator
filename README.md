# QuillAI — AI Email Generator

> MVP built as a test task for WebSolutions (Vibe Coder / AI-First Developer position).

**Live demo:** [ai-email-generator-nu.vercel.app](https://ai-email-generator-nu.vercel.app)  
**GitHub:** [github.com/danylonahorniuk/ai-email-generator](https://github.com/danylonahorniuk/ai-email-generator)

---

## Features

- **Landing page** — Hero with animated live mockup, How It Works, Features bento grid, Testimonials, FAQ accordion, CTA, Footer — fully responsive (375px → 2560px)
- **Authentication** — Sign up / Sign in / Sign out via Supabase Auth
- **Dashboard** — AI email generation with tone, length, language, recipient, key points fields
- **AI Integration** — Claude API (Haiku) with mock-mode fallback, switched via `AI_MODE` env var
- **Pricing page** — Free / Pro / Team tiers with upgrade flow and checkout modal
- **Profile page** — Account info, plan status, password change, sign out
- **Multilingual UI** — Ukrainian / English / Russian via custom i18n context
- **Error handling** — API validation, auth guards, 404 page, user-facing error messages

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Auth & DB | Supabase (Auth + SSR) |
| AI | Anthropic Claude API (`claude-haiku-4-5-20251001`) |
| Icons | Lucide React |
| Email | Resend (contact form) |
| Deploy | Vercel |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/danylonahorniuk/ai-email-generator.git
cd ai-email-generator
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings → API** and copy your Project URL and anon key
3. Enable Email Auth under **Authentication → Providers**

### 3. Configure environment variables

Create `.env.local` in the project root:

```env
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# AI mode: "mock" (no key needed) or "claude" (requires key below)
AI_MODE=mock

# Required only when AI_MODE=claude
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Run with Docker

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000)

> Requires `.env.local` with Supabase keys in the project root.

---

## AI Mode

The architecture cleanly separates the AI provider from business logic via a single env var:

```
AI_MODE=mock    → deterministic mock templates (Ukrainian / English / Russian)
AI_MODE=claude  → Claude Haiku via Anthropic SDK, real generation
```

To enable real AI generation: set `AI_MODE=claude` and add `ANTHROPIC_API_KEY` in `.env.local` or Vercel dashboard. No other code changes needed.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx        # Sign in page
│   │   └── signup/page.tsx       # Sign up page
│   ├── api/
│   │   ├── generate-email/       # POST — AI email generation
│   │   └── contact/              # POST — contact form (Resend)
│   ├── dashboard/page.tsx        # Email generator (auth-guarded)
│   ├── pricing/page.tsx          # Pricing tiers
│   ├── profile/page.tsx          # User profile (auth-guarded)
│   ├── error.tsx                 # Global error boundary
│   ├── not-found.tsx             # 404 page
│   └── page.tsx                  # Landing page
├── components/
│   ├── dashboard/
│   │   ├── email-generator.tsx   # Generator form + result panel
│   │   └── dashboard-content.tsx # Translated page header
│   ├── landing/
│   │   ├── landing-content.tsx   # All landing sections
│   │   ├── hero-mockup.tsx       # Animated live preview mockup
│   │   └── contact-modal.tsx     # Contact form modal
│   ├── layout/
│   │   ├── navbar.tsx            # Sticky navbar + mobile sidebar
│   │   └── language-switcher.tsx # UA / EN / RU switcher
│   ├── pricing/
│   │   ├── pricing-content.tsx   # Plans grid
│   │   └── checkout-modal.tsx    # Upgrade flow modal
│   ├── profile/
│   │   └── profile-client.tsx    # Account info + password change
│   └── ui/
│       ├── button.tsx            # Button variants
│       ├── input.tsx             # Labeled input
│       ├── select.tsx            # Labeled select
│       ├── textarea.tsx          # Labeled textarea
│       └── toast-notification.tsx # Toast messages
├── lib/
│   ├── ai/
│   │   └── generate-email.ts     # Provider-agnostic AI layer
│   ├── i18n/
│   │   ├── translations.ts       # UA / EN / RU strings
│   │   └── language-context.tsx  # React context + hook
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   └── server.ts             # Server Supabase client (SSR)
│   └── utils.ts
└── middleware.ts                  # Auth route protection
```

---

## Key Technical Decisions

**1. Next.js App Router + Server Components**  
Auth checks happen on the server — protected pages (`/dashboard`, `/profile`) redirect unauthenticated users before any client JS runs. No client-side auth flicker.

**2. Mock / Real AI via env var**  
`src/lib/ai/generate-email.ts` contains both `generateMock()` and `generateWithClaude()`. The entry point `generateEmail()` branches on `AI_MODE`. Swapping providers requires only changing one env var.

**3. Tailwind CSS v4**  
V4 uses a CSS-first config (no `tailwind.config.js`). Some classes behave differently from v3 — inline `style` props were used for critical animations (sidebar transform, overlay opacity) where Tailwind class generation was unreliable during builds.

**4. Mobile sidebar outside `<header>`**  
The sticky header uses `backdrop-blur-md` which creates a new CSS stacking context. `position: fixed` children inside it are scoped to the header's bounds. The mobile sidebar was moved outside `<header>` into a Fragment to fix this.

**5. Supabase SSR via `@supabase/ssr`**  
Used the official `@supabase/ssr` package with separate `client.ts` (browser) and `server.ts` (server components / API routes) to correctly handle cookie-based auth in Next.js App Router.

---

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `AI_MODE` = `mock` (or `claude`)
   - `ANTHROPIC_API_KEY` (only if `AI_MODE=claude`)
4. Deploy

---

## AI Development Report

### Tools & Models Used

| Tool | Purpose |
|------|---------|
| **Claude Code** (claude-sonnet-4-6) | Primary development tool — architecture, code generation, debugging, refactoring, all implementation |
| **Google Stitch** | Initial project structure planning and approximate UI layout design |
| **ChatGPT** | Brainstorming features, copy writing, and design direction before coding |
| **Ideogram** | Logo generation for the QuillAI brand |
| **Claude API** (claude-haiku-4-5-20251001) | AI email generation in production (`AI_MODE=claude`) |

The development followed an AI-first workflow: Google Stitch and ChatGPT were used in the planning phase to define structure and visual direction, Ideogram generated the brand logo, and Claude Code drove all implementation — every line of code was written, reviewed, and debugged through conversation with the AI.

---

### Development Process

The project was built over ~48 hours using a conversational, iterative approach:

1. **Architecture first** — Defined the tech stack, page structure, and data flow before writing code
2. **Scaffolding** — Generated the full Next.js project structure, Supabase auth setup, and middleware in one pass
3. **Page-by-page implementation** — Landing → Auth → Dashboard → Pricing → Profile, each reviewed visually before moving on
4. **Mobile responsiveness pass** — Dedicated pass at 375px across all pages after desktop was complete
5. **Bug fixing loop** — Identified build/runtime issues (Tailwind v4 quirks, backdrop-blur stacking context, Resend module-level init) and fixed iteratively
6. **Deploy** — Vercel deploy with env var configuration

---

### 15 Key Prompts Used During Development

**1. Initial architecture**
> "Створи MVP AI Email Generator на Next.js з Supabase auth, Tailwind CSS, сторінками: лендінг, авторизація, дашборд, тарифи, профіль. Використай App Router, TypeScript strict mode."

**2. Supabase auth setup**
> "Налаштуй Supabase SSR auth з @supabase/ssr — окремий client.ts для браузера і server.ts для серверних компонентів. Додай middleware для захисту маршрутів /dashboard і /profile."

**3. Landing page hero with live mockup**
> "Зроби hero секцію з заголовком, підзаголовком, двома CTA кнопками і живим анімованим мокапом додатку справа. Мокап повинен показувати анімацію генерації листа — друкування тексту, стан генерації, результат."

**4. Provider-agnostic AI layer**
> "Створи src/lib/ai/generate-email.ts з двома режимами: mock (детерміновані шаблони для UA/EN/RU) і claude (Anthropic SDK). Перемикання через AI_MODE env var. Архітектура повинна дозволяти легко додати інших провайдерів."

**5. Multilingual i18n without libraries**
> "Додай мультимовність UA/EN/RU через React context без зовнішніх бібліотек. Перемикач мови в navbar. Всі UI рядки через хук useLanguage()."

**6. Features bento grid**
> "Зроби секцію переваг у стилі bento grid: одна велика картка на 2 колонки зліва і три менших справа. Іконки, заголовки, опис. Використай градієнти і тіні для глибини."

**7. FAQ accordion**
> "Зроби FAQ секцію з акордеоном — плавна анімація відкриття/закриття через CSS transition на max-height. Без зовнішніх бібліотек анімацій."

**8. Mobile hero mockup**
> "Покажи анімований мокап на мобілі (зараз hidden lg:flex). На мобілі зроби вертикальний стек: IdeaCard зверху, кнопка Sparkles по центру, ResultCard знизу з compact варіантом."

**9. Mobile sidebar with smooth animation**
> "Переробити мобільне меню як правобічний сайдбар з плавною анімацією. Overlay з затемненням + slide-in панель справа. Плавне відкриття і закриття через CSS transitions, без Framer Motion."

**10. Debug: backdrop-blur breaks fixed positioning**
> "Мобільний сайдбар з position:fixed не відображається поверх контенту. Header має backdrop-blur-md. Як це виправити? Сайдбар всередині header."

**11. Footer mobile layout**
> "Футер на мобілі — всі посилання розтягнуті на 100% ширини. Треба два варіанти: десктоп grid-cols-3 як є, мобіль — лого зверху і посилання у 2 колонки. Використай hidden md:grid і md:hidden."

**12. Responsive max-width for large screens**
> "max-w-[1400px] на моніторі 1440px залишає нульові відступи по боках. Як зробити щоб на звичайних екранах було max-w-7xl (1280px), а на 2560px розширювалось до 1400px?"

**13. Pricing Pro card mobile**
> "На мобілі картка Pro з -translate-y-4 виглядає дивно в стопці. Застосуй підняття тільки на md+. Також зменши padding карток і відступи секцій на мобілі."

**14. Debug: Vercel build crash**
> "Vercel білд падає з помилкою 'Missing API key' на /api/contact. В route.ts є const resend = new Resend(process.env.RESEND_API_KEY) на рівні модуля. Як виправити щоб не крашило при збірці без RESEND_API_KEY?"

**15. Dashboard mobile responsiveness**
> "На мобілі grid-cols-2 для полів Тон/Довжина і Отримувач/Відправник занадто вузькі на 375px. Зроби grid-cols-1 sm:grid-cols-2. Плюс заголовок сторінки захардкоджений англійською — підключи переклади через новий DashboardContent client component."

---

### What I Would Improve With More Time

1. **Email history** — Save generated emails to Supabase DB with full history tab in dashboard
2. **Stripe integration** — Real payment flow for Pro/Team plans (currently a beautiful mock flow)
3. **Rate limiting** — Enforce generation limits per plan at the API level
4. **More AI providers** — OpenAI / Gemini alongside Claude, user picks in settings
5. **Email templates library** — Pre-built templates for common scenarios (follow-up, cold outreach, thank you)
6. **Usage analytics** — Track generation count per user, popular tones/languages
7. **Tone fine-tuning controls** — Post-generation adjustments (shorter, more formal, friendlier) — partially demoed in the hero mockup
8. **shadcn/ui migration** — Replace custom UI components with shadcn/ui for better accessibility and consistency

// The timeline shows projects top to bottom in this order.
// `href` makes the project name a link. `repo` adds a separate "Code" link. Both are optional.
export const projects = [

  {
    name: "Investing Simulator",
    summary: "This platform is a production-ready paper trading and market tracking application designed to let users practice investing in a secure, community-driven environment. Functionally, it allows users to search and track real-time stock data, execute simulated market trades, and monitor their total profit and loss performance. It protects user privacy by isolating individual portfolios using Supabase Auth and strict Row-Level Security (RLS), while simultaneously driving engagement through public leaderboards, user profiles, and an embedded Discord community hub for trading competitions.",
    year: "2026",
    tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS", "Finnhub API", "Paper Trading", "FinTech"],
    href: "https://invest-sim-tracker.vercel.app/",
    repo: "https://github.com/Priyansh-M/investing-simulator",
  },

  {
  name: "Trivia Bot",
  summary:
    "Telegram bot that runs live trivia games in group chats. It pulls questions from the Open Trivia Database or lets admins build custom quizzes in chat, shares them with a code, and tracks per-group and global leaderboards with timed quiz polls.",
  year: "2026",
  tags: ["Python", "Telegram API", "asyncio"],
  href: "https://t.me/Terival_bot",
  repo: "https://github.com/Priyansh-M/Telegram_quiz_bot",
},

 {
  
  name: "ConDraft",
  summary:
    "A guided drafting aid for Indian agreements. Users pick from 31 contract types, answer questions in plain English, and receive a deed-format draft with recitals, witnesses, and footnotes to public central Acts. Drafts are stored only on the signed-in account and isolated with Supabase Auth and row-level security; unsigned work is not kept. It is a legal-reference tool, not a law firm, and does not give legal advice or file, stamp, or register documents.",
  year: "2026",
  tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS", "jsPDF"],
  href: "https://con-draft.vercel.app/",
  repo: "https://github.com/Priyansh-M/ConDraft",
},
 {
  name: "Volterisk",
  summary:
    "A browser heist game where operators build vaults, run jobs, rob crews and players, and manage heat. One Vercel app serves the React client and Express API, with Prisma on Supabase Postgres for the live ledger.",
  year: "2026",
  tags: ["React", "Vite", "Express", "Prisma", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS", "Vercel"],
  href: "https://volterisk.vercel.app/",
  repo: "https://github.com/Priyansh-M/Volterisk",
},

]

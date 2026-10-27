# October 26, 2026: Boot-first homepage

Buck requested that the website focus on boots, still include bikes, and highlight that the shop is stocked and ready to go.

The homepage now leads with ski boots, the fitting inquiry and fitting information. The boot-fitting path precedes the bike path in navigation and homepage sections. Fantic model descriptions, pricing and direct inquiries remain available. The general stock message does not assert specific models, sizes or quantities.

Local validation: `pnpm check` passed (lint, typecheck, 35 tests and production build). The local production build also passed `pnpm verify:seo --base-url http://localhost:3000` with 1,000 checks across 20 sitemap pages. Desktop homepage was visually reviewed locally.

GitHub `main` is the source of truth. Replit must sync `main` and be republished separately for the public domain; verify the public site after that release. The existing summer schedule banner was not changed because current seasonal hours have not been confirmed.

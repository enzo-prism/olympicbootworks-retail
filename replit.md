# Olympic Bootworks - Replit Configuration

## Overview

Olympic Bootworks is a Next.js-based e-commerce and informational website for a premium ski and mountain bike shop in Lake Tahoe. The site showcases custom boot fitting services (featuring proprietary Heel-Loc technology), ZipFit liners, athlete profiles, and integrates with Ecwid for e-commerce functionality. Built with Next.js 15, React Server Components, TypeScript, and Tailwind CSS, the application emphasizes performance, SEO optimization, and visual polish with video backgrounds and interactive UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Rendering Strategy**
- Next.js 15 with App Router for file-based routing and React Server Components
- Hybrid rendering: Server Components for SEO-critical content (metadata, structured data, static text), Client Components for interactivity (carousels, video players, navigation)
- TypeScript for type safety across components and data structures

**Styling & UI Components**
- Tailwind CSS for utility-first styling with custom design tokens (CSS variables for theming)
- Radix UI primitives (@radix-ui/*) for accessible, unstyled component foundations
- shadcn/ui component library (Button, Sheet, Dialog, etc.) built on Radix with Tailwind styling
- Custom CSS for specialized animations (button-animations.css, carousel.css, mobile-nav.css, video-background.css)
- Dark mode support via next-themes with CSS variable-based theming

**Image Handling Philosophy**
- Centralized image utility (`StandardImage` component) wrapping Next.js `<Image>` with path standardization and fallback to `/placeholder.png`
- Multiple image component variants (LazyImage, OptimizedImage, EnhancedImage, etc.) all delegating to `StandardImage` for consistency
- Path normalization via `standardizePath()` utility to handle various input formats (relative, absolute, null)
- Graceful degradation: All image components handle null/undefined src by falling back to placeholder

**Video Integration**
- Vimeo Player API for background hero videos with custom controls (play/pause, mute/unmute)
- Adaptive video hero implementation: Safari-specific robust version vs. standard for other browsers
- YouTube embeds for content sections with custom thumbnails and lightbox-style playback
- Videos configured for autoplay, loop, and muted by default for background use

**Component Organization**
- Atomic design philosophy: Small, reusable components (buttons, cards, images) composed into larger sections
- Client/Server separation: `HomeClient` wraps interactive homepage content while page-level metadata stays in Server Components
- Feature-specific components (services, testimonials, location cards, athlete profiles) with consistent prop patterns

### Data Management

**Static Data Sources**
- Local data files (e.g., `/data/locations.ts`, `/data/testimonials.ts`) exporting typed arrays
- LocationData and testimonial structures defined with TypeScript interfaces
- No database or CMS in current implementation—content is code-based

**State Management**
- React useState/useEffect for component-level interactivity (carousels, modals, video players)
- No global state management library (Redux, Zustand, etc.)—state kept local to components
- Browser APIs (localStorage, etc.) not currently utilized but could be added for cart persistence

### Routing & Navigation

**Page Structure**
- App Router with layout cascade: `app/layout.tsx` provides global shell (Navigation, Footer, LocationBanner, ThemeProvider)
- Key routes: `/` (home), `/about`, `/pros`, `/gallery`, `/testimonials`, `/contact`, `/shop`
- 404 handling via `not-found.tsx` at both root and app levels
- Error boundaries: `error.tsx` for page-level errors, `global-error.tsx` for app-level failures

**Navigation Component**
- Sticky header with logo, main nav links, location selector, cart widget, and mobile menu
- Mobile: Sheet component (slide-out drawer) with accordion-style navigation
- Desktop: Horizontal nav with dropdowns (if needed)
- ScrollToTop utility ensures page navigations start at top

**Location System**
- Multi-location support with LocationBanner (sticky banner showing both locations)
- LocationSelector dropdown in navigation for quick location context switching
- Location data includes address, hours, phone, flagship status

### SEO & Performance

**Metadata Strategy**
- Next.js Metadata API for static and dynamic page metadata (title templates, OG images, canonical URLs)
- JSON-LD structured data (WebSite, Organization schemas) injected via `SeoJsonLd` component
- Sitemap and robots.txt generated as route handlers (`sitemap.ts`, `robots.ts`)
- SeoIntro component renders hidden (or visible) descriptive text for crawlers without disrupting visual design

**Performance Optimizations**
- Next.js Image optimization for all images (automatic WebP, responsive srcsets)
- Image preloading via `ImagePreloader` component for critical assets
- Lazy loading for below-the-fold images (loading="lazy")
- Video backgrounds optimized with Vimeo's background mode (minimal player UI, autoplay, loop)
- Script loading strategies: Google Analytics via `afterInteractive`, Vimeo/YouTube APIs loaded as needed

**Accessibility**
- Semantic HTML (nav, section, article, footer)
- ARIA labels on interactive elements (buttons, links, video controls)
- Keyboard navigation support in custom components (carousels, modals)
- Focus management in Sheet/Dialog components from Radix UI

### External Dependencies

**Third-Party Services**
- **Ecwid E-commerce Platform**: Embedded shopping cart widget and product pages (loaded via external scripts in layout)
- **Vimeo Player API**: Background video playback with custom controls, loaded via next/script
- **YouTube IFrame API**: Video embeds for content sections
- **Google Analytics (GA4)**: Tracking code (G-36WRRLZB2B) injected via `Analytics` component with gtag.js
- **Google Maps**: Links to location addresses open in Google Maps (no embedded maps currently)

**Font Strategy**
- System font stack (no Google Fonts or external font loading to reduce network requests)
- Comment in layout.tsx indicates previous use of Inter from Google Fonts, now replaced with native sans-serif

**Social Media Integrations**
- Links to Facebook, Instagram, Yelp in footer (external links with noopener/noreferrer)
- Open Graph meta tags for rich social sharing previews

**Deployment & Hosting**
- Vercel deployment (badge and links in README)
- Project synced with v0.dev for design iterations
- Environment: Next.js production build with static export support where applicable

**Package Dependencies** (Key Libraries)
- next@15.2.4, react@19, react-dom@19
- @radix-ui/* (20+ UI primitive packages)
- tailwindcss, autoprefixer, postcss for styling
- lucide-react for icons
- next-themes for dark mode
- TypeScript, ESLint for tooling
- geist, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react for various UI enhancements

**Content Delivery**
- All static assets (images, videos) served from `/public` directory or via `/images/` path
- Vimeo videos hosted externally, embedded via iframes
- No CDN configuration visible (Vercel handles this automatically)
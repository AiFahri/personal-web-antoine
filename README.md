# Antoine Battle Personal Website

<p align="center">
  <img src="public/images/Antoine Battle.webp" width="200" alt="Antoine Battle">
</p>

<h1 align="center">Antoine Battle - Global Education Leader</h1>

<p align="center">
  <strong>Professional Landing Page for Antoine Battle — Advancing Global Education Across Borders</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#usage">Usage</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 📖 About

**Antoine Battle Personal Website** is a modern, high-performance landing page showcasing the professional profile, achievements, and global impact of Antoine Battle—a renowned global education expert and founder of Global Education Alliance. The website serves as a digital portfolio, highlighting his dedication to advancing international education, empowering communities, and fostering cross-border educational opportunities.

### 🎯 Mission

To provide a compelling digital presence that reflects Antoine Battle's commitment to global education excellence, showcases his work and achievements, and enables connection with students, educators, institutions, and partners worldwide.

---

## ✨ Features

### 🌟 Hero Section

- Dynamic hero banner with professional portrait
- Bold typography with animated background text
- Multiple call-to-action buttons
- Social media integration (LinkedIn, YouTube, Instagram, Facebook, TikTok)

### 🎓 Highlights & Achievements

- Two featured highlight sections showcasing key accomplishments
- Engaging visual storytelling with images and compelling copy
- Responsive layout optimized for all screen sizes

### 🌍 Global Impact

- Interactive 3D globe visualization using Three.js and react-three-fiber
- Visual representation of worldwide educational influence
- Smooth animations and particle effects

### 📸 Media Galleries

- **Video Gallery**: Dynamic carousel of educational videos with custom poster generation
- **Photo Gallery**: Curated photo collection with captions and smooth scrolling
- Embla Carousel integration with autoplay functionality
- Responsive grid layouts for mobile and desktop

### 💼 Featured Services

- Service showcase with rich visuals and descriptions
- Carousel navigation with autoplay
- Detailed service cards with CTA buttons
- Content managed through Sanity CMS

### 💬 Testimonials

- Client testimonials with avatars and roles
- Auto-rotating carousel display
- Real-time content updates via Sanity CMS

### 📧 Newsletter Subscription

- Email capture form with Mailchimp integration
- Real-time validation using Formik and Yup
- Success/error status handling
- GDPR-compliant subscription workflow

### 🎨 Modern UI/UX

- Tailwind CSS v4 for utility-first styling
- Smooth animations with GSAP
- Custom fonts (Space Grotesk, Geist)
- Fully responsive design
- Accessible components (ARIA labels, semantic HTML)

### 🔍 SEO & Performance

- Dynamic meta tags and Open Graph support
- Optimized image loading with Next.js Image component
- Server-side rendering for fast initial page load
- Standalone output mode for production deployment

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router with Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4, PostCSS
- **CMS:** Sanity CMS (with GROQ queries)
- **Email:** Mailchimp API integration
- **3D Graphics:** Three.js, react-three-fiber, three-globe
- **UI Components:** 
  - Embla Carousel for galleries
  - GSAP for animations
  - Formik + Yup for forms
- **Deployment:** Vercel-ready (standalone output mode)

---

## 🚀 Installation

> **Prerequisites**: Node.js >= 20.x, npm >= 8.x

1. **Clone the repository**
   ```bash
   git clone https://github.com/AiFahri/personal-web-antoine.git
   cd personal-web-antoine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production

   # Mailchimp
   MAILCHIMP_API_KEY=your_mailchimp_api_key
   MAILCHIMP_API_SERVER=us1
   MAILCHIMP_AUDIENCE_ID=your_audience_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

5. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

---

## ⚙️ Configuration

### Sanity CMS Setup

1. **Create a Sanity account** at [sanity.io](https://www.sanity.io/)
2. **Initialize your Sanity project** or use the existing configuration in `src/sanity/`
3. **Define schemas** (already included):
   - `post` - Blog posts
   - `service` - Featured services
   - `testimonial` - Client testimonials
   - `videoItem` - Video gallery items
   - `photoItem` - Photo gallery items
   - `highlight` - Featured highlights

4. **Run Sanity Studio locally** (optional):
   ```bash
   npx sanity dev
   ```

5. **Populate content** through Sanity Studio at `http://localhost:3000/studio`

### Mailchimp Integration

1. **Get your API key** from Mailchimp dashboard
2. **Find your Audience ID** in Audience settings
3. **Identify your server prefix** (e.g., us1, us2) from your Mailchimp account URL
4. **Add credentials** to `.env.local` as shown above

### Image Optimization

Images are served from Sanity CDN (`cdn.sanity.io`). The configuration in `next.config.ts` allows remote images:

```typescript
images: {
  remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  unoptimized: true,
}
```

---

## 📖 Usage

### Content Management

All dynamic content is managed through Sanity CMS:

- **Blog Posts**: Create and publish articles with rich text editor
- **Services**: Add/update service offerings with images and descriptions
- **Testimonials**: Manage client feedback with avatars
- **Gallery**: Upload photos and videos with metadata
- **Highlights**: Feature key achievements and milestones

Content updates in Sanity are reflected immediately on the live site.

### Data Fetching

The site uses GROQ queries defined in `src/lib/queries.ts`:

```typescript
// Example: Fetch latest posts
import { sanity } from '@/lib/sanity';
import { latestPostsQuery } from '@/lib/queries';

const posts = await sanity.fetch(latestPostsQuery, { limit: 6 });
```

### Component Structure

- **Server Components**: Default for data fetching (e.g., `FeaturedServices`, `Testimonials`)
- **Client Components**: Marked with `"use client"` for interactivity (e.g., `GlobeCanvas`, `Carousel`)
- **Layouts**: 
  - Root layout: `src/app/layout.tsx`
  - Marketing layout: `src/app/(marketing)/layout.tsx`

---

## 🗺️ Project Structure

```
personal-web-antoine/
├── public/
│   ├── fonts/          # Custom fonts (Space Grotesk, Satoshi)
│   └── images/         # Static images and portraits
├── src/
│   ├── app/
│   │   ├── (marketing)/      # Marketing pages group
│   │   │   ├── layout.tsx    # Navbar + Footer wrapper
│   │   │   └── page.tsx      # Homepage
│   │   ├── api/
│   │   │   └── subscribe/    # Mailchimp API route
│   │   ├── studio/           # Sanity Studio route
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── blog/             # Post components
│   │   ├── carousel/         # Embla carousel
│   │   ├── footer/           # Footer sections
│   │   ├── globe/            # 3D globe visualization
│   │   ├── layout/           # Navbar, cards
│   │   ├── photos/           # Photo gallery cards
│   │   ├── sections/         # Page sections (Hero, Testimonials, etc.)
│   │   ├── stats/            # Stat cards
│   │   ├── ui/               # Reusable UI components
│   │   └── videos/           # Video gallery cards
│   ├── data/                 # Static data (highlights, services)
│   ├── lib/                  # Utilities, Sanity client, queries
│   └── sanity/               # Sanity schemas and config
├── .env.local                # Environment variables (not in repo)
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS config
└── tsconfig.json             # TypeScript config
```

---

## 🎨 Customization

### Styling

- Global styles: `src/app/globals.css`
- Tailwind configuration: Uses Tailwind v4 with PostCSS
- Custom fonts: Space Grotesk, Satoshi, Geist (configured in `layout.tsx`)

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add to `src/app/(marketing)/page.tsx`
3. Follow server/client component patterns

### Path Aliases

The project uses `@/*` alias for imports:

```typescript
import Navbar from '@/components/layout/Navbar';
import { sanity } from '@/lib/sanity';
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Guidelines:**

- Use TypeScript for all new code
- Follow existing component patterns (server vs client)
- Use Tailwind CSS for styling
- Test responsiveness on mobile and desktop
- Update documentation for major changes

---

## 📄 License

This project is proprietary and confidential. All rights reserved © Antoine Battle.

---

## 🙏 Acknowledgments

- Antoine Battle and the Global Education Alliance team
- Next.js and Vercel teams
- Sanity.io for the excellent headless CMS
- Open-source community
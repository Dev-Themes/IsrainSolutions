# ❄️🔥 JM Comfort Solutions Website

<div align="center">
  <img src="https://images.unsplash.com/photo-1613146197177-3e5f22f7a070?q=80&w=2000&auto=format&fit=crop" alt="Project Hero Image" style="border-radius: 12px; margin-bottom: 20px;" />
  
  <p><strong>A modern, fast, and responsive website built for JM Comfort Solutions, an HVAC company, powered by Next.js, Tailwind CSS, and Framer Motion.</strong></p>

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  </p>
</div>

---

## 🌟 Key Features

- **⚡ Blazing Fast**: Built with Next.js App Router for optimal performance.
- **🎨 Modern Design**: Tailwind CSS v4 integration for utility-first styling.
- **✨ Smooth Animations**: Framer Motion powers elegant page transitions and micro-interactions.
- **🛠️ Type-Safe**: Fully implemented in TypeScript to minimize runtime errors.
- **⚙️ Centralized Config**: Easy updates to branding, site colors, and business info without diving deep into the code.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open the browser:**
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🎨 How to Customize

This template is designed to be easily configurable without digging through every component.

### 1. 🖼️ Logo
Replace the logo files in the `public/brand` directory:
- `public/brand/logo.png` *(Default logo, usually white background or primary usage)*
- `public/brand/logo-transparent.png` *(Used for dark backgrounds)*

### 2. 🖌️ Colors (Tokens)
Brand colors are defined centrally in `src/app/globals.css`.
To modify the blue, orange, or navy tones, simply change the hex values under the `:root` and `@theme` definitions.
- `--cool-*` for cooling accents (blue)
- `--heat-*` for heating accents (orange/red)
- `--navy-*` for dark backgrounds and text

### 3. 📸 Images
All imagery is managed via `src/lib/images.ts`. 
To swap a placeholder for a real photo, drop your image into the `public/images/` folder and update the path in `src/lib/images.ts`.

<div align="center">
  <img src="https://images.unsplash.com/photo-1590494165264-1ebe3602eb80?q=80&w=1000&auto=format&fit=crop" width="500" alt="HVAC System" style="border-radius: 12px;" />
</div>

### 4. 📞 Contact Details & Business Info
All phone numbers, emails, addresses, licenses, and social links are managed in `src/lib/site.config.ts`.
Updating a value there will automatically reflect across the header, footer, contact page, and anywhere else it is used.

---

## 📂 Project Structure

```text
.
├── docs/                 # Documentation files
├── public/               # Static assets (images, logos, fonts)
├── src/                  
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # Reusable React components
│   ├── lib/              # Configuration and utility functions
│   └── ...
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

---

## 👨‍💻 Development & Deployment

To create an optimized production build:

```bash
npm run build
npm run start
```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## JM Comfort Solutions - Architecture & Deployment

### Configuration & Content
All global configuration (phone numbers, addresses, social links) should be managed in `src/config/site.ts` once implemented. The content for FAQs and Reviews should be stored in typed files in `src/content/*.ts` to decouple content from the UI components.

### Swapping Images
1. Add new images to `public/images/`.
2. Ensure they are optimized (AVIF/WebP) and correctly sized.
3. **HARD RULE:** Visually vet every image to ensure there are no women or girls anywhere in the frame before adding it to the repository. Update `docs/image-manifest.json` for every new image.

### Regenerating the Logo Variant
If you need to update the logo:
1. Place the new source file at `public/brand/logo-source.png`.
2. Generate the dark-mode variant (`public/brand/logo-dark.png`) using an image processing script or software to invert the dark navy portions to light ice-white (`#EAF2FF`) while preserving the orange/blue accents.

### Deploying
1. Ensure all placeholders (`[PLACEHOLDER]`) are filled.
2. Run `npm run lint` and `npm run build` to verify there are no TypeScript or dark-theme violations.
3. Run layout integrity tests with Playwright.
4. Deploy to Vercel or any Next.js compatible hosting provider using standard Next.js deployment commands (`npm run build && npm start`).

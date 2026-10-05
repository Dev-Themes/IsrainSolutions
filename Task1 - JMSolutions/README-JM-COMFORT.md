# JM Comfort Solutions Website

## How to Customize

This template is designed to be easily configurable without digging through every component.

### 1. Logo
Replace the logo files in the public/brand directory:
- public/brand/logo.png (Default logo, usually white background or primary usage)
- public/brand/logo-transparent.png (Used for dark backgrounds)

### 2. Colors (Tokens)
Brand colors are defined centrally in src/app/globals.css.
To modify the blue, orange, or navy tones, simply change the hex values under the :root and @theme definitions.
- --cool-* for cooling accents (blue)
- --heat-* for heating accents (orange/red)
- --navy-* for dark backgrounds and text

### 3. Images
All imagery is managed via src/lib/images.ts. 
To swap a placeholder for a real photo, drop your image into the public/images/ folder and update the path in src/lib/images.ts.

### 4. Contact Details & Business Info
All phone numbers, emails, addresses, licenses, and social links are managed in src/lib/site.config.ts.
Updating a value there will automatically reflect across the header, footer, contact page, and anywhere else it is used.

# Contact Page Reference Audit

**Target:** `https://camohvac.net/contact`
**Observed Breakpoints:** 320px, 390px, 768px, 1024px, 1440px.

## Section-by-Section Structure

1. **Header & Announcement Bar**
   - Standard site navigation.
   - "Contact" menu item has the active state underline.

2. **Emergency Strip**
   - Full-width band immediately under the header.
   - Contains a 24/7 message and the main phone number.
   - Distinct background color to draw attention.

3. **Hero Section**
   - Centered alignment.
   - Small bordered tag at the top.
   - H1 heading with one accented word.
   - 2-line subtext below the heading that mentions the phone number.

4. **Body (Two-Column Layout)**
   - **Left Column:** 
     - Heading: "Request Service".
     - Form: 
       - Request-type toggle (Emergency vs. Schedule).
       - Name and Phone (stack on mobile, side-by-side on desktop).
       - Email field.
       - Service selection dropdown.
       - Issue description textarea.
       - Full-width submit button.
       - Short text line under the button for immediate assistance.
   - **Right Column (Sidebar):**
     - Emergency line card.
     - Service area list card.
     - Social links card.
     - Availability/hours card.

5. **Below Body**
   - Standard footer.

## Intentional Changes for JM Comfort Solutions

1. Replace the gold single-accent system with the logo's **cool-blue → ember gradient** system.
2. Replace camo texture with **contour lines**.
3. Use native radio inputs styled as segmented tiles for the request-type toggle (no JS required).
4. Add a **"What happens after you send"** three-step process.
5. Add a **3-question FAQ** on response times and what to have ready.
6. The form will be a **Server Action** with validation, honeypot, and timing checks.
7. Omit the social card until real URLs are supplied (use placeholder comment).
8. Ensure text is ≥16px in inputs and ≥14px in helper text.

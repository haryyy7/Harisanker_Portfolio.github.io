# Portfolio Redesign — 21st.dev Template Style

Redesigning the portfolio with a modern, ultra-premium dark theme inspired by the [21st.dev portfolio template](https://21st.dev/@syedmoin-lab/templates/portfolio), while adapting content to focus on **Cloud/Infra roles** instead of AI/ML.

## Content Changes

> [!IMPORTANT]
> **Role pivot**: Removing "AI/ML Engineer" role references and replacing with cloud/infra focused titles:
> - SRE (Site Reliability Engineer)
> - PRE (Production/Platform Reliability Engineer)  
> - Systems Engineer
> - Cloud/Infrastructure Engineer

- **Hero typewriter**: Replace `AI/ML Engineer` with `SRE / Systems Engineer`, keep other relevant ones
- **About section**: Update text to reflect cloud/infra focus. Add line about "actively looking for cloud/infra roles"
- **Skills section**: Remove the "AI / Machine Learning" category entirely. Keep Cloud & DevOps, Generative AI & Tools, Other Skills. Replace AI/ML tags in About with infra-focused ones
- **Looking For section**: Replace "AI/ML Engineering" opportunity card with "Platform Reliability Engineering"

## Design Changes — Inspired by 21st.dev Template

The 21st.dev template uses a **sleek, minimal dark design** with:
- Very dark black/charcoal background (near-black `#09090b`)
- Clean sans-serif typography (Geist/Inter style)
- Subtle border-based card designs with muted borders
- Minimal accent colors — mostly neutral with a single highlight color
- Smooth scroll-reveal animations
- Refined glassmorphism nav
- Clean grid layouts with generous whitespace
- Dot grid or subtle pattern backgrounds
- Elegant hover states with soft glows

### Proposed Changes

#### [MODIFY] [index.html](file:///Users/harisanker/Projects-101/Portfolio_Hari/index.html)
- Update meta descriptions to reflect cloud/infra focus
- Update hero typewriter phrases  
- Update About section text + tags
- Remove AI/ML skill category, update remaining skills
- Update "Looking For" section
- Add a line about seeking cloud/infra roles
- Update nav links (sections remain the same)

#### [MODIFY] [style.css](file:///Users/harisanker/Projects-101/Portfolio_Hari/css/style.css)
- New color palette: Near-black background (`#09090b`), subtle neutral cards, refined accent
- Cleaner typography: Use Inter + JetBrains Mono (already have Inter)
- More refined card borders (softer, less neon glow)
- Subtler animations (less aggressive transforms)
- Dot grid background pattern
- Glassmorphism navbar refinement
- Premium spacing and whitespace
- Cleaner badge/tag styling

#### [MODIFY] [main.js](file:///Users/harisanker/Projects-101/Portfolio_Hari/js/main.js)
- Update typewriter phrases
- Refine particle effects to be more subtle (reduce count, use neutral tones)

## Verification Plan

### Manual Verification
- Open `index.html` in browser to verify the visual design
- Check all sections render correctly
- Verify responsive behavior on mobile sizes
- Confirm AI/ML references are removed and cloud/infra content is present

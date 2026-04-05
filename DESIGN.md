# Design System Document: Lola E-Commerce

## 1. Overview & Creative North Star

**Creative North Star: "The Midnight Atelier"**

A luxury e-commerce experience built on deep blacks, warm bronze accents, and restrained elegance. The design draws from high-end ateliers and curated galleries — light is used sparingly to define form, negative space conveys luxury, and typography drives the visual hierarchy.

The system rejects the rigid, boxy constraints of standard e-commerce templates. Elements feel organically placed through intentional asymmetry, generous whitespace, and tonal layering rather than hard lines.

---

## 2. Colors

### Core Palette (CSS Variables)

| Token            | Value     | Usage                                      |
| ---------------- | --------- | ------------------------------------------ |
| `--background`   | `#0a0a0a` | Page background, deepest layer             |
| `--foreground`   | `#ededed` | Primary text, high-emphasis content        |
| `--accent`       | `#c8a97e` | Links, CTAs, labels, decorative elements   |
| `--card`         | `#1a1a1a` | Card backgrounds, elevated surfaces        |
| `--card-light`   | `#2a2a2a` | Secondary cards, avatar backgrounds        |
| `--muted`        | `#888888` | Body text, secondary content, placeholders |

### Opacity System

Borders and overlays use white or black at controlled opacity levels rather than additional gray tokens:

- **White opacity:** `white/5` through `white/50` for borders, dividers, and light overlays
- **Black opacity:** `black/15` through `black/100` for gradient overlays and darkened backdrops
- **Accent opacity:** `accent/15`, `accent/30`, `accent/40`, `accent/60` for decorative dividers and subtle highlights

### The "No Solid Border" Principle

Boundaries are defined through background color shifts and white-at-opacity borders rather than opaque gray lines. Borders use `border-white/10` to `border-white/20` by default, stepping up to `border-white/40` for focus and active states.

### Error Colors

- Text: `text-red-400` (`#f87171`)
- Borders: `border-red-500` (`#ef4444`), `border-red-400`
- Backgrounds: `bg-red-500/10` with `border-red-500/20`

---

## 3. Typography

### Font Families

1. **Manrope** (Google Fonts, variable) — Primary body and UI font. Geometric yet humanist, providing precision with warmth.
2. **Pinyon Script** (Google Fonts, weight 400) — Brand logo font, used exclusively for the "Lola" wordmark. Sizes: `2.1rem` (navbar), `5rem` (large), `6rem` (auth pages).
3. **Heading** (`@font-face`: Arial Black / Impact / Helvetica Neue fallback, weight 900) — Display headings via `.heading-display` class.

### Type Scale

| Role            | Size                        | Weight       | Tracking           | Color                |
| --------------- | --------------------------- | ------------ | ------------------ | -------------------- |
| Display heading | `text-5xl` to `text-9xl`    | 900 (black)  | `tracking-tight`   | `foreground`         |
| Section heading | `text-3xl` / `text-4xl`     | 900 (black)  | `tracking-tight`   | `foreground`         |
| Section label   | `text-[10px]`               | 400          | `tracking-[0.35em]`| `accent`, uppercase  |
| Body            | `text-sm` / `text-base`     | 400          | default            | `muted`              |
| Button label    | `text-xs`                   | 400-500      | `tracking-[0.2em]` | varies, uppercase    |
| Input label     | `text-[10px]`               | 400          | `tracking-[0.2em]` to `tracking-[0.3em]` | `muted` or `accent`, uppercase |
| Caption / fine  | `text-[0.6rem]` to `text-xs`| 400          | wide tracking      | `muted`              |

### Typography Rules

- All labels and CTAs use `uppercase` with wide letter spacing.
- Long-form body text uses `muted` (#888888) to reduce eye strain against the dark background.
- Display headings use the `.heading-display` class (font-weight 900) with tight tracking and `leading-none` (line-height: 1).

---

## 4. Spacing

### Section Spacing

- **Horizontal padding:** `px-6` (mobile) / `md:px-16` / `lg:px-20` / `xl:px-32`
- **Vertical rhythm:** `py-24` (6rem) / `py-32` (8rem) / `py-40` (10rem) between major sections

### Component Spacing

- **Card padding:** `p-8` (standard), `p-14` (large)
- **Input fields:** `px-4 py-3` or `px-5 py-4`
- **Buttons:** `py-3` to `py-5` vertically, `px-5` to `px-14` horizontally
- **Gap between elements:** `gap-3` to `gap-16` depending on hierarchy
- **Input group spacing:** `space-y-5`

### Vertical Rhythm

Headlines should have generous breathing room above them (`mb-6` to `mb-16`). Content beneath headings starts with `mt-4` to `mt-8`.

---

## 5. Elevation & Depth

Depth is achieved through **tonal layering** and controlled transparency rather than traditional drop shadows.

### Layering Principle

Place lighter surfaces (`--card` #1a1a1a, `--card-light` #2a2a2a) over the deep background (`--background` #0a0a0a). The luminance delta creates natural lift without shadows.

### Shadows

Shadows are used sparingly:
- **Toast notifications:** `shadow-2xl`
- All other elevation is handled through background color steps.

### Glassmorphism

Applied to the navigation bar:
- Background: `bg-black/15` or `bg-black/30` (semi-transparent)
- Effect: `backdrop-blur-sm`
- Border: `border-white/10`

### Gradient Overlays

Used on hero sections and image cards:
- `bg-gradient-to-b from-black/100 via-black/65 to-black/20`
- `bg-gradient-to-t from-background via-background/70 to-black/30`

---

## 6. Borders & Dividers

### Border Radius

Only two values are used:
- `rounded-sm` (0.125rem) — Cards, buttons, inputs. The sharp, tailored default.
- `rounded-full` (9999px) — Avatars, circular icons, pill shapes only.

Excessive roundness is avoided. No `rounded-md`, `rounded-lg`, or `rounded-xl` in the system.

### Dividers

- **Horizontal:** `h-px` with `bg-white/10`, `bg-accent/30`, or `bg-accent/40`
- **Decorative accent lines:** `w-8 h-px bg-accent` placed near headings
- **Section borders:** `border-t border-white/10` or `border-b border-white/10`
- Line dividers between list items are avoided; use vertical spacing instead.

---

## 7. Components

### Buttons

| Variant     | Background            | Text                   | Border                   | Hover                           |
| ----------- | --------------------- | ---------------------- | ------------------------ | ------------------------------- |
| Primary     | `bg-white`            | `text-black`           | none                     | `bg-white/90` or `bg-foreground`|
| Accent      | `bg-accent`           | `text-background`      | none                     | `hover:bg-transparent hover:text-accent` |
| Outline     | `bg-transparent`      | `text-white` or `text-accent` | `border-white/10` or `border-accent` | `hover:bg-white/5`    |
| Ghost       | none                  | `text-muted`           | none                     | text color change               |

All buttons use `uppercase`, `text-xs`, and wide letter spacing (`tracking-[0.2em]`). Disabled state: `opacity-50`.

### Input Fields

- **Background:** `bg-transparent`
- **Border:** `border-white/15` default, `border-white/40` on focus
- **Style:** Underline variant uses `border-b` only
- **Label:** `text-[10px] tracking-[0.2em] text-muted uppercase mb-2`
- **Placeholder:** `placeholder:text-white/20`
- **Error:** `border-red-500` + `text-xs text-red-400` message below
- **Focus:** `outline-none transition-colors`

### Cards

- **Background:** `bg-card` (#1a1a1a)
- **Border radius:** `rounded-sm`
- **Padding:** `p-8`
- **Border:** `border-white/10` (optional, subtle)

### Service/Product Cards (Image Cards)

- Absolute positioned text overlay at bottom-left
- Dark gradient overlay on image
- Hover: image `scale-105` / `scale-110` with `transition-transform`
- Optional grayscale-to-color transition: `grayscale` default, `group-hover:grayscale-0`

### Toast Notifications

- **Position:** fixed `bottom-8 right-8`, `z-[100]`
- **Background:** `bg-card`
- **Border:** `border-white/10`
- **Shadow:** `shadow-2xl`
- **Animation:** slide up + fade in (`translate-y-4` to `translate-y-0`, `opacity-0` to `opacity-100`)

### Loading Spinner

- Full viewport (`100svh`) centered container
- Circle: `48px`, `border: 5px solid var(--foreground)` with `border-bottom-color: var(--accent)`
- Animation: `rotation 1s linear infinite`

### Filter Buttons (Catalogue)

- **Active:** `bg-white text-black border-white`
- **Inactive:** `bg-transparent text-muted border-white/20`
- **Hover (inactive):** `border-white/50 text-white`

---

## 8. Layout Patterns

### Grid Systems

| Context           | Grid                                       |
| ----------------- | ------------------------------------------ |
| Service cards     | `grid-cols-1 md:grid-cols-2 gap-4` or `md:grid-cols-3` |
| Product grid      | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1` |
| Testimonials      | `grid-cols-1 md:grid-cols-3 gap-6`         |
| Contact info      | `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`|
| Image gallery     | `grid-cols-1 md:grid-cols-5 gap-4` with col-span |

### Responsive Breakpoints

- **Mobile:** default styles
- **md (768px):** tablet layout shifts
- **lg (1024px):** desktop layout, nav switches from hamburger to inline
- Visibility: `hidden lg:flex` / `lg:hidden` for responsive show/hide

### Auth Pages Layout

- Split layout: image left (hidden on mobile), form right
- Logo at `text-[6rem]` with Pinyon Script
- Form centered vertically with `space-y-5` between inputs

---

## 9. Animations & Transitions

### Navbar

```css
@keyframes navbar-slide-down {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```
Duration: `0.3s ease-out both`

### Hover Transitions

- **Default duration:** `duration-300` (300ms)
- **Slow transitions:** `duration-500`, `duration-700` for hero/gallery
- **Properties:** `transition-colors`, `transition-all`, `transition-transform`, `transition-opacity`
- **Easing:** `ease-in-out` (default), `ease-out` for entrances

### Image Effects

- **Zoom on hover:** `group-hover:scale-105` or `group-hover:scale-110`
- **Grayscale toggle:** `grayscale` default to `group-hover:grayscale-0`
- **Overlay fade:** overlay opacity changes on hover

---

## 10. Image Treatment

### Hero & Background Images

- Full container coverage with `object-cover`
- Grayscale filter applied by default
- Dark gradient overlay for text readability
- Aspect ratio `aspect-3/4` for product images

### Assets (public/)

- Hero images: `/assets/images/hero1.jpeg`, `hero2.jpeg`, `hero3.jpeg`
- About: `/assets/images/about1.jpeg`, `about2.jpeg`
- Auth: `/assets/images/login.jpg`
- Product placeholders: `/pexels-krivitskiy-6206795.jpg`
- Icons: `/assets/icons/facebook.svg`, `scissors.svg`

---

## 11. Do's and Don'ts

### Do

- **DO** define boundaries through background color shifts and white-at-opacity borders, not solid gray lines.
- **DO** use the accent color (`#c8a97e`) consistently for interactive elements, labels, and decorative lines.
- **DO** pair high-contrast typography scales (large display heading + small uppercase label).
- **DO** use generous negative space between sections (`py-24` to `py-40`).
- **DO** apply grayscale to images and reveal color on hover for a curated gallery feel.
- **DO** keep border-radius minimal: `rounded-sm` for containers, `rounded-full` only for circles.

### Don't

- **DON'T** use opaque gray borders. All borders should use `white/10` to `white/20` opacity.
- **DON'T** use pure white (`#ffffff`) for body text. Use `--muted` (#888888) or `--foreground` (#ededed) depending on emphasis.
- **DON'T** use border-radius values between `rounded-sm` and `rounded-full`. No `rounded-md` or `rounded-lg`.
- **DON'T** use traditional drop shadows for elevation. Use tonal layering (background color steps) instead.
- **DON'T** use line dividers between list items. Separate with vertical spacing or background color alternation.
- **DON'T** introduce new colors outside the established palette without updating this document.

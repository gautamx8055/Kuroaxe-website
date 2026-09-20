# Kuroaxe — Master design system

Source of truth for the luxury editorial site. Do not drift toward agency-template color, card grids, or neon.

## Position

Kuroaxe is a premium creative growth partner for ambitious brands — not a low-cost marketing agency.

Quality bar: the site must feel luxurious, exclusive, editorial, and meticulously crafted.

## Tokens

| Name | Hex | Role |
|---|---|---|
| Ink | `#07060A` | Lacquer canvas |
| Charcoal | `#12111A` | Raised surfaces |
| Midnight | `#161821` | Video / AR fields |
| Ivory | `#F6F1E7` | Reading chapters |
| Gilt | `#D4B98A` | Champagne accents only |
| Bone | `#A89F93` | Captions on dark |

## Type

- Display: **Libre Bodoni** (magazine Didot; true italics for the second hero line and pull quotes)
- Body / UI: **Public Sans** (quiet grotesque, not a tech rounded sans)
- Kickers: Public Sans uppercase, tracking ~0.38em

## Signature

1. Full-bleed cinematic hero: clipped line reveal, then the still recedes into a plate as you leave
2. Pinned horizontal lookbook (desktop) — scroll to turn plates; inactive plates dim and scale
3. Process spine: gilt line that fills as the sequence is read
4. Gilt page progress and chapter rail on home

## Motion

GSAP ScrollTrigger. Max one pin on home (the lookbook). Parallax scale on stills. No generic fade-up of every heading. Honor `prefers-reduced-motion` (no pin, no clip).

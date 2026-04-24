# Design Brief

## Direction

ChickenHunt — Purpose-built canvas shooting game with 6 themed worlds, dark overlay UI, and game-first visual system.

## Tone

Playful but serious arcade energy — world-specific theming guides mood (lush meadow, volcanic chaos, cosmic mystery, sandy desolation, jungle danger, snowy serenity).

## Differentiation

World-specific color palettes and bold black-stroked text overlays maintain readability across varied game canvas backgrounds without compromising the visual richness of each environment.

## Color Palette

| Token           | OKLCH          | Role              |
| --------------- | -------------- | ----------------- |
| background      | 15 0 0         | Dark game canvas  |
| foreground      | 95 0 0         | Light text/icons  |
| card            | 22 0 0         | Modal backgrounds |
| primary         | 50 0.1 142     | UI accents        |
| accent          | 55 0.2 55      | Highlights/CTAs   |
| muted           | 45 0 0         | Secondary UI      |
| success         | 60 0.15 130    | Green world color |
| warning         | 60 0.2 45      | Orange highlights |
| destructive     | 50 0.2 15      | Red/error states  |

## Typography

- Display: System sans-serif — world titles, game headings (clamp 3.5rem–8rem, 900 weight, black stroke)
- Body: System sans-serif — UI labels, menus, stats (14–16px, 400–600 weight)
- Scale: hero (clamp 3.5rem 12vw 8rem), h2 (28px), label (14px), body (16px)

## Elevation & Depth

Modal windows and overlay UI float above the game canvas via `z-index: 1000` and semi-transparent darkening. Hit effects, multiplier badges, and reward notifications use radial gradients and shadow hierarchies to suggest depth and collision feedback.

## Structural Zones

| Zone      | Background                      | Border                              | Notes                                 |
| --------- | ------------------------------- | ----------------------------------- | ------------------------------------- |
| Game Area | Canvas element (dynamic worlds) | None                                | Full viewport minus 60px bottom       |
| Modal     | oklch(22 0 0) / 90% opacity     | 1px solid rgba(255,255,255,0.2)   | Centered, world-specific button theme |
| Menu Bar  | oklch(15 0 0) + blur(10px)      | border-t rgba(255,255,255,0.2)     | Fixed 60px height, z-index 1000      |
| HUD       | None / overlay                  | None                                | Score, timer, world indicator        |

## Spacing & Rhythm

60px bottom menu fixed; modal windows centered with 32px padding; HUD elements grid-aligned with 8px baseline rhythm; tip containers 8px gap between navigation controls.

## Component Patterns

- Buttons: Gradient background (world-specific), 4px black border, prominent shadow with inset highlight. Hover lifts shadow and reverses gradient.
- Modals: Dark semi-transparent backdrop, oklch(22 0 0) center window, 2px border with rounded corners.
- Badges: Orange gradient + gold shadow (multipliers), green glow (achievements/milestones).
- Text: Black stroke (2–6px depending on context) for contrast; fallback text-shadow for unsupported browsers.

## Motion

- Entrance: 0.5s fade-in for modals and menu transitions; tip text slides up (translateY 10px).
- Hover: Button colors reverse 0.2s, badges scale 1.1, navigation arrows lift with background shift.
- Decorative: Lightbulb pulses 2.5s infinite; multiplier blinks 0.8s; milestone glows green 1.5s; hit burst expands 0.6s; reward notify bounces 1.5–3s.

## Constraints

- All text must use black stroke for readability across world canvas backgrounds.
- Game canvas receives full viewport minus 60px bottom menu; no horizontal scroll.
- User-select disabled globally; touch-action limited to game-specific zones (tips pan-x, achievements pan-y).
- World buttons color-coded: Meadow (green), Volcano (red/orange), Space (purple), Desert (gold), Jungle (dark green), Snowy (sky blue).

## Signature Detail

World-specific button gradients paired with bold text strokes create a playful hierarchy — every world feels distinct, yet the visual system remains coherent and game-focused.

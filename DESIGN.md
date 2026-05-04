# Design Brief

## Direction

ChickenHunt (now World of Hunt) — Purpose-built canvas shooting game with 24 themed worlds (plus Weather), dark overlay UI, game-first visual system. Weather world adds iOS-style premium glassmorphism aesthetic.

## Tone

Playful arcade energy with world-specific theming (lush meadow, volcanic chaos, cosmic mystery, sandy desolation, jungle danger, snowy serenity, crypto trading, deep ocean, weather app premium). Weather world introduces minimalist, premium iOS-inspired clean aesthetic.

## Differentiation

World-specific color palettes, bold black-stroked text overlays (world-responsive), button theming per world. Weather world: glassmorphic cards, dynamic sky gradients, split-flap animations, animated weather particles — premium polish contrasting playful game worlds.

## Color Palette

| Token           | OKLCH          | Role                      |
| --------------- | -------------- | ------------------------- |
| background      | 15 0 0         | Dark game canvas          |
| foreground      | 95 0 0         | Light text/icons          |
| card            | 22 0 0         | Modal backgrounds         |
| primary         | 50 0.1 142     | UI accents                |
| accent          | 55 0.2 55      | Highlights/CTAs           |
| muted           | 45 0 0         | Secondary UI              |
| success         | 60 0.15 130    | Green world color         |
| warning         | 60 0.2 45      | Orange highlights         |
| destructive     | 50 0.2 15      | Red/error states          |

**Weather World Palette (dynamic):**
| Condition | Sky Gradient         | Card Glass       | Text           |
| --------- | -------------------- | ---------------- | -------------- |
| Sunny     | oklch(75 0.15 260)   | rgba(20,30,50,0.25) | oklch(95 0 0) |
| Cloudy    | oklch(65 0.08 260)   | rgba(20,30,50,0.25) | oklch(95 0 0) |
| Rainy     | oklch(55 0.06 260)   | rgba(20,30,50,0.25) | oklch(95 0 0) |

## Typography

- Display: System sans-serif — world titles, split-flap city/temp (clamp 3.5rem–8rem, 900 weight, black stroke)
- Body: System sans-serif — UI labels, forecast text (14–16px, 400–600 weight)
- Weather (premium): Inter or Geist Mono for split-flap (monospace luxury feel)

## Elevation & Depth

Canvas: game backgrounds (dynamic per world, weather-responsive sky). Modals and HUD: overlay with `z-index: 1000`, semi-transparent darkening. Weather world: glassmorphic cards (backdrop-filter blur), soft borders, floating frosted-glass effect.

## Structural Zones

| Zone      | Background                      | Border                              | Notes                                 |
| --------- | ------------------------------- | ----------------------------------- | ------------------------------------- |
| Game Area | Canvas (dynamic, weather-responsive) | None                            | Full viewport minus 60px bottom       |
| Weather Card | rgba(20,30,50,0.25) blur(20px) | 1px rgba(255,255,255,0.15)    | Centered, glassmorphic, 24px radius  |
| Forecast  | rgba(255,255,255,0.08) blur(16px) | 1px rgba(255,255,255,0.12)  | Rows within card, semi-transparent   |
| Modal     | oklch(22 0 0) / 90% opacity     | 1px solid rgba(255,255,255,0.2)   | Non-weather worlds                    |
| Menu Bar  | oklch(15 0 0) + blur(10px)      | border-t rgba(255,255,255,0.2)     | Fixed 60px height, z-index 1000      |
| HUD       | None / overlay                  | None                                | Score, timer, world indicator        |

## Spacing & Rhythm

60px bottom menu fixed; weather card padding 24px inner, centered; forecast rows 12px gap; HUD grid 8px baseline rhythm; animations: split-flap 600ms, particle fall 2–4s, sway 3–5s.

## Component Patterns

- Buttons: Gradient (world-specific), black border or blur border, shadow hierarchy. Weather button: sky-blue gradient + subtle blur, cyan glow on hover.
- Weather Card: Glassmorphic container, rounded 24px, soft border, no hard edges. Split-flap display: 3D perspective rotation on city transition.
- Forecast: Stacked rows, each semi-transparent glass, weather icons + min/max temps.
- Particles: Raindrops (small blue lines), snowflakes (white crystals), clouds (soft white shapes) — 3 sizes each, 60s round (12s per city cycle).
- Text: Black stroke (2–6px) for world UI; white text on weather card (no stroke, premium feel).

## Motion

- Entrance: 0.5s fade-in for modals; weather card scales in 0.4s cubic-bezier.
- City Transition: Split-flap 3D flip 600ms per city (60s round ÷ 5 cities = 12s display + 600ms flip).
- Particles: Fall/sway continuously (rain 2s, snow 4s, clouds float 6s).
- Hover: Buttons reverse gradient 0.2s, weather button cyan glow intensifies.
- Weather responsive: Sky gradient shifts smooth (1s) when condition changes.

## Constraints

- Weather world: glassmorphic cards only (no opaque modals); dynamic sky gradient responds to live weather data.
- Split-flap transitions synchronized to 60s round (12s per city, 600ms flip per transition).
- All particles 3 sizes, mirrored for left/right flight (same entity system as other worlds).
- No hard corners on weather card (24px border-radius minimum).
- Text stroke for game UI; no stroke on weather card (premium minimalist).

## Signature Detail

Weather world introduces premium glassmorphism into playful arcade game — frosted glass cards, weather-responsive sky gradients, split-flap departures-board animations, and soft particle effects create a sophisticated, iOS-inspired showcase of design system versatility.

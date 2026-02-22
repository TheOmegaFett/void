# Using the Website

This guide is for non-developer users who want to use the Void Flow visualizer.

## Open the App

- Production: https://void-flow-prod-496494976110.australia-southeast1.run.app/
- Local: `http://localhost:8080/`

## Basic Controls

- `Preset`: switch between visual modes A/B/C/D.
- `Reseed`: generate a fresh variation of the same preset.
- `Pause`: pause/resume animation.
- `Record` / `Stop`: capture a recording from your browser session.

## Look and Performance

- Lower `Particle grid` for faster performance.
- Lower `Bloom` and `BloomTh` if frame rate drops.
- Tune `Trail`, `Point`, and `Exposure` for style preference.

## Navigation

- Click the canvas to recenter.
- Scroll to zoom.
- Keyboard shortcuts: `1` to `4` to switch presets quickly.

## Analysis Mode

- Set `Mode` to `Analysis`.
- Use `Overlay` and `Overlay α` to inspect vector behavior and flow patterns.

## Health Check

Use this endpoint to verify service health:

```bash
curl -sS https://void-flow-prod-496494976110.australia-southeast1.run.app/health
```

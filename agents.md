# Repository Guidelines

## Project Structure & Module Organization

This repository contains a dependency-free, local single-page tool for converting PixPin OCR text into normalized charging-price rows.

- `index.html` is the deployment entry point.
- `电站价格整理器.html` is the named local entry point and should remain aligned with `index.html` when markup changes.
- `电站价格整理器.js` contains OCR parsing, time-period matching, price selection, review, copy, and export behavior.
- `电站价格整理器.css` contains all presentation and responsive styles.
- `备份/` stores dated reference snapshots and notes. Treat these as historical artifacts; do not implement active changes there.

Keep the application offline-capable: do not introduce CDN assets, server APIs, or a build-time dependency without explicit agreement.

## Build, Test, and Development Commands

There is no package manager or build step. Open `index.html` or `电站价格整理器.html` directly in a modern browser for local development. A local server is optional:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000/`. Before committing, inspect changes with `git diff --check` and `git diff`.

## Coding Style & Naming Conventions

Preserve the existing plain HTML/CSS/JavaScript architecture. Use two-space indentation for new readable blocks, semicolons in JavaScript, `camelCase` for variables and functions, and `UPPER_SNAKE_CASE` for fixed configuration constants. Reuse existing CSS class patterns and `data-testid` attributes. Keep user-facing copy in concise Chinese and save files as UTF-8.

Parsing changes must model time blocks and price groups explicitly. Never classify electricity fees, service fees, discounts, or subsidies as final member/non-member totals.

## Testing Guidelines

No automated test framework is currently configured. Manually run every built-in and historical regression sample after parser changes, including formula totals, cross-period ranges, pre/post-period price groups, and repeated label templates such as `华自价 + VIP价`. Verify the six copied fields in this order: 晚谷非会员、晚谷会员、中谷非会员、中谷会员、平非会员、平会员. Also confirm single-price periods show a prominent manual-review warning.

## Commit & Pull Request Guidelines

Follow the repository history: use short Chinese, action-oriented commit subjects, for example `修正跨时段价格归属` or `统一入口页面样式`. Keep each commit focused. Pull requests should explain the affected parsing rule, list regression samples tested, and include screenshots for visible UI changes. Link related issues when available and call out any remaining manual-review edge cases.

# Repository Guidelines

## Project Structure & Module Organization

This dependency-free single-page tool converts PixPin OCR text into normalized charging-price rows.

- `index.html` is the deployment entry point.
- `电站价格整理器.html` is the named local entry point and should remain aligned with `index.html` when markup changes.
- `电站价格整理器.js` contains parsing, time matching, price selection, review, copy, and export logic.
- `电站价格整理器.css` contains presentation and responsive styles.
- `备份/` stores dated snapshots. Do not implement active changes there.

Keep the application offline-capable: do not introduce CDN assets, server APIs, or a build-time dependency without explicit agreement.

## Backups Before Major Changes

Before a substantial code or webpage change, create a restorable snapshot under `备份/`. This includes parser rewrites, broad UI/layout or data-flow changes, restructuring, and multi-file edits. Small copy or isolated style fixes need no snapshot.

Back up before editing. Use a unique dated directory such as `备份/2026-07-03-价格解析重构前/` and copy every affected active HTML, CSS, and JS file. Add a short Markdown note if the restore point is unclear. Never overwrite or edit a snapshot. Verify its files before continuing.

## Build, Test, and Development Commands

There is no build step. Open either HTML entry directly, or run:

```powershell
python -m http.server 8000
```

Visit `http://localhost:8000/`. Before committing, run `git diff --check` and inspect `git diff`.

## Coding Style & Naming Conventions

Preserve plain HTML/CSS/JavaScript. Use two-space indentation, JavaScript semicolons, `camelCase` variables/functions, and `UPPER_SNAKE_CASE` constants. Reuse CSS class patterns and `data-testid` attributes. Keep UI copy concise and files UTF-8.

Parsing changes must model time blocks and price groups explicitly. Never classify electricity fees, service fees, discounts, or subsidies as final member/non-member totals.

## Testing Guidelines

No test framework is configured. After parser changes, run every built-in and historical sample, including formula totals, cross-period ranges, mixed price groups, and repeated labels such as `华自价 + VIP价`. Verify this copy order: 晚谷非会员、晚谷会员、中谷非会员、中谷会员、平非会员、平会员. Single-price periods must show a manual-review warning.

## Commit & Pull Request Guidelines

Follow the repository history: use short Chinese, action-oriented commit subjects, for example `修正跨时段价格归属` or `统一入口页面样式`. Keep each commit focused. Pull requests should explain the affected parsing rule, list regression samples tested, and include screenshots for visible UI changes. Link related issues when available and call out any remaining manual-review edge cases.

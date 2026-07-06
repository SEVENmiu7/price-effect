# Repository Guidelines

## Project Structure & Module Organization

- `index.html` is the deployment entry point.
- `电站价格整理器.html` is the local entry and should stay aligned with `index.html`.
- `电站价格整理器.js` contains parsing and application behavior; `电站价格整理器.css` contains presentation.

Keep the application offline-capable; add no CDN, server API, or build dependency without agreement.

## Git Version Records

Use Git history instead of copied backup folders. Before substantial work, confirm the working tree state with `git status` and review pending changes so unrelated user work remains untouched. After each complete, verified change, create a focused commit with a short Chinese action-oriented subject, such as `修正跨时段价格归属`. Do not combine unrelated changes. Use a Git tag for important stable releases when a named restore point is useful. Never create manual source snapshots under the repository.

## Confirmation Before Complex Work

Before complex work, obtain user confirmation. Work is complex when it spans files/modules, changes core parsing/data flow/major UI, has several valid approaches, carries rollback risk, or needs substantial implementation and verification. Read-only inspection may come first; do not begin costly edits. Skip only when the user explicitly requests direct execution.

Use this compact format:

- **Understanding:** State the outcome, scope and exclusions, critical rules, and deliverable clearly enough to expose misunderstandings; do not merely repeat the request.
- **Steps:** Give three to five high-level implementation and verification steps.
- **Questions:** Ask only questions whose answers materially change the result; write “None” otherwise.

End by asking the user to confirm the interpretation and plan.

## Build, Test, and Development Commands

Open either HTML entry directly, or run:

```powershell
python -m http.server 8000
```

Visit `http://localhost:8000/`. Before committing, run `git diff --check` and inspect `git diff`.

## Coding Style & Naming Conventions

Use two-space indentation, JavaScript semicolons, `camelCase` variables/functions, and `UPPER_SNAKE_CASE` constants. Reuse CSS class patterns and `data-testid` attributes. Keep UI copy concise and files UTF-8.

Parsing changes must model time blocks and price groups explicitly. Never classify electricity fees, service fees, discounts, or subsidies as final member/non-member totals.

## Testing Guidelines

No test framework is configured. After parser changes, run every built-in and historical sample, including formulas, cross-period ranges, mixed groups, and repeated labels. Verify this copy order: 晚谷非会员、晚谷会员、中谷非会员、中谷会员、平非会员、平会员. Single-price periods must show a review warning.

## Commit & Pull Request Guidelines

Use short Chinese, action-oriented commit subjects, such as `修正跨时段价格归属`. Keep commits focused. Pull requests should explain affected rules, list regression samples, include screenshots for UI changes, and note remaining review cases.

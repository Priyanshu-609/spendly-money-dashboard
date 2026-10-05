# Spendly

Spendly is a responsive personal finance dashboard built with plain HTML, CSS, and JavaScript. It helps you understand monthly spending, keep an eye on category budgets, and estimate how many days remain before a savings goal is within reach.

## Live demo

[Open Spendly](https://priyanshu-609.github.io/spendly-money-dashboard/)

## Features

- Monthly income, expenses, savings, and savings-rate summaries
- Spending breakdown by category and a six-month income-versus-expenses chart
- Transaction tracking for expenses, income, and transfers
- Category budgets with progress indicators
- Savings goals with a day estimate based on the remaining amount and monthly contribution
- Search, CSV reports, and responsive navigation
- Local browser storage; no account or server is required

## Run it

Open `index.html` in a modern browser. Spendly has no build step, package manager, or external runtime dependencies.

The dashboard starts with sample transactions and a sample MacBook Air goal so the charts and cards have something to show. Add, edit, or reset the demo information from the app. Changes are saved in the current browser with `localStorage`.

## Hosting

Spendly is hosted with GitHub Pages from the `main` branch's root directory.

## Project files

```text
index.html   App structure and dialogs
styles.css   Responsive dashboard styling
app.js       Views, charts, calculations, and local storage
```

## Privacy and scope

Spendly is a front-end demo. It does not connect to bank accounts or send financial data to a server. Transactions, preferences, and goals are stored in the browser on the device where the app is used. The savings timeline is an estimate: it assumes the monthly contribution stays consistent.

## License

MIT — see [LICENSE](LICENSE).

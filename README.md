# Spendly

Spendly is a responsive personal finance dashboard built with plain HTML, CSS, and JavaScript. It helps you understand monthly spending, keep an eye on category budgets, and estimate how many days remain before a savings goal is within reach.

## Live demo

[Open Spendly](https://priyanshu-609.github.io/spendly-money-dashboard/)

## Features

- Monthly income, expenses, savings, and savings-rate summaries
- Spending breakdown by category and a six-month income-versus-expenses chart
- Transaction tracking for expenses, income, and transfers
- Edit transaction details or delete an entry; dashboard totals and reports update with your changes
- Signed-in profile badge shows the first letter of the account's saved name
- Category budgets with progress indicators
- Savings goals with a day estimate based on the remaining amount and monthly contribution
- Archived goals stay in Goal History and can be restored to the active list
- Search, CSV reports, and responsive navigation
- Separate **Create account** and **Log in** flows using one-time email or phone codes
- A private cloud workspace for each verified account
- Signed-out visitors see no name, transactions, budgets, or goals

## Run it

Open `index.html` in a modern browser. Spendly has no build step or package manager. Sign-in uses the Supabase browser library from a CDN and remains unavailable until you connect a Supabase project.

Spendly requires sign-in before it displays or saves personal financial data. New users choose **Create account**; returning users choose **Log in**. Both verify with a one-time code sent to email or phone. After cloud setup, use the same verified address or number on each device to load the private account workspace. If the account has no workspace yet, Spendly starts it empty; it can offer an explicit import of older browser-saved entries after sign-in. Choose **Settings → Your data → Reset workspace** to clear saved entries and begin again. Each month opens to its own view; previous months stay available in Reports.

To enable email and phone sign-in, follow [SUPABASE_SETUP.md](SUPABASE_SETUP.md). Email delivery to general users needs a custom SMTP provider, and phone sign-in needs an SMS provider. Keep provider credentials inside Supabase; only the Project URL and browser-safe publishable key belong in `supabase-config.js`. The SQL schema enables row-level security so each account can reach only its own workspace.

## Search visibility

The public demo includes a sitemap, a crawler access file, canonical URL, sharing metadata, and structured app information. Search engines decide whether and when to crawl, index, and show it; these files help discovery but do not guarantee a search result. To request Google indexing, verify the site in Google Search Console, submit `sitemap.xml`, and request indexing for the homepage.

## Hosting

Spendly is hosted with GitHub Pages from the `main` branch's root directory.

## Project files

```text
index.html   App structure and dialogs
styles.css   Responsive dashboard styling
app.js       Views, charts, calculations, and local storage
```

## Privacy and scope

Spendly does not connect to bank accounts. While signed out, the app shows no account name or financial data and does not save new entries. After sign-in, Spendly syncs the user's workspace to Supabase using account-scoped row-level security. The savings timeline is an estimate: it assumes the monthly contribution stays consistent.

## License

MIT — see [LICENSE](LICENSE).

const STORAGE_KEY = 'spendly-demo-v1';

const CATEGORY_META = [
  { name: 'Food', color: '#368af2', icon: '🍽️', budget: 10000 },
  { name: 'Education', color: '#ff914a', icon: '📚', budget: 6500 },
  { name: 'Household', color: '#ffbf26', icon: '🏠', budget: 5500 },
  { name: 'Transport', color: '#10b98f', icon: '🚌', budget: 4500 },
  { name: 'Entertainment', color: '#a34bd0', icon: '🎬', budget: 4000 },
  { name: 'Shopping', color: '#ec59c3', icon: '🛍️', budget: 3500 },
  { name: 'Others', color: '#65758a', icon: '✦', budget: 4000 },
];

const ICONS = {
  dashboard: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="11" width="7" height="10" rx="2"/><rect x="3" y="14" width="8" height="7" rx="2"/>',
  transactions: '<path d="M7 7h13l-3.5-3.5M17 17H4l3.5 3.5"/><path d="M20 7l-3-3M4 17l3 3"/>',
  budget: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/><path d="M6 6V4h12v2"/>',
  goals: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/><path d="m13 11 6-6"/>',
  analytics: '<path d="M3 20h18M6 16v-5M12 16V5M18 16v-8"/><path d="m4 8 5-4 4 3 6-5"/>',
  categories: '<circle cx="8" cy="8" r="4"/><circle cx="17" cy="7" r="3"/><circle cx="16" cy="17" r="4"/><circle cx="6" cy="17" r="2"/>',
  reports: '<path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v6h5M8 13h8M8 17h8"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.2.9-1.2 2.1-1.4-.5a8 8 0 0 1-1.6.9l-.2 1.5h-2.5l-.2-1.5a8 8 0 0 1-1.6-.9l-1.4.5-1.2-2.1 1.2-.9a7 7 0 0 1 0-1.8l-1.2-.9 1.2-2.1 1.4.5a8 8 0 0 1 1.6-.9l.2-1.5h2.5l.2 1.5a8 8 0 0 1 1.6.9l1.4-.5 1.2 2.1-1.2.9a7 7 0 0 1 0 1.8Z" transform="translate(-1 -1) scale(1.08)"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/>',
  bell: '<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  wallet: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H20v14H5.5A2.5 2.5 0 0 1 3 16.5z"/><path d="M3 8h17M16 12h4M6 5l1-2h10l1 2"/><circle cx="16" cy="15" r=".5" fill="currentColor"/>',
  expense: '<path d="M12 3v18M5 12h14"/><circle cx="12" cy="12" r="9"/>',
  savings: '<path d="M4 10c0-2 2-4 5-4h6a5 5 0 0 1 5 5v4a4 4 0 0 1-4 4H8a5 5 0 0 1-5-5z"/><path d="M8 6V4h6M17 12h3M11 10v5M8.5 12.5 11 15l2.5-2.5"/>',
  rate: '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M16 6h4v4"/>',
  add: '<path d="M12 5v14M5 12h14"/>',
  remove: '<path d="M5 12h14"/>',
  transfer: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m12 12 7-7M15 5h4v4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};

function icon(name, className = '') {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

function localISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function monthKey(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; }

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `sp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function dateForMonthOffset(offset, day = 3) {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + offset);
  const maxDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(day, maxDay));
  return localISO(date);
}

function makeSeedData() {
  const today = new Date();
  const maxDay = today.getDate();
  const sampleDay = (back) => localISO(new Date(today.getFullYear(), today.getMonth(), Math.max(1, maxDay - back)));
  const transactions = [
    { id: createId(), date: sampleDay(0), description: 'Zomato', category: 'Food', type: 'expense', amount: 450 },
    { id: createId(), date: sampleDay(1), description: 'Freelance Payment', category: 'Income', type: 'income', amount: 5000 },
    { id: createId(), date: sampleDay(2), description: 'Amazon', category: 'Shopping', type: 'expense', amount: 1299 },
    { id: createId(), date: sampleDay(3), description: 'Metro Card', category: 'Transport', type: 'expense', amount: 300 },
    { id: createId(), date: sampleDay(4), description: 'Online Course', category: 'Education', type: 'expense', amount: 2000 },
    { id: createId(), date: sampleDay(1), description: 'Salary', category: 'Income', type: 'income', amount: 42000 },
    { id: createId(), date: sampleDay(2), description: 'Interest', category: 'Income', type: 'income', amount: 3000 },
    { id: createId(), date: sampleDay(2), description: 'Groceries', category: 'Food', type: 'expense', amount: 2300 },
    { id: createId(), date: sampleDay(3), description: 'Weekly groceries', category: 'Food', type: 'expense', amount: 6350 },
    { id: createId(), date: sampleDay(3), description: 'Design course', category: 'Education', type: 'expense', amount: 3850 },
    { id: createId(), date: sampleDay(4), description: 'Electricity bill', category: 'Household', type: 'expense', amount: 4875 },
    { id: createId(), date: sampleDay(4), description: 'Metro pass', category: 'Transport', type: 'expense', amount: 3600 },
    { id: createId(), date: sampleDay(5), description: 'Movie night', category: 'Entertainment', type: 'expense', amount: 3250 },
    { id: createId(), date: sampleDay(5), description: 'Home essentials', category: 'Shopping', type: 'expense', amount: 1301 },
    { id: createId(), date: sampleDay(6), description: 'Other spending', category: 'Others', type: 'expense', amount: 2925 },
  ];

  const monthlyIncome = [42500, 46000, 47500, 45200, 44600];
  const monthlyExpenses = [28000, 31400, 29800, 34000, 30100];
  for (let offset = -5; offset < 0; offset += 1) {
    const index = offset + 5;
    transactions.push({ id: createId(), date: dateForMonthOffset(offset, 1), description: 'Monthly income', category: 'Income', type: 'income', amount: monthlyIncome[index] });
    transactions.push({ id: createId(), date: dateForMonthOffset(offset, 5), description: 'Monthly expenses', category: 'Others', type: 'expense', amount: monthlyExpenses[index] });
  }

  return {
    version: 1,
    settings: { name: 'Priyanshu', currency: 'INR' },
    transactions,
    goals: [{ id: createId(), name: 'MacBook Air', target: 80000, saved: 28000, contribution: 6500, icon: '💻' }],
    budgets: Object.fromEntries(CATEGORY_META.map((category) => [category.name, category.budget])),
  };
}

function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && stored.version === 1 && Array.isArray(stored.transactions) && Array.isArray(stored.goals)) return stored;
  } catch (error) {
    console.warn('Could not read saved Spendly data; loading the demo.', error);
  }
  return makeSeedData();
}

const state = {
  data: loadData(),
  activeView: 'dashboard',
  selectedMonth: monthKey(new Date()),
  query: '',
};

function saveData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data)); }
  catch (error) { toast('Your browser could not save this change.'); }
}

function formatMoney(value, compact = false) {
  const currency = state.data.settings.currency || 'INR';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0, notation: compact ? 'compact' : 'standard' }).format(value || 0);
  } catch {
    return `₹${Math.round(value || 0).toLocaleString('en-IN')}`;
  }
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function selectedTransactions() {
  return state.data.transactions.filter((transaction) => transaction.date?.slice(0, 7) === state.selectedMonth);
}

function sumType(transactions, type) {
  return transactions.reduce((sum, transaction) => sum + (transaction.type === type ? Number(transaction.amount) : 0), 0);
}

function totalsForMonth(key) {
  const month = state.data.transactions.filter((transaction) => transaction.date?.slice(0, 7) === key);
  return { income: sumType(month, 'income'), expense: sumType(month, 'expense'), savings: sumType(month, 'income') - sumType(month, 'expense') };
}

function monthDate(key) {
  const [year, month] = key.split('-').map(Number);
  return new Date(year, month - 1, 1);
}

function monthLabel(key, options = { month: 'long', year: 'numeric' }) {
  return monthDate(key).toLocaleDateString('en', options);
}

function getPreviousMonthKey(key) {
  const date = monthDate(key);
  date.setMonth(date.getMonth() - 1);
  return monthKey(date);
}

function changePercent(current, previous) {
  if (!previous) return current ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function transactionsForSearch(transactions = selectedTransactions()) {
  const query = state.query.trim().toLocaleLowerCase();
  if (!query) return transactions;
  return transactions.filter((transaction) => `${transaction.description} ${transaction.category} ${transaction.type} ${transaction.date}`.toLocaleLowerCase().includes(query));
}

function transactionCategoryPill(transaction) {
  const label = transaction.type === 'income' ? 'Income' : transaction.type === 'transfer' ? 'Transfer' : transaction.category;
  const className = label === 'Food' ? 'food' : label === 'Shopping' ? 'shopping' : label === 'Transport' ? 'transport' : label === 'Education' ? 'education' : label === 'Household' ? 'household' : label === 'Entertainment' ? 'entertainment' : label === 'Income' ? 'income' : 'other';
  return `<span class="category-pill pill-${className}">${escapeHTML(label)}</span>`;
}

function dateLabel(iso) {
  if (!iso) return '';
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });
}

function currentGoal() { return state.data.goals[0]; }

function goalEtaDays(goal) {
  if (!goal || goal.saved >= goal.target) return 0;
  if (!goal.contribution) return null;
  return Math.ceil(((goal.target - goal.saved) / goal.contribution) * 30.44);
}

function formatDays(days) {
  if (days === null) return 'Add a monthly contribution';
  if (days <= 0) return 'Goal reached!';
  if (days < 30) return `${days} days left`;
  const months = Math.ceil(days / 30.44);
  return `~${days} days · ${months} ${months === 1 ? 'month' : 'months'}`;
}

function monthOptions() {
  const current = new Date();
  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date(current.getFullYear(), current.getMonth() - index, 1);
    const key = monthKey(date);
    return `<option value="${key}" ${key === state.selectedMonth ? 'selected' : ''}>${escapeHTML(monthLabel(key))}</option>`;
  }).join('');
}

function categoryTotals(transactions = selectedTransactions()) {
  return CATEGORY_META.map((category) => ({
    ...category,
    amount: transactions.reduce((sum, transaction) => sum + (transaction.type === 'expense' && transaction.category === category.name ? Number(transaction.amount) : 0), 0),
  }));
}

function renderPageHeading(title, subtitle, options = {}) {
  const controls = options.month === false ? '' : `<label class="select-control">${icon('calendar')}<select id="month-select" aria-label="Select month">${monthOptions()}</select>${icon('chevron')}</label>`;
  const action = options.action ? `<button class="button button-primary" data-action="${options.action}">${escapeHTML(options.actionLabel || 'Add new')} <span>+</span></button>` : '';
  return `<div class="page-heading"><div><h1>${title}</h1><p>${subtitle}</p></div><div class="heading-right">${controls}${action}</div></div>`;
}

function renderStatCard(iconName, type, value, label, trend, trendText) {
  return `<article class="stat-card ${type}"><span class="stat-icon">${icon(iconName)}</span><div class="stat-card-text"><strong>${value}</strong><div class="stat-card-label">${label}</div><small class="stat-trend">${trend}${trendText}</small></div></article>`;
}

function renderDonut() {
  const categories = categoryTotals();
  const total = categories.reduce((sum, category) => sum + category.amount, 0);
  if (!total) return `<div class="category-chart-content"><div class="empty-state"><div class="empty-icon">◌</div><strong>No spending yet</strong>Add an expense to see your category breakdown.</div></div>`;
  let cursor = 0;
  const stops = categories.filter((category) => category.amount > 0).map((category) => {
    const percent = category.amount / total * 100;
    const stop = `${category.color} ${cursor.toFixed(2)}% ${(cursor + percent).toFixed(2)}%`;
    cursor += percent;
    return stop;
  });
  const legend = categories.filter((category) => category.amount > 0).map((category) => `<div class="legend-row"><i class="legend-dot" style="background:${category.color}"></i><span>${escapeHTML(category.name)}</span><strong>${Math.round(category.amount / total * 100)}%</strong></div>`).join('');
  return `<div class="category-chart-content"><div class="donut-wrap"><div class="donut-chart" style="background:conic-gradient(${stops.join(',')})"></div><div class="donut-hole"><strong>${formatMoney(total, true)}</strong><span>Total spent</span></div></div><div class="legend">${legend}</div></div>`;
}

function renderHistoryChart() {
  const end = monthDate(state.selectedMonth);
  const keys = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(end.getFullYear(), end.getMonth() - (5 - index), 1);
    return monthKey(date);
  });
  const monthly = keys.map((key) => ({ key, ...totalsForMonth(key) }));
  const max = Math.max(1, ...monthly.flatMap((item) => [item.income, item.expense]));
  const bars = monthly.map((item) => `<div class="bar-group" title="${escapeHTML(monthLabel(item.key))}: ${formatMoney(item.income)} income, ${formatMoney(item.expense)} expenses"><span class="bar income" style="height:${Math.max(3, item.income / max * 100)}%"></span><span class="bar expense" style="height:${Math.max(3, item.expense / max * 100)}%"></span><span class="bar-label">${escapeHTML(monthLabel(item.key, { month: 'short' }))}</span></div>`).join('');
  return `<div class="bar-chart" role="img" aria-label="Income and expenses over six months">${bars}</div><div class="chart-legend"><span><i></i>Income</span><span><i class="rose-dot"></i>Expenses</span></div>`;
}

function renderTransactionTable(transactions, options = {}) {
  const filtered = transactionsForSearch(transactions).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  const rows = filtered.slice(0, options.limit || 50).map((transaction) => {
    const positive = transaction.type === 'income';
    const sign = positive ? '+' : transaction.type === 'transfer' ? '↔' : '−';
    const amountClass = positive ? 'amount-positive' : transaction.type === 'transfer' ? '' : 'amount-negative';
    return `<tr><td>${escapeHTML(dateLabel(transaction.date))}</td><td>${escapeHTML(transaction.description)}</td><td>${transactionCategoryPill(transaction)}</td><td class="${amountClass}">${sign} ${formatMoney(transaction.amount)}</td></tr>`;
  }).join('');
  if (!rows) return `<div class="empty-state"><div class="empty-icon">⌕</div><strong>${state.query ? 'No matching transactions' : 'Nothing to show yet'}</strong>${state.query ? 'Try a different search or clear the search field.' : 'Add income or expenses to start your money story.'}</div>`;
  return `<div class="table-scroll"><table class="transaction-table"><thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderGoalFeature() {
  const goal = currentGoal();
  if (!goal) return `<section class="panel goal-feature"><div class="goal-feature-top"><h2>Your goals</h2><button class="text-button" data-action="goal">Create one →</button></div><div class="empty-state"><div class="empty-icon">◎</div><strong>Start with something you want</strong>Small monthly steps add up.</div></section>`;
  const progress = Math.min(100, Math.round(goal.saved / goal.target * 100));
  const days = goalEtaDays(goal);
  const isRelevant = !state.query || `${goal.name} goal saving`.toLowerCase().includes(state.query.trim().toLowerCase());
  if (!isRelevant) return `<section class="panel goal-feature"><div class="goal-feature-top"><h2>Your goal</h2><button class="text-button" data-view="goals">View all →</button></div><div class="empty-state">No goals match your search.</div></section>`;
  return `<section class="panel goal-feature"><div class="goal-feature-top"><h2>Your Goal</h2><button class="text-button" data-view="goals">View all →</button></div><div class="goal-main"><div class="goal-thumb">${escapeHTML(goal.icon || '🎯')}</div><div class="goal-detail"><h3>${escapeHTML(goal.name)}</h3><div class="target">Target: ${formatMoney(goal.target)}</div><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div><div class="goal-facts"><strong>${formatMoney(goal.saved)} saved</strong><span>${progress}%</span></div></div></div><div class="goal-facts"><span>${formatDays(days)}</span><button class="text-button" data-action="contribute" data-goal="${goal.id}">Add savings +</button></div><div class="focus-card" style="margin-top:14px"><span class="focus-target">${icon('target')}</span><div><strong>${days === 0 ? 'You did it!' : 'Stay focused!'}</strong><p>${days === 0 ? 'You reached your goal. Celebrate the milestone.' : `At ${formatMoney(goal.contribution)} a month, you are on track to reach your goal in ${days} days.`}</p></div></div></section>`;
}

function renderInsights(totals) {
  const categories = categoryTotals().filter((category) => category.amount > 0).sort((a, b) => b.amount - a.amount);
  const top = categories[0];
  const previous = totalsForMonth(getPreviousMonthKey(state.selectedMonth));
  const expenseDelta = previous.expense ? changePercent(totals.expense, previous.expense) : 0;
  const rate = totals.income > 0 ? Math.max(0, Math.round(totals.savings / totals.income * 100)) : 0;
  const goal = currentGoal();
  const days = goalEtaDays(goal);
  return `<section class="panel insights-panel"><div class="panel-header"><h2>Monthly Insights</h2></div>
    <div class="insight-item"><span class="insight-icon amber">💡</span><span>${top ? `You spent <strong>${Math.round(top.amount / (totals.expense || 1) * 100)}% on ${escapeHTML(top.name.toLowerCase())}</strong> this month.` : 'Add your first expense to uncover a spending pattern.'}</span></div>
    <div class="insight-item"><span class="insight-icon mint">${icon('rate')}</span><span>Your savings rate is <strong>${rate}%</strong>. ${rate >= 25 ? 'Great job!' : 'Every little bit helps.'}</span></div>
    <div class="insight-item"><span class="insight-icon blue">${icon('target')}</span><span>${goal ? `Your goal is about <strong>${days ?? '—'} days</strong> away.` : 'Create a goal to keep your savings on track.'}</span></div>
    <div class="insight-item"><span class="insight-icon rose">🛒</span><span>${expenseDelta > 0 ? `Spending is <strong>${expenseDelta}% higher</strong> than last month.` : expenseDelta < 0 ? `Spending is <strong>${Math.abs(expenseDelta)}% lower</strong> than last month. Nice work!` : 'Review your budgets to plan the rest of the month.'}</span></div>
  </section>`;
}

function renderDashboard() {
  const transactions = selectedTransactions();
  const totals = totalsForMonth(state.selectedMonth);
  const previous = totalsForMonth(getPreviousMonthKey(state.selectedMonth));
  const incomeChange = changePercent(totals.income, previous.income);
  const expenseChange = changePercent(totals.expense, previous.expense);
  const savingsRate = totals.income > 0 ? Math.round(totals.savings / totals.income * 100) : 0;
  const displayName = state.data.settings.name || 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const txTitle = state.query ? 'Search results' : 'Recent Transactions';
  const resultNote = state.query ? `<p class="search-results-note">Searching this month's transactions and your goals for “${escapeHTML(state.query)}”.</p>` : '';
  return `${renderPageHeading(`${greeting}, ${escapeHTML(displayName)}! 👋`, 'Manage your money better, for a brighter tomorrow.')}
    <div class="dashboard-grid"><div class="dashboard-primary">
      <section class="stats-grid" aria-label="Monthly summary">
        ${renderStatCard('wallet','income',formatMoney(totals.income),'Total Income',incomeChange >= 0 ? '↑ ' : '↓ ',`${Math.abs(incomeChange)}% from last month`)}
        ${renderStatCard('expense','expense',formatMoney(totals.expense),'Total Expenses',expenseChange >= 0 ? '↑ ' : '↓ ',`${Math.abs(expenseChange)}% from last month`)}
        ${renderStatCard('savings','savings',formatMoney(totals.savings),'Total Savings',`${savingsRate}%`,' of income')}
        ${renderStatCard('rate','rate',`${savingsRate}%`,'Savings Rate',savingsRate >= 25 ? 'You’re doing great!' : 'Keep building your habit','')}
      </section>
      ${resultNote}
      <div class="charts-grid"><section class="panel chart-panel"><div class="panel-header"><h2>Spending by Category</h2><button class="mini-select" data-view="categories">This month ${icon('chevron')}</button></div>${renderDonut()}</section>
        <section class="panel chart-panel"><div class="panel-header"><div><h2>Income vs Expenses</h2><span class="subtle">Six-month overview</span></div><button class="mini-select" data-view="analytics">Last 6 Months ${icon('chevron')}</button></div>${renderHistoryChart()}</section></div>
      <div class="bottom-grid"><section class="panel transactions-panel"><div class="panel-header"><h2>${txTitle}</h2><button class="text-button" data-view="transactions">View all →</button></div>${renderTransactionTable(transactions,{limit:5})}</section>${renderInsights(totals)}</div>
    </div><aside class="dashboard-aside">${renderGoalFeature()}
      <section class="panel quick-panel"><div class="panel-header"><h2>Quick Actions</h2></div><div class="quick-actions">
        <button class="quick-action" data-action="add-income"><span class="quick-action-icon">${icon('add')}</span><span>Add Income</span></button>
        <button class="quick-action" data-action="add-expense"><span class="quick-action-icon">${icon('remove')}</span><span>Add Expense</span></button>
        <button class="quick-action" data-action="add-transfer"><span class="quick-action-icon">${icon('transfer')}</span><span>Transfer</span></button>
        <button class="quick-action" data-action="goal"><span class="quick-action-icon">${icon('target')}</span><span>Set Goal</span></button>
      </div></section>
      <section class="quote-card"><div class="quote-text"><span class="quote-mark">“</span> A better you<br />is a richer you. <span class="quote-mark">”</span><br /><span class="quote-mark">—</span></div></section>
    </aside></div>`;
}

function renderTransactionsPage() {
  const transactions = selectedTransactions();
  const filtered = transactionsForSearch(transactions);
  return `${renderPageHeading('Transactions', 'Every little choice adds up.', { action: 'add-transaction', actionLabel: 'Add transaction' })}
    <section class="panel"><div class="panel-header"><div><h2>${filtered.length} ${filtered.length === 1 ? 'transaction' : 'transactions'}</h2><div class="subtle">${escapeHTML(monthLabel(state.selectedMonth))}</div></div><span class="pill-note">Saved on this device</span></div>${renderTransactionTable(transactions)}</section>`;
}

function renderBudgetPage() {
  const categories = categoryTotals();
  const budgets = state.data.budgets || {};
  const planned = categories.reduce((sum, category) => sum + Number(budgets[category.name] || 0), 0);
  const spent = categories.reduce((sum, category) => sum + category.amount, 0);
  const percent = planned ? Math.min(100, Math.round(spent / planned * 100)) : 0;
  const rows = categories.map((category) => {
    const budget = Number(budgets[category.name] || category.budget);
    const progress = budget ? Math.min(100, Math.round(category.amount / budget * 100)) : 0;
    const barColor = progress >= 100 ? '#ff6079' : category.color;
    return `<div class="budget-row"><div class="budget-name"><i style="background:${category.color}"></i>${escapeHTML(category.name)}</div><div class="progress-track"><div class="progress-fill" style="width:${progress}%;background:${barColor}"></div></div><div class="budget-amount"><strong>${formatMoney(category.amount)}</strong> / ${formatMoney(budget)}</div></div>`;
  }).join('');
  return `${renderPageHeading('Your Budget', 'Give every rupee a purpose.')}
    <div class="content-grid"><section class="panel wide-panel"><div class="panel-header"><div><h2>${formatMoney(spent)} spent of ${formatMoney(planned)}</h2><div class="subtle">${percent}% of your monthly plan</div></div><span class="pill-note">${percent < 80 ? 'Looking good' : percent < 100 ? 'Getting close' : 'Over budget'}</span></div><div class="progress-track" style="height:12px;margin-top:16px"><div class="progress-fill" style="width:${percent}%;background:${percent >= 100 ? '#ff6079' : ''}"></div></div><div class="budget-list">${rows}</div></section>
    <section class="panel"><div class="panel-header"><h2>Budget tip</h2><span class="insight-icon mint">✦</span></div><p style="color:#52677f;font-size:13px;line-height:1.7;margin:16px 0 4px">A budget is a plan for the life you want. Check in once a week, and adjust it when your priorities change.</p></section>
    <section class="panel"><div class="panel-header"><h2>Month at a glance</h2></div><div class="setting-row"><div><strong>Planned spending</strong><small>Your category budgets combined</small></div><strong>${formatMoney(planned)}</strong></div><div class="setting-row"><div><strong>Spent so far</strong><small>Across all expense categories</small></div><strong>${formatMoney(spent)}</strong></div><div class="setting-row"><div><strong>Left to spend</strong><small>Based on your monthly plan</small></div><strong>${formatMoney(Math.max(0,planned-spent))}</strong></div></section></div>`;
}

function renderGoalsPage() {
  const cards = state.data.goals.map((goal) => {
    const progress = Math.min(100, Math.round(goal.saved / goal.target * 100));
    const days = goalEtaDays(goal);
    return `<article class="goal-card"><div class="goal-card-head"><div class="goal-card-left"><div class="goal-card-icon">${escapeHTML(goal.icon || '🎯')}</div><div><h3>${escapeHTML(goal.name)}</h3><p>Target ${formatMoney(goal.target)}</p></div></div><span class="pill-note">${progress}%</span></div><div class="goal-card-foot" style="margin-top:15px"><strong>${formatMoney(goal.saved)} saved</strong><span>${formatDays(days)}</span></div><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div><div class="goal-card-foot"><span>${formatMoney(Math.max(0,goal.target-goal.saved))} to go</span><span>Plan: ${formatMoney(goal.contribution)} / month</span></div><div style="display:flex;justify-content:flex-end;margin-top:12px"><button class="text-button" data-action="contribute" data-goal="${goal.id}">Add savings +</button></div></article>`;
  }).join('');
  return `${renderPageHeading('Savings Goals', 'Make your plans feel closer.', { month: false, action: 'goal', actionLabel: 'New goal' })}
    <div class="content-grid"><section class="panel wide-panel"><div class="panel-header"><h2>Your goals</h2><span class="pill-note">${state.data.goals.length} active</span></div><div class="content-grid" style="margin-top:15px">${cards || '<div class="empty-state wide-panel"><div class="empty-icon">◎</div><strong>No goals yet</strong>Pick something you care about and start saving.</div>'}</div></section>
    <section class="panel"><div class="panel-header"><h2>Small steps count</h2></div><p style="color:#52677f;font-size:13px;line-height:1.7;margin:15px 0">Choose a monthly contribution that fits your budget. Spendly estimates the number of days to your target from the amount you have saved and your monthly plan.</p></section><section class="panel"><div class="panel-header"><h2>Goal tip</h2></div><p style="color:#52677f;font-size:13px;line-height:1.7;margin:15px 0">A clear target can make it easier to keep going. Celebrate each milestone along the way.</p></section></div>`;
}

function renderAnalyticsPage() {
  const end = monthDate(state.selectedMonth);
  const keys = Array.from({ length: 6 }, (_, index) => monthKey(new Date(end.getFullYear(), end.getMonth() - (5 - index), 1)));
  const months = keys.map((key) => ({ key, ...totalsForMonth(key) }));
  const positiveMonths = months.filter((month) => month.income > 0);
  const averageSavings = positiveMonths.length ? positiveMonths.reduce((sum, month) => sum + month.savings, 0) / positiveMonths.length : 0;
  const bestMonth = positiveMonths.reduce((best, month) => month.savings > (best?.savings ?? -Infinity) ? month : best, null);
  const categories = categoryTotals().filter((category) => category.amount > 0).sort((a, b) => b.amount - a.amount);
  const top = categories[0];
  const current = totalsForMonth(state.selectedMonth);
  return `${renderPageHeading('Your Analytics', 'Patterns today can shape better tomorrows.')}
    <div class="content-grid"><section class="panel wide-panel"><div class="panel-header"><div><h2>Income vs Expenses</h2><div class="subtle">A six-month view ending ${escapeHTML(monthLabel(state.selectedMonth))}</div></div></div>${renderHistoryChart()}</section>
    <section class="panel"><div class="panel-header"><h2>Spending mix</h2></div>${renderDonut()}</section>
    <section class="panel"><div class="panel-header"><h2>Highlights</h2></div><div class="setting-row"><div><strong>Average monthly savings</strong><small>Across the last six months</small></div><strong>${formatMoney(averageSavings)}</strong></div><div class="setting-row"><div><strong>Best savings month</strong><small>${bestMonth ? escapeHTML(monthLabel(bestMonth.key)) : 'Not enough data yet'}</small></div><strong>${bestMonth ? formatMoney(bestMonth.savings) : '—'}</strong></div><div class="setting-row"><div><strong>Top category this month</strong><small>${top ? escapeHTML(top.name) : 'No spending yet'}</small></div><strong>${top ? formatMoney(top.amount) : '—'}</strong></div><div class="setting-row"><div><strong>Current savings rate</strong><small>Income minus expenses</small></div><strong>${current.income ? Math.round(current.savings/current.income*100) : 0}%</strong></div></section></div>`;
}

function renderCategoriesPage() {
  const categories = categoryTotals();
  const spent = categories.reduce((sum, category) => sum + category.amount, 0);
  const cards = categories.map((category) => {
    const budget = Number(state.data.budgets?.[category.name] || category.budget);
    const share = spent ? Math.round(category.amount / spent * 100) : 0;
    const progress = budget ? Math.min(100, Math.round(category.amount / budget * 100)) : 0;
    return `<article class="category-card"><div class="category-card-head"><i style="display:grid;place-items:center;background:${category.color}22;color:${category.color};font-style:normal;font-size:17px">${category.icon}</i><span><strong>${escapeHTML(category.name)}</strong><small>${share}% of expenses</small></span></div><div class="category-total">${formatMoney(category.amount)}</div><div class="progress-track"><div class="progress-fill" style="width:${progress}%;background:${category.color}"></div></div><small style="display:block;margin-top:7px;color:#718196;font-size:10px">Budget ${formatMoney(budget)}</small></article>`;
  }).join('');
  const income = selectedTransactions().filter((transaction) => transaction.type === 'income').reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  return `${renderPageHeading('Categories', 'See where your money goes.', { month: false })}<div class="content-grid"><section class="panel wide-panel"><div class="panel-header"><div><h2>Spending categories</h2><div class="subtle">${formatMoney(spent)} total expenses · ${formatMoney(income)} income this month</div></div></div><div class="category-grid">${cards}</div></section></div>`;
}

function renderReportsPage() {
  return `${renderPageHeading('Reports', 'Your monthly money story, ready to take with you.', { month: false })}
    <div class="content-grid"><section class="panel wide-panel"><div class="panel-header"><div><h2>Download your data</h2><div class="subtle">Export a clean CSV you can open in a spreadsheet.</div></div><span class="pill-note">Private to you</span></div><div class="content-grid" style="margin-top:16px"><article class="report-card"><div><span class="report-card-icon">${icon('download')}</span><h3>${escapeHTML(monthLabel(state.selectedMonth))} report</h3><p>Transactions for the selected month, with date, category, type, and amount.</p></div><button class="button button-primary" data-action="download-month">Download CSV <span>↓</span></button></article><article class="report-card"><div><span class="report-card-icon">${icon('reports')}</span><h3>All transactions</h3><p>Export every transaction saved in this browser.</p></div><button class="button button-primary" data-action="download-all">Download CSV <span>↓</span></button></article></div></section>
    <section class="panel"><div class="panel-header"><h2>Reporting note</h2></div><p style="color:#52677f;font-size:13px;line-height:1.7;margin:14px 0 0">Your downloads are created from the information currently saved in this browser. Spendly does not connect to your bank.</p></section><section class="panel"><div class="panel-header"><h2>Selected month</h2></div><div class="setting-row"><div><strong>${escapeHTML(monthLabel(state.selectedMonth))}</strong><small>Income</small></div><strong>${formatMoney(totalsForMonth(state.selectedMonth).income)}</strong></div><div class="setting-row"><div><strong>Expenses</strong><small>Recorded this month</small></div><strong>${formatMoney(totalsForMonth(state.selectedMonth).expense)}</strong></div></section></div>`;
}

function renderSettingsPage() {
  return `${renderPageHeading('Settings', 'A few details to make Spendly yours.', { month: false })}
    <div class="content-grid"><section class="panel"><div class="panel-header"><h2>Preferences</h2><button class="text-button" data-action="profile">Edit →</button></div><div class="setting-row"><div><strong>Your name</strong><small>Shown in your dashboard greeting</small></div><strong>${escapeHTML(state.data.settings.name)}</strong></div><div class="setting-row"><div><strong>Currency</strong><small>Used for all amounts</small></div><strong>${escapeHTML(state.data.settings.currency)}</strong></div></section>
    <section class="panel"><div class="panel-header"><h2>Your data</h2><span class="pill-note">On this device</span></div><p style="color:#52677f;font-size:12px;line-height:1.7;margin:14px 0">Your transactions and goals stay in this browser using local storage. They are not sent to a server.</p><button class="button button-quiet" data-action="reset-data">Restore demo data</button></section>
    <section class="panel wide-panel"><div class="panel-header"><h2>About Spendly</h2></div><p style="color:#52677f;font-size:13px;line-height:1.7;margin:13px 0">A small, friendly way to build a clearer picture of your monthly money habits. Track expenses, check budgets, and see how long it may take to reach a savings goal.</p><span class="pill-note">Demo project · HTML · CSS · JavaScript</span></section></div>`;
}

function renderView() {
  document.getElementById('profile-name').textContent = state.data.settings.name || 'Your profile';
  document.querySelectorAll('.nav-item').forEach((button) => button.classList.toggle('active', button.dataset.view === state.activeView));
  const renderers = {
    dashboard: renderDashboard,
    transactions: renderTransactionsPage,
    budget: renderBudgetPage,
    goals: renderGoalsPage,
    analytics: renderAnalyticsPage,
    categories: renderCategoriesPage,
    reports: renderReportsPage,
    settings: renderSettingsPage,
  };
  document.getElementById('view').innerHTML = (renderers[state.activeView] || renderDashboard)();
}

function toast(message) {
  const region = document.getElementById('toast-region');
  const item = document.createElement('div');
  item.className = 'toast';
  item.textContent = message;
  region.append(item);
  setTimeout(() => item.remove(), 3200);
}

function openModal(id) {
  const dialog = document.getElementById(id);
  if (dialog && !dialog.open) dialog.showModal();
}

function closeModal(dialog) { if (dialog?.open) dialog.close(); }

function setTransactionType(type) {
  const form = document.getElementById('transaction-form');
  form.elements.type.value = type;
  document.querySelectorAll('.type-switch button').forEach((button) => button.classList.toggle('selected', button.dataset.type === type));
  const select = form.elements.category;
  const choices = type === 'expense' ? CATEGORY_META.map((category) => category.name) : type === 'income' ? ['Income'] : ['Transfer'];
  select.innerHTML = choices.map((category) => `<option>${escapeHTML(category)}</option>`).join('');
  document.getElementById('transaction-title').textContent = type === 'expense' ? 'Add expense' : type === 'income' ? 'Add income' : 'Add transfer';
}

function openTransaction(type = 'expense') {
  const form = document.getElementById('transaction-form');
  form.reset();
  form.elements.date.value = localISO(new Date());
  setTransactionType(type);
  openModal('transaction-modal');
}

function openGoalModal() {
  const form = document.getElementById('goal-form');
  form.reset();
  openModal('goal-modal');
}

function handleAction(action, element) {
  if (action === 'add-transaction') openTransaction('expense');
  if (action === 'add-income') openTransaction('income');
  if (action === 'add-expense') openTransaction('expense');
  if (action === 'add-transfer') openTransaction('transfer');
  if (action === 'goal') openGoalModal();
  if (action === 'profile') {
    const form = document.getElementById('profile-form');
    form.elements.name.value = state.data.settings.name || '';
    form.elements.currency.value = state.data.settings.currency || 'INR';
    openModal('profile-modal');
  }
  if (action === 'contribute') {
    const goal = state.data.goals.find((item) => item.id === element.dataset.goal);
    if (!goal) return;
    const raw = window.prompt(`How much would you like to add to ${goal.name}?`, '1000');
    if (raw === null) return;
    const amount = Number(raw);
    if (!Number.isFinite(amount) || amount <= 0) { toast('Enter a contribution greater than zero.'); return; }
    goal.saved = Math.min(goal.target, goal.saved + amount);
    saveData();
    renderView();
    toast(goal.saved >= goal.target ? 'Goal reached — well done!' : `${formatMoney(amount)} added to your goal.`);
  }
  if (action === 'download-month') downloadCSV(selectedTransactions(), `spendly-${state.selectedMonth}.csv`);
  if (action === 'download-all') downloadCSV(state.data.transactions, 'spendly-all-transactions.csv');
  if (action === 'reset-data') {
    if (!window.confirm('Restore the original demo transactions and goals? Your saved changes on this device will be replaced.')) return;
    state.data = makeSeedData();
    state.selectedMonth = monthKey(new Date());
    saveData();
    renderView();
    toast('Demo data restored.');
  }
}

function downloadCSV(transactions, filename) {
  const headings = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const lines = transactions.slice().sort((a,b) => a.date.localeCompare(b.date)).map((transaction) => [transaction.date, transaction.description, transaction.category, transaction.type, transaction.amount]);
  const csv = [headings, ...lines].map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast('Your CSV report is ready.');
}

function switchView(view) {
  if (!view) return;
  state.activeView = view;
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-scrim')?.classList.remove('visible');
  renderView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-icon]').forEach((node) => {
  const name = node.dataset.icon;
  node.innerHTML = icon(name);
});

document.getElementById('brand-link').addEventListener('click', (event) => {
  event.preventDefault();
  switchView('dashboard');
});

document.getElementById('navigation').addEventListener('click', (event) => {
  const button = event.target.closest('[data-view]');
  if (button) switchView(button.dataset.view);
});

document.getElementById('view').addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]');
  if (action) { handleAction(action.dataset.action, action); return; }
  const view = event.target.closest('[data-view]');
  if (view) switchView(view.dataset.view);
});

document.getElementById('view').addEventListener('change', (event) => {
  if (event.target.id === 'month-select') {
    state.selectedMonth = event.target.value;
    renderView();
  }
});

document.getElementById('global-search').addEventListener('input', (event) => {
  state.query = event.target.value;
  renderView();
});

document.getElementById('mobile-menu').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-scrim')?.classList.add('visible');
});

document.getElementById('sidebar-scrim')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-scrim').classList.remove('visible');
});

document.querySelectorAll('.notification-button').forEach((button) => button.addEventListener('click', () => toast('You’re all caught up.')));
document.getElementById('profile-button').addEventListener('click', () => handleAction('profile'));
document.querySelectorAll('.type-switch button').forEach((button) => button.addEventListener('click', () => setTransactionType(button.dataset.type)));
document.querySelectorAll('[data-close-modal], .close-modal').forEach((button) => button.addEventListener('click', () => closeModal(button.closest('dialog'))));

document.getElementById('transaction-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const amount = Number(data.get('amount'));
  if (!Number.isFinite(amount) || amount <= 0) { toast('Enter an amount greater than zero.'); return; }
  const date = String(data.get('date'));
  if (!date) { toast('Choose a transaction date.'); return; }
  const type = String(data.get('type'));
  state.data.transactions.push({ id: createId(), date, description: String(data.get('description')).trim(), category: String(data.get('category')), type, amount });
  state.selectedMonth = date.slice(0, 7);
  saveData();
  closeModal(form.closest('dialog'));
  form.reset();
  state.activeView = 'dashboard';
  renderView();
  toast(`${type === 'income' ? 'Income' : type === 'transfer' ? 'Transfer' : 'Expense'} saved.`);
});

document.getElementById('goal-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const target = Number(data.get('target'));
  const saved = Math.max(0, Number(data.get('saved')) || 0);
  const contribution = Number(data.get('contribution'));
  if (!Number.isFinite(target) || !Number.isFinite(contribution) || target <= 0 || contribution <= 0) { toast('Add a target and monthly contribution greater than zero.'); return; }
  const name = String(data.get('name')).trim();
  state.data.goals.unshift({ id: createId(), name, target, saved: Math.min(saved,target), contribution, icon: '🎯' });
  saveData();
  closeModal(form.closest('dialog'));
  form.reset();
  state.activeView = 'goals';
  renderView();
  toast(`“${name}” goal created.`);
});

document.getElementById('profile-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  state.data.settings.name = String(data.get('name')).trim() || 'Your profile';
  state.data.settings.currency = String(data.get('currency'));
  saveData();
  closeModal(form.closest('dialog'));
  renderView();
  toast('Preferences saved.');
});

saveData();
renderView();

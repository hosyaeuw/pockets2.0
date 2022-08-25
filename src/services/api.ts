const startURL = 'http://localhost:5000/api/';
// TODO: узнать, как startURL сделать правильно
const categories = {
    domain: startURL + 'categories',
    common: '/',
    getWithTransactions: '/transactions-by-categories/',
};

const transactions = {
    domain: startURL + 'transactions',
    common: '/',
    global: '/global/',
    balance: '/balance/',
};

const goals = {
    domain: startURL + 'goals',
    common: '/',
    specific: '/{id}/',
    top: '/top-goals/',
    analytics: '/analytics/',
    finish: '/{id}/finish/',
    invest: '/{id}/invest/',
};

const statistics = {
    domain: startURL + 'statistics',
    monthlyTransaction: '/monthly-transaction',
};

export const api = {
    categories,
    transactions,
    goals,
    statistics,
};

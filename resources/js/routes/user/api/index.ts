import clients from './clients'
import invoices from './invoices'
import products from './products'
import deliveryNotes from './delivery-notes'
import settings from './settings'
import suppliers from './suppliers'
import purchases from './purchases'
import quotes from './quotes'
import expenses from './expenses'
import expenseCategories from './expense-categories'

const api = {
    clients: Object.assign(clients, clients),
    invoices: Object.assign(invoices, invoices),
    products: Object.assign(products, products),
    deliveryNotes: Object.assign(deliveryNotes, deliveryNotes),
    settings: Object.assign(settings, settings),
    suppliers: Object.assign(suppliers, suppliers),
    purchases: Object.assign(purchases, purchases),
    quotes: Object.assign(quotes, quotes),
    expenses: Object.assign(expenses, expenses),
    expenseCategories: Object.assign(expenseCategories, expenseCategories),
}

export default api
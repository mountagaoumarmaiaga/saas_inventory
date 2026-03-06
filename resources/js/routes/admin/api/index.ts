import products from './products'
import users from './users'
import invoices from './invoices'
import payments from './payments'
import expenses from './expenses'
import exports from './exports'
import clients from './clients'
import settings from './settings'
import deliveryNotes from './delivery-notes'
import suppliers from './suppliers'
import purchases from './purchases'
import quotes from './quotes'

const api = {
    products: Object.assign(products, products),
    users: Object.assign(users, users),
    invoices: Object.assign(invoices, invoices),
    payments: Object.assign(payments, payments),
    expenses: Object.assign(expenses, expenses),
    exports: Object.assign(exports, exports),
    clients: Object.assign(clients, clients),
    settings: Object.assign(settings, settings),
    deliveryNotes: Object.assign(deliveryNotes, deliveryNotes),
    suppliers: Object.assign(suppliers, suppliers),
    purchases: Object.assign(purchases, purchases),
    quotes: Object.assign(quotes, quotes),
}

export default api
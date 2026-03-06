import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import reports from './reports'
import categories from './categories'
import subCategories from './sub-categories'
import users from './users'
import stockMovements from './stock-movements'
import invoices from './invoices'
import settings from './settings'
import deliveryNotes from './delivery-notes'
import products from './products'
import purchases from './purchases'
import quotes from './quotes'
import expenses from './expenses'
import expenseCategories from './expense-categories'
import api from './api'
import clients from './clients'
import suppliers from './suppliers'
/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::dashboard
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

const admin = {
    dashboard: Object.assign(dashboard, dashboard),
    reports: Object.assign(reports, reports),
    categories: Object.assign(categories, categories),
    subCategories: Object.assign(subCategories, subCategories),
    users: Object.assign(users, users),
    stockMovements: Object.assign(stockMovements, stockMovements),
    invoices: Object.assign(invoices, invoices),
    settings: Object.assign(settings, settings),
    deliveryNotes: Object.assign(deliveryNotes, deliveryNotes),
    products: Object.assign(products, products),
    purchases: Object.assign(purchases, purchases),
    quotes: Object.assign(quotes, quotes),
    expenses: Object.assign(expenses, expenses),
    expenseCategories: Object.assign(expenseCategories, expenseCategories),
    api: Object.assign(api, api),
    clients: Object.assign(clients, clients),
    suppliers: Object.assign(suppliers, suppliers),
}

export default admin
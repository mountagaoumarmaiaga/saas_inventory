import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AccountingExportController::accounting
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
export const accounting = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accounting.url(options),
    method: 'get',
})

accounting.definition = {
    methods: ["get","head"],
    url: '/admin/api/exports/accounting',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AccountingExportController::accounting
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
accounting.url = (options?: RouteQueryOptions) => {
    return accounting.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccountingExportController::accounting
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
accounting.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accounting.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AccountingExportController::accounting
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
accounting.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: accounting.url(options),
    method: 'head',
})

const exports = {
    accounting: Object.assign(accounting, accounting),
}

export default exports
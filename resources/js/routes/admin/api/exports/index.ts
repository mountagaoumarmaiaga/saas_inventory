import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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

/**
* @see \App\Http\Controllers\AccountingExportController::accounting
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
const accountingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: accounting.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AccountingExportController::accounting
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
accountingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: accounting.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AccountingExportController::accounting
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
accountingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: accounting.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

accounting.form = accountingForm

const exports = {
    accounting: Object.assign(accounting, accounting),
}

export default exports
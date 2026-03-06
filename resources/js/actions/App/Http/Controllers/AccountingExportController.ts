import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AccountingExportController::exportCsv
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
export const exportCsv = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCsv.url(options),
    method: 'get',
})

exportCsv.definition = {
    methods: ["get","head"],
    url: '/admin/api/exports/accounting',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AccountingExportController::exportCsv
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
exportCsv.url = (options?: RouteQueryOptions) => {
    return exportCsv.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AccountingExportController::exportCsv
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
exportCsv.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCsv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AccountingExportController::exportCsv
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
exportCsv.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCsv.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AccountingExportController::exportCsv
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
const exportCsvForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportCsv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AccountingExportController::exportCsv
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
exportCsvForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportCsv.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AccountingExportController::exportCsv
* @see app/Http/Controllers/AccountingExportController.php:14
* @route '/admin/api/exports/accounting'
*/
exportCsvForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportCsv.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportCsv.form = exportCsvForm

const AccountingExportController = { exportCsv }

export default AccountingExportController
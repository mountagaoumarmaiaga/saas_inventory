import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyze
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
export const analyze = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyze.url(options),
    method: 'post',
})

analyze.definition = {
    methods: ["post"],
    url: '/admin/api/expenses/analyze-receipt',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyze
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
analyze.url = (options?: RouteQueryOptions) => {
    return analyze.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyze
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
analyze.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyze.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyze
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
const analyzeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyze.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyze
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
analyzeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyze.url(options),
    method: 'post',
})

analyze.form = analyzeForm

const expenses = {
    analyze: Object.assign(analyze, analyze),
}

export default expenses
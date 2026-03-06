import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
import pdf from './pdf'
/**
* @see \App\Http\Controllers\PaymentController::store
* @see app/Http/Controllers/PaymentController.php:21
* @route '/admin/api/payments'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/api/payments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PaymentController::store
* @see app/Http/Controllers/PaymentController.php:21
* @route '/admin/api/payments'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::store
* @see app/Http/Controllers/PaymentController.php:21
* @route '/admin/api/payments'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PaymentController::destroy
* @see app/Http/Controllers/PaymentController.php:65
* @route '/admin/api/payments/{payment}'
*/
export const destroy = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/api/payments/{payment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PaymentController::destroy
* @see app/Http/Controllers/PaymentController.php:65
* @route '/admin/api/payments/{payment}'
*/
destroy.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { payment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            payment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        payment: typeof args.payment === 'object'
        ? args.payment.id
        : args.payment,
    }

    return destroy.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaymentController::destroy
* @see app/Http/Controllers/PaymentController.php:65
* @route '/admin/api/payments/{payment}'
*/
destroy.delete = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const payments = {
    store: Object.assign(store, store),
    destroy: Object.assign(destroy, destroy),
    pdf: Object.assign(pdf, pdf),
}

export default payments
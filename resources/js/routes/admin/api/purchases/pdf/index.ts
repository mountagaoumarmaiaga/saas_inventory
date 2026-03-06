import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\PurchaseController::view
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
export const view = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/admin/api/purchases/{purchase}/pdf/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::view
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
view.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { purchase: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { purchase: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            purchase: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        purchase: typeof args.purchase === 'object'
        ? args.purchase.id
        : args.purchase,
    }

    return view.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::view
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
view.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::view
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
view.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::download
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
export const download = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/api/purchases/{purchase}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::download
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
download.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { purchase: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { purchase: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            purchase: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        purchase: typeof args.purchase === 'object'
        ? args.purchase.id
        : args.purchase,
    }

    return download.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::download
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
download.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::download
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
download.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

const pdf = {
    view: Object.assign(view, view),
    download: Object.assign(download, download),
}

export default pdf
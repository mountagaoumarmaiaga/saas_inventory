import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\QuoteController::view
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
export const view = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/user/api/quotes/{quote}/pdf/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::view
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
view.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { quote: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { quote: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            quote: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        quote: typeof args.quote === 'object'
        ? args.quote.id
        : args.quote,
    }

    return view.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::view
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
view.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::view
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
view.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::download
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
export const download = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/user/api/quotes/{quote}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::download
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
download.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { quote: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { quote: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            quote: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        quote: typeof args.quote === 'object'
        ? args.quote.id
        : args.quote,
    }

    return download.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::download
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
download.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::download
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
download.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

const pdf = {
    view: Object.assign(view, view),
    download: Object.assign(download, download),
}

export default pdf
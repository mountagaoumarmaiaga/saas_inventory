import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
import pdf from './pdf'
/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/api/quotes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/admin/api/quotes'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/api/quotes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/admin/api/quotes'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/admin/api/quotes'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
export const show = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/api/quotes/{quote}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
show.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
show.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
show.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/admin/api/quotes/{quote}'
*/
export const update = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/api/quotes/{quote}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/admin/api/quotes/{quote}'
*/
update.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/admin/api/quotes/{quote}'
*/
update.put = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/admin/api/quotes/{quote}'
*/
export const destroy = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/api/quotes/{quote}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/admin/api/quotes/{quote}'
*/
destroy.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/admin/api/quotes/{quote}'
*/
destroy.delete = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\QuoteController::convert
* @see app/Http/Controllers/QuoteController.php:199
* @route '/admin/api/quotes/{quote}/convert-to-invoice'
*/
export const convert = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convert.url(args, options),
    method: 'post',
})

convert.definition = {
    methods: ["post"],
    url: '/admin/api/quotes/{quote}/convert-to-invoice',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuoteController::convert
* @see app/Http/Controllers/QuoteController.php:199
* @route '/admin/api/quotes/{quote}/convert-to-invoice'
*/
convert.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return convert.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::convert
* @see app/Http/Controllers/QuoteController.php:199
* @route '/admin/api/quotes/{quote}/convert-to-invoice'
*/
convert.post = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convert.url(args, options),
    method: 'post',
})

const quotes = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    convert: Object.assign(convert, convert),
    pdf: Object.assign(pdf, pdf),
}

export default quotes
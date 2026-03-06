import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
import pdf from './pdf'
/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/api/quotes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user/api/quotes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
export const show = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/api/quotes/{quote}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
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
* @route '/user/api/quotes/{quote}'
*/
show.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
show.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
const showForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
showForm.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
showForm.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/user/api/quotes/{quote}'
*/
export const update = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/user/api/quotes/{quote}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/user/api/quotes/{quote}'
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
* @route '/user/api/quotes/{quote}'
*/
update.put = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/user/api/quotes/{quote}'
*/
const updateForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/user/api/quotes/{quote}'
*/
updateForm.put = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/user/api/quotes/{quote}'
*/
export const destroy = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/user/api/quotes/{quote}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/user/api/quotes/{quote}'
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
* @route '/user/api/quotes/{quote}'
*/
destroy.delete = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/user/api/quotes/{quote}'
*/
const destroyForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/user/api/quotes/{quote}'
*/
destroyForm.delete = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\QuoteController::convert
* @see app/Http/Controllers/QuoteController.php:199
* @route '/user/api/quotes/{quote}/convert-to-invoice'
*/
export const convert = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convert.url(args, options),
    method: 'post',
})

convert.definition = {
    methods: ["post"],
    url: '/user/api/quotes/{quote}/convert-to-invoice',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuoteController::convert
* @see app/Http/Controllers/QuoteController.php:199
* @route '/user/api/quotes/{quote}/convert-to-invoice'
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
* @route '/user/api/quotes/{quote}/convert-to-invoice'
*/
convert.post = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convert.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::convert
* @see app/Http/Controllers/QuoteController.php:199
* @route '/user/api/quotes/{quote}/convert-to-invoice'
*/
const convertForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: convert.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::convert
* @see app/Http/Controllers/QuoteController.php:199
* @route '/user/api/quotes/{quote}/convert-to-invoice'
*/
convertForm.post = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: convert.url(args, options),
    method: 'post',
})

convert.form = convertForm

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
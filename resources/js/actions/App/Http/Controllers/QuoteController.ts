import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
const indexa297460e0936268b3d5e64a48c6aa8f1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa297460e0936268b3d5e64a48c6aa8f1.url(options),
    method: 'get',
})

indexa297460e0936268b3d5e64a48c6aa8f1.definition = {
    methods: ["get","head"],
    url: '/admin/api/quotes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
indexa297460e0936268b3d5e64a48c6aa8f1.url = (options?: RouteQueryOptions) => {
    return indexa297460e0936268b3d5e64a48c6aa8f1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
indexa297460e0936268b3d5e64a48c6aa8f1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa297460e0936268b3d5e64a48c6aa8f1.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
indexa297460e0936268b3d5e64a48c6aa8f1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa297460e0936268b3d5e64a48c6aa8f1.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
const indexa297460e0936268b3d5e64a48c6aa8f1Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa297460e0936268b3d5e64a48c6aa8f1.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
indexa297460e0936268b3d5e64a48c6aa8f1Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa297460e0936268b3d5e64a48c6aa8f1.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/admin/api/quotes'
*/
indexa297460e0936268b3d5e64a48c6aa8f1Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa297460e0936268b3d5e64a48c6aa8f1.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexa297460e0936268b3d5e64a48c6aa8f1.form = indexa297460e0936268b3d5e64a48c6aa8f1Form
/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
const indexe1bbf133729686bb4162828306a1a2b0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe1bbf133729686bb4162828306a1a2b0.url(options),
    method: 'get',
})

indexe1bbf133729686bb4162828306a1a2b0.definition = {
    methods: ["get","head"],
    url: '/user/api/quotes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
indexe1bbf133729686bb4162828306a1a2b0.url = (options?: RouteQueryOptions) => {
    return indexe1bbf133729686bb4162828306a1a2b0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
indexe1bbf133729686bb4162828306a1a2b0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexe1bbf133729686bb4162828306a1a2b0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
indexe1bbf133729686bb4162828306a1a2b0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexe1bbf133729686bb4162828306a1a2b0.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
const indexe1bbf133729686bb4162828306a1a2b0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexe1bbf133729686bb4162828306a1a2b0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
indexe1bbf133729686bb4162828306a1a2b0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexe1bbf133729686bb4162828306a1a2b0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::index
* @see app/Http/Controllers/QuoteController.php:23
* @route '/user/api/quotes'
*/
indexe1bbf133729686bb4162828306a1a2b0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexe1bbf133729686bb4162828306a1a2b0.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexe1bbf133729686bb4162828306a1a2b0.form = indexe1bbf133729686bb4162828306a1a2b0Form

export const index = {
    '/admin/api/quotes': indexa297460e0936268b3d5e64a48c6aa8f1,
    '/user/api/quotes': indexe1bbf133729686bb4162828306a1a2b0,
}

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/admin/api/quotes'
*/
const storea297460e0936268b3d5e64a48c6aa8f1 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea297460e0936268b3d5e64a48c6aa8f1.url(options),
    method: 'post',
})

storea297460e0936268b3d5e64a48c6aa8f1.definition = {
    methods: ["post"],
    url: '/admin/api/quotes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/admin/api/quotes'
*/
storea297460e0936268b3d5e64a48c6aa8f1.url = (options?: RouteQueryOptions) => {
    return storea297460e0936268b3d5e64a48c6aa8f1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/admin/api/quotes'
*/
storea297460e0936268b3d5e64a48c6aa8f1.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea297460e0936268b3d5e64a48c6aa8f1.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/admin/api/quotes'
*/
const storea297460e0936268b3d5e64a48c6aa8f1Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storea297460e0936268b3d5e64a48c6aa8f1.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/admin/api/quotes'
*/
storea297460e0936268b3d5e64a48c6aa8f1Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storea297460e0936268b3d5e64a48c6aa8f1.url(options),
    method: 'post',
})

storea297460e0936268b3d5e64a48c6aa8f1.form = storea297460e0936268b3d5e64a48c6aa8f1Form
/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
const storee1bbf133729686bb4162828306a1a2b0 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storee1bbf133729686bb4162828306a1a2b0.url(options),
    method: 'post',
})

storee1bbf133729686bb4162828306a1a2b0.definition = {
    methods: ["post"],
    url: '/user/api/quotes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
storee1bbf133729686bb4162828306a1a2b0.url = (options?: RouteQueryOptions) => {
    return storee1bbf133729686bb4162828306a1a2b0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
storee1bbf133729686bb4162828306a1a2b0.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storee1bbf133729686bb4162828306a1a2b0.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
const storee1bbf133729686bb4162828306a1a2b0Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storee1bbf133729686bb4162828306a1a2b0.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::store
* @see app/Http/Controllers/QuoteController.php:53
* @route '/user/api/quotes'
*/
storee1bbf133729686bb4162828306a1a2b0Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storee1bbf133729686bb4162828306a1a2b0.url(options),
    method: 'post',
})

storee1bbf133729686bb4162828306a1a2b0.form = storee1bbf133729686bb4162828306a1a2b0Form

export const store = {
    '/admin/api/quotes': storea297460e0936268b3d5e64a48c6aa8f1,
    '/user/api/quotes': storee1bbf133729686bb4162828306a1a2b0,
}

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
const show699e799df2e1d88f16495f8a44404694 = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show699e799df2e1d88f16495f8a44404694.url(args, options),
    method: 'get',
})

show699e799df2e1d88f16495f8a44404694.definition = {
    methods: ["get","head"],
    url: '/admin/api/quotes/{quote}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
show699e799df2e1d88f16495f8a44404694.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show699e799df2e1d88f16495f8a44404694.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
show699e799df2e1d88f16495f8a44404694.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show699e799df2e1d88f16495f8a44404694.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
show699e799df2e1d88f16495f8a44404694.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show699e799df2e1d88f16495f8a44404694.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
const show699e799df2e1d88f16495f8a44404694Form = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show699e799df2e1d88f16495f8a44404694.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
show699e799df2e1d88f16495f8a44404694Form.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show699e799df2e1d88f16495f8a44404694.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/admin/api/quotes/{quote}'
*/
show699e799df2e1d88f16495f8a44404694Form.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show699e799df2e1d88f16495f8a44404694.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show699e799df2e1d88f16495f8a44404694.form = show699e799df2e1d88f16495f8a44404694Form
/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
const show862f14e5b0324079130971bb2575b8cf = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show862f14e5b0324079130971bb2575b8cf.url(args, options),
    method: 'get',
})

show862f14e5b0324079130971bb2575b8cf.definition = {
    methods: ["get","head"],
    url: '/user/api/quotes/{quote}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
show862f14e5b0324079130971bb2575b8cf.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show862f14e5b0324079130971bb2575b8cf.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
show862f14e5b0324079130971bb2575b8cf.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show862f14e5b0324079130971bb2575b8cf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
show862f14e5b0324079130971bb2575b8cf.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show862f14e5b0324079130971bb2575b8cf.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
const show862f14e5b0324079130971bb2575b8cfForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show862f14e5b0324079130971bb2575b8cf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
show862f14e5b0324079130971bb2575b8cfForm.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show862f14e5b0324079130971bb2575b8cf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::show
* @see app/Http/Controllers/QuoteController.php:45
* @route '/user/api/quotes/{quote}'
*/
show862f14e5b0324079130971bb2575b8cfForm.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show862f14e5b0324079130971bb2575b8cf.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show862f14e5b0324079130971bb2575b8cf.form = show862f14e5b0324079130971bb2575b8cfForm

export const show = {
    '/admin/api/quotes/{quote}': show699e799df2e1d88f16495f8a44404694,
    '/user/api/quotes/{quote}': show862f14e5b0324079130971bb2575b8cf,
}

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/admin/api/quotes/{quote}'
*/
const update699e799df2e1d88f16495f8a44404694 = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update699e799df2e1d88f16495f8a44404694.url(args, options),
    method: 'put',
})

update699e799df2e1d88f16495f8a44404694.definition = {
    methods: ["put"],
    url: '/admin/api/quotes/{quote}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/admin/api/quotes/{quote}'
*/
update699e799df2e1d88f16495f8a44404694.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update699e799df2e1d88f16495f8a44404694.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/admin/api/quotes/{quote}'
*/
update699e799df2e1d88f16495f8a44404694.put = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update699e799df2e1d88f16495f8a44404694.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/admin/api/quotes/{quote}'
*/
const update699e799df2e1d88f16495f8a44404694Form = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update699e799df2e1d88f16495f8a44404694.url(args, {
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
* @route '/admin/api/quotes/{quote}'
*/
update699e799df2e1d88f16495f8a44404694Form.put = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update699e799df2e1d88f16495f8a44404694.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update699e799df2e1d88f16495f8a44404694.form = update699e799df2e1d88f16495f8a44404694Form
/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/user/api/quotes/{quote}'
*/
const update862f14e5b0324079130971bb2575b8cf = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update862f14e5b0324079130971bb2575b8cf.url(args, options),
    method: 'put',
})

update862f14e5b0324079130971bb2575b8cf.definition = {
    methods: ["put"],
    url: '/user/api/quotes/{quote}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/user/api/quotes/{quote}'
*/
update862f14e5b0324079130971bb2575b8cf.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update862f14e5b0324079130971bb2575b8cf.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/user/api/quotes/{quote}'
*/
update862f14e5b0324079130971bb2575b8cf.put = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update862f14e5b0324079130971bb2575b8cf.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\QuoteController::update
* @see app/Http/Controllers/QuoteController.php:125
* @route '/user/api/quotes/{quote}'
*/
const update862f14e5b0324079130971bb2575b8cfForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update862f14e5b0324079130971bb2575b8cf.url(args, {
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
update862f14e5b0324079130971bb2575b8cfForm.put = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update862f14e5b0324079130971bb2575b8cf.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update862f14e5b0324079130971bb2575b8cf.form = update862f14e5b0324079130971bb2575b8cfForm

export const update = {
    '/admin/api/quotes/{quote}': update699e799df2e1d88f16495f8a44404694,
    '/user/api/quotes/{quote}': update862f14e5b0324079130971bb2575b8cf,
}

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/admin/api/quotes/{quote}'
*/
const destroy699e799df2e1d88f16495f8a44404694 = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy699e799df2e1d88f16495f8a44404694.url(args, options),
    method: 'delete',
})

destroy699e799df2e1d88f16495f8a44404694.definition = {
    methods: ["delete"],
    url: '/admin/api/quotes/{quote}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/admin/api/quotes/{quote}'
*/
destroy699e799df2e1d88f16495f8a44404694.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy699e799df2e1d88f16495f8a44404694.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/admin/api/quotes/{quote}'
*/
destroy699e799df2e1d88f16495f8a44404694.delete = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy699e799df2e1d88f16495f8a44404694.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/admin/api/quotes/{quote}'
*/
const destroy699e799df2e1d88f16495f8a44404694Form = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy699e799df2e1d88f16495f8a44404694.url(args, {
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
* @route '/admin/api/quotes/{quote}'
*/
destroy699e799df2e1d88f16495f8a44404694Form.delete = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy699e799df2e1d88f16495f8a44404694.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy699e799df2e1d88f16495f8a44404694.form = destroy699e799df2e1d88f16495f8a44404694Form
/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/user/api/quotes/{quote}'
*/
const destroy862f14e5b0324079130971bb2575b8cf = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy862f14e5b0324079130971bb2575b8cf.url(args, options),
    method: 'delete',
})

destroy862f14e5b0324079130971bb2575b8cf.definition = {
    methods: ["delete"],
    url: '/user/api/quotes/{quote}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/user/api/quotes/{quote}'
*/
destroy862f14e5b0324079130971bb2575b8cf.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy862f14e5b0324079130971bb2575b8cf.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/user/api/quotes/{quote}'
*/
destroy862f14e5b0324079130971bb2575b8cf.delete = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy862f14e5b0324079130971bb2575b8cf.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\QuoteController::destroy
* @see app/Http/Controllers/QuoteController.php:192
* @route '/user/api/quotes/{quote}'
*/
const destroy862f14e5b0324079130971bb2575b8cfForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy862f14e5b0324079130971bb2575b8cf.url(args, {
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
destroy862f14e5b0324079130971bb2575b8cfForm.delete = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy862f14e5b0324079130971bb2575b8cf.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy862f14e5b0324079130971bb2575b8cf.form = destroy862f14e5b0324079130971bb2575b8cfForm

export const destroy = {
    '/admin/api/quotes/{quote}': destroy699e799df2e1d88f16495f8a44404694,
    '/user/api/quotes/{quote}': destroy862f14e5b0324079130971bb2575b8cf,
}

/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/admin/api/quotes/{quote}/convert-to-invoice'
*/
const convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe.url(args, options),
    method: 'post',
})

convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe.definition = {
    methods: ["post"],
    url: '/admin/api/quotes/{quote}/convert-to-invoice',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/admin/api/quotes/{quote}/convert-to-invoice'
*/
convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/admin/api/quotes/{quote}/convert-to-invoice'
*/
convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe.post = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/admin/api/quotes/{quote}/convert-to-invoice'
*/
const convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbeForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/admin/api/quotes/{quote}/convert-to-invoice'
*/
convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbeForm.post = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe.url(args, options),
    method: 'post',
})

convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe.form = convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbeForm
/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/user/api/quotes/{quote}/convert-to-invoice'
*/
const convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1 = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1.url(args, options),
    method: 'post',
})

convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1.definition = {
    methods: ["post"],
    url: '/user/api/quotes/{quote}/convert-to-invoice',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/user/api/quotes/{quote}/convert-to-invoice'
*/
convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/user/api/quotes/{quote}/convert-to-invoice'
*/
convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1.post = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/user/api/quotes/{quote}/convert-to-invoice'
*/
const convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1Form = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\QuoteController::convertToInvoice
* @see app/Http/Controllers/QuoteController.php:199
* @route '/user/api/quotes/{quote}/convert-to-invoice'
*/
convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1Form.post = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1.url(args, options),
    method: 'post',
})

convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1.form = convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1Form

export const convertToInvoice = {
    '/admin/api/quotes/{quote}/convert-to-invoice': convertToInvoice876d42b455aef8c91cdaa2cdf5ac9dbe,
    '/user/api/quotes/{quote}/convert-to-invoice': convertToInvoiceb5b021f9965e003cdbbd45f4e5489ed1,
}

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/admin/api/quotes/{quote}/pdf/view'
*/
const streamPdf4df51940996183884e65c085d7e6672a = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamPdf4df51940996183884e65c085d7e6672a.url(args, options),
    method: 'get',
})

streamPdf4df51940996183884e65c085d7e6672a.definition = {
    methods: ["get","head"],
    url: '/admin/api/quotes/{quote}/pdf/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/admin/api/quotes/{quote}/pdf/view'
*/
streamPdf4df51940996183884e65c085d7e6672a.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return streamPdf4df51940996183884e65c085d7e6672a.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/admin/api/quotes/{quote}/pdf/view'
*/
streamPdf4df51940996183884e65c085d7e6672a.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamPdf4df51940996183884e65c085d7e6672a.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/admin/api/quotes/{quote}/pdf/view'
*/
streamPdf4df51940996183884e65c085d7e6672a.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: streamPdf4df51940996183884e65c085d7e6672a.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/admin/api/quotes/{quote}/pdf/view'
*/
const streamPdf4df51940996183884e65c085d7e6672aForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdf4df51940996183884e65c085d7e6672a.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/admin/api/quotes/{quote}/pdf/view'
*/
streamPdf4df51940996183884e65c085d7e6672aForm.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdf4df51940996183884e65c085d7e6672a.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/admin/api/quotes/{quote}/pdf/view'
*/
streamPdf4df51940996183884e65c085d7e6672aForm.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdf4df51940996183884e65c085d7e6672a.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

streamPdf4df51940996183884e65c085d7e6672a.form = streamPdf4df51940996183884e65c085d7e6672aForm
/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
const streamPdf3dc303d1aee30c3e7aae73926e578457 = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamPdf3dc303d1aee30c3e7aae73926e578457.url(args, options),
    method: 'get',
})

streamPdf3dc303d1aee30c3e7aae73926e578457.definition = {
    methods: ["get","head"],
    url: '/user/api/quotes/{quote}/pdf/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
streamPdf3dc303d1aee30c3e7aae73926e578457.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return streamPdf3dc303d1aee30c3e7aae73926e578457.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
streamPdf3dc303d1aee30c3e7aae73926e578457.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamPdf3dc303d1aee30c3e7aae73926e578457.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
streamPdf3dc303d1aee30c3e7aae73926e578457.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: streamPdf3dc303d1aee30c3e7aae73926e578457.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
const streamPdf3dc303d1aee30c3e7aae73926e578457Form = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdf3dc303d1aee30c3e7aae73926e578457.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
streamPdf3dc303d1aee30c3e7aae73926e578457Form.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdf3dc303d1aee30c3e7aae73926e578457.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::streamPdf
* @see app/Http/Controllers/QuoteController.php:243
* @route '/user/api/quotes/{quote}/pdf/view'
*/
streamPdf3dc303d1aee30c3e7aae73926e578457Form.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdf3dc303d1aee30c3e7aae73926e578457.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

streamPdf3dc303d1aee30c3e7aae73926e578457.form = streamPdf3dc303d1aee30c3e7aae73926e578457Form

export const streamPdf = {
    '/admin/api/quotes/{quote}/pdf/view': streamPdf4df51940996183884e65c085d7e6672a,
    '/user/api/quotes/{quote}/pdf/view': streamPdf3dc303d1aee30c3e7aae73926e578457,
}

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/admin/api/quotes/{quote}/pdf/download'
*/
const downloadPdf3fa9ba8dc7135c911e057f368a02d959 = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf3fa9ba8dc7135c911e057f368a02d959.url(args, options),
    method: 'get',
})

downloadPdf3fa9ba8dc7135c911e057f368a02d959.definition = {
    methods: ["get","head"],
    url: '/admin/api/quotes/{quote}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/admin/api/quotes/{quote}/pdf/download'
*/
downloadPdf3fa9ba8dc7135c911e057f368a02d959.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return downloadPdf3fa9ba8dc7135c911e057f368a02d959.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/admin/api/quotes/{quote}/pdf/download'
*/
downloadPdf3fa9ba8dc7135c911e057f368a02d959.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf3fa9ba8dc7135c911e057f368a02d959.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/admin/api/quotes/{quote}/pdf/download'
*/
downloadPdf3fa9ba8dc7135c911e057f368a02d959.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadPdf3fa9ba8dc7135c911e057f368a02d959.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/admin/api/quotes/{quote}/pdf/download'
*/
const downloadPdf3fa9ba8dc7135c911e057f368a02d959Form = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf3fa9ba8dc7135c911e057f368a02d959.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/admin/api/quotes/{quote}/pdf/download'
*/
downloadPdf3fa9ba8dc7135c911e057f368a02d959Form.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf3fa9ba8dc7135c911e057f368a02d959.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/admin/api/quotes/{quote}/pdf/download'
*/
downloadPdf3fa9ba8dc7135c911e057f368a02d959Form.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf3fa9ba8dc7135c911e057f368a02d959.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadPdf3fa9ba8dc7135c911e057f368a02d959.form = downloadPdf3fa9ba8dc7135c911e057f368a02d959Form
/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
const downloadPdf64672e4d164ca9af275a6ce8b261e13b = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf64672e4d164ca9af275a6ce8b261e13b.url(args, options),
    method: 'get',
})

downloadPdf64672e4d164ca9af275a6ce8b261e13b.definition = {
    methods: ["get","head"],
    url: '/user/api/quotes/{quote}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
downloadPdf64672e4d164ca9af275a6ce8b261e13b.url = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return downloadPdf64672e4d164ca9af275a6ce8b261e13b.definition.url
            .replace('{quote}', parsedArgs.quote.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
downloadPdf64672e4d164ca9af275a6ce8b261e13b.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf64672e4d164ca9af275a6ce8b261e13b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
downloadPdf64672e4d164ca9af275a6ce8b261e13b.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadPdf64672e4d164ca9af275a6ce8b261e13b.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
const downloadPdf64672e4d164ca9af275a6ce8b261e13bForm = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf64672e4d164ca9af275a6ce8b261e13b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
downloadPdf64672e4d164ca9af275a6ce8b261e13bForm.get = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf64672e4d164ca9af275a6ce8b261e13b.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\QuoteController::downloadPdf
* @see app/Http/Controllers/QuoteController.php:249
* @route '/user/api/quotes/{quote}/pdf/download'
*/
downloadPdf64672e4d164ca9af275a6ce8b261e13bForm.head = (args: { quote: number | { id: number } } | [quote: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf64672e4d164ca9af275a6ce8b261e13b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadPdf64672e4d164ca9af275a6ce8b261e13b.form = downloadPdf64672e4d164ca9af275a6ce8b261e13bForm

export const downloadPdf = {
    '/admin/api/quotes/{quote}/pdf/download': downloadPdf3fa9ba8dc7135c911e057f368a02d959,
    '/user/api/quotes/{quote}/pdf/download': downloadPdf64672e4d164ca9af275a6ce8b261e13b,
}

const QuoteController = { index, store, show, update, destroy, convertToInvoice, streamPdf, downloadPdf }

export default QuoteController
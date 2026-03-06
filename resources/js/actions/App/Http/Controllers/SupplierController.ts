import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
const indexc8d47752dc944753dae30c90c231c1d1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc8d47752dc944753dae30c90c231c1d1.url(options),
    method: 'get',
})

indexc8d47752dc944753dae30c90c231c1d1.definition = {
    methods: ["get","head"],
    url: '/admin/api/suppliers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
indexc8d47752dc944753dae30c90c231c1d1.url = (options?: RouteQueryOptions) => {
    return indexc8d47752dc944753dae30c90c231c1d1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
indexc8d47752dc944753dae30c90c231c1d1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexc8d47752dc944753dae30c90c231c1d1.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
indexc8d47752dc944753dae30c90c231c1d1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexc8d47752dc944753dae30c90c231c1d1.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
const indexc8d47752dc944753dae30c90c231c1d1Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexc8d47752dc944753dae30c90c231c1d1.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
indexc8d47752dc944753dae30c90c231c1d1Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexc8d47752dc944753dae30c90c231c1d1.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
indexc8d47752dc944753dae30c90c231c1d1Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexc8d47752dc944753dae30c90c231c1d1.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexc8d47752dc944753dae30c90c231c1d1.form = indexc8d47752dc944753dae30c90c231c1d1Form
/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/user/api/suppliers'
*/
const index6245c640b99b105bd6fb1f8652869359 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6245c640b99b105bd6fb1f8652869359.url(options),
    method: 'get',
})

index6245c640b99b105bd6fb1f8652869359.definition = {
    methods: ["get","head"],
    url: '/user/api/suppliers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/user/api/suppliers'
*/
index6245c640b99b105bd6fb1f8652869359.url = (options?: RouteQueryOptions) => {
    return index6245c640b99b105bd6fb1f8652869359.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/user/api/suppliers'
*/
index6245c640b99b105bd6fb1f8652869359.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index6245c640b99b105bd6fb1f8652869359.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/user/api/suppliers'
*/
index6245c640b99b105bd6fb1f8652869359.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index6245c640b99b105bd6fb1f8652869359.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/user/api/suppliers'
*/
const index6245c640b99b105bd6fb1f8652869359Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index6245c640b99b105bd6fb1f8652869359.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/user/api/suppliers'
*/
index6245c640b99b105bd6fb1f8652869359Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index6245c640b99b105bd6fb1f8652869359.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/user/api/suppliers'
*/
index6245c640b99b105bd6fb1f8652869359Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index6245c640b99b105bd6fb1f8652869359.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index6245c640b99b105bd6fb1f8652869359.form = index6245c640b99b105bd6fb1f8652869359Form

export const index = {
    '/admin/api/suppliers': indexc8d47752dc944753dae30c90c231c1d1,
    '/user/api/suppliers': index6245c640b99b105bd6fb1f8652869359,
}

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
const list390e9a8239fcd169b913395e1f23507b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list390e9a8239fcd169b913395e1f23507b.url(options),
    method: 'get',
})

list390e9a8239fcd169b913395e1f23507b.definition = {
    methods: ["get","head"],
    url: '/admin/api/suppliers/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
list390e9a8239fcd169b913395e1f23507b.url = (options?: RouteQueryOptions) => {
    return list390e9a8239fcd169b913395e1f23507b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
list390e9a8239fcd169b913395e1f23507b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list390e9a8239fcd169b913395e1f23507b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
list390e9a8239fcd169b913395e1f23507b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list390e9a8239fcd169b913395e1f23507b.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
const list390e9a8239fcd169b913395e1f23507bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list390e9a8239fcd169b913395e1f23507b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
list390e9a8239fcd169b913395e1f23507bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list390e9a8239fcd169b913395e1f23507b.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
list390e9a8239fcd169b913395e1f23507bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list390e9a8239fcd169b913395e1f23507b.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

list390e9a8239fcd169b913395e1f23507b.form = list390e9a8239fcd169b913395e1f23507bForm
/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/user/api/suppliers/list'
*/
const liste2702efabf3bdee49cfb4ba322f39ce4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: liste2702efabf3bdee49cfb4ba322f39ce4.url(options),
    method: 'get',
})

liste2702efabf3bdee49cfb4ba322f39ce4.definition = {
    methods: ["get","head"],
    url: '/user/api/suppliers/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/user/api/suppliers/list'
*/
liste2702efabf3bdee49cfb4ba322f39ce4.url = (options?: RouteQueryOptions) => {
    return liste2702efabf3bdee49cfb4ba322f39ce4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/user/api/suppliers/list'
*/
liste2702efabf3bdee49cfb4ba322f39ce4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: liste2702efabf3bdee49cfb4ba322f39ce4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/user/api/suppliers/list'
*/
liste2702efabf3bdee49cfb4ba322f39ce4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: liste2702efabf3bdee49cfb4ba322f39ce4.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/user/api/suppliers/list'
*/
const liste2702efabf3bdee49cfb4ba322f39ce4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: liste2702efabf3bdee49cfb4ba322f39ce4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/user/api/suppliers/list'
*/
liste2702efabf3bdee49cfb4ba322f39ce4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: liste2702efabf3bdee49cfb4ba322f39ce4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/user/api/suppliers/list'
*/
liste2702efabf3bdee49cfb4ba322f39ce4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: liste2702efabf3bdee49cfb4ba322f39ce4.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

liste2702efabf3bdee49cfb4ba322f39ce4.form = liste2702efabf3bdee49cfb4ba322f39ce4Form

export const list = {
    '/admin/api/suppliers/list': list390e9a8239fcd169b913395e1f23507b,
    '/user/api/suppliers/list': liste2702efabf3bdee49cfb4ba322f39ce4,
}

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/admin/api/suppliers'
*/
const storec8d47752dc944753dae30c90c231c1d1 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storec8d47752dc944753dae30c90c231c1d1.url(options),
    method: 'post',
})

storec8d47752dc944753dae30c90c231c1d1.definition = {
    methods: ["post"],
    url: '/admin/api/suppliers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/admin/api/suppliers'
*/
storec8d47752dc944753dae30c90c231c1d1.url = (options?: RouteQueryOptions) => {
    return storec8d47752dc944753dae30c90c231c1d1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/admin/api/suppliers'
*/
storec8d47752dc944753dae30c90c231c1d1.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storec8d47752dc944753dae30c90c231c1d1.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/admin/api/suppliers'
*/
const storec8d47752dc944753dae30c90c231c1d1Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storec8d47752dc944753dae30c90c231c1d1.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/admin/api/suppliers'
*/
storec8d47752dc944753dae30c90c231c1d1Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storec8d47752dc944753dae30c90c231c1d1.url(options),
    method: 'post',
})

storec8d47752dc944753dae30c90c231c1d1.form = storec8d47752dc944753dae30c90c231c1d1Form
/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/user/api/suppliers'
*/
const store6245c640b99b105bd6fb1f8652869359 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6245c640b99b105bd6fb1f8652869359.url(options),
    method: 'post',
})

store6245c640b99b105bd6fb1f8652869359.definition = {
    methods: ["post"],
    url: '/user/api/suppliers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/user/api/suppliers'
*/
store6245c640b99b105bd6fb1f8652869359.url = (options?: RouteQueryOptions) => {
    return store6245c640b99b105bd6fb1f8652869359.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/user/api/suppliers'
*/
store6245c640b99b105bd6fb1f8652869359.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6245c640b99b105bd6fb1f8652869359.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/user/api/suppliers'
*/
const store6245c640b99b105bd6fb1f8652869359Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store6245c640b99b105bd6fb1f8652869359.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/user/api/suppliers'
*/
store6245c640b99b105bd6fb1f8652869359Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store6245c640b99b105bd6fb1f8652869359.url(options),
    method: 'post',
})

store6245c640b99b105bd6fb1f8652869359.form = store6245c640b99b105bd6fb1f8652869359Form

export const store = {
    '/admin/api/suppliers': storec8d47752dc944753dae30c90c231c1d1,
    '/user/api/suppliers': store6245c640b99b105bd6fb1f8652869359,
}

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
const show0d22a551dbfa8d473add9a023cdeb6ae = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0d22a551dbfa8d473add9a023cdeb6ae.url(args, options),
    method: 'get',
})

show0d22a551dbfa8d473add9a023cdeb6ae.definition = {
    methods: ["get","head"],
    url: '/admin/api/suppliers/{supplier}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
show0d22a551dbfa8d473add9a023cdeb6ae.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supplier: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { supplier: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            supplier: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        supplier: typeof args.supplier === 'object'
        ? args.supplier.id
        : args.supplier,
    }

    return show0d22a551dbfa8d473add9a023cdeb6ae.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
show0d22a551dbfa8d473add9a023cdeb6ae.get = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show0d22a551dbfa8d473add9a023cdeb6ae.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
show0d22a551dbfa8d473add9a023cdeb6ae.head = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show0d22a551dbfa8d473add9a023cdeb6ae.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
const show0d22a551dbfa8d473add9a023cdeb6aeForm = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show0d22a551dbfa8d473add9a023cdeb6ae.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
show0d22a551dbfa8d473add9a023cdeb6aeForm.get = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show0d22a551dbfa8d473add9a023cdeb6ae.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
show0d22a551dbfa8d473add9a023cdeb6aeForm.head = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show0d22a551dbfa8d473add9a023cdeb6ae.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show0d22a551dbfa8d473add9a023cdeb6ae.form = show0d22a551dbfa8d473add9a023cdeb6aeForm
/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/user/api/suppliers/{supplier}'
*/
const show44c0198a5c68b734b0f11c8a8f9358c4 = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show44c0198a5c68b734b0f11c8a8f9358c4.url(args, options),
    method: 'get',
})

show44c0198a5c68b734b0f11c8a8f9358c4.definition = {
    methods: ["get","head"],
    url: '/user/api/suppliers/{supplier}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/user/api/suppliers/{supplier}'
*/
show44c0198a5c68b734b0f11c8a8f9358c4.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supplier: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { supplier: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            supplier: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        supplier: typeof args.supplier === 'object'
        ? args.supplier.id
        : args.supplier,
    }

    return show44c0198a5c68b734b0f11c8a8f9358c4.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/user/api/suppliers/{supplier}'
*/
show44c0198a5c68b734b0f11c8a8f9358c4.get = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show44c0198a5c68b734b0f11c8a8f9358c4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/user/api/suppliers/{supplier}'
*/
show44c0198a5c68b734b0f11c8a8f9358c4.head = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show44c0198a5c68b734b0f11c8a8f9358c4.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/user/api/suppliers/{supplier}'
*/
const show44c0198a5c68b734b0f11c8a8f9358c4Form = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show44c0198a5c68b734b0f11c8a8f9358c4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/user/api/suppliers/{supplier}'
*/
show44c0198a5c68b734b0f11c8a8f9358c4Form.get = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show44c0198a5c68b734b0f11c8a8f9358c4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/user/api/suppliers/{supplier}'
*/
show44c0198a5c68b734b0f11c8a8f9358c4Form.head = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show44c0198a5c68b734b0f11c8a8f9358c4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show44c0198a5c68b734b0f11c8a8f9358c4.form = show44c0198a5c68b734b0f11c8a8f9358c4Form

export const show = {
    '/admin/api/suppliers/{supplier}': show0d22a551dbfa8d473add9a023cdeb6ae,
    '/user/api/suppliers/{supplier}': show44c0198a5c68b734b0f11c8a8f9358c4,
}

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/admin/api/suppliers/{supplier}'
*/
const update0d22a551dbfa8d473add9a023cdeb6ae = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update0d22a551dbfa8d473add9a023cdeb6ae.url(args, options),
    method: 'put',
})

update0d22a551dbfa8d473add9a023cdeb6ae.definition = {
    methods: ["put"],
    url: '/admin/api/suppliers/{supplier}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/admin/api/suppliers/{supplier}'
*/
update0d22a551dbfa8d473add9a023cdeb6ae.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supplier: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { supplier: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            supplier: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        supplier: typeof args.supplier === 'object'
        ? args.supplier.id
        : args.supplier,
    }

    return update0d22a551dbfa8d473add9a023cdeb6ae.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/admin/api/suppliers/{supplier}'
*/
update0d22a551dbfa8d473add9a023cdeb6ae.put = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update0d22a551dbfa8d473add9a023cdeb6ae.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/admin/api/suppliers/{supplier}'
*/
const update0d22a551dbfa8d473add9a023cdeb6aeForm = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update0d22a551dbfa8d473add9a023cdeb6ae.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/admin/api/suppliers/{supplier}'
*/
update0d22a551dbfa8d473add9a023cdeb6aeForm.put = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update0d22a551dbfa8d473add9a023cdeb6ae.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update0d22a551dbfa8d473add9a023cdeb6ae.form = update0d22a551dbfa8d473add9a023cdeb6aeForm
/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/user/api/suppliers/{supplier}'
*/
const update44c0198a5c68b734b0f11c8a8f9358c4 = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update44c0198a5c68b734b0f11c8a8f9358c4.url(args, options),
    method: 'put',
})

update44c0198a5c68b734b0f11c8a8f9358c4.definition = {
    methods: ["put"],
    url: '/user/api/suppliers/{supplier}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/user/api/suppliers/{supplier}'
*/
update44c0198a5c68b734b0f11c8a8f9358c4.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supplier: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { supplier: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            supplier: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        supplier: typeof args.supplier === 'object'
        ? args.supplier.id
        : args.supplier,
    }

    return update44c0198a5c68b734b0f11c8a8f9358c4.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/user/api/suppliers/{supplier}'
*/
update44c0198a5c68b734b0f11c8a8f9358c4.put = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update44c0198a5c68b734b0f11c8a8f9358c4.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/user/api/suppliers/{supplier}'
*/
const update44c0198a5c68b734b0f11c8a8f9358c4Form = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update44c0198a5c68b734b0f11c8a8f9358c4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/user/api/suppliers/{supplier}'
*/
update44c0198a5c68b734b0f11c8a8f9358c4Form.put = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update44c0198a5c68b734b0f11c8a8f9358c4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update44c0198a5c68b734b0f11c8a8f9358c4.form = update44c0198a5c68b734b0f11c8a8f9358c4Form

export const update = {
    '/admin/api/suppliers/{supplier}': update0d22a551dbfa8d473add9a023cdeb6ae,
    '/user/api/suppliers/{supplier}': update44c0198a5c68b734b0f11c8a8f9358c4,
}

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/admin/api/suppliers/{supplier}'
*/
const destroy0d22a551dbfa8d473add9a023cdeb6ae = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy0d22a551dbfa8d473add9a023cdeb6ae.url(args, options),
    method: 'delete',
})

destroy0d22a551dbfa8d473add9a023cdeb6ae.definition = {
    methods: ["delete"],
    url: '/admin/api/suppliers/{supplier}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/admin/api/suppliers/{supplier}'
*/
destroy0d22a551dbfa8d473add9a023cdeb6ae.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supplier: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { supplier: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            supplier: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        supplier: typeof args.supplier === 'object'
        ? args.supplier.id
        : args.supplier,
    }

    return destroy0d22a551dbfa8d473add9a023cdeb6ae.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/admin/api/suppliers/{supplier}'
*/
destroy0d22a551dbfa8d473add9a023cdeb6ae.delete = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy0d22a551dbfa8d473add9a023cdeb6ae.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/admin/api/suppliers/{supplier}'
*/
const destroy0d22a551dbfa8d473add9a023cdeb6aeForm = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy0d22a551dbfa8d473add9a023cdeb6ae.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/admin/api/suppliers/{supplier}'
*/
destroy0d22a551dbfa8d473add9a023cdeb6aeForm.delete = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy0d22a551dbfa8d473add9a023cdeb6ae.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy0d22a551dbfa8d473add9a023cdeb6ae.form = destroy0d22a551dbfa8d473add9a023cdeb6aeForm
/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/user/api/suppliers/{supplier}'
*/
const destroy44c0198a5c68b734b0f11c8a8f9358c4 = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy44c0198a5c68b734b0f11c8a8f9358c4.url(args, options),
    method: 'delete',
})

destroy44c0198a5c68b734b0f11c8a8f9358c4.definition = {
    methods: ["delete"],
    url: '/user/api/suppliers/{supplier}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/user/api/suppliers/{supplier}'
*/
destroy44c0198a5c68b734b0f11c8a8f9358c4.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { supplier: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { supplier: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            supplier: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        supplier: typeof args.supplier === 'object'
        ? args.supplier.id
        : args.supplier,
    }

    return destroy44c0198a5c68b734b0f11c8a8f9358c4.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/user/api/suppliers/{supplier}'
*/
destroy44c0198a5c68b734b0f11c8a8f9358c4.delete = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy44c0198a5c68b734b0f11c8a8f9358c4.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/user/api/suppliers/{supplier}'
*/
const destroy44c0198a5c68b734b0f11c8a8f9358c4Form = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy44c0198a5c68b734b0f11c8a8f9358c4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/user/api/suppliers/{supplier}'
*/
destroy44c0198a5c68b734b0f11c8a8f9358c4Form.delete = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy44c0198a5c68b734b0f11c8a8f9358c4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy44c0198a5c68b734b0f11c8a8f9358c4.form = destroy44c0198a5c68b734b0f11c8a8f9358c4Form

export const destroy = {
    '/admin/api/suppliers/{supplier}': destroy0d22a551dbfa8d473add9a023cdeb6ae,
    '/user/api/suppliers/{supplier}': destroy44c0198a5c68b734b0f11c8a8f9358c4,
}

const SupplierController = { index, list, store, show, update, destroy }

export default SupplierController
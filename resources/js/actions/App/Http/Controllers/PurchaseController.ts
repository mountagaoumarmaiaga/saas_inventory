import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/admin/api/purchases'
*/
const indexf40bf6a303b6a22c809d0ce17ae1328c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf40bf6a303b6a22c809d0ce17ae1328c.url(options),
    method: 'get',
})

indexf40bf6a303b6a22c809d0ce17ae1328c.definition = {
    methods: ["get","head"],
    url: '/admin/api/purchases',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/admin/api/purchases'
*/
indexf40bf6a303b6a22c809d0ce17ae1328c.url = (options?: RouteQueryOptions) => {
    return indexf40bf6a303b6a22c809d0ce17ae1328c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/admin/api/purchases'
*/
indexf40bf6a303b6a22c809d0ce17ae1328c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf40bf6a303b6a22c809d0ce17ae1328c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/admin/api/purchases'
*/
indexf40bf6a303b6a22c809d0ce17ae1328c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexf40bf6a303b6a22c809d0ce17ae1328c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/admin/api/purchases'
*/
const indexf40bf6a303b6a22c809d0ce17ae1328cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexf40bf6a303b6a22c809d0ce17ae1328c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/admin/api/purchases'
*/
indexf40bf6a303b6a22c809d0ce17ae1328cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexf40bf6a303b6a22c809d0ce17ae1328c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/admin/api/purchases'
*/
indexf40bf6a303b6a22c809d0ce17ae1328cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexf40bf6a303b6a22c809d0ce17ae1328c.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexf40bf6a303b6a22c809d0ce17ae1328c.form = indexf40bf6a303b6a22c809d0ce17ae1328cForm
/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
const indexb02c6b8a7215c204dfd60082e050a504 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb02c6b8a7215c204dfd60082e050a504.url(options),
    method: 'get',
})

indexb02c6b8a7215c204dfd60082e050a504.definition = {
    methods: ["get","head"],
    url: '/user/api/purchases',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
indexb02c6b8a7215c204dfd60082e050a504.url = (options?: RouteQueryOptions) => {
    return indexb02c6b8a7215c204dfd60082e050a504.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
indexb02c6b8a7215c204dfd60082e050a504.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb02c6b8a7215c204dfd60082e050a504.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
indexb02c6b8a7215c204dfd60082e050a504.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexb02c6b8a7215c204dfd60082e050a504.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
const indexb02c6b8a7215c204dfd60082e050a504Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb02c6b8a7215c204dfd60082e050a504.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
indexb02c6b8a7215c204dfd60082e050a504Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb02c6b8a7215c204dfd60082e050a504.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
indexb02c6b8a7215c204dfd60082e050a504Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb02c6b8a7215c204dfd60082e050a504.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexb02c6b8a7215c204dfd60082e050a504.form = indexb02c6b8a7215c204dfd60082e050a504Form

export const index = {
    '/admin/api/purchases': indexf40bf6a303b6a22c809d0ce17ae1328c,
    '/user/api/purchases': indexb02c6b8a7215c204dfd60082e050a504,
}

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/admin/api/purchases'
*/
const storef40bf6a303b6a22c809d0ce17ae1328c = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storef40bf6a303b6a22c809d0ce17ae1328c.url(options),
    method: 'post',
})

storef40bf6a303b6a22c809d0ce17ae1328c.definition = {
    methods: ["post"],
    url: '/admin/api/purchases',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/admin/api/purchases'
*/
storef40bf6a303b6a22c809d0ce17ae1328c.url = (options?: RouteQueryOptions) => {
    return storef40bf6a303b6a22c809d0ce17ae1328c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/admin/api/purchases'
*/
storef40bf6a303b6a22c809d0ce17ae1328c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storef40bf6a303b6a22c809d0ce17ae1328c.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/admin/api/purchases'
*/
const storef40bf6a303b6a22c809d0ce17ae1328cForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storef40bf6a303b6a22c809d0ce17ae1328c.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/admin/api/purchases'
*/
storef40bf6a303b6a22c809d0ce17ae1328cForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storef40bf6a303b6a22c809d0ce17ae1328c.url(options),
    method: 'post',
})

storef40bf6a303b6a22c809d0ce17ae1328c.form = storef40bf6a303b6a22c809d0ce17ae1328cForm
/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/user/api/purchases'
*/
const storeb02c6b8a7215c204dfd60082e050a504 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb02c6b8a7215c204dfd60082e050a504.url(options),
    method: 'post',
})

storeb02c6b8a7215c204dfd60082e050a504.definition = {
    methods: ["post"],
    url: '/user/api/purchases',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/user/api/purchases'
*/
storeb02c6b8a7215c204dfd60082e050a504.url = (options?: RouteQueryOptions) => {
    return storeb02c6b8a7215c204dfd60082e050a504.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/user/api/purchases'
*/
storeb02c6b8a7215c204dfd60082e050a504.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb02c6b8a7215c204dfd60082e050a504.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/user/api/purchases'
*/
const storeb02c6b8a7215c204dfd60082e050a504Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb02c6b8a7215c204dfd60082e050a504.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/user/api/purchases'
*/
storeb02c6b8a7215c204dfd60082e050a504Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb02c6b8a7215c204dfd60082e050a504.url(options),
    method: 'post',
})

storeb02c6b8a7215c204dfd60082e050a504.form = storeb02c6b8a7215c204dfd60082e050a504Form

export const store = {
    '/admin/api/purchases': storef40bf6a303b6a22c809d0ce17ae1328c,
    '/user/api/purchases': storeb02c6b8a7215c204dfd60082e050a504,
}

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/admin/api/purchases/{purchase}'
*/
const show3a6c4e4692eb2fd8ba45a51bc042e395 = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show3a6c4e4692eb2fd8ba45a51bc042e395.url(args, options),
    method: 'get',
})

show3a6c4e4692eb2fd8ba45a51bc042e395.definition = {
    methods: ["get","head"],
    url: '/admin/api/purchases/{purchase}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/admin/api/purchases/{purchase}'
*/
show3a6c4e4692eb2fd8ba45a51bc042e395.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show3a6c4e4692eb2fd8ba45a51bc042e395.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/admin/api/purchases/{purchase}'
*/
show3a6c4e4692eb2fd8ba45a51bc042e395.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show3a6c4e4692eb2fd8ba45a51bc042e395.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/admin/api/purchases/{purchase}'
*/
show3a6c4e4692eb2fd8ba45a51bc042e395.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show3a6c4e4692eb2fd8ba45a51bc042e395.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/admin/api/purchases/{purchase}'
*/
const show3a6c4e4692eb2fd8ba45a51bc042e395Form = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show3a6c4e4692eb2fd8ba45a51bc042e395.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/admin/api/purchases/{purchase}'
*/
show3a6c4e4692eb2fd8ba45a51bc042e395Form.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show3a6c4e4692eb2fd8ba45a51bc042e395.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/admin/api/purchases/{purchase}'
*/
show3a6c4e4692eb2fd8ba45a51bc042e395Form.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show3a6c4e4692eb2fd8ba45a51bc042e395.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show3a6c4e4692eb2fd8ba45a51bc042e395.form = show3a6c4e4692eb2fd8ba45a51bc042e395Form
/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
const show86ac2c4d5e5da0cc7fc764cb01fa82ce = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, options),
    method: 'get',
})

show86ac2c4d5e5da0cc7fc764cb01fa82ce.definition = {
    methods: ["get","head"],
    url: '/user/api/purchases/{purchase}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
show86ac2c4d5e5da0cc7fc764cb01fa82ce.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show86ac2c4d5e5da0cc7fc764cb01fa82ce.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
show86ac2c4d5e5da0cc7fc764cb01fa82ce.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
show86ac2c4d5e5da0cc7fc764cb01fa82ce.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
const show86ac2c4d5e5da0cc7fc764cb01fa82ceForm = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
show86ac2c4d5e5da0cc7fc764cb01fa82ceForm.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
show86ac2c4d5e5da0cc7fc764cb01fa82ceForm.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show86ac2c4d5e5da0cc7fc764cb01fa82ce.form = show86ac2c4d5e5da0cc7fc764cb01fa82ceForm

export const show = {
    '/admin/api/purchases/{purchase}': show3a6c4e4692eb2fd8ba45a51bc042e395,
    '/user/api/purchases/{purchase}': show86ac2c4d5e5da0cc7fc764cb01fa82ce,
}

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/admin/api/purchases/{purchase}'
*/
const update3a6c4e4692eb2fd8ba45a51bc042e395 = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3a6c4e4692eb2fd8ba45a51bc042e395.url(args, options),
    method: 'put',
})

update3a6c4e4692eb2fd8ba45a51bc042e395.definition = {
    methods: ["put"],
    url: '/admin/api/purchases/{purchase}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/admin/api/purchases/{purchase}'
*/
update3a6c4e4692eb2fd8ba45a51bc042e395.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update3a6c4e4692eb2fd8ba45a51bc042e395.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/admin/api/purchases/{purchase}'
*/
update3a6c4e4692eb2fd8ba45a51bc042e395.put = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update3a6c4e4692eb2fd8ba45a51bc042e395.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/admin/api/purchases/{purchase}'
*/
const update3a6c4e4692eb2fd8ba45a51bc042e395Form = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update3a6c4e4692eb2fd8ba45a51bc042e395.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/admin/api/purchases/{purchase}'
*/
update3a6c4e4692eb2fd8ba45a51bc042e395Form.put = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update3a6c4e4692eb2fd8ba45a51bc042e395.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update3a6c4e4692eb2fd8ba45a51bc042e395.form = update3a6c4e4692eb2fd8ba45a51bc042e395Form
/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/user/api/purchases/{purchase}'
*/
const update86ac2c4d5e5da0cc7fc764cb01fa82ce = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, options),
    method: 'put',
})

update86ac2c4d5e5da0cc7fc764cb01fa82ce.definition = {
    methods: ["put"],
    url: '/user/api/purchases/{purchase}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/user/api/purchases/{purchase}'
*/
update86ac2c4d5e5da0cc7fc764cb01fa82ce.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update86ac2c4d5e5da0cc7fc764cb01fa82ce.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/user/api/purchases/{purchase}'
*/
update86ac2c4d5e5da0cc7fc764cb01fa82ce.put = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/user/api/purchases/{purchase}'
*/
const update86ac2c4d5e5da0cc7fc764cb01fa82ceForm = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/user/api/purchases/{purchase}'
*/
update86ac2c4d5e5da0cc7fc764cb01fa82ceForm.put = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update86ac2c4d5e5da0cc7fc764cb01fa82ce.form = update86ac2c4d5e5da0cc7fc764cb01fa82ceForm

export const update = {
    '/admin/api/purchases/{purchase}': update3a6c4e4692eb2fd8ba45a51bc042e395,
    '/user/api/purchases/{purchase}': update86ac2c4d5e5da0cc7fc764cb01fa82ce,
}

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/admin/api/purchases/{purchase}'
*/
const destroy3a6c4e4692eb2fd8ba45a51bc042e395 = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3a6c4e4692eb2fd8ba45a51bc042e395.url(args, options),
    method: 'delete',
})

destroy3a6c4e4692eb2fd8ba45a51bc042e395.definition = {
    methods: ["delete"],
    url: '/admin/api/purchases/{purchase}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/admin/api/purchases/{purchase}'
*/
destroy3a6c4e4692eb2fd8ba45a51bc042e395.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy3a6c4e4692eb2fd8ba45a51bc042e395.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/admin/api/purchases/{purchase}'
*/
destroy3a6c4e4692eb2fd8ba45a51bc042e395.delete = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy3a6c4e4692eb2fd8ba45a51bc042e395.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/admin/api/purchases/{purchase}'
*/
const destroy3a6c4e4692eb2fd8ba45a51bc042e395Form = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy3a6c4e4692eb2fd8ba45a51bc042e395.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/admin/api/purchases/{purchase}'
*/
destroy3a6c4e4692eb2fd8ba45a51bc042e395Form.delete = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy3a6c4e4692eb2fd8ba45a51bc042e395.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy3a6c4e4692eb2fd8ba45a51bc042e395.form = destroy3a6c4e4692eb2fd8ba45a51bc042e395Form
/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/user/api/purchases/{purchase}'
*/
const destroy86ac2c4d5e5da0cc7fc764cb01fa82ce = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, options),
    method: 'delete',
})

destroy86ac2c4d5e5da0cc7fc764cb01fa82ce.definition = {
    methods: ["delete"],
    url: '/user/api/purchases/{purchase}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/user/api/purchases/{purchase}'
*/
destroy86ac2c4d5e5da0cc7fc764cb01fa82ce.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy86ac2c4d5e5da0cc7fc764cb01fa82ce.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/user/api/purchases/{purchase}'
*/
destroy86ac2c4d5e5da0cc7fc764cb01fa82ce.delete = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/user/api/purchases/{purchase}'
*/
const destroy86ac2c4d5e5da0cc7fc764cb01fa82ceForm = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/user/api/purchases/{purchase}'
*/
destroy86ac2c4d5e5da0cc7fc764cb01fa82ceForm.delete = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy86ac2c4d5e5da0cc7fc764cb01fa82ce.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy86ac2c4d5e5da0cc7fc764cb01fa82ce.form = destroy86ac2c4d5e5da0cc7fc764cb01fa82ceForm

export const destroy = {
    '/admin/api/purchases/{purchase}': destroy3a6c4e4692eb2fd8ba45a51bc042e395,
    '/user/api/purchases/{purchase}': destroy86ac2c4d5e5da0cc7fc764cb01fa82ce,
}

/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/admin/api/purchases/{purchase}/mark-ordered'
*/
const markAsOrderedc54c74f9b4a05eb20987546d3170d4b1 = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsOrderedc54c74f9b4a05eb20987546d3170d4b1.url(args, options),
    method: 'post',
})

markAsOrderedc54c74f9b4a05eb20987546d3170d4b1.definition = {
    methods: ["post"],
    url: '/admin/api/purchases/{purchase}/mark-ordered',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/admin/api/purchases/{purchase}/mark-ordered'
*/
markAsOrderedc54c74f9b4a05eb20987546d3170d4b1.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markAsOrderedc54c74f9b4a05eb20987546d3170d4b1.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/admin/api/purchases/{purchase}/mark-ordered'
*/
markAsOrderedc54c74f9b4a05eb20987546d3170d4b1.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsOrderedc54c74f9b4a05eb20987546d3170d4b1.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/admin/api/purchases/{purchase}/mark-ordered'
*/
const markAsOrderedc54c74f9b4a05eb20987546d3170d4b1Form = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsOrderedc54c74f9b4a05eb20987546d3170d4b1.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/admin/api/purchases/{purchase}/mark-ordered'
*/
markAsOrderedc54c74f9b4a05eb20987546d3170d4b1Form.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsOrderedc54c74f9b4a05eb20987546d3170d4b1.url(args, options),
    method: 'post',
})

markAsOrderedc54c74f9b4a05eb20987546d3170d4b1.form = markAsOrderedc54c74f9b4a05eb20987546d3170d4b1Form
/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/user/api/purchases/{purchase}/mark-ordered'
*/
const markAsOrderedfa6d2bf35947e2c611e440962db817ca = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsOrderedfa6d2bf35947e2c611e440962db817ca.url(args, options),
    method: 'post',
})

markAsOrderedfa6d2bf35947e2c611e440962db817ca.definition = {
    methods: ["post"],
    url: '/user/api/purchases/{purchase}/mark-ordered',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/user/api/purchases/{purchase}/mark-ordered'
*/
markAsOrderedfa6d2bf35947e2c611e440962db817ca.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markAsOrderedfa6d2bf35947e2c611e440962db817ca.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/user/api/purchases/{purchase}/mark-ordered'
*/
markAsOrderedfa6d2bf35947e2c611e440962db817ca.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsOrderedfa6d2bf35947e2c611e440962db817ca.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/user/api/purchases/{purchase}/mark-ordered'
*/
const markAsOrderedfa6d2bf35947e2c611e440962db817caForm = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsOrderedfa6d2bf35947e2c611e440962db817ca.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::markAsOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/user/api/purchases/{purchase}/mark-ordered'
*/
markAsOrderedfa6d2bf35947e2c611e440962db817caForm.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsOrderedfa6d2bf35947e2c611e440962db817ca.url(args, options),
    method: 'post',
})

markAsOrderedfa6d2bf35947e2c611e440962db817ca.form = markAsOrderedfa6d2bf35947e2c611e440962db817caForm

export const markAsOrdered = {
    '/admin/api/purchases/{purchase}/mark-ordered': markAsOrderedc54c74f9b4a05eb20987546d3170d4b1,
    '/user/api/purchases/{purchase}/mark-ordered': markAsOrderedfa6d2bf35947e2c611e440962db817ca,
}

/**
* @see \App\Http\Controllers\PurchaseController::cancel
* @see app/Http/Controllers/PurchaseController.php:228
* @route '/admin/api/purchases/{purchase}/cancel'
*/
export const cancel = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/admin/api/purchases/{purchase}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::cancel
* @see app/Http/Controllers/PurchaseController.php:228
* @route '/admin/api/purchases/{purchase}/cancel'
*/
cancel.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return cancel.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::cancel
* @see app/Http/Controllers/PurchaseController.php:228
* @route '/admin/api/purchases/{purchase}/cancel'
*/
cancel.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::cancel
* @see app/Http/Controllers/PurchaseController.php:228
* @route '/admin/api/purchases/{purchase}/cancel'
*/
const cancelForm = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::cancel
* @see app/Http/Controllers/PurchaseController.php:228
* @route '/admin/api/purchases/{purchase}/cancel'
*/
cancelForm.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

cancel.form = cancelForm

/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/admin/api/purchases/{purchase}/receive'
*/
const receiveItems92164fc0f7fce5915edc44787ce48f7e = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receiveItems92164fc0f7fce5915edc44787ce48f7e.url(args, options),
    method: 'post',
})

receiveItems92164fc0f7fce5915edc44787ce48f7e.definition = {
    methods: ["post"],
    url: '/admin/api/purchases/{purchase}/receive',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/admin/api/purchases/{purchase}/receive'
*/
receiveItems92164fc0f7fce5915edc44787ce48f7e.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return receiveItems92164fc0f7fce5915edc44787ce48f7e.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/admin/api/purchases/{purchase}/receive'
*/
receiveItems92164fc0f7fce5915edc44787ce48f7e.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receiveItems92164fc0f7fce5915edc44787ce48f7e.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/admin/api/purchases/{purchase}/receive'
*/
const receiveItems92164fc0f7fce5915edc44787ce48f7eForm = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: receiveItems92164fc0f7fce5915edc44787ce48f7e.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/admin/api/purchases/{purchase}/receive'
*/
receiveItems92164fc0f7fce5915edc44787ce48f7eForm.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: receiveItems92164fc0f7fce5915edc44787ce48f7e.url(args, options),
    method: 'post',
})

receiveItems92164fc0f7fce5915edc44787ce48f7e.form = receiveItems92164fc0f7fce5915edc44787ce48f7eForm
/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/user/api/purchases/{purchase}/receive'
*/
const receiveItems009a29eab4a5eddfaac772f8ef919fa9 = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receiveItems009a29eab4a5eddfaac772f8ef919fa9.url(args, options),
    method: 'post',
})

receiveItems009a29eab4a5eddfaac772f8ef919fa9.definition = {
    methods: ["post"],
    url: '/user/api/purchases/{purchase}/receive',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/user/api/purchases/{purchase}/receive'
*/
receiveItems009a29eab4a5eddfaac772f8ef919fa9.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return receiveItems009a29eab4a5eddfaac772f8ef919fa9.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/user/api/purchases/{purchase}/receive'
*/
receiveItems009a29eab4a5eddfaac772f8ef919fa9.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receiveItems009a29eab4a5eddfaac772f8ef919fa9.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/user/api/purchases/{purchase}/receive'
*/
const receiveItems009a29eab4a5eddfaac772f8ef919fa9Form = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: receiveItems009a29eab4a5eddfaac772f8ef919fa9.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::receiveItems
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/user/api/purchases/{purchase}/receive'
*/
receiveItems009a29eab4a5eddfaac772f8ef919fa9Form.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: receiveItems009a29eab4a5eddfaac772f8ef919fa9.url(args, options),
    method: 'post',
})

receiveItems009a29eab4a5eddfaac772f8ef919fa9.form = receiveItems009a29eab4a5eddfaac772f8ef919fa9Form

export const receiveItems = {
    '/admin/api/purchases/{purchase}/receive': receiveItems92164fc0f7fce5915edc44787ce48f7e,
    '/user/api/purchases/{purchase}/receive': receiveItems009a29eab4a5eddfaac772f8ef919fa9,
}

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/admin/api/purchases/{purchase}/record-payment'
*/
const recordPayment352ea71d83d209e156905fccb6f37e22 = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPayment352ea71d83d209e156905fccb6f37e22.url(args, options),
    method: 'post',
})

recordPayment352ea71d83d209e156905fccb6f37e22.definition = {
    methods: ["post"],
    url: '/admin/api/purchases/{purchase}/record-payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/admin/api/purchases/{purchase}/record-payment'
*/
recordPayment352ea71d83d209e156905fccb6f37e22.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return recordPayment352ea71d83d209e156905fccb6f37e22.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/admin/api/purchases/{purchase}/record-payment'
*/
recordPayment352ea71d83d209e156905fccb6f37e22.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPayment352ea71d83d209e156905fccb6f37e22.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/admin/api/purchases/{purchase}/record-payment'
*/
const recordPayment352ea71d83d209e156905fccb6f37e22Form = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recordPayment352ea71d83d209e156905fccb6f37e22.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/admin/api/purchases/{purchase}/record-payment'
*/
recordPayment352ea71d83d209e156905fccb6f37e22Form.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recordPayment352ea71d83d209e156905fccb6f37e22.url(args, options),
    method: 'post',
})

recordPayment352ea71d83d209e156905fccb6f37e22.form = recordPayment352ea71d83d209e156905fccb6f37e22Form
/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/user/api/purchases/{purchase}/record-payment'
*/
const recordPaymentc531720c046784727061cddade3fa67f = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPaymentc531720c046784727061cddade3fa67f.url(args, options),
    method: 'post',
})

recordPaymentc531720c046784727061cddade3fa67f.definition = {
    methods: ["post"],
    url: '/user/api/purchases/{purchase}/record-payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/user/api/purchases/{purchase}/record-payment'
*/
recordPaymentc531720c046784727061cddade3fa67f.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return recordPaymentc531720c046784727061cddade3fa67f.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/user/api/purchases/{purchase}/record-payment'
*/
recordPaymentc531720c046784727061cddade3fa67f.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPaymentc531720c046784727061cddade3fa67f.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/user/api/purchases/{purchase}/record-payment'
*/
const recordPaymentc531720c046784727061cddade3fa67fForm = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recordPaymentc531720c046784727061cddade3fa67f.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/user/api/purchases/{purchase}/record-payment'
*/
recordPaymentc531720c046784727061cddade3fa67fForm.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recordPaymentc531720c046784727061cddade3fa67f.url(args, options),
    method: 'post',
})

recordPaymentc531720c046784727061cddade3fa67f.form = recordPaymentc531720c046784727061cddade3fa67fForm

export const recordPayment = {
    '/admin/api/purchases/{purchase}/record-payment': recordPayment352ea71d83d209e156905fccb6f37e22,
    '/user/api/purchases/{purchase}/record-payment': recordPaymentc531720c046784727061cddade3fa67f,
}

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
const streamPdfecf98f411908cebdd14b6df76c9ef3de = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamPdfecf98f411908cebdd14b6df76c9ef3de.url(args, options),
    method: 'get',
})

streamPdfecf98f411908cebdd14b6df76c9ef3de.definition = {
    methods: ["get","head"],
    url: '/admin/api/purchases/{purchase}/pdf/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
streamPdfecf98f411908cebdd14b6df76c9ef3de.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return streamPdfecf98f411908cebdd14b6df76c9ef3de.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
streamPdfecf98f411908cebdd14b6df76c9ef3de.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamPdfecf98f411908cebdd14b6df76c9ef3de.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
streamPdfecf98f411908cebdd14b6df76c9ef3de.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: streamPdfecf98f411908cebdd14b6df76c9ef3de.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
const streamPdfecf98f411908cebdd14b6df76c9ef3deForm = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdfecf98f411908cebdd14b6df76c9ef3de.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
streamPdfecf98f411908cebdd14b6df76c9ef3deForm.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdfecf98f411908cebdd14b6df76c9ef3de.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/admin/api/purchases/{purchase}/pdf/view'
*/
streamPdfecf98f411908cebdd14b6df76c9ef3deForm.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdfecf98f411908cebdd14b6df76c9ef3de.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

streamPdfecf98f411908cebdd14b6df76c9ef3de.form = streamPdfecf98f411908cebdd14b6df76c9ef3deForm
/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/user/api/purchases/{purchase}/pdf/view'
*/
const streamPdffaa95fee99d8da276d683bde96f27232 = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamPdffaa95fee99d8da276d683bde96f27232.url(args, options),
    method: 'get',
})

streamPdffaa95fee99d8da276d683bde96f27232.definition = {
    methods: ["get","head"],
    url: '/user/api/purchases/{purchase}/pdf/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/user/api/purchases/{purchase}/pdf/view'
*/
streamPdffaa95fee99d8da276d683bde96f27232.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return streamPdffaa95fee99d8da276d683bde96f27232.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/user/api/purchases/{purchase}/pdf/view'
*/
streamPdffaa95fee99d8da276d683bde96f27232.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamPdffaa95fee99d8da276d683bde96f27232.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/user/api/purchases/{purchase}/pdf/view'
*/
streamPdffaa95fee99d8da276d683bde96f27232.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: streamPdffaa95fee99d8da276d683bde96f27232.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/user/api/purchases/{purchase}/pdf/view'
*/
const streamPdffaa95fee99d8da276d683bde96f27232Form = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdffaa95fee99d8da276d683bde96f27232.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/user/api/purchases/{purchase}/pdf/view'
*/
streamPdffaa95fee99d8da276d683bde96f27232Form.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdffaa95fee99d8da276d683bde96f27232.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::streamPdf
* @see app/Http/Controllers/PurchaseController.php:327
* @route '/user/api/purchases/{purchase}/pdf/view'
*/
streamPdffaa95fee99d8da276d683bde96f27232Form.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: streamPdffaa95fee99d8da276d683bde96f27232.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

streamPdffaa95fee99d8da276d683bde96f27232.form = streamPdffaa95fee99d8da276d683bde96f27232Form

export const streamPdf = {
    '/admin/api/purchases/{purchase}/pdf/view': streamPdfecf98f411908cebdd14b6df76c9ef3de,
    '/user/api/purchases/{purchase}/pdf/view': streamPdffaa95fee99d8da276d683bde96f27232,
}

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
const downloadPdf0e6e24fd5d88b78d9208485696ee888f = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf0e6e24fd5d88b78d9208485696ee888f.url(args, options),
    method: 'get',
})

downloadPdf0e6e24fd5d88b78d9208485696ee888f.definition = {
    methods: ["get","head"],
    url: '/admin/api/purchases/{purchase}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
downloadPdf0e6e24fd5d88b78d9208485696ee888f.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return downloadPdf0e6e24fd5d88b78d9208485696ee888f.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
downloadPdf0e6e24fd5d88b78d9208485696ee888f.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf0e6e24fd5d88b78d9208485696ee888f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
downloadPdf0e6e24fd5d88b78d9208485696ee888f.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadPdf0e6e24fd5d88b78d9208485696ee888f.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
const downloadPdf0e6e24fd5d88b78d9208485696ee888fForm = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf0e6e24fd5d88b78d9208485696ee888f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
downloadPdf0e6e24fd5d88b78d9208485696ee888fForm.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf0e6e24fd5d88b78d9208485696ee888f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/admin/api/purchases/{purchase}/pdf/download'
*/
downloadPdf0e6e24fd5d88b78d9208485696ee888fForm.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf0e6e24fd5d88b78d9208485696ee888f.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadPdf0e6e24fd5d88b78d9208485696ee888f.form = downloadPdf0e6e24fd5d88b78d9208485696ee888fForm
/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/user/api/purchases/{purchase}/pdf/download'
*/
const downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62 = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.url(args, options),
    method: 'get',
})

downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.definition = {
    methods: ["get","head"],
    url: '/user/api/purchases/{purchase}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/user/api/purchases/{purchase}/pdf/download'
*/
downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/user/api/purchases/{purchase}/pdf/download'
*/
downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/user/api/purchases/{purchase}/pdf/download'
*/
downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/user/api/purchases/{purchase}/pdf/download'
*/
const downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62Form = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/user/api/purchases/{purchase}/pdf/download'
*/
downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62Form.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::downloadPdf
* @see app/Http/Controllers/PurchaseController.php:333
* @route '/user/api/purchases/{purchase}/pdf/download'
*/
downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62Form.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62.form = downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62Form

export const downloadPdf = {
    '/admin/api/purchases/{purchase}/pdf/download': downloadPdf0e6e24fd5d88b78d9208485696ee888f,
    '/user/api/purchases/{purchase}/pdf/download': downloadPdf8a80cb4efe8b9a17dcb1dfce95a3bf62,
}

const PurchaseController = { index, store, show, update, destroy, markAsOrdered, cancel, receiveItems, recordPayment, streamPdf, downloadPdf }

export default PurchaseController
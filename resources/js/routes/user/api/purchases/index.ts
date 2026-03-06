import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
import pdf from './pdf'
/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/api/purchases',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::index
* @see app/Http/Controllers/PurchaseController.php:22
* @route '/user/api/purchases'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/user/api/purchases'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user/api/purchases',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/user/api/purchases'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::store
* @see app/Http/Controllers/PurchaseController.php:49
* @route '/user/api/purchases'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
export const show = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/api/purchases/{purchase}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
show.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
show.get = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PurchaseController::show
* @see app/Http/Controllers/PurchaseController.php:108
* @route '/user/api/purchases/{purchase}'
*/
show.head = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/user/api/purchases/{purchase}'
*/
export const update = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/user/api/purchases/{purchase}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/user/api/purchases/{purchase}'
*/
update.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::update
* @see app/Http/Controllers/PurchaseController.php:118
* @route '/user/api/purchases/{purchase}'
*/
update.put = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/user/api/purchases/{purchase}'
*/
export const destroy = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/user/api/purchases/{purchase}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/user/api/purchases/{purchase}'
*/
destroy.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::destroy
* @see app/Http/Controllers/PurchaseController.php:196
* @route '/user/api/purchases/{purchase}'
*/
destroy.delete = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\PurchaseController::markOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/user/api/purchases/{purchase}/mark-ordered'
*/
export const markOrdered = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markOrdered.url(args, options),
    method: 'post',
})

markOrdered.definition = {
    methods: ["post"],
    url: '/user/api/purchases/{purchase}/mark-ordered',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::markOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/user/api/purchases/{purchase}/mark-ordered'
*/
markOrdered.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markOrdered.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::markOrdered
* @see app/Http/Controllers/PurchaseController.php:212
* @route '/user/api/purchases/{purchase}/mark-ordered'
*/
markOrdered.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markOrdered.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::receive
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/user/api/purchases/{purchase}/receive'
*/
export const receive = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receive.url(args, options),
    method: 'post',
})

receive.definition = {
    methods: ["post"],
    url: '/user/api/purchases/{purchase}/receive',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::receive
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/user/api/purchases/{purchase}/receive'
*/
receive.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return receive.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::receive
* @see app/Http/Controllers/PurchaseController.php:243
* @route '/user/api/purchases/{purchase}/receive'
*/
receive.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/user/api/purchases/{purchase}/record-payment'
*/
export const recordPayment = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPayment.url(args, options),
    method: 'post',
})

recordPayment.definition = {
    methods: ["post"],
    url: '/user/api/purchases/{purchase}/record-payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/user/api/purchases/{purchase}/record-payment'
*/
recordPayment.url = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return recordPayment.definition.url
            .replace('{purchase}', parsedArgs.purchase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PurchaseController::recordPayment
* @see app/Http/Controllers/PurchaseController.php:342
* @route '/user/api/purchases/{purchase}/record-payment'
*/
recordPayment.post = (args: { purchase: number | { id: number } } | [purchase: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPayment.url(args, options),
    method: 'post',
})

const purchases = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    markOrdered: Object.assign(markOrdered, markOrdered),
    receive: Object.assign(receive, receive),
    recordPayment: Object.assign(recordPayment, recordPayment),
    pdf: Object.assign(pdf, pdf),
}

export default purchases
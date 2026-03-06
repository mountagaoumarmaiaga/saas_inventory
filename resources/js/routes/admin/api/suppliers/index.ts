import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/api/suppliers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::index
* @see app/Http/Controllers/SupplierController.php:12
* @route '/admin/api/suppliers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/admin/api/suppliers/list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::list
* @see app/Http/Controllers/SupplierController.php:69
* @route '/admin/api/suppliers/list'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/admin/api/suppliers'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/api/suppliers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/admin/api/suppliers'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::store
* @see app/Http/Controllers/SupplierController.php:33
* @route '/admin/api/suppliers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
export const show = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/api/suppliers/{supplier}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
show.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
show.get = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SupplierController::show
* @see app/Http/Controllers/SupplierController.php:45
* @route '/admin/api/suppliers/{supplier}'
*/
show.head = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/admin/api/suppliers/{supplier}'
*/
export const update = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/api/suppliers/{supplier}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/admin/api/suppliers/{supplier}'
*/
update.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::update
* @see app/Http/Controllers/SupplierController.php:51
* @route '/admin/api/suppliers/{supplier}'
*/
update.put = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/admin/api/suppliers/{supplier}'
*/
export const destroy = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/api/suppliers/{supplier}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/admin/api/suppliers/{supplier}'
*/
destroy.url = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{supplier}', parsedArgs.supplier.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupplierController::destroy
* @see app/Http/Controllers/SupplierController.php:60
* @route '/admin/api/suppliers/{supplier}'
*/
destroy.delete = (args: { supplier: number | { id: number } } | [supplier: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const suppliers = {
    index: Object.assign(index, index),
    list: Object.assign(list, list),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default suppliers
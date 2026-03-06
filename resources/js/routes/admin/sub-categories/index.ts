import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see routes/web.php:217
* @route '/admin/sub-categories'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/sub-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:217
* @route '/admin/sub-categories'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:217
* @route '/admin/sub-categories'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:217
* @route '/admin/sub-categories'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SubCategoryController::index
* @see app/Http/Controllers/SubCategoryController.php:14
* @route '/admin/api/sub-categories'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/api/sub-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SubCategoryController::index
* @see app/Http/Controllers/SubCategoryController.php:14
* @route '/admin/api/sub-categories'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubCategoryController::index
* @see app/Http/Controllers/SubCategoryController.php:14
* @route '/admin/api/sub-categories'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SubCategoryController::index
* @see app/Http/Controllers/SubCategoryController.php:14
* @route '/admin/api/sub-categories'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SubCategoryController::store
* @see app/Http/Controllers/SubCategoryController.php:32
* @route '/admin/api/sub-categories'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/api/sub-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubCategoryController::store
* @see app/Http/Controllers/SubCategoryController.php:32
* @route '/admin/api/sub-categories'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubCategoryController::store
* @see app/Http/Controllers/SubCategoryController.php:32
* @route '/admin/api/sub-categories'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubCategoryController::show
* @see app/Http/Controllers/SubCategoryController.php:23
* @route '/admin/api/sub-categories/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/api/sub-categories/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SubCategoryController::show
* @see app/Http/Controllers/SubCategoryController.php:23
* @route '/admin/api/sub-categories/{id}'
*/
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubCategoryController::show
* @see app/Http/Controllers/SubCategoryController.php:23
* @route '/admin/api/sub-categories/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SubCategoryController::show
* @see app/Http/Controllers/SubCategoryController.php:23
* @route '/admin/api/sub-categories/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SubCategoryController::update
* @see app/Http/Controllers/SubCategoryController.php:54
* @route '/admin/api/sub-categories/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/api/sub-categories/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SubCategoryController::update
* @see app/Http/Controllers/SubCategoryController.php:54
* @route '/admin/api/sub-categories/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubCategoryController::update
* @see app/Http/Controllers/SubCategoryController.php:54
* @route '/admin/api/sub-categories/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\SubCategoryController::destroy
* @see app/Http/Controllers/SubCategoryController.php:75
* @route '/admin/api/sub-categories/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/api/sub-categories/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SubCategoryController::destroy
* @see app/Http/Controllers/SubCategoryController.php:75
* @route '/admin/api/sub-categories/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubCategoryController::destroy
* @see app/Http/Controllers/SubCategoryController.php:75
* @route '/admin/api/sub-categories/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const subCategories = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default subCategories
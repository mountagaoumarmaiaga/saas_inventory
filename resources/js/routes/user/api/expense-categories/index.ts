import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/api/expense-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/user/api/expense-categories'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user/api/expense-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/user/api/expense-categories'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/user/api/expense-categories'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::show
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:0
* @route '/user/api/expense-categories/{category}'
*/
export const show = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/api/expense-categories/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::show
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:0
* @route '/user/api/expense-categories/{category}'
*/
show.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        category: args.category,
    }

    return show.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::show
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:0
* @route '/user/api/expense-categories/{category}'
*/
show.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::show
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:0
* @route '/user/api/expense-categories/{category}'
*/
show.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/user/api/expense-categories/{category}'
*/
export const update = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/user/api/expense-categories/{category}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/user/api/expense-categories/{category}'
*/
update.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        category: args.category,
    }

    return update.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/user/api/expense-categories/{category}'
*/
update.put = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/user/api/expense-categories/{category}'
*/
export const destroy = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/user/api/expense-categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/user/api/expense-categories/{category}'
*/
destroy.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    if (Array.isArray(args)) {
        args = {
            category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        category: args.category,
    }

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/user/api/expense-categories/{category}'
*/
destroy.delete = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const expenseCategories = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default expenseCategories
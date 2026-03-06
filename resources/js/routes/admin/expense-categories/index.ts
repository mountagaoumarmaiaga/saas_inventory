import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see routes/web.php:278
* @route '/admin/expense-categories'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/expense-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:278
* @route '/admin/expense-categories'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see routes/web.php:278
* @route '/admin/expense-categories'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see routes/web.php:278
* @route '/admin/expense-categories'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/api/expense-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/admin/api/expense-categories'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/api/expense-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/admin/api/expense-categories'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/admin/api/expense-categories'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
export const update = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/api/expense-categories/{expense_category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
update.url = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense_category: args }
    }

    if (Array.isArray(args)) {
        args = {
            expense_category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        expense_category: args.expense_category,
    }

    return update.definition.url
            .replace('{expense_category}', parsedArgs.expense_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
update.put = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
update.patch = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/admin/api/expense-categories/{expense_category}'
*/
export const destroy = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/api/expense-categories/{expense_category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/admin/api/expense-categories/{expense_category}'
*/
destroy.url = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense_category: args }
    }

    if (Array.isArray(args)) {
        args = {
            expense_category: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        expense_category: args.expense_category,
    }

    return destroy.definition.url
            .replace('{expense_category}', parsedArgs.expense_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/admin/api/expense-categories/{expense_category}'
*/
destroy.delete = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const expenseCategories = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default expenseCategories
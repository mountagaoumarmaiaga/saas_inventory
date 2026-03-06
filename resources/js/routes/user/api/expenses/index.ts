import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/api/expenses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/user/api/expenses'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/user/api/expenses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/user/api/expenses'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/user/api/expenses'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyze
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/user/api/expenses/analyze-receipt'
*/
export const analyze = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyze.url(options),
    method: 'post',
})

analyze.definition = {
    methods: ["post"],
    url: '/user/api/expenses/analyze-receipt',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyze
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/user/api/expenses/analyze-receipt'
*/
analyze.url = (options?: RouteQueryOptions) => {
    return analyze.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyze
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/user/api/expenses/analyze-receipt'
*/
analyze.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyze.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
export const show = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/api/expenses/{expense}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
show.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { expense: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            expense: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        expense: typeof args.expense === 'object'
        ? args.expense.id
        : args.expense,
    }

    return show.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
show.get = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
show.head = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/user/api/expenses/{expense}'
*/
export const update = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/user/api/expenses/{expense}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/user/api/expenses/{expense}'
*/
update.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { expense: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            expense: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        expense: typeof args.expense === 'object'
        ? args.expense.id
        : args.expense,
    }

    return update.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/user/api/expenses/{expense}'
*/
update.put = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/user/api/expenses/{expense}'
*/
export const destroy = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/user/api/expenses/{expense}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/user/api/expenses/{expense}'
*/
destroy.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { expense: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            expense: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        expense: typeof args.expense === 'object'
        ? args.expense.id
        : args.expense,
    }

    return destroy.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/user/api/expenses/{expense}'
*/
destroy.delete = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const expenses = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    analyze: Object.assign(analyze, analyze),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default expenses
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
const indexb0597e58143bfb4e8ce0480bafcde1e0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb0597e58143bfb4e8ce0480bafcde1e0.url(options),
    method: 'get',
})

indexb0597e58143bfb4e8ce0480bafcde1e0.definition = {
    methods: ["get","head"],
    url: '/admin/api/expense-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
indexb0597e58143bfb4e8ce0480bafcde1e0.url = (options?: RouteQueryOptions) => {
    return indexb0597e58143bfb4e8ce0480bafcde1e0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
indexb0597e58143bfb4e8ce0480bafcde1e0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb0597e58143bfb4e8ce0480bafcde1e0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
indexb0597e58143bfb4e8ce0480bafcde1e0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexb0597e58143bfb4e8ce0480bafcde1e0.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
const indexb0597e58143bfb4e8ce0480bafcde1e0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb0597e58143bfb4e8ce0480bafcde1e0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
indexb0597e58143bfb4e8ce0480bafcde1e0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb0597e58143bfb4e8ce0480bafcde1e0.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/admin/api/expense-categories'
*/
indexb0597e58143bfb4e8ce0480bafcde1e0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb0597e58143bfb4e8ce0480bafcde1e0.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexb0597e58143bfb4e8ce0480bafcde1e0.form = indexb0597e58143bfb4e8ce0480bafcde1e0Form
/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
const index595fb163a7e1025514d82cc9afd53e49 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index595fb163a7e1025514d82cc9afd53e49.url(options),
    method: 'get',
})

index595fb163a7e1025514d82cc9afd53e49.definition = {
    methods: ["get","head"],
    url: '/user/api/expense-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
index595fb163a7e1025514d82cc9afd53e49.url = (options?: RouteQueryOptions) => {
    return index595fb163a7e1025514d82cc9afd53e49.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
index595fb163a7e1025514d82cc9afd53e49.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index595fb163a7e1025514d82cc9afd53e49.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
index595fb163a7e1025514d82cc9afd53e49.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index595fb163a7e1025514d82cc9afd53e49.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
const index595fb163a7e1025514d82cc9afd53e49Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index595fb163a7e1025514d82cc9afd53e49.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
index595fb163a7e1025514d82cc9afd53e49Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index595fb163a7e1025514d82cc9afd53e49.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::index
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:11
* @route '/user/api/expense-categories'
*/
index595fb163a7e1025514d82cc9afd53e49Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index595fb163a7e1025514d82cc9afd53e49.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index595fb163a7e1025514d82cc9afd53e49.form = index595fb163a7e1025514d82cc9afd53e49Form

export const index = {
    '/admin/api/expense-categories': indexb0597e58143bfb4e8ce0480bafcde1e0,
    '/user/api/expense-categories': index595fb163a7e1025514d82cc9afd53e49,
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/admin/api/expense-categories'
*/
const storeb0597e58143bfb4e8ce0480bafcde1e0 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb0597e58143bfb4e8ce0480bafcde1e0.url(options),
    method: 'post',
})

storeb0597e58143bfb4e8ce0480bafcde1e0.definition = {
    methods: ["post"],
    url: '/admin/api/expense-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/admin/api/expense-categories'
*/
storeb0597e58143bfb4e8ce0480bafcde1e0.url = (options?: RouteQueryOptions) => {
    return storeb0597e58143bfb4e8ce0480bafcde1e0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/admin/api/expense-categories'
*/
storeb0597e58143bfb4e8ce0480bafcde1e0.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb0597e58143bfb4e8ce0480bafcde1e0.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/admin/api/expense-categories'
*/
const storeb0597e58143bfb4e8ce0480bafcde1e0Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb0597e58143bfb4e8ce0480bafcde1e0.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/admin/api/expense-categories'
*/
storeb0597e58143bfb4e8ce0480bafcde1e0Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb0597e58143bfb4e8ce0480bafcde1e0.url(options),
    method: 'post',
})

storeb0597e58143bfb4e8ce0480bafcde1e0.form = storeb0597e58143bfb4e8ce0480bafcde1e0Form
/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/user/api/expense-categories'
*/
const store595fb163a7e1025514d82cc9afd53e49 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store595fb163a7e1025514d82cc9afd53e49.url(options),
    method: 'post',
})

store595fb163a7e1025514d82cc9afd53e49.definition = {
    methods: ["post"],
    url: '/user/api/expense-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/user/api/expense-categories'
*/
store595fb163a7e1025514d82cc9afd53e49.url = (options?: RouteQueryOptions) => {
    return store595fb163a7e1025514d82cc9afd53e49.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/user/api/expense-categories'
*/
store595fb163a7e1025514d82cc9afd53e49.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store595fb163a7e1025514d82cc9afd53e49.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/user/api/expense-categories'
*/
const store595fb163a7e1025514d82cc9afd53e49Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store595fb163a7e1025514d82cc9afd53e49.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::store
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:20
* @route '/user/api/expense-categories'
*/
store595fb163a7e1025514d82cc9afd53e49Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store595fb163a7e1025514d82cc9afd53e49.url(options),
    method: 'post',
})

store595fb163a7e1025514d82cc9afd53e49.form = store595fb163a7e1025514d82cc9afd53e49Form

export const store = {
    '/admin/api/expense-categories': storeb0597e58143bfb4e8ce0480bafcde1e0,
    '/user/api/expense-categories': store595fb163a7e1025514d82cc9afd53e49,
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
const updatee225980b5b307995845c77e2bbd681d4 = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee225980b5b307995845c77e2bbd681d4.url(args, options),
    method: 'put',
})

updatee225980b5b307995845c77e2bbd681d4.definition = {
    methods: ["put","patch"],
    url: '/admin/api/expense-categories/{expense_category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
updatee225980b5b307995845c77e2bbd681d4.url = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatee225980b5b307995845c77e2bbd681d4.definition.url
            .replace('{expense_category}', parsedArgs.expense_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
updatee225980b5b307995845c77e2bbd681d4.put = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee225980b5b307995845c77e2bbd681d4.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
updatee225980b5b307995845c77e2bbd681d4.patch = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatee225980b5b307995845c77e2bbd681d4.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
const updatee225980b5b307995845c77e2bbd681d4Form = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatee225980b5b307995845c77e2bbd681d4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
updatee225980b5b307995845c77e2bbd681d4Form.put = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatee225980b5b307995845c77e2bbd681d4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/admin/api/expense-categories/{expense_category}'
*/
updatee225980b5b307995845c77e2bbd681d4Form.patch = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatee225980b5b307995845c77e2bbd681d4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatee225980b5b307995845c77e2bbd681d4.form = updatee225980b5b307995845c77e2bbd681d4Form
/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/user/api/expense-categories/{category}'
*/
const update83f29dd0534082e077d9ab57d994c214 = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update83f29dd0534082e077d9ab57d994c214.url(args, options),
    method: 'put',
})

update83f29dd0534082e077d9ab57d994c214.definition = {
    methods: ["put"],
    url: '/user/api/expense-categories/{category}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/user/api/expense-categories/{category}'
*/
update83f29dd0534082e077d9ab57d994c214.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update83f29dd0534082e077d9ab57d994c214.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/user/api/expense-categories/{category}'
*/
update83f29dd0534082e077d9ab57d994c214.put = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update83f29dd0534082e077d9ab57d994c214.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/user/api/expense-categories/{category}'
*/
const update83f29dd0534082e077d9ab57d994c214Form = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update83f29dd0534082e077d9ab57d994c214.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::update
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:33
* @route '/user/api/expense-categories/{category}'
*/
update83f29dd0534082e077d9ab57d994c214Form.put = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update83f29dd0534082e077d9ab57d994c214.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update83f29dd0534082e077d9ab57d994c214.form = update83f29dd0534082e077d9ab57d994c214Form

export const update = {
    '/admin/api/expense-categories/{expense_category}': updatee225980b5b307995845c77e2bbd681d4,
    '/user/api/expense-categories/{category}': update83f29dd0534082e077d9ab57d994c214,
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/admin/api/expense-categories/{expense_category}'
*/
const destroye225980b5b307995845c77e2bbd681d4 = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye225980b5b307995845c77e2bbd681d4.url(args, options),
    method: 'delete',
})

destroye225980b5b307995845c77e2bbd681d4.definition = {
    methods: ["delete"],
    url: '/admin/api/expense-categories/{expense_category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/admin/api/expense-categories/{expense_category}'
*/
destroye225980b5b307995845c77e2bbd681d4.url = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroye225980b5b307995845c77e2bbd681d4.definition.url
            .replace('{expense_category}', parsedArgs.expense_category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/admin/api/expense-categories/{expense_category}'
*/
destroye225980b5b307995845c77e2bbd681d4.delete = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye225980b5b307995845c77e2bbd681d4.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/admin/api/expense-categories/{expense_category}'
*/
const destroye225980b5b307995845c77e2bbd681d4Form = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroye225980b5b307995845c77e2bbd681d4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/admin/api/expense-categories/{expense_category}'
*/
destroye225980b5b307995845c77e2bbd681d4Form.delete = (args: { expense_category: string | number } | [expense_category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroye225980b5b307995845c77e2bbd681d4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroye225980b5b307995845c77e2bbd681d4.form = destroye225980b5b307995845c77e2bbd681d4Form
/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/user/api/expense-categories/{category}'
*/
const destroy83f29dd0534082e077d9ab57d994c214 = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy83f29dd0534082e077d9ab57d994c214.url(args, options),
    method: 'delete',
})

destroy83f29dd0534082e077d9ab57d994c214.definition = {
    methods: ["delete"],
    url: '/user/api/expense-categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/user/api/expense-categories/{category}'
*/
destroy83f29dd0534082e077d9ab57d994c214.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy83f29dd0534082e077d9ab57d994c214.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/user/api/expense-categories/{category}'
*/
destroy83f29dd0534082e077d9ab57d994c214.delete = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy83f29dd0534082e077d9ab57d994c214.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/user/api/expense-categories/{category}'
*/
const destroy83f29dd0534082e077d9ab57d994c214Form = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy83f29dd0534082e077d9ab57d994c214.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::destroy
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:48
* @route '/user/api/expense-categories/{category}'
*/
destroy83f29dd0534082e077d9ab57d994c214Form.delete = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy83f29dd0534082e077d9ab57d994c214.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy83f29dd0534082e077d9ab57d994c214.form = destroy83f29dd0534082e077d9ab57d994c214Form

export const destroy = {
    '/admin/api/expense-categories/{expense_category}': destroye225980b5b307995845c77e2bbd681d4,
    '/user/api/expense-categories/{category}': destroy83f29dd0534082e077d9ab57d994c214,
}

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
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::show
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:0
* @route '/user/api/expense-categories/{category}'
*/
const showForm = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::show
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:0
* @route '/user/api/expense-categories/{category}'
*/
showForm.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseCategoryController::show
* @see app/Http/Controllers/Admin/ExpenseCategoryController.php:0
* @route '/user/api/expense-categories/{category}'
*/
showForm.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const ExpenseCategoryController = { index, store, update, destroy, show }

export default ExpenseCategoryController
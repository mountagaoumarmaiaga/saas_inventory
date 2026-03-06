import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndexUser
* @see app/Http/Controllers/Admin/ExpenseController.php:41
* @route '/user/expenses'
*/
export const viewIndexUser = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewIndexUser.url(options),
    method: 'get',
})

viewIndexUser.definition = {
    methods: ["get","head"],
    url: '/user/expenses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndexUser
* @see app/Http/Controllers/Admin/ExpenseController.php:41
* @route '/user/expenses'
*/
viewIndexUser.url = (options?: RouteQueryOptions) => {
    return viewIndexUser.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndexUser
* @see app/Http/Controllers/Admin/ExpenseController.php:41
* @route '/user/expenses'
*/
viewIndexUser.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewIndexUser.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndexUser
* @see app/Http/Controllers/Admin/ExpenseController.php:41
* @route '/user/expenses'
*/
viewIndexUser.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewIndexUser.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndexUser
* @see app/Http/Controllers/Admin/ExpenseController.php:41
* @route '/user/expenses'
*/
const viewIndexUserForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: viewIndexUser.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndexUser
* @see app/Http/Controllers/Admin/ExpenseController.php:41
* @route '/user/expenses'
*/
viewIndexUserForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: viewIndexUser.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndexUser
* @see app/Http/Controllers/Admin/ExpenseController.php:41
* @route '/user/expenses'
*/
viewIndexUserForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: viewIndexUser.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

viewIndexUser.form = viewIndexUserForm

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndex
* @see app/Http/Controllers/Admin/ExpenseController.php:14
* @route '/admin/expenses'
*/
export const viewIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewIndex.url(options),
    method: 'get',
})

viewIndex.definition = {
    methods: ["get","head"],
    url: '/admin/expenses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndex
* @see app/Http/Controllers/Admin/ExpenseController.php:14
* @route '/admin/expenses'
*/
viewIndex.url = (options?: RouteQueryOptions) => {
    return viewIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndex
* @see app/Http/Controllers/Admin/ExpenseController.php:14
* @route '/admin/expenses'
*/
viewIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndex
* @see app/Http/Controllers/Admin/ExpenseController.php:14
* @route '/admin/expenses'
*/
viewIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndex
* @see app/Http/Controllers/Admin/ExpenseController.php:14
* @route '/admin/expenses'
*/
const viewIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: viewIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndex
* @see app/Http/Controllers/Admin/ExpenseController.php:14
* @route '/admin/expenses'
*/
viewIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: viewIndex.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::viewIndex
* @see app/Http/Controllers/Admin/ExpenseController.php:14
* @route '/admin/expenses'
*/
viewIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: viewIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

viewIndex.form = viewIndexForm

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/admin/api/expenses'
*/
const indexa8136cc1025f9ae30f0b7812d42f1f25 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa8136cc1025f9ae30f0b7812d42f1f25.url(options),
    method: 'get',
})

indexa8136cc1025f9ae30f0b7812d42f1f25.definition = {
    methods: ["get","head"],
    url: '/admin/api/expenses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/admin/api/expenses'
*/
indexa8136cc1025f9ae30f0b7812d42f1f25.url = (options?: RouteQueryOptions) => {
    return indexa8136cc1025f9ae30f0b7812d42f1f25.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/admin/api/expenses'
*/
indexa8136cc1025f9ae30f0b7812d42f1f25.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexa8136cc1025f9ae30f0b7812d42f1f25.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/admin/api/expenses'
*/
indexa8136cc1025f9ae30f0b7812d42f1f25.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexa8136cc1025f9ae30f0b7812d42f1f25.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/admin/api/expenses'
*/
const indexa8136cc1025f9ae30f0b7812d42f1f25Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa8136cc1025f9ae30f0b7812d42f1f25.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/admin/api/expenses'
*/
indexa8136cc1025f9ae30f0b7812d42f1f25Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa8136cc1025f9ae30f0b7812d42f1f25.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/admin/api/expenses'
*/
indexa8136cc1025f9ae30f0b7812d42f1f25Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexa8136cc1025f9ae30f0b7812d42f1f25.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexa8136cc1025f9ae30f0b7812d42f1f25.form = indexa8136cc1025f9ae30f0b7812d42f1f25Form
/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
const index2beaa7592f99080110585152d93c77df = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2beaa7592f99080110585152d93c77df.url(options),
    method: 'get',
})

index2beaa7592f99080110585152d93c77df.definition = {
    methods: ["get","head"],
    url: '/user/api/expenses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
index2beaa7592f99080110585152d93c77df.url = (options?: RouteQueryOptions) => {
    return index2beaa7592f99080110585152d93c77df.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
index2beaa7592f99080110585152d93c77df.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2beaa7592f99080110585152d93c77df.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
index2beaa7592f99080110585152d93c77df.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index2beaa7592f99080110585152d93c77df.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
const index2beaa7592f99080110585152d93c77dfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2beaa7592f99080110585152d93c77df.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
index2beaa7592f99080110585152d93c77dfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2beaa7592f99080110585152d93c77df.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::index
* @see app/Http/Controllers/Admin/ExpenseController.php:68
* @route '/user/api/expenses'
*/
index2beaa7592f99080110585152d93c77dfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2beaa7592f99080110585152d93c77df.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index2beaa7592f99080110585152d93c77df.form = index2beaa7592f99080110585152d93c77dfForm

export const index = {
    '/admin/api/expenses': indexa8136cc1025f9ae30f0b7812d42f1f25,
    '/user/api/expenses': index2beaa7592f99080110585152d93c77df,
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/admin/api/expenses'
*/
const storea8136cc1025f9ae30f0b7812d42f1f25 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea8136cc1025f9ae30f0b7812d42f1f25.url(options),
    method: 'post',
})

storea8136cc1025f9ae30f0b7812d42f1f25.definition = {
    methods: ["post"],
    url: '/admin/api/expenses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/admin/api/expenses'
*/
storea8136cc1025f9ae30f0b7812d42f1f25.url = (options?: RouteQueryOptions) => {
    return storea8136cc1025f9ae30f0b7812d42f1f25.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/admin/api/expenses'
*/
storea8136cc1025f9ae30f0b7812d42f1f25.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea8136cc1025f9ae30f0b7812d42f1f25.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/admin/api/expenses'
*/
const storea8136cc1025f9ae30f0b7812d42f1f25Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storea8136cc1025f9ae30f0b7812d42f1f25.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/admin/api/expenses'
*/
storea8136cc1025f9ae30f0b7812d42f1f25Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storea8136cc1025f9ae30f0b7812d42f1f25.url(options),
    method: 'post',
})

storea8136cc1025f9ae30f0b7812d42f1f25.form = storea8136cc1025f9ae30f0b7812d42f1f25Form
/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/user/api/expenses'
*/
const store2beaa7592f99080110585152d93c77df = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store2beaa7592f99080110585152d93c77df.url(options),
    method: 'post',
})

store2beaa7592f99080110585152d93c77df.definition = {
    methods: ["post"],
    url: '/user/api/expenses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/user/api/expenses'
*/
store2beaa7592f99080110585152d93c77df.url = (options?: RouteQueryOptions) => {
    return store2beaa7592f99080110585152d93c77df.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/user/api/expenses'
*/
store2beaa7592f99080110585152d93c77df.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store2beaa7592f99080110585152d93c77df.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/user/api/expenses'
*/
const store2beaa7592f99080110585152d93c77dfForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store2beaa7592f99080110585152d93c77df.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::store
* @see app/Http/Controllers/Admin/ExpenseController.php:79
* @route '/user/api/expenses'
*/
store2beaa7592f99080110585152d93c77dfForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store2beaa7592f99080110585152d93c77df.url(options),
    method: 'post',
})

store2beaa7592f99080110585152d93c77df.form = store2beaa7592f99080110585152d93c77dfForm

export const store = {
    '/admin/api/expenses': storea8136cc1025f9ae30f0b7812d42f1f25,
    '/user/api/expenses': store2beaa7592f99080110585152d93c77df,
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/admin/api/expenses/{expense}'
*/
const showe76154c7b3d50a2f5d9482db71b5789c = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showe76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'get',
})

showe76154c7b3d50a2f5d9482db71b5789c.definition = {
    methods: ["get","head"],
    url: '/admin/api/expenses/{expense}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/admin/api/expenses/{expense}'
*/
showe76154c7b3d50a2f5d9482db71b5789c.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showe76154c7b3d50a2f5d9482db71b5789c.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/admin/api/expenses/{expense}'
*/
showe76154c7b3d50a2f5d9482db71b5789c.get = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showe76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/admin/api/expenses/{expense}'
*/
showe76154c7b3d50a2f5d9482db71b5789c.head = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showe76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/admin/api/expenses/{expense}'
*/
const showe76154c7b3d50a2f5d9482db71b5789cForm = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showe76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/admin/api/expenses/{expense}'
*/
showe76154c7b3d50a2f5d9482db71b5789cForm.get = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showe76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/admin/api/expenses/{expense}'
*/
showe76154c7b3d50a2f5d9482db71b5789cForm.head = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showe76154c7b3d50a2f5d9482db71b5789c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showe76154c7b3d50a2f5d9482db71b5789c.form = showe76154c7b3d50a2f5d9482db71b5789cForm
/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
const show927ce5199d3ae56e19111554dccd4801 = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show927ce5199d3ae56e19111554dccd4801.url(args, options),
    method: 'get',
})

show927ce5199d3ae56e19111554dccd4801.definition = {
    methods: ["get","head"],
    url: '/user/api/expenses/{expense}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
show927ce5199d3ae56e19111554dccd4801.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show927ce5199d3ae56e19111554dccd4801.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
show927ce5199d3ae56e19111554dccd4801.get = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show927ce5199d3ae56e19111554dccd4801.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
show927ce5199d3ae56e19111554dccd4801.head = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show927ce5199d3ae56e19111554dccd4801.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
const show927ce5199d3ae56e19111554dccd4801Form = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show927ce5199d3ae56e19111554dccd4801.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
show927ce5199d3ae56e19111554dccd4801Form.get = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show927ce5199d3ae56e19111554dccd4801.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::show
* @see app/Http/Controllers/Admin/ExpenseController.php:97
* @route '/user/api/expenses/{expense}'
*/
show927ce5199d3ae56e19111554dccd4801Form.head = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show927ce5199d3ae56e19111554dccd4801.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show927ce5199d3ae56e19111554dccd4801.form = show927ce5199d3ae56e19111554dccd4801Form

export const show = {
    '/admin/api/expenses/{expense}': showe76154c7b3d50a2f5d9482db71b5789c,
    '/user/api/expenses/{expense}': show927ce5199d3ae56e19111554dccd4801,
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/admin/api/expenses/{expense}'
*/
const updatee76154c7b3d50a2f5d9482db71b5789c = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'put',
})

updatee76154c7b3d50a2f5d9482db71b5789c.definition = {
    methods: ["put","patch"],
    url: '/admin/api/expenses/{expense}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/admin/api/expenses/{expense}'
*/
updatee76154c7b3d50a2f5d9482db71b5789c.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updatee76154c7b3d50a2f5d9482db71b5789c.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/admin/api/expenses/{expense}'
*/
updatee76154c7b3d50a2f5d9482db71b5789c.put = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatee76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/admin/api/expenses/{expense}'
*/
updatee76154c7b3d50a2f5d9482db71b5789c.patch = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updatee76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/admin/api/expenses/{expense}'
*/
const updatee76154c7b3d50a2f5d9482db71b5789cForm = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatee76154c7b3d50a2f5d9482db71b5789c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/admin/api/expenses/{expense}'
*/
updatee76154c7b3d50a2f5d9482db71b5789cForm.put = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatee76154c7b3d50a2f5d9482db71b5789c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/admin/api/expenses/{expense}'
*/
updatee76154c7b3d50a2f5d9482db71b5789cForm.patch = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatee76154c7b3d50a2f5d9482db71b5789c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatee76154c7b3d50a2f5d9482db71b5789c.form = updatee76154c7b3d50a2f5d9482db71b5789cForm
/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/user/api/expenses/{expense}'
*/
const update927ce5199d3ae56e19111554dccd4801 = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update927ce5199d3ae56e19111554dccd4801.url(args, options),
    method: 'put',
})

update927ce5199d3ae56e19111554dccd4801.definition = {
    methods: ["put"],
    url: '/user/api/expenses/{expense}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/user/api/expenses/{expense}'
*/
update927ce5199d3ae56e19111554dccd4801.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update927ce5199d3ae56e19111554dccd4801.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/user/api/expenses/{expense}'
*/
update927ce5199d3ae56e19111554dccd4801.put = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update927ce5199d3ae56e19111554dccd4801.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/user/api/expenses/{expense}'
*/
const update927ce5199d3ae56e19111554dccd4801Form = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update927ce5199d3ae56e19111554dccd4801.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::update
* @see app/Http/Controllers/Admin/ExpenseController.php:104
* @route '/user/api/expenses/{expense}'
*/
update927ce5199d3ae56e19111554dccd4801Form.put = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update927ce5199d3ae56e19111554dccd4801.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update927ce5199d3ae56e19111554dccd4801.form = update927ce5199d3ae56e19111554dccd4801Form

export const update = {
    '/admin/api/expenses/{expense}': updatee76154c7b3d50a2f5d9482db71b5789c,
    '/user/api/expenses/{expense}': update927ce5199d3ae56e19111554dccd4801,
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/admin/api/expenses/{expense}'
*/
const destroye76154c7b3d50a2f5d9482db71b5789c = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'delete',
})

destroye76154c7b3d50a2f5d9482db71b5789c.definition = {
    methods: ["delete"],
    url: '/admin/api/expenses/{expense}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/admin/api/expenses/{expense}'
*/
destroye76154c7b3d50a2f5d9482db71b5789c.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroye76154c7b3d50a2f5d9482db71b5789c.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/admin/api/expenses/{expense}'
*/
destroye76154c7b3d50a2f5d9482db71b5789c.delete = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroye76154c7b3d50a2f5d9482db71b5789c.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/admin/api/expenses/{expense}'
*/
const destroye76154c7b3d50a2f5d9482db71b5789cForm = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroye76154c7b3d50a2f5d9482db71b5789c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/admin/api/expenses/{expense}'
*/
destroye76154c7b3d50a2f5d9482db71b5789cForm.delete = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroye76154c7b3d50a2f5d9482db71b5789c.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroye76154c7b3d50a2f5d9482db71b5789c.form = destroye76154c7b3d50a2f5d9482db71b5789cForm
/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/user/api/expenses/{expense}'
*/
const destroy927ce5199d3ae56e19111554dccd4801 = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy927ce5199d3ae56e19111554dccd4801.url(args, options),
    method: 'delete',
})

destroy927ce5199d3ae56e19111554dccd4801.definition = {
    methods: ["delete"],
    url: '/user/api/expenses/{expense}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/user/api/expenses/{expense}'
*/
destroy927ce5199d3ae56e19111554dccd4801.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy927ce5199d3ae56e19111554dccd4801.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/user/api/expenses/{expense}'
*/
destroy927ce5199d3ae56e19111554dccd4801.delete = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy927ce5199d3ae56e19111554dccd4801.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/user/api/expenses/{expense}'
*/
const destroy927ce5199d3ae56e19111554dccd4801Form = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy927ce5199d3ae56e19111554dccd4801.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::destroy
* @see app/Http/Controllers/Admin/ExpenseController.php:121
* @route '/user/api/expenses/{expense}'
*/
destroy927ce5199d3ae56e19111554dccd4801Form.delete = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy927ce5199d3ae56e19111554dccd4801.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy927ce5199d3ae56e19111554dccd4801.form = destroy927ce5199d3ae56e19111554dccd4801Form

export const destroy = {
    '/admin/api/expenses/{expense}': destroye76154c7b3d50a2f5d9482db71b5789c,
    '/user/api/expenses/{expense}': destroy927ce5199d3ae56e19111554dccd4801,
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
const analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52.url(options),
    method: 'post',
})

analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52.definition = {
    methods: ["post"],
    url: '/admin/api/expenses/analyze-receipt',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52.url = (options?: RouteQueryOptions) => {
    return analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
const analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/admin/api/expenses/analyze-receipt'
*/
analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52.url(options),
    method: 'post',
})

analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52.form = analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52Form
/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/user/api/expenses/analyze-receipt'
*/
const analyzeReceipt665797f2a1fc3c8f15da393767e1da13 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeReceipt665797f2a1fc3c8f15da393767e1da13.url(options),
    method: 'post',
})

analyzeReceipt665797f2a1fc3c8f15da393767e1da13.definition = {
    methods: ["post"],
    url: '/user/api/expenses/analyze-receipt',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/user/api/expenses/analyze-receipt'
*/
analyzeReceipt665797f2a1fc3c8f15da393767e1da13.url = (options?: RouteQueryOptions) => {
    return analyzeReceipt665797f2a1fc3c8f15da393767e1da13.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/user/api/expenses/analyze-receipt'
*/
analyzeReceipt665797f2a1fc3c8f15da393767e1da13.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: analyzeReceipt665797f2a1fc3c8f15da393767e1da13.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/user/api/expenses/analyze-receipt'
*/
const analyzeReceipt665797f2a1fc3c8f15da393767e1da13Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyzeReceipt665797f2a1fc3c8f15da393767e1da13.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ExpenseController::analyzeReceipt
* @see app/Http/Controllers/Admin/ExpenseController.php:128
* @route '/user/api/expenses/analyze-receipt'
*/
analyzeReceipt665797f2a1fc3c8f15da393767e1da13Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: analyzeReceipt665797f2a1fc3c8f15da393767e1da13.url(options),
    method: 'post',
})

analyzeReceipt665797f2a1fc3c8f15da393767e1da13.form = analyzeReceipt665797f2a1fc3c8f15da393767e1da13Form

export const analyzeReceipt = {
    '/admin/api/expenses/analyze-receipt': analyzeReceipt676b4d2f3ec4d5f282ebe75bdd594d52,
    '/user/api/expenses/analyze-receipt': analyzeReceipt665797f2a1fc3c8f15da393767e1da13,
}

const ExpenseController = { viewIndexUser, viewIndex, index, store, show, update, destroy, analyzeReceipt }

export default ExpenseController
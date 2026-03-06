import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/admin/api/clients'
*/
const index780139e4c4952c46788f76c1c67353e3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index780139e4c4952c46788f76c1c67353e3.url(options),
    method: 'get',
})

index780139e4c4952c46788f76c1c67353e3.definition = {
    methods: ["get","head"],
    url: '/admin/api/clients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/admin/api/clients'
*/
index780139e4c4952c46788f76c1c67353e3.url = (options?: RouteQueryOptions) => {
    return index780139e4c4952c46788f76c1c67353e3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/admin/api/clients'
*/
index780139e4c4952c46788f76c1c67353e3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index780139e4c4952c46788f76c1c67353e3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/admin/api/clients'
*/
index780139e4c4952c46788f76c1c67353e3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index780139e4c4952c46788f76c1c67353e3.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/admin/api/clients'
*/
const index780139e4c4952c46788f76c1c67353e3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index780139e4c4952c46788f76c1c67353e3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/admin/api/clients'
*/
index780139e4c4952c46788f76c1c67353e3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index780139e4c4952c46788f76c1c67353e3.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/admin/api/clients'
*/
index780139e4c4952c46788f76c1c67353e3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index780139e4c4952c46788f76c1c67353e3.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index780139e4c4952c46788f76c1c67353e3.form = index780139e4c4952c46788f76c1c67353e3Form
/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/user/api/clients'
*/
const indexbb4c8d27c41e561ec145383132573bab = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexbb4c8d27c41e561ec145383132573bab.url(options),
    method: 'get',
})

indexbb4c8d27c41e561ec145383132573bab.definition = {
    methods: ["get","head"],
    url: '/user/api/clients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/user/api/clients'
*/
indexbb4c8d27c41e561ec145383132573bab.url = (options?: RouteQueryOptions) => {
    return indexbb4c8d27c41e561ec145383132573bab.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/user/api/clients'
*/
indexbb4c8d27c41e561ec145383132573bab.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexbb4c8d27c41e561ec145383132573bab.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/user/api/clients'
*/
indexbb4c8d27c41e561ec145383132573bab.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexbb4c8d27c41e561ec145383132573bab.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/user/api/clients'
*/
const indexbb4c8d27c41e561ec145383132573babForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexbb4c8d27c41e561ec145383132573bab.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/user/api/clients'
*/
indexbb4c8d27c41e561ec145383132573babForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexbb4c8d27c41e561ec145383132573bab.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::index
* @see app/Http/Controllers/ClientController.php:13
* @route '/user/api/clients'
*/
indexbb4c8d27c41e561ec145383132573babForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexbb4c8d27c41e561ec145383132573bab.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexbb4c8d27c41e561ec145383132573bab.form = indexbb4c8d27c41e561ec145383132573babForm

export const index = {
    '/admin/api/clients': index780139e4c4952c46788f76c1c67353e3,
    '/user/api/clients': indexbb4c8d27c41e561ec145383132573bab,
}

/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/admin/api/clients'
*/
const store780139e4c4952c46788f76c1c67353e3 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store780139e4c4952c46788f76c1c67353e3.url(options),
    method: 'post',
})

store780139e4c4952c46788f76c1c67353e3.definition = {
    methods: ["post"],
    url: '/admin/api/clients',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/admin/api/clients'
*/
store780139e4c4952c46788f76c1c67353e3.url = (options?: RouteQueryOptions) => {
    return store780139e4c4952c46788f76c1c67353e3.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/admin/api/clients'
*/
store780139e4c4952c46788f76c1c67353e3.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store780139e4c4952c46788f76c1c67353e3.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/admin/api/clients'
*/
const store780139e4c4952c46788f76c1c67353e3Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store780139e4c4952c46788f76c1c67353e3.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/admin/api/clients'
*/
store780139e4c4952c46788f76c1c67353e3Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store780139e4c4952c46788f76c1c67353e3.url(options),
    method: 'post',
})

store780139e4c4952c46788f76c1c67353e3.form = store780139e4c4952c46788f76c1c67353e3Form
/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/user/api/clients'
*/
const storebb4c8d27c41e561ec145383132573bab = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storebb4c8d27c41e561ec145383132573bab.url(options),
    method: 'post',
})

storebb4c8d27c41e561ec145383132573bab.definition = {
    methods: ["post"],
    url: '/user/api/clients',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/user/api/clients'
*/
storebb4c8d27c41e561ec145383132573bab.url = (options?: RouteQueryOptions) => {
    return storebb4c8d27c41e561ec145383132573bab.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/user/api/clients'
*/
storebb4c8d27c41e561ec145383132573bab.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storebb4c8d27c41e561ec145383132573bab.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/user/api/clients'
*/
const storebb4c8d27c41e561ec145383132573babForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storebb4c8d27c41e561ec145383132573bab.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ClientController::store
* @see app/Http/Controllers/ClientController.php:31
* @route '/user/api/clients'
*/
storebb4c8d27c41e561ec145383132573babForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storebb4c8d27c41e561ec145383132573bab.url(options),
    method: 'post',
})

storebb4c8d27c41e561ec145383132573bab.form = storebb4c8d27c41e561ec145383132573babForm

export const store = {
    '/admin/api/clients': store780139e4c4952c46788f76c1c67353e3,
    '/user/api/clients': storebb4c8d27c41e561ec145383132573bab,
}

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/admin/api/clients/{id}'
*/
const show1c2ff4bee9f9a1c5c2dbb7558d81b3f3 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, options),
    method: 'get',
})

show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.definition = {
    methods: ["get","head"],
    url: '/admin/api/clients/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/admin/api/clients/{id}'
*/
show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/admin/api/clients/{id}'
*/
show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/admin/api/clients/{id}'
*/
show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/admin/api/clients/{id}'
*/
const show1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/admin/api/clients/{id}'
*/
show1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/admin/api/clients/{id}'
*/
show1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show1c2ff4bee9f9a1c5c2dbb7558d81b3f3.form = show1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form
/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/user/api/clients/{id}'
*/
const show2c40308726276dea5b559956a47c73e1 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show2c40308726276dea5b559956a47c73e1.url(args, options),
    method: 'get',
})

show2c40308726276dea5b559956a47c73e1.definition = {
    methods: ["get","head"],
    url: '/user/api/clients/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/user/api/clients/{id}'
*/
show2c40308726276dea5b559956a47c73e1.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show2c40308726276dea5b559956a47c73e1.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/user/api/clients/{id}'
*/
show2c40308726276dea5b559956a47c73e1.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show2c40308726276dea5b559956a47c73e1.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/user/api/clients/{id}'
*/
show2c40308726276dea5b559956a47c73e1.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show2c40308726276dea5b559956a47c73e1.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/user/api/clients/{id}'
*/
const show2c40308726276dea5b559956a47c73e1Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show2c40308726276dea5b559956a47c73e1.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/user/api/clients/{id}'
*/
show2c40308726276dea5b559956a47c73e1Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show2c40308726276dea5b559956a47c73e1.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ClientController::show
* @see app/Http/Controllers/ClientController.php:22
* @route '/user/api/clients/{id}'
*/
show2c40308726276dea5b559956a47c73e1Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show2c40308726276dea5b559956a47c73e1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show2c40308726276dea5b559956a47c73e1.form = show2c40308726276dea5b559956a47c73e1Form

export const show = {
    '/admin/api/clients/{id}': show1c2ff4bee9f9a1c5c2dbb7558d81b3f3,
    '/user/api/clients/{id}': show2c40308726276dea5b559956a47c73e1,
}

/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/admin/api/clients/{id}'
*/
const update1c2ff4bee9f9a1c5c2dbb7558d81b3f3 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, options),
    method: 'put',
})

update1c2ff4bee9f9a1c5c2dbb7558d81b3f3.definition = {
    methods: ["put"],
    url: '/admin/api/clients/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/admin/api/clients/{id}'
*/
update1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update1c2ff4bee9f9a1c5c2dbb7558d81b3f3.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/admin/api/clients/{id}'
*/
update1c2ff4bee9f9a1c5c2dbb7558d81b3f3.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/admin/api/clients/{id}'
*/
const update1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/admin/api/clients/{id}'
*/
update1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update1c2ff4bee9f9a1c5c2dbb7558d81b3f3.form = update1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form
/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/user/api/clients/{id}'
*/
const update2c40308726276dea5b559956a47c73e1 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update2c40308726276dea5b559956a47c73e1.url(args, options),
    method: 'put',
})

update2c40308726276dea5b559956a47c73e1.definition = {
    methods: ["put"],
    url: '/user/api/clients/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/user/api/clients/{id}'
*/
update2c40308726276dea5b559956a47c73e1.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update2c40308726276dea5b559956a47c73e1.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/user/api/clients/{id}'
*/
update2c40308726276dea5b559956a47c73e1.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update2c40308726276dea5b559956a47c73e1.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/user/api/clients/{id}'
*/
const update2c40308726276dea5b559956a47c73e1Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2c40308726276dea5b559956a47c73e1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ClientController::update
* @see app/Http/Controllers/ClientController.php:51
* @route '/user/api/clients/{id}'
*/
update2c40308726276dea5b559956a47c73e1Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update2c40308726276dea5b559956a47c73e1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update2c40308726276dea5b559956a47c73e1.form = update2c40308726276dea5b559956a47c73e1Form

export const update = {
    '/admin/api/clients/{id}': update1c2ff4bee9f9a1c5c2dbb7558d81b3f3,
    '/user/api/clients/{id}': update2c40308726276dea5b559956a47c73e1,
}

/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/admin/api/clients/{id}'
*/
const destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, options),
    method: 'delete',
})

destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3.definition = {
    methods: ["delete"],
    url: '/admin/api/clients/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/admin/api/clients/{id}'
*/
destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/admin/api/clients/{id}'
*/
destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/admin/api/clients/{id}'
*/
const destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/admin/api/clients/{id}'
*/
destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3.form = destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3Form
/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/user/api/clients/{id}'
*/
const destroy2c40308726276dea5b559956a47c73e1 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy2c40308726276dea5b559956a47c73e1.url(args, options),
    method: 'delete',
})

destroy2c40308726276dea5b559956a47c73e1.definition = {
    methods: ["delete"],
    url: '/user/api/clients/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/user/api/clients/{id}'
*/
destroy2c40308726276dea5b559956a47c73e1.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy2c40308726276dea5b559956a47c73e1.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/user/api/clients/{id}'
*/
destroy2c40308726276dea5b559956a47c73e1.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy2c40308726276dea5b559956a47c73e1.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/user/api/clients/{id}'
*/
const destroy2c40308726276dea5b559956a47c73e1Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy2c40308726276dea5b559956a47c73e1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ClientController::destroy
* @see app/Http/Controllers/ClientController.php:71
* @route '/user/api/clients/{id}'
*/
destroy2c40308726276dea5b559956a47c73e1Form.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy2c40308726276dea5b559956a47c73e1.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy2c40308726276dea5b559956a47c73e1.form = destroy2c40308726276dea5b559956a47c73e1Form

export const destroy = {
    '/admin/api/clients/{id}': destroy1c2ff4bee9f9a1c5c2dbb7558d81b3f3,
    '/user/api/clients/{id}': destroy2c40308726276dea5b559956a47c73e1,
}

const ClientController = { index, store, show, update, destroy }

export default ClientController
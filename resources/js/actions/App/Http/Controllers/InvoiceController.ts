import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
const indexea8acd51ae841b8b3afe1e7b4690930a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexea8acd51ae841b8b3afe1e7b4690930a.url(options),
    method: 'get',
})

indexea8acd51ae841b8b3afe1e7b4690930a.definition = {
    methods: ["get","head"],
    url: '/admin/api/invoices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
indexea8acd51ae841b8b3afe1e7b4690930a.url = (options?: RouteQueryOptions) => {
    return indexea8acd51ae841b8b3afe1e7b4690930a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
indexea8acd51ae841b8b3afe1e7b4690930a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexea8acd51ae841b8b3afe1e7b4690930a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
indexea8acd51ae841b8b3afe1e7b4690930a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexea8acd51ae841b8b3afe1e7b4690930a.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
const indexea8acd51ae841b8b3afe1e7b4690930aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexea8acd51ae841b8b3afe1e7b4690930a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
indexea8acd51ae841b8b3afe1e7b4690930aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexea8acd51ae841b8b3afe1e7b4690930a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
indexea8acd51ae841b8b3afe1e7b4690930aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexea8acd51ae841b8b3afe1e7b4690930a.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexea8acd51ae841b8b3afe1e7b4690930a.form = indexea8acd51ae841b8b3afe1e7b4690930aForm
/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/user/api/invoices'
*/
const indexb9c5160a38113138f2255ac96e9fb46e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb9c5160a38113138f2255ac96e9fb46e.url(options),
    method: 'get',
})

indexb9c5160a38113138f2255ac96e9fb46e.definition = {
    methods: ["get","head"],
    url: '/user/api/invoices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/user/api/invoices'
*/
indexb9c5160a38113138f2255ac96e9fb46e.url = (options?: RouteQueryOptions) => {
    return indexb9c5160a38113138f2255ac96e9fb46e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/user/api/invoices'
*/
indexb9c5160a38113138f2255ac96e9fb46e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb9c5160a38113138f2255ac96e9fb46e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/user/api/invoices'
*/
indexb9c5160a38113138f2255ac96e9fb46e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexb9c5160a38113138f2255ac96e9fb46e.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/user/api/invoices'
*/
const indexb9c5160a38113138f2255ac96e9fb46eForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb9c5160a38113138f2255ac96e9fb46e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/user/api/invoices'
*/
indexb9c5160a38113138f2255ac96e9fb46eForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb9c5160a38113138f2255ac96e9fb46e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/user/api/invoices'
*/
indexb9c5160a38113138f2255ac96e9fb46eForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb9c5160a38113138f2255ac96e9fb46e.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexb9c5160a38113138f2255ac96e9fb46e.form = indexb9c5160a38113138f2255ac96e9fb46eForm

export const index = {
    '/admin/api/invoices': indexea8acd51ae841b8b3afe1e7b4690930a,
    '/user/api/invoices': indexb9c5160a38113138f2255ac96e9fb46e,
}

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
const clientsList15d6461cb974b41507761ed8baf6959e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clientsList15d6461cb974b41507761ed8baf6959e.url(options),
    method: 'get',
})

clientsList15d6461cb974b41507761ed8baf6959e.definition = {
    methods: ["get","head"],
    url: '/admin/api/clients-list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clientsList15d6461cb974b41507761ed8baf6959e.url = (options?: RouteQueryOptions) => {
    return clientsList15d6461cb974b41507761ed8baf6959e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clientsList15d6461cb974b41507761ed8baf6959e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clientsList15d6461cb974b41507761ed8baf6959e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clientsList15d6461cb974b41507761ed8baf6959e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: clientsList15d6461cb974b41507761ed8baf6959e.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
const clientsList15d6461cb974b41507761ed8baf6959eForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: clientsList15d6461cb974b41507761ed8baf6959e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clientsList15d6461cb974b41507761ed8baf6959eForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: clientsList15d6461cb974b41507761ed8baf6959e.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clientsList15d6461cb974b41507761ed8baf6959eForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: clientsList15d6461cb974b41507761ed8baf6959e.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

clientsList15d6461cb974b41507761ed8baf6959e.form = clientsList15d6461cb974b41507761ed8baf6959eForm
/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/user/api/clients-list'
*/
const clientsListf5641622aaaab69ee8944c8b98079873 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clientsListf5641622aaaab69ee8944c8b98079873.url(options),
    method: 'get',
})

clientsListf5641622aaaab69ee8944c8b98079873.definition = {
    methods: ["get","head"],
    url: '/user/api/clients-list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/user/api/clients-list'
*/
clientsListf5641622aaaab69ee8944c8b98079873.url = (options?: RouteQueryOptions) => {
    return clientsListf5641622aaaab69ee8944c8b98079873.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/user/api/clients-list'
*/
clientsListf5641622aaaab69ee8944c8b98079873.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clientsListf5641622aaaab69ee8944c8b98079873.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/user/api/clients-list'
*/
clientsListf5641622aaaab69ee8944c8b98079873.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: clientsListf5641622aaaab69ee8944c8b98079873.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/user/api/clients-list'
*/
const clientsListf5641622aaaab69ee8944c8b98079873Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: clientsListf5641622aaaab69ee8944c8b98079873.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/user/api/clients-list'
*/
clientsListf5641622aaaab69ee8944c8b98079873Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: clientsListf5641622aaaab69ee8944c8b98079873.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::clientsList
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/user/api/clients-list'
*/
clientsListf5641622aaaab69ee8944c8b98079873Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: clientsListf5641622aaaab69ee8944c8b98079873.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

clientsListf5641622aaaab69ee8944c8b98079873.form = clientsListf5641622aaaab69ee8944c8b98079873Form

export const clientsList = {
    '/admin/api/clients-list': clientsList15d6461cb974b41507761ed8baf6959e,
    '/user/api/clients-list': clientsListf5641622aaaab69ee8944c8b98079873,
}

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
const storeea8acd51ae841b8b3afe1e7b4690930a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeea8acd51ae841b8b3afe1e7b4690930a.url(options),
    method: 'post',
})

storeea8acd51ae841b8b3afe1e7b4690930a.definition = {
    methods: ["post"],
    url: '/admin/api/invoices',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
storeea8acd51ae841b8b3afe1e7b4690930a.url = (options?: RouteQueryOptions) => {
    return storeea8acd51ae841b8b3afe1e7b4690930a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
storeea8acd51ae841b8b3afe1e7b4690930a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeea8acd51ae841b8b3afe1e7b4690930a.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
const storeea8acd51ae841b8b3afe1e7b4690930aForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeea8acd51ae841b8b3afe1e7b4690930a.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
storeea8acd51ae841b8b3afe1e7b4690930aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeea8acd51ae841b8b3afe1e7b4690930a.url(options),
    method: 'post',
})

storeea8acd51ae841b8b3afe1e7b4690930a.form = storeea8acd51ae841b8b3afe1e7b4690930aForm
/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/user/api/invoices'
*/
const storeb9c5160a38113138f2255ac96e9fb46e = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb9c5160a38113138f2255ac96e9fb46e.url(options),
    method: 'post',
})

storeb9c5160a38113138f2255ac96e9fb46e.definition = {
    methods: ["post"],
    url: '/user/api/invoices',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/user/api/invoices'
*/
storeb9c5160a38113138f2255ac96e9fb46e.url = (options?: RouteQueryOptions) => {
    return storeb9c5160a38113138f2255ac96e9fb46e.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/user/api/invoices'
*/
storeb9c5160a38113138f2255ac96e9fb46e.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb9c5160a38113138f2255ac96e9fb46e.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/user/api/invoices'
*/
const storeb9c5160a38113138f2255ac96e9fb46eForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb9c5160a38113138f2255ac96e9fb46e.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/user/api/invoices'
*/
storeb9c5160a38113138f2255ac96e9fb46eForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb9c5160a38113138f2255ac96e9fb46e.url(options),
    method: 'post',
})

storeb9c5160a38113138f2255ac96e9fb46e.form = storeb9c5160a38113138f2255ac96e9fb46eForm

export const store = {
    '/admin/api/invoices': storeea8acd51ae841b8b3afe1e7b4690930a,
    '/user/api/invoices': storeb9c5160a38113138f2255ac96e9fb46e,
}

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
const showfbe0125b816f9e9f1162c6e682355fec = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showfbe0125b816f9e9f1162c6e682355fec.url(args, options),
    method: 'get',
})

showfbe0125b816f9e9f1162c6e682355fec.definition = {
    methods: ["get","head"],
    url: '/admin/api/invoices/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
showfbe0125b816f9e9f1162c6e682355fec.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showfbe0125b816f9e9f1162c6e682355fec.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
showfbe0125b816f9e9f1162c6e682355fec.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showfbe0125b816f9e9f1162c6e682355fec.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
showfbe0125b816f9e9f1162c6e682355fec.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showfbe0125b816f9e9f1162c6e682355fec.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
const showfbe0125b816f9e9f1162c6e682355fecForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showfbe0125b816f9e9f1162c6e682355fec.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
showfbe0125b816f9e9f1162c6e682355fecForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showfbe0125b816f9e9f1162c6e682355fec.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
showfbe0125b816f9e9f1162c6e682355fecForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showfbe0125b816f9e9f1162c6e682355fec.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showfbe0125b816f9e9f1162c6e682355fec.form = showfbe0125b816f9e9f1162c6e682355fecForm
/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/user/api/invoices/{id}'
*/
const show45c5aa6660444a2f73677cc8b6f64356 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show45c5aa6660444a2f73677cc8b6f64356.url(args, options),
    method: 'get',
})

show45c5aa6660444a2f73677cc8b6f64356.definition = {
    methods: ["get","head"],
    url: '/user/api/invoices/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/user/api/invoices/{id}'
*/
show45c5aa6660444a2f73677cc8b6f64356.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show45c5aa6660444a2f73677cc8b6f64356.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/user/api/invoices/{id}'
*/
show45c5aa6660444a2f73677cc8b6f64356.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show45c5aa6660444a2f73677cc8b6f64356.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/user/api/invoices/{id}'
*/
show45c5aa6660444a2f73677cc8b6f64356.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show45c5aa6660444a2f73677cc8b6f64356.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/user/api/invoices/{id}'
*/
const show45c5aa6660444a2f73677cc8b6f64356Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show45c5aa6660444a2f73677cc8b6f64356.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/user/api/invoices/{id}'
*/
show45c5aa6660444a2f73677cc8b6f64356Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show45c5aa6660444a2f73677cc8b6f64356.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/user/api/invoices/{id}'
*/
show45c5aa6660444a2f73677cc8b6f64356Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show45c5aa6660444a2f73677cc8b6f64356.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show45c5aa6660444a2f73677cc8b6f64356.form = show45c5aa6660444a2f73677cc8b6f64356Form

export const show = {
    '/admin/api/invoices/{id}': showfbe0125b816f9e9f1162c6e682355fec,
    '/user/api/invoices/{id}': show45c5aa6660444a2f73677cc8b6f64356,
}

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/admin/api/invoices/{id}'
*/
const updatefbe0125b816f9e9f1162c6e682355fec = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatefbe0125b816f9e9f1162c6e682355fec.url(args, options),
    method: 'put',
})

updatefbe0125b816f9e9f1162c6e682355fec.definition = {
    methods: ["put"],
    url: '/admin/api/invoices/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/admin/api/invoices/{id}'
*/
updatefbe0125b816f9e9f1162c6e682355fec.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatefbe0125b816f9e9f1162c6e682355fec.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/admin/api/invoices/{id}'
*/
updatefbe0125b816f9e9f1162c6e682355fec.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatefbe0125b816f9e9f1162c6e682355fec.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/admin/api/invoices/{id}'
*/
const updatefbe0125b816f9e9f1162c6e682355fecForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatefbe0125b816f9e9f1162c6e682355fec.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/admin/api/invoices/{id}'
*/
updatefbe0125b816f9e9f1162c6e682355fecForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updatefbe0125b816f9e9f1162c6e682355fec.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updatefbe0125b816f9e9f1162c6e682355fec.form = updatefbe0125b816f9e9f1162c6e682355fecForm
/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/user/api/invoices/{id}'
*/
const update45c5aa6660444a2f73677cc8b6f64356 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update45c5aa6660444a2f73677cc8b6f64356.url(args, options),
    method: 'put',
})

update45c5aa6660444a2f73677cc8b6f64356.definition = {
    methods: ["put"],
    url: '/user/api/invoices/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/user/api/invoices/{id}'
*/
update45c5aa6660444a2f73677cc8b6f64356.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update45c5aa6660444a2f73677cc8b6f64356.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/user/api/invoices/{id}'
*/
update45c5aa6660444a2f73677cc8b6f64356.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update45c5aa6660444a2f73677cc8b6f64356.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/user/api/invoices/{id}'
*/
const update45c5aa6660444a2f73677cc8b6f64356Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update45c5aa6660444a2f73677cc8b6f64356.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/user/api/invoices/{id}'
*/
update45c5aa6660444a2f73677cc8b6f64356Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update45c5aa6660444a2f73677cc8b6f64356.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update45c5aa6660444a2f73677cc8b6f64356.form = update45c5aa6660444a2f73677cc8b6f64356Form

export const update = {
    '/admin/api/invoices/{id}': updatefbe0125b816f9e9f1162c6e682355fec,
    '/user/api/invoices/{id}': update45c5aa6660444a2f73677cc8b6f64356,
}

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/admin/api/invoices/{id}'
*/
const destroyfbe0125b816f9e9f1162c6e682355fec = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyfbe0125b816f9e9f1162c6e682355fec.url(args, options),
    method: 'delete',
})

destroyfbe0125b816f9e9f1162c6e682355fec.definition = {
    methods: ["delete"],
    url: '/admin/api/invoices/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/admin/api/invoices/{id}'
*/
destroyfbe0125b816f9e9f1162c6e682355fec.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroyfbe0125b816f9e9f1162c6e682355fec.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/admin/api/invoices/{id}'
*/
destroyfbe0125b816f9e9f1162c6e682355fec.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyfbe0125b816f9e9f1162c6e682355fec.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/admin/api/invoices/{id}'
*/
const destroyfbe0125b816f9e9f1162c6e682355fecForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyfbe0125b816f9e9f1162c6e682355fec.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/admin/api/invoices/{id}'
*/
destroyfbe0125b816f9e9f1162c6e682355fecForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroyfbe0125b816f9e9f1162c6e682355fec.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroyfbe0125b816f9e9f1162c6e682355fec.form = destroyfbe0125b816f9e9f1162c6e682355fecForm
/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/user/api/invoices/{id}'
*/
const destroy45c5aa6660444a2f73677cc8b6f64356 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy45c5aa6660444a2f73677cc8b6f64356.url(args, options),
    method: 'delete',
})

destroy45c5aa6660444a2f73677cc8b6f64356.definition = {
    methods: ["delete"],
    url: '/user/api/invoices/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/user/api/invoices/{id}'
*/
destroy45c5aa6660444a2f73677cc8b6f64356.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy45c5aa6660444a2f73677cc8b6f64356.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/user/api/invoices/{id}'
*/
destroy45c5aa6660444a2f73677cc8b6f64356.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy45c5aa6660444a2f73677cc8b6f64356.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/user/api/invoices/{id}'
*/
const destroy45c5aa6660444a2f73677cc8b6f64356Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy45c5aa6660444a2f73677cc8b6f64356.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/user/api/invoices/{id}'
*/
destroy45c5aa6660444a2f73677cc8b6f64356Form.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy45c5aa6660444a2f73677cc8b6f64356.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy45c5aa6660444a2f73677cc8b6f64356.form = destroy45c5aa6660444a2f73677cc8b6f64356Form

export const destroy = {
    '/admin/api/invoices/{id}': destroyfbe0125b816f9e9f1162c6e682355fec,
    '/user/api/invoices/{id}': destroy45c5aa6660444a2f73677cc8b6f64356,
}

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
const submit3ea9a75c5a3ae0a790b9e49a385a71b7 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit3ea9a75c5a3ae0a790b9e49a385a71b7.url(args, options),
    method: 'post',
})

submit3ea9a75c5a3ae0a790b9e49a385a71b7.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
submit3ea9a75c5a3ae0a790b9e49a385a71b7.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return submit3ea9a75c5a3ae0a790b9e49a385a71b7.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
submit3ea9a75c5a3ae0a790b9e49a385a71b7.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit3ea9a75c5a3ae0a790b9e49a385a71b7.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
const submit3ea9a75c5a3ae0a790b9e49a385a71b7Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit3ea9a75c5a3ae0a790b9e49a385a71b7.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
submit3ea9a75c5a3ae0a790b9e49a385a71b7Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit3ea9a75c5a3ae0a790b9e49a385a71b7.url(args, options),
    method: 'post',
})

submit3ea9a75c5a3ae0a790b9e49a385a71b7.form = submit3ea9a75c5a3ae0a790b9e49a385a71b7Form
/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/user/api/invoices/{id}/submit'
*/
const submit3407a520bb096185a9e7002ec182a1c3 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit3407a520bb096185a9e7002ec182a1c3.url(args, options),
    method: 'post',
})

submit3407a520bb096185a9e7002ec182a1c3.definition = {
    methods: ["post"],
    url: '/user/api/invoices/{id}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/user/api/invoices/{id}/submit'
*/
submit3407a520bb096185a9e7002ec182a1c3.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return submit3407a520bb096185a9e7002ec182a1c3.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/user/api/invoices/{id}/submit'
*/
submit3407a520bb096185a9e7002ec182a1c3.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit3407a520bb096185a9e7002ec182a1c3.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/user/api/invoices/{id}/submit'
*/
const submit3407a520bb096185a9e7002ec182a1c3Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit3407a520bb096185a9e7002ec182a1c3.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/user/api/invoices/{id}/submit'
*/
submit3407a520bb096185a9e7002ec182a1c3Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit3407a520bb096185a9e7002ec182a1c3.url(args, options),
    method: 'post',
})

submit3407a520bb096185a9e7002ec182a1c3.form = submit3407a520bb096185a9e7002ec182a1c3Form

export const submit = {
    '/admin/api/invoices/{id}/submit': submit3ea9a75c5a3ae0a790b9e49a385a71b7,
    '/user/api/invoices/{id}/submit': submit3407a520bb096185a9e7002ec182a1c3,
}

/**
* @see \App\Http\Controllers\InvoiceController::approve
* @see app/Http/Controllers/InvoiceController.php:187
* @route '/admin/api/invoices/{id}/approve'
*/
export const approve = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::approve
* @see app/Http/Controllers/InvoiceController.php:187
* @route '/admin/api/invoices/{id}/approve'
*/
approve.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return approve.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::approve
* @see app/Http/Controllers/InvoiceController.php:187
* @route '/admin/api/invoices/{id}/approve'
*/
approve.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::approve
* @see app/Http/Controllers/InvoiceController.php:187
* @route '/admin/api/invoices/{id}/approve'
*/
const approveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::approve
* @see app/Http/Controllers/InvoiceController.php:187
* @route '/admin/api/invoices/{id}/approve'
*/
approveForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\InvoiceController::markPaid
* @see app/Http/Controllers/InvoiceController.php:201
* @route '/admin/api/invoices/{id}/mark-paid'
*/
export const markPaid = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markPaid.url(args, options),
    method: 'post',
})

markPaid.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/mark-paid',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::markPaid
* @see app/Http/Controllers/InvoiceController.php:201
* @route '/admin/api/invoices/{id}/mark-paid'
*/
markPaid.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return markPaid.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::markPaid
* @see app/Http/Controllers/InvoiceController.php:201
* @route '/admin/api/invoices/{id}/mark-paid'
*/
markPaid.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markPaid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::markPaid
* @see app/Http/Controllers/InvoiceController.php:201
* @route '/admin/api/invoices/{id}/mark-paid'
*/
const markPaidForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markPaid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::markPaid
* @see app/Http/Controllers/InvoiceController.php:201
* @route '/admin/api/invoices/{id}/mark-paid'
*/
markPaidForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markPaid.url(args, options),
    method: 'post',
})

markPaid.form = markPaidForm

/**
* @see \App\Http\Controllers\InvoiceController::markUnpaid
* @see app/Http/Controllers/InvoiceController.php:215
* @route '/admin/api/invoices/{id}/mark-unpaid'
*/
export const markUnpaid = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markUnpaid.url(args, options),
    method: 'post',
})

markUnpaid.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/mark-unpaid',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::markUnpaid
* @see app/Http/Controllers/InvoiceController.php:215
* @route '/admin/api/invoices/{id}/mark-unpaid'
*/
markUnpaid.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return markUnpaid.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::markUnpaid
* @see app/Http/Controllers/InvoiceController.php:215
* @route '/admin/api/invoices/{id}/mark-unpaid'
*/
markUnpaid.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markUnpaid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::markUnpaid
* @see app/Http/Controllers/InvoiceController.php:215
* @route '/admin/api/invoices/{id}/mark-unpaid'
*/
const markUnpaidForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markUnpaid.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::markUnpaid
* @see app/Http/Controllers/InvoiceController.php:215
* @route '/admin/api/invoices/{id}/mark-unpaid'
*/
markUnpaidForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markUnpaid.url(args, options),
    method: 'post',
})

markUnpaid.form = markUnpaidForm

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/admin/api/invoices/{id}/request-modification'
*/
const requestModification2a1f8a551612fea093b5749789f85ae4 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestModification2a1f8a551612fea093b5749789f85ae4.url(args, options),
    method: 'post',
})

requestModification2a1f8a551612fea093b5749789f85ae4.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/request-modification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/admin/api/invoices/{id}/request-modification'
*/
requestModification2a1f8a551612fea093b5749789f85ae4.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return requestModification2a1f8a551612fea093b5749789f85ae4.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/admin/api/invoices/{id}/request-modification'
*/
requestModification2a1f8a551612fea093b5749789f85ae4.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestModification2a1f8a551612fea093b5749789f85ae4.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/admin/api/invoices/{id}/request-modification'
*/
const requestModification2a1f8a551612fea093b5749789f85ae4Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: requestModification2a1f8a551612fea093b5749789f85ae4.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/admin/api/invoices/{id}/request-modification'
*/
requestModification2a1f8a551612fea093b5749789f85ae4Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: requestModification2a1f8a551612fea093b5749789f85ae4.url(args, options),
    method: 'post',
})

requestModification2a1f8a551612fea093b5749789f85ae4.form = requestModification2a1f8a551612fea093b5749789f85ae4Form
/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/user/api/invoices/{id}/request-modification'
*/
const requestModificationce02c7d89a8e024fc0819ffe2bab3e2f = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestModificationce02c7d89a8e024fc0819ffe2bab3e2f.url(args, options),
    method: 'post',
})

requestModificationce02c7d89a8e024fc0819ffe2bab3e2f.definition = {
    methods: ["post"],
    url: '/user/api/invoices/{id}/request-modification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/user/api/invoices/{id}/request-modification'
*/
requestModificationce02c7d89a8e024fc0819ffe2bab3e2f.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return requestModificationce02c7d89a8e024fc0819ffe2bab3e2f.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/user/api/invoices/{id}/request-modification'
*/
requestModificationce02c7d89a8e024fc0819ffe2bab3e2f.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestModificationce02c7d89a8e024fc0819ffe2bab3e2f.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/user/api/invoices/{id}/request-modification'
*/
const requestModificationce02c7d89a8e024fc0819ffe2bab3e2fForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: requestModificationce02c7d89a8e024fc0819ffe2bab3e2f.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/user/api/invoices/{id}/request-modification'
*/
requestModificationce02c7d89a8e024fc0819ffe2bab3e2fForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: requestModificationce02c7d89a8e024fc0819ffe2bab3e2f.url(args, options),
    method: 'post',
})

requestModificationce02c7d89a8e024fc0819ffe2bab3e2f.form = requestModificationce02c7d89a8e024fc0819ffe2bab3e2fForm

export const requestModification = {
    '/admin/api/invoices/{id}/request-modification': requestModification2a1f8a551612fea093b5749789f85ae4,
    '/user/api/invoices/{id}/request-modification': requestModificationce02c7d89a8e024fc0819ffe2bab3e2f,
}

/**
* @see \App\Http\Controllers\InvoiceController::approveModification
* @see app/Http/Controllers/InvoiceController.php:257
* @route '/admin/api/invoices/{id}/approve-modification'
*/
export const approveModification = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveModification.url(args, options),
    method: 'post',
})

approveModification.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/approve-modification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::approveModification
* @see app/Http/Controllers/InvoiceController.php:257
* @route '/admin/api/invoices/{id}/approve-modification'
*/
approveModification.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return approveModification.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::approveModification
* @see app/Http/Controllers/InvoiceController.php:257
* @route '/admin/api/invoices/{id}/approve-modification'
*/
approveModification.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveModification.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::approveModification
* @see app/Http/Controllers/InvoiceController.php:257
* @route '/admin/api/invoices/{id}/approve-modification'
*/
const approveModificationForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveModification.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::approveModification
* @see app/Http/Controllers/InvoiceController.php:257
* @route '/admin/api/invoices/{id}/approve-modification'
*/
approveModificationForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveModification.url(args, options),
    method: 'post',
})

approveModification.form = approveModificationForm

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/admin/api/invoices/{id}/validate-proforma'
*/
const validateProformab5acbacd7dec6414208d361753d24f8f = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateProformab5acbacd7dec6414208d361753d24f8f.url(args, options),
    method: 'post',
})

validateProformab5acbacd7dec6414208d361753d24f8f.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/validate-proforma',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/admin/api/invoices/{id}/validate-proforma'
*/
validateProformab5acbacd7dec6414208d361753d24f8f.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return validateProformab5acbacd7dec6414208d361753d24f8f.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/admin/api/invoices/{id}/validate-proforma'
*/
validateProformab5acbacd7dec6414208d361753d24f8f.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateProformab5acbacd7dec6414208d361753d24f8f.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/admin/api/invoices/{id}/validate-proforma'
*/
const validateProformab5acbacd7dec6414208d361753d24f8fForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateProformab5acbacd7dec6414208d361753d24f8f.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/admin/api/invoices/{id}/validate-proforma'
*/
validateProformab5acbacd7dec6414208d361753d24f8fForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateProformab5acbacd7dec6414208d361753d24f8f.url(args, options),
    method: 'post',
})

validateProformab5acbacd7dec6414208d361753d24f8f.form = validateProformab5acbacd7dec6414208d361753d24f8fForm
/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/user/api/invoices/{id}/validate-proforma'
*/
const validateProformaefd5842ccb307004e30971020a994f49 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateProformaefd5842ccb307004e30971020a994f49.url(args, options),
    method: 'post',
})

validateProformaefd5842ccb307004e30971020a994f49.definition = {
    methods: ["post"],
    url: '/user/api/invoices/{id}/validate-proforma',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/user/api/invoices/{id}/validate-proforma'
*/
validateProformaefd5842ccb307004e30971020a994f49.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return validateProformaefd5842ccb307004e30971020a994f49.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/user/api/invoices/{id}/validate-proforma'
*/
validateProformaefd5842ccb307004e30971020a994f49.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateProformaefd5842ccb307004e30971020a994f49.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/user/api/invoices/{id}/validate-proforma'
*/
const validateProformaefd5842ccb307004e30971020a994f49Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateProformaefd5842ccb307004e30971020a994f49.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/user/api/invoices/{id}/validate-proforma'
*/
validateProformaefd5842ccb307004e30971020a994f49Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateProformaefd5842ccb307004e30971020a994f49.url(args, options),
    method: 'post',
})

validateProformaefd5842ccb307004e30971020a994f49.form = validateProformaefd5842ccb307004e30971020a994f49Form

export const validateProforma = {
    '/admin/api/invoices/{id}/validate-proforma': validateProformab5acbacd7dec6414208d361753d24f8f,
    '/user/api/invoices/{id}/validate-proforma': validateProformaefd5842ccb307004e30971020a994f49,
}

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
const pdfView00e5cb3f3cf2e96b840d41eb830873a4 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfView00e5cb3f3cf2e96b840d41eb830873a4.url(args, options),
    method: 'get',
})

pdfView00e5cb3f3cf2e96b840d41eb830873a4.definition = {
    methods: ["get","head"],
    url: '/admin/api/invoices/{id}/pdf/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
pdfView00e5cb3f3cf2e96b840d41eb830873a4.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return pdfView00e5cb3f3cf2e96b840d41eb830873a4.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
pdfView00e5cb3f3cf2e96b840d41eb830873a4.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfView00e5cb3f3cf2e96b840d41eb830873a4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
pdfView00e5cb3f3cf2e96b840d41eb830873a4.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdfView00e5cb3f3cf2e96b840d41eb830873a4.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
const pdfView00e5cb3f3cf2e96b840d41eb830873a4Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfView00e5cb3f3cf2e96b840d41eb830873a4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
pdfView00e5cb3f3cf2e96b840d41eb830873a4Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfView00e5cb3f3cf2e96b840d41eb830873a4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
pdfView00e5cb3f3cf2e96b840d41eb830873a4Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfView00e5cb3f3cf2e96b840d41eb830873a4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pdfView00e5cb3f3cf2e96b840d41eb830873a4.form = pdfView00e5cb3f3cf2e96b840d41eb830873a4Form
/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/user/api/invoices/{id}/pdf/view'
*/
const pdfView8b55aeda2170be2f8ae2dc21ed72c341 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfView8b55aeda2170be2f8ae2dc21ed72c341.url(args, options),
    method: 'get',
})

pdfView8b55aeda2170be2f8ae2dc21ed72c341.definition = {
    methods: ["get","head"],
    url: '/user/api/invoices/{id}/pdf/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/user/api/invoices/{id}/pdf/view'
*/
pdfView8b55aeda2170be2f8ae2dc21ed72c341.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return pdfView8b55aeda2170be2f8ae2dc21ed72c341.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/user/api/invoices/{id}/pdf/view'
*/
pdfView8b55aeda2170be2f8ae2dc21ed72c341.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfView8b55aeda2170be2f8ae2dc21ed72c341.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/user/api/invoices/{id}/pdf/view'
*/
pdfView8b55aeda2170be2f8ae2dc21ed72c341.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdfView8b55aeda2170be2f8ae2dc21ed72c341.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/user/api/invoices/{id}/pdf/view'
*/
const pdfView8b55aeda2170be2f8ae2dc21ed72c341Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfView8b55aeda2170be2f8ae2dc21ed72c341.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/user/api/invoices/{id}/pdf/view'
*/
pdfView8b55aeda2170be2f8ae2dc21ed72c341Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfView8b55aeda2170be2f8ae2dc21ed72c341.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfView
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/user/api/invoices/{id}/pdf/view'
*/
pdfView8b55aeda2170be2f8ae2dc21ed72c341Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfView8b55aeda2170be2f8ae2dc21ed72c341.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pdfView8b55aeda2170be2f8ae2dc21ed72c341.form = pdfView8b55aeda2170be2f8ae2dc21ed72c341Form

export const pdfView = {
    '/admin/api/invoices/{id}/pdf/view': pdfView00e5cb3f3cf2e96b840d41eb830873a4,
    '/user/api/invoices/{id}/pdf/view': pdfView8b55aeda2170be2f8ae2dc21ed72c341,
}

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
const pdfDownload0c3a94af8fa964d9eaf0dc14172ac140 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.url(args, options),
    method: 'get',
})

pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.definition = {
    methods: ["get","head"],
    url: '/admin/api/invoices/{id}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
const pdfDownload0c3a94af8fa964d9eaf0dc14172ac140Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
pdfDownload0c3a94af8fa964d9eaf0dc14172ac140Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
pdfDownload0c3a94af8fa964d9eaf0dc14172ac140Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pdfDownload0c3a94af8fa964d9eaf0dc14172ac140.form = pdfDownload0c3a94af8fa964d9eaf0dc14172ac140Form
/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/user/api/invoices/{id}/pdf/download'
*/
const pdfDownloadf959ee8405668d56ca8b0a0b15e395f3 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.url(args, options),
    method: 'get',
})

pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.definition = {
    methods: ["get","head"],
    url: '/user/api/invoices/{id}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/user/api/invoices/{id}/pdf/download'
*/
pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/user/api/invoices/{id}/pdf/download'
*/
pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/user/api/invoices/{id}/pdf/download'
*/
pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/user/api/invoices/{id}/pdf/download'
*/
const pdfDownloadf959ee8405668d56ca8b0a0b15e395f3Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/user/api/invoices/{id}/pdf/download'
*/
pdfDownloadf959ee8405668d56ca8b0a0b15e395f3Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::pdfDownload
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/user/api/invoices/{id}/pdf/download'
*/
pdfDownloadf959ee8405668d56ca8b0a0b15e395f3Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pdfDownloadf959ee8405668d56ca8b0a0b15e395f3.form = pdfDownloadf959ee8405668d56ca8b0a0b15e395f3Form

export const pdfDownload = {
    '/admin/api/invoices/{id}/pdf/download': pdfDownload0c3a94af8fa964d9eaf0dc14172ac140,
    '/user/api/invoices/{id}/pdf/download': pdfDownloadf959ee8405668d56ca8b0a0b15e395f3,
}

const InvoiceController = { index, clientsList, store, show, update, destroy, submit, approve, markPaid, markUnpaid, requestModification, approveModification, validateProforma, pdfView, pdfDownload }

export default InvoiceController
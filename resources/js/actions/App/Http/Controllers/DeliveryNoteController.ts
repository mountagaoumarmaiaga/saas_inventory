import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
const index0e0baba220c00c8da57726b0baac2bd5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0e0baba220c00c8da57726b0baac2bd5.url(options),
    method: 'get',
})

index0e0baba220c00c8da57726b0baac2bd5.definition = {
    methods: ["get","head"],
    url: '/admin/api/delivery-notes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
index0e0baba220c00c8da57726b0baac2bd5.url = (options?: RouteQueryOptions) => {
    return index0e0baba220c00c8da57726b0baac2bd5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
index0e0baba220c00c8da57726b0baac2bd5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index0e0baba220c00c8da57726b0baac2bd5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
index0e0baba220c00c8da57726b0baac2bd5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index0e0baba220c00c8da57726b0baac2bd5.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
const index0e0baba220c00c8da57726b0baac2bd5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index0e0baba220c00c8da57726b0baac2bd5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
index0e0baba220c00c8da57726b0baac2bd5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index0e0baba220c00c8da57726b0baac2bd5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
index0e0baba220c00c8da57726b0baac2bd5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index0e0baba220c00c8da57726b0baac2bd5.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index0e0baba220c00c8da57726b0baac2bd5.form = index0e0baba220c00c8da57726b0baac2bd5Form
/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
const indexebae5170f3415bc5d2515242c9a77125 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexebae5170f3415bc5d2515242c9a77125.url(options),
    method: 'get',
})

indexebae5170f3415bc5d2515242c9a77125.definition = {
    methods: ["get","head"],
    url: '/user/api/delivery-notes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
indexebae5170f3415bc5d2515242c9a77125.url = (options?: RouteQueryOptions) => {
    return indexebae5170f3415bc5d2515242c9a77125.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
indexebae5170f3415bc5d2515242c9a77125.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexebae5170f3415bc5d2515242c9a77125.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
indexebae5170f3415bc5d2515242c9a77125.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexebae5170f3415bc5d2515242c9a77125.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
const indexebae5170f3415bc5d2515242c9a77125Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexebae5170f3415bc5d2515242c9a77125.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
indexebae5170f3415bc5d2515242c9a77125Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexebae5170f3415bc5d2515242c9a77125.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
indexebae5170f3415bc5d2515242c9a77125Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexebae5170f3415bc5d2515242c9a77125.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexebae5170f3415bc5d2515242c9a77125.form = indexebae5170f3415bc5d2515242c9a77125Form

export const index = {
    '/admin/api/delivery-notes': index0e0baba220c00c8da57726b0baac2bd5,
    '/user/api/delivery-notes': indexebae5170f3415bc5d2515242c9a77125,
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
const show9e3da6cdaf1f9808680ff6e21a19e99f = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show9e3da6cdaf1f9808680ff6e21a19e99f.url(args, options),
    method: 'get',
})

show9e3da6cdaf1f9808680ff6e21a19e99f.definition = {
    methods: ["get","head"],
    url: '/admin/api/delivery-notes/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
show9e3da6cdaf1f9808680ff6e21a19e99f.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show9e3da6cdaf1f9808680ff6e21a19e99f.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
show9e3da6cdaf1f9808680ff6e21a19e99f.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show9e3da6cdaf1f9808680ff6e21a19e99f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
show9e3da6cdaf1f9808680ff6e21a19e99f.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show9e3da6cdaf1f9808680ff6e21a19e99f.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
const show9e3da6cdaf1f9808680ff6e21a19e99fForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show9e3da6cdaf1f9808680ff6e21a19e99f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
show9e3da6cdaf1f9808680ff6e21a19e99fForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show9e3da6cdaf1f9808680ff6e21a19e99f.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
show9e3da6cdaf1f9808680ff6e21a19e99fForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show9e3da6cdaf1f9808680ff6e21a19e99f.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show9e3da6cdaf1f9808680ff6e21a19e99f.form = show9e3da6cdaf1f9808680ff6e21a19e99fForm
/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
*/
const show6a1b0c4d97f26d44ed3eb99987517fb6 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6a1b0c4d97f26d44ed3eb99987517fb6.url(args, options),
    method: 'get',
})

show6a1b0c4d97f26d44ed3eb99987517fb6.definition = {
    methods: ["get","head"],
    url: '/user/api/delivery-notes/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
*/
show6a1b0c4d97f26d44ed3eb99987517fb6.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show6a1b0c4d97f26d44ed3eb99987517fb6.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
*/
show6a1b0c4d97f26d44ed3eb99987517fb6.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6a1b0c4d97f26d44ed3eb99987517fb6.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
*/
show6a1b0c4d97f26d44ed3eb99987517fb6.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show6a1b0c4d97f26d44ed3eb99987517fb6.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
*/
const show6a1b0c4d97f26d44ed3eb99987517fb6Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6a1b0c4d97f26d44ed3eb99987517fb6.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
*/
show6a1b0c4d97f26d44ed3eb99987517fb6Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6a1b0c4d97f26d44ed3eb99987517fb6.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
*/
show6a1b0c4d97f26d44ed3eb99987517fb6Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6a1b0c4d97f26d44ed3eb99987517fb6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show6a1b0c4d97f26d44ed3eb99987517fb6.form = show6a1b0c4d97f26d44ed3eb99987517fb6Form

export const show = {
    '/admin/api/delivery-notes/{id}': show9e3da6cdaf1f9808680ff6e21a19e99f,
    '/user/api/delivery-notes/{id}': show6a1b0c4d97f26d44ed3eb99987517fb6,
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
*/
const update9e3da6cdaf1f9808680ff6e21a19e99f = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9e3da6cdaf1f9808680ff6e21a19e99f.url(args, options),
    method: 'put',
})

update9e3da6cdaf1f9808680ff6e21a19e99f.definition = {
    methods: ["put"],
    url: '/admin/api/delivery-notes/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
*/
update9e3da6cdaf1f9808680ff6e21a19e99f.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update9e3da6cdaf1f9808680ff6e21a19e99f.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
*/
update9e3da6cdaf1f9808680ff6e21a19e99f.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update9e3da6cdaf1f9808680ff6e21a19e99f.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
*/
const update9e3da6cdaf1f9808680ff6e21a19e99fForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update9e3da6cdaf1f9808680ff6e21a19e99f.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
*/
update9e3da6cdaf1f9808680ff6e21a19e99fForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update9e3da6cdaf1f9808680ff6e21a19e99f.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update9e3da6cdaf1f9808680ff6e21a19e99f.form = update9e3da6cdaf1f9808680ff6e21a19e99fForm
/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/user/api/delivery-notes/{id}'
*/
const update6a1b0c4d97f26d44ed3eb99987517fb6 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update6a1b0c4d97f26d44ed3eb99987517fb6.url(args, options),
    method: 'put',
})

update6a1b0c4d97f26d44ed3eb99987517fb6.definition = {
    methods: ["put"],
    url: '/user/api/delivery-notes/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/user/api/delivery-notes/{id}'
*/
update6a1b0c4d97f26d44ed3eb99987517fb6.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update6a1b0c4d97f26d44ed3eb99987517fb6.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/user/api/delivery-notes/{id}'
*/
update6a1b0c4d97f26d44ed3eb99987517fb6.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update6a1b0c4d97f26d44ed3eb99987517fb6.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/user/api/delivery-notes/{id}'
*/
const update6a1b0c4d97f26d44ed3eb99987517fb6Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update6a1b0c4d97f26d44ed3eb99987517fb6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/user/api/delivery-notes/{id}'
*/
update6a1b0c4d97f26d44ed3eb99987517fb6Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update6a1b0c4d97f26d44ed3eb99987517fb6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update6a1b0c4d97f26d44ed3eb99987517fb6.form = update6a1b0c4d97f26d44ed3eb99987517fb6Form

export const update = {
    '/admin/api/delivery-notes/{id}': update9e3da6cdaf1f9808680ff6e21a19e99f,
    '/user/api/delivery-notes/{id}': update6a1b0c4d97f26d44ed3eb99987517fb6,
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
const createFromInvoice1b2c74720b6f0ae7d8f973707178d89a = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromInvoice1b2c74720b6f0ae7d8f973707178d89a.url(args, options),
    method: 'post',
})

createFromInvoice1b2c74720b6f0ae7d8f973707178d89a.definition = {
    methods: ["post"],
    url: '/admin/api/delivery-notes/from-invoice/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoice1b2c74720b6f0ae7d8f973707178d89a.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return createFromInvoice1b2c74720b6f0ae7d8f973707178d89a.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoice1b2c74720b6f0ae7d8f973707178d89a.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromInvoice1b2c74720b6f0ae7d8f973707178d89a.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
const createFromInvoice1b2c74720b6f0ae7d8f973707178d89aForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createFromInvoice1b2c74720b6f0ae7d8f973707178d89a.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoice1b2c74720b6f0ae7d8f973707178d89aForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createFromInvoice1b2c74720b6f0ae7d8f973707178d89a.url(args, options),
    method: 'post',
})

createFromInvoice1b2c74720b6f0ae7d8f973707178d89a.form = createFromInvoice1b2c74720b6f0ae7d8f973707178d89aForm
/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/user/api/delivery-notes/from-invoice/{id}'
*/
const createFromInvoice73e8511a4d93fd7d376fd767e0a18c86 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromInvoice73e8511a4d93fd7d376fd767e0a18c86.url(args, options),
    method: 'post',
})

createFromInvoice73e8511a4d93fd7d376fd767e0a18c86.definition = {
    methods: ["post"],
    url: '/user/api/delivery-notes/from-invoice/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/user/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoice73e8511a4d93fd7d376fd767e0a18c86.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return createFromInvoice73e8511a4d93fd7d376fd767e0a18c86.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/user/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoice73e8511a4d93fd7d376fd767e0a18c86.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromInvoice73e8511a4d93fd7d376fd767e0a18c86.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/user/api/delivery-notes/from-invoice/{id}'
*/
const createFromInvoice73e8511a4d93fd7d376fd767e0a18c86Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createFromInvoice73e8511a4d93fd7d376fd767e0a18c86.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/user/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoice73e8511a4d93fd7d376fd767e0a18c86Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createFromInvoice73e8511a4d93fd7d376fd767e0a18c86.url(args, options),
    method: 'post',
})

createFromInvoice73e8511a4d93fd7d376fd767e0a18c86.form = createFromInvoice73e8511a4d93fd7d376fd767e0a18c86Form

export const createFromInvoice = {
    '/admin/api/delivery-notes/from-invoice/{id}': createFromInvoice1b2c74720b6f0ae7d8f973707178d89a,
    '/user/api/delivery-notes/from-invoice/{id}': createFromInvoice73e8511a4d93fd7d376fd767e0a18c86,
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
const downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.url(args, options),
    method: 'get',
})

downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.definition = {
    methods: ["get","head"],
    url: '/admin/api/delivery-notes/{id}/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
const downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3Form.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3Form.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3.form = downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3Form
/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
*/
const downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.url(args, options),
    method: 'get',
})

downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.definition = {
    methods: ["get","head"],
    url: '/user/api/delivery-notes/{id}/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
*/
downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
*/
downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
*/
downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
*/
const downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcfForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
*/
downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcfForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::downloadPdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
*/
downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcfForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf.form = downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcfForm

export const downloadPdf = {
    '/admin/api/delivery-notes/{id}/pdf': downloadPdf841bd6b88355cb8831f3ef1d27e1ddc3,
    '/user/api/delivery-notes/{id}/pdf': downloadPdf9f7c06aba7dfb6ba1137d6faadbe4bcf,
}

const DeliveryNoteController = { index, show, update, createFromInvoice, downloadPdf }

export default DeliveryNoteController
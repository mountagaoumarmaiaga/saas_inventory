import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
import pdf from './pdf'
/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/api/invoices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::index
* @see app/Http/Controllers/InvoiceController.php:27
* @route '/admin/api/invoices'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\InvoiceController::clients
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
export const clients = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clients.url(options),
    method: 'get',
})

clients.definition = {
    methods: ["get","head"],
    url: '/admin/api/clients-list',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::clients
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clients.url = (options?: RouteQueryOptions) => {
    return clients.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::clients
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clients.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clients.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::clients
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clients.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: clients.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::clients
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
const clientsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: clients.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::clients
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clientsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: clients.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::clients
* @see app/Http/Controllers/InvoiceController.php:298
* @route '/admin/api/clients-list'
*/
clientsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: clients.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

clients.form = clientsForm

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/api/invoices',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::store
* @see app/Http/Controllers/InvoiceController.php:46
* @route '/admin/api/invoices'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/api/invoices/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
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
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::show
* @see app/Http/Controllers/InvoiceController.php:37
* @route '/admin/api/invoices/{id}'
*/
showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/admin/api/invoices/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/api/invoices/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/admin/api/invoices/{id}'
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
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/admin/api/invoices/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\InvoiceController::update
* @see app/Http/Controllers/InvoiceController.php:110
* @route '/admin/api/invoices/{id}'
*/
const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
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
updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/admin/api/invoices/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/api/invoices/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/admin/api/invoices/{id}'
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
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/admin/api/invoices/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\InvoiceController::destroy
* @see app/Http/Controllers/InvoiceController.php:287
* @route '/admin/api/invoices/{id}'
*/
const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
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
destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
export const submit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
submit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return submit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
submit.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
const submitForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::submit
* @see app/Http/Controllers/InvoiceController.php:176
* @route '/admin/api/invoices/{id}/submit'
*/
submitForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(args, options),
    method: 'post',
})

submit.form = submitForm

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
export const requestModification = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestModification.url(args, options),
    method: 'post',
})

requestModification.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/request-modification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/admin/api/invoices/{id}/request-modification'
*/
requestModification.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return requestModification.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/admin/api/invoices/{id}/request-modification'
*/
requestModification.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: requestModification.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/admin/api/invoices/{id}/request-modification'
*/
const requestModificationForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: requestModification.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::requestModification
* @see app/Http/Controllers/InvoiceController.php:237
* @route '/admin/api/invoices/{id}/request-modification'
*/
requestModificationForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: requestModification.url(args, options),
    method: 'post',
})

requestModification.form = requestModificationForm

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
export const validateProforma = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateProforma.url(args, options),
    method: 'post',
})

validateProforma.definition = {
    methods: ["post"],
    url: '/admin/api/invoices/{id}/validate-proforma',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/admin/api/invoices/{id}/validate-proforma'
*/
validateProforma.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return validateProforma.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/admin/api/invoices/{id}/validate-proforma'
*/
validateProforma.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: validateProforma.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/admin/api/invoices/{id}/validate-proforma'
*/
const validateProformaForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateProforma.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvoiceController::validateProforma
* @see app/Http/Controllers/InvoiceController.php:226
* @route '/admin/api/invoices/{id}/validate-proforma'
*/
validateProformaForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: validateProforma.url(args, options),
    method: 'post',
})

validateProforma.form = validateProformaForm

const invoices = {
    index: Object.assign(index, index),
    clients: Object.assign(clients, clients),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    submit: Object.assign(submit, submit),
    approve: Object.assign(approve, approve),
    markPaid: Object.assign(markPaid, markPaid),
    markUnpaid: Object.assign(markUnpaid, markUnpaid),
    requestModification: Object.assign(requestModification, requestModification),
    approveModification: Object.assign(approveModification, approveModification),
    validateProforma: Object.assign(validateProforma, validateProforma),
    pdf: Object.assign(pdf, pdf),
}

export default invoices
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/api/delivery-notes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/admin/api/delivery-notes'
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
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/api/delivery-notes/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
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
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
*/
showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/admin/api/delivery-notes/{id}'
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
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/api/delivery-notes/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
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
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
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
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/admin/api/delivery-notes/{id}'
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
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
export const createFromInvoice = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromInvoice.url(args, options),
    method: 'post',
})

createFromInvoice.definition = {
    methods: ["post"],
    url: '/admin/api/delivery-notes/from-invoice/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoice.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return createFromInvoice.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoice.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromInvoice.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
const createFromInvoiceForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createFromInvoice.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/admin/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoiceForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createFromInvoice.url(args, options),
    method: 'post',
})

createFromInvoice.form = createFromInvoiceForm

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
export const pdf = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/admin/api/delivery-notes/{id}/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
pdf.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return pdf.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
pdf.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
pdf.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
const pdfForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
pdfForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/admin/api/delivery-notes/{id}/pdf'
*/
pdfForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pdf.form = pdfForm

const deliveryNotes = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    createFromInvoice: Object.assign(createFromInvoice, createFromInvoice),
    pdf: Object.assign(pdf, pdf),
}

export default deliveryNotes
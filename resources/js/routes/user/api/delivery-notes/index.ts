import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/user/api/delivery-notes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::index
* @see app/Http/Controllers/DeliveryNoteController.php:40
* @route '/user/api/delivery-notes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
*/
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/api/delivery-notes/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
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
* @route '/user/api/delivery-notes/{id}'
*/
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::show
* @see app/Http/Controllers/DeliveryNoteController.php:57
* @route '/user/api/delivery-notes/{id}'
*/
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/user/api/delivery-notes/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/user/api/delivery-notes/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::update
* @see app/Http/Controllers/DeliveryNoteController.php:93
* @route '/user/api/delivery-notes/{id}'
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
* @route '/user/api/delivery-notes/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/user/api/delivery-notes/from-invoice/{id}'
*/
export const createFromInvoice = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromInvoice.url(args, options),
    method: 'post',
})

createFromInvoice.definition = {
    methods: ["post"],
    url: '/user/api/delivery-notes/from-invoice/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::createFromInvoice
* @see app/Http/Controllers/DeliveryNoteController.php:70
* @route '/user/api/delivery-notes/from-invoice/{id}'
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
* @route '/user/api/delivery-notes/from-invoice/{id}'
*/
createFromInvoice.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createFromInvoice.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
*/
export const pdf = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/user/api/delivery-notes/{id}/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
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
* @route '/user/api/delivery-notes/{id}/pdf'
*/
pdf.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryNoteController::pdf
* @see app/Http/Controllers/DeliveryNoteController.php:24
* @route '/user/api/delivery-notes/{id}/pdf'
*/
pdf.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(args, options),
    method: 'head',
})

const deliveryNotes = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    createFromInvoice: Object.assign(createFromInvoice, createFromInvoice),
    pdf: Object.assign(pdf, pdf),
}

export default deliveryNotes
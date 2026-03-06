import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\InvoiceController::view
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
export const view = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/admin/api/invoices/{id}/pdf/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::view
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
view.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return view.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::view
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
view.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::view
* @see app/Http/Controllers/InvoiceController.php:270
* @route '/admin/api/invoices/{id}/pdf/view'
*/
view.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvoiceController::download
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
export const download = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admin/api/invoices/{id}/pdf/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvoiceController::download
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
download.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvoiceController::download
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
download.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvoiceController::download
* @see app/Http/Controllers/InvoiceController.php:279
* @route '/admin/api/invoices/{id}/pdf/download'
*/
download.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

const pdf = {
    view: Object.assign(view, view),
    download: Object.assign(download, download),
}

export default pdf
import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicInvoiceController::show
* @see app/Http/Controllers/PublicInvoiceController.php:11
* @route '/i/{uuid}'
*/
export const show = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/i/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicInvoiceController::show
* @see app/Http/Controllers/PublicInvoiceController.php:11
* @route '/i/{uuid}'
*/
show.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    if (Array.isArray(args)) {
        args = {
            uuid: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        uuid: args.uuid,
    }

    return show.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicInvoiceController::show
* @see app/Http/Controllers/PublicInvoiceController.php:11
* @route '/i/{uuid}'
*/
show.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicInvoiceController::show
* @see app/Http/Controllers/PublicInvoiceController.php:11
* @route '/i/{uuid}'
*/
show.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

const invoice = {
    show: Object.assign(show, show),
}

export default invoice
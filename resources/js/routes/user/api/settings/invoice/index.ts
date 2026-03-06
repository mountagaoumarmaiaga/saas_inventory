import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/user/api/settings/invoice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

const invoice = {
    show: Object.assign(show, show),
}

export default invoice
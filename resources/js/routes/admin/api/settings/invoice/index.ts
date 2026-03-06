import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/api/settings/invoice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::update
* @see app/Http/Controllers/EntrepriseSettingsController.php:22
* @route '/admin/api/settings/invoice'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/api/settings/invoice',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::update
* @see app/Http/Controllers/EntrepriseSettingsController.php:22
* @route '/admin/api/settings/invoice'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::update
* @see app/Http/Controllers/EntrepriseSettingsController.php:22
* @route '/admin/api/settings/invoice'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::update
* @see app/Http/Controllers/EntrepriseSettingsController.php:22
* @route '/admin/api/settings/invoice'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::update
* @see app/Http/Controllers/EntrepriseSettingsController.php:22
* @route '/admin/api/settings/invoice'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::logo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
export const logo = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logo.url(options),
    method: 'post',
})

logo.definition = {
    methods: ["post"],
    url: '/admin/api/settings/invoice/logo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::logo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
logo.url = (options?: RouteQueryOptions) => {
    return logo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::logo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
logo.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logo.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::logo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
const logoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logo.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::logo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
logoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: logo.url(options),
    method: 'post',
})

logo.form = logoForm

const invoice = {
    show: Object.assign(show, show),
    update: Object.assign(update, update),
    logo: Object.assign(logo, logo),
}

export default invoice
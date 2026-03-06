import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
const show6e5a60a6a8a0418d2b6f5eb0473eca06 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6e5a60a6a8a0418d2b6f5eb0473eca06.url(options),
    method: 'get',
})

show6e5a60a6a8a0418d2b6f5eb0473eca06.definition = {
    methods: ["get","head"],
    url: '/admin/api/settings/invoice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
show6e5a60a6a8a0418d2b6f5eb0473eca06.url = (options?: RouteQueryOptions) => {
    return show6e5a60a6a8a0418d2b6f5eb0473eca06.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
show6e5a60a6a8a0418d2b6f5eb0473eca06.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show6e5a60a6a8a0418d2b6f5eb0473eca06.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
show6e5a60a6a8a0418d2b6f5eb0473eca06.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show6e5a60a6a8a0418d2b6f5eb0473eca06.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
const show6e5a60a6a8a0418d2b6f5eb0473eca06Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6e5a60a6a8a0418d2b6f5eb0473eca06.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
show6e5a60a6a8a0418d2b6f5eb0473eca06Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6e5a60a6a8a0418d2b6f5eb0473eca06.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/admin/api/settings/invoice'
*/
show6e5a60a6a8a0418d2b6f5eb0473eca06Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show6e5a60a6a8a0418d2b6f5eb0473eca06.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show6e5a60a6a8a0418d2b6f5eb0473eca06.form = show6e5a60a6a8a0418d2b6f5eb0473eca06Form
/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
const show8062dc74812c63abd81ec5b42bf9eec5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show8062dc74812c63abd81ec5b42bf9eec5.url(options),
    method: 'get',
})

show8062dc74812c63abd81ec5b42bf9eec5.definition = {
    methods: ["get","head"],
    url: '/user/api/settings/invoice',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
show8062dc74812c63abd81ec5b42bf9eec5.url = (options?: RouteQueryOptions) => {
    return show8062dc74812c63abd81ec5b42bf9eec5.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
show8062dc74812c63abd81ec5b42bf9eec5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show8062dc74812c63abd81ec5b42bf9eec5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
show8062dc74812c63abd81ec5b42bf9eec5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show8062dc74812c63abd81ec5b42bf9eec5.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
const show8062dc74812c63abd81ec5b42bf9eec5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show8062dc74812c63abd81ec5b42bf9eec5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
show8062dc74812c63abd81ec5b42bf9eec5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show8062dc74812c63abd81ec5b42bf9eec5.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::show
* @see app/Http/Controllers/EntrepriseSettingsController.php:15
* @route '/user/api/settings/invoice'
*/
show8062dc74812c63abd81ec5b42bf9eec5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show8062dc74812c63abd81ec5b42bf9eec5.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show8062dc74812c63abd81ec5b42bf9eec5.form = show8062dc74812c63abd81ec5b42bf9eec5Form

export const show = {
    '/admin/api/settings/invoice': show6e5a60a6a8a0418d2b6f5eb0473eca06,
    '/user/api/settings/invoice': show8062dc74812c63abd81ec5b42bf9eec5,
}

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
* @see \App\Http\Controllers\EntrepriseSettingsController::uploadLogo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
export const uploadLogo = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLogo.url(options),
    method: 'post',
})

uploadLogo.definition = {
    methods: ["post"],
    url: '/admin/api/settings/invoice/logo',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::uploadLogo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
uploadLogo.url = (options?: RouteQueryOptions) => {
    return uploadLogo.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::uploadLogo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
uploadLogo.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadLogo.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::uploadLogo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
const uploadLogoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadLogo.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\EntrepriseSettingsController::uploadLogo
* @see app/Http/Controllers/EntrepriseSettingsController.php:53
* @route '/admin/api/settings/invoice/logo'
*/
uploadLogoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadLogo.url(options),
    method: 'post',
})

uploadLogo.form = uploadLogoForm

const EntrepriseSettingsController = { show, update, uploadLogo }

export default EntrepriseSettingsController
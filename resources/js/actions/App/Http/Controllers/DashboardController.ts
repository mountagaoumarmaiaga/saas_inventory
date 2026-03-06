import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardController::indexUser
* @see app/Http/Controllers/DashboardController.php:252
* @route '/user/dashboard'
*/
export const indexUser = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexUser.url(options),
    method: 'get',
})

indexUser.definition = {
    methods: ["get","head"],
    url: '/user/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::indexUser
* @see app/Http/Controllers/DashboardController.php:252
* @route '/user/dashboard'
*/
indexUser.url = (options?: RouteQueryOptions) => {
    return indexUser.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::indexUser
* @see app/Http/Controllers/DashboardController.php:252
* @route '/user/dashboard'
*/
indexUser.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexUser.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::indexUser
* @see app/Http/Controllers/DashboardController.php:252
* @route '/user/dashboard'
*/
indexUser.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexUser.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::indexUser
* @see app/Http/Controllers/DashboardController.php:252
* @route '/user/dashboard'
*/
const indexUserForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexUser.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::indexUser
* @see app/Http/Controllers/DashboardController.php:252
* @route '/user/dashboard'
*/
indexUserForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexUser.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::indexUser
* @see app/Http/Controllers/DashboardController.php:252
* @route '/user/dashboard'
*/
indexUserForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexUser.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexUser.form = indexUserForm

/**
* @see \App\Http\Controllers\DashboardController::indexAdmin
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
export const indexAdmin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexAdmin.url(options),
    method: 'get',
})

indexAdmin.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::indexAdmin
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
indexAdmin.url = (options?: RouteQueryOptions) => {
    return indexAdmin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::indexAdmin
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
indexAdmin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexAdmin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::indexAdmin
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
indexAdmin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexAdmin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DashboardController::indexAdmin
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
const indexAdminForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexAdmin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::indexAdmin
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
indexAdminForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexAdmin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DashboardController::indexAdmin
* @see app/Http/Controllers/DashboardController.php:18
* @route '/admin/dashboard'
*/
indexAdminForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexAdmin.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexAdmin.form = indexAdminForm

const DashboardController = { indexUser, indexAdmin }

export default DashboardController
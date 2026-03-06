import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::index
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:15
* @route '/super-admin/enterprises'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/super-admin/enterprises',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::index
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:15
* @route '/super-admin/enterprises'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::index
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:15
* @route '/super-admin/enterprises'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::index
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:15
* @route '/super-admin/enterprises'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::index
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:15
* @route '/super-admin/enterprises'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::index
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:15
* @route '/super-admin/enterprises'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::index
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:15
* @route '/super-admin/enterprises'
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
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::store
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:23
* @route '/super-admin/enterprises'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/super-admin/enterprises',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::store
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:23
* @route '/super-admin/enterprises'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::store
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:23
* @route '/super-admin/enterprises'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::store
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:23
* @route '/super-admin/enterprises'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::store
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:23
* @route '/super-admin/enterprises'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::resetPassword
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:70
* @route '/super-admin/enterprises/{id}/reset-password'
*/
export const resetPassword = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetPassword.url(args, options),
    method: 'post',
})

resetPassword.definition = {
    methods: ["post"],
    url: '/super-admin/enterprises/{id}/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::resetPassword
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:70
* @route '/super-admin/enterprises/{id}/reset-password'
*/
resetPassword.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return resetPassword.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::resetPassword
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:70
* @route '/super-admin/enterprises/{id}/reset-password'
*/
resetPassword.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetPassword.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::resetPassword
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:70
* @route '/super-admin/enterprises/{id}/reset-password'
*/
const resetPasswordForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resetPassword.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SuperAdmin\EnterpriseController::resetPassword
* @see app/Http/Controllers/SuperAdmin/EnterpriseController.php:70
* @route '/super-admin/enterprises/{id}/reset-password'
*/
resetPasswordForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resetPassword.url(args, options),
    method: 'post',
})

resetPassword.form = resetPasswordForm

const EnterpriseController = { index, store, resetPassword }

export default EnterpriseController
import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:65
* @route '/pending-approval'
*/
export const approval = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: approval.url(options),
    method: 'get',
})

approval.definition = {
    methods: ["get","head"],
    url: '/pending-approval',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:65
* @route '/pending-approval'
*/
approval.url = (options?: RouteQueryOptions) => {
    return approval.definition.url + queryParams(options)
}

/**
* @see routes/web.php:65
* @route '/pending-approval'
*/
approval.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: approval.url(options),
    method: 'get',
})

/**
* @see routes/web.php:65
* @route '/pending-approval'
*/
approval.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: approval.url(options),
    method: 'head',
})

/**
* @see routes/web.php:65
* @route '/pending-approval'
*/
const approvalForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: approval.url(options),
    method: 'get',
})

/**
* @see routes/web.php:65
* @route '/pending-approval'
*/
approvalForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: approval.url(options),
    method: 'get',
})

/**
* @see routes/web.php:65
* @route '/pending-approval'
*/
approvalForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: approval.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

approval.form = approvalForm

const pending = {
    approval: Object.assign(approval, approval),
}

export default pending
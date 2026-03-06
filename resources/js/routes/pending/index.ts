import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
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

const pending = {
    approval: Object.assign(approval, approval),
}

export default pending
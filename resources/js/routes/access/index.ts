import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see routes/web.php:67
* @route '/request-access'
*/
export const request = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: request.url(options),
    method: 'post',
})

request.definition = {
    methods: ["post"],
    url: '/request-access',
} satisfies RouteDefinition<["post"]>

/**
* @see routes/web.php:67
* @route '/request-access'
*/
request.url = (options?: RouteQueryOptions) => {
    return request.definition.url + queryParams(options)
}

/**
* @see routes/web.php:67
* @route '/request-access'
*/
request.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: request.url(options),
    method: 'post',
})

/**
* @see routes/web.php:67
* @route '/request-access'
*/
const requestForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: request.url(options),
    method: 'post',
})

/**
* @see routes/web.php:67
* @route '/request-access'
*/
requestForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: request.url(options),
    method: 'post',
})

request.form = requestForm

const access = {
    request: Object.assign(request, request),
}

export default access
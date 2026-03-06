import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see routes/web.php:237
* @route '/admin/settings/invoice-customization'
*/
export const invoiceCustomization = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoiceCustomization.url(options),
    method: 'get',
})

invoiceCustomization.definition = {
    methods: ["get","head"],
    url: '/admin/settings/invoice-customization',
} satisfies RouteDefinition<["get","head"]>

/**
* @see routes/web.php:237
* @route '/admin/settings/invoice-customization'
*/
invoiceCustomization.url = (options?: RouteQueryOptions) => {
    return invoiceCustomization.definition.url + queryParams(options)
}

/**
* @see routes/web.php:237
* @route '/admin/settings/invoice-customization'
*/
invoiceCustomization.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoiceCustomization.url(options),
    method: 'get',
})

/**
* @see routes/web.php:237
* @route '/admin/settings/invoice-customization'
*/
invoiceCustomization.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: invoiceCustomization.url(options),
    method: 'head',
})

const settings = {
    invoiceCustomization: Object.assign(invoiceCustomization, invoiceCustomization),
}

export default settings
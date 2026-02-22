// resources/js/types/ziggy.d.ts
import 'ziggy-js';

declare global {
  type RouteParamValue = string | number | boolean | null | undefined;
  type RouteParams = Record<string, RouteParamValue> | string | number;

  function route(
    name: string,
    params?: RouteParams,
    absolute?: boolean,
    customZiggy?: Record<string, unknown>
  ): string;
}

export {};

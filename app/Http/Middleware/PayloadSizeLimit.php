<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PayloadSizeLimit
{
    /**
     * Max payload size in bytes (1MB = 1048576)
     */
    private int $maxSize = 1048576;

    public function handle(Request $request, Closure $next): Response
    {
        // On autorise des payloads plus larges uniquement pour l'analyse de reçus (OCR) ou import CSV
        $exemptedRoutes = ['expenses/analyze-receipt', 'api/import'];

        foreach ($exemptedRoutes as $route) {
            if ($request->is($route)) {
                return $next($request);
            }
        }

        $contentLength = $request->server('CONTENT_LENGTH');

        if ($contentLength !== null && $contentLength > $this->maxSize) {
            abort(413, 'Payload Too Large: Request body exceeds the 1MB limit for security reasons.');
        }

        if (strlen($request->getContent()) > $this->maxSize) {
            abort(413, 'Payload Too Large: Request body exceeds the 1MB limit for security reasons.');
        }

        return $next($request);
    }
}

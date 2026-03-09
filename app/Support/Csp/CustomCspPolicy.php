<?php

namespace App\Support\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policy;
use Spatie\Csp\Preset;
use Spatie\Csp\Presets\Basic;

class CustomCspPolicy implements Preset
{
    public function configure(Policy $policy): void
    {
        // Apply the Basic preset manually without addNonce(Directive::STYLE)
        // so that 'unsafe-inline' works for React and Vite UI Components.
        $policy
            ->add(Directive::BASE, Keyword::SELF)
            ->add(Directive::CONNECT, [Keyword::SELF, 'https://*.supabase.co', 'http://localhost:*', 'ws://localhost:*'])
            ->add(Directive::DEFAULT, Keyword::SELF)
            ->add(Directive::FORM_ACTION, Keyword::SELF)
            ->add(Directive::IMG, [
                Keyword::SELF,
                'data:',
                'https:',
                'http://localhost:*'
            ])
            ->add(Directive::MEDIA, Keyword::SELF)
            ->add(Directive::OBJECT, Keyword::NONE)
            ->add(Directive::SCRIPT, [
                Keyword::SELF,
                'https://challenges.cloudflare.com',
                'https://*.laravel.cloud',
                'http://localhost:*',
                Keyword::UNSAFE_INLINE,
                Keyword::UNSAFE_EVAL
            ])
            ->add(Directive::STYLE, [
                Keyword::SELF,
                'https://fonts.googleapis.com',
                'http://localhost:*',
                Keyword::UNSAFE_INLINE
            ])
            // style-src-attr allows inline style="" attributes on elements set by JS libraries
            // (Recharts, Radix UI, etc.) — NOT overridden by nonce unlike style-src
            ->add(Directive::STYLE_ATTR, Keyword::UNSAFE_INLINE)
            // Google Fonts actual font files
            ->add(Directive::FONT, [Keyword::SELF, 'https://fonts.gstatic.com']);
    }
}

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
            ->add(Directive::CONNECT, Keyword::SELF)
            ->add(Directive::DEFAULT, Keyword::SELF)
            ->add(Directive::FORM_ACTION, Keyword::SELF)
            ->add(Directive::IMG, Keyword::SELF)
            ->add(Directive::MEDIA, Keyword::SELF)
            ->add(Directive::OBJECT, Keyword::NONE)
            ->add(Directive::SCRIPT, Keyword::SELF)
            ->add(Directive::STYLE, Keyword::SELF)
            ->addNonce(Directive::SCRIPT)
            
            // Custom Directives
            ->add(Directive::STYLE, Keyword::UNSAFE_INLINE)
            ->add(Directive::STYLE, 'https://fonts.googleapis.com')
            ->add(Directive::SCRIPT, Keyword::UNSAFE_EVAL)
            // style-src-attr allows inline style="" attributes on elements set by JS libraries
            // (Recharts, Radix UI, etc.) — NOT overridden by nonce unlike style-src
            ->add(Directive::STYLE_ATTR, Keyword::UNSAFE_INLINE)
            // Google Fonts actual font files
            ->add(Directive::FONT, Keyword::SELF)
            ->add(Directive::FONT, 'https://fonts.gstatic.com')
            // Supabase storage / images
            ->add(Directive::CONNECT, 'https://*.supabase.co')
            ->add(Directive::IMG, [Keyword::SELF, 'data:', 'https://*.supabase.co', 'https://fonts.gstatic.com']);

        if (app()->environment('local')) {
            $policy
                ->add(Directive::CONNECT, 'ws://localhost:*')
                ->add(Directive::CONNECT, 'http://localhost:*')
                ->add(Directive::SCRIPT, 'http://localhost:*')
                ->add(Directive::SCRIPT, Keyword::UNSAFE_INLINE)
                ->add(Directive::STYLE, 'http://localhost:*')
                ->add(Directive::IMG, 'http://localhost:*');
        }
    }
}

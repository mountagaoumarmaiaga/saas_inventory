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
        // Apply the Basic preset first
        (new Basic())->configure($policy);

        $policy
            ->add(Directive::STYLE, Keyword::UNSAFE_INLINE)
            ->add(Directive::SCRIPT, Keyword::UNSAFE_EVAL)
            ->add(Directive::CONNECT, 'https://*.supabase.co')
            ->add(Directive::IMG, [Keyword::SELF, 'data:', 'https://*.supabase.co']);

        if (app()->environment('local')) {
            $policy
                ->add(Directive::CONNECT, 'ws://localhost:*')
                ->add(Directive::CONNECT, 'http://localhost:*')
                ->add(Directive::SCRIPT, 'http://localhost:*')
                ->add(Directive::STYLE, 'http://localhost:*');
        }
    }
}

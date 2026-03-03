<?php

namespace App\Support\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Presets\Basic;

class CustomCspPolicy extends Basic
{
    public function configure()
    {
        parent::configure();

        $this
            ->addDirective(Directive::STYLE, Keyword::UNSAFE_INLINE)
            ->addDirective(Directive::SCRIPT, Keyword::UNSAFE_EVAL) // Nécessaire pour React/Vite en dev, idéalement retiré en prod pure
            ->addDirective(Directive::CONNECT, 'https://*.supabase.co') // Autoriser les requêtes vers Supabase API/Storage
            ->addDirective(Directive::IMG, [Keyword::SELF, 'data:', 'https://*.supabase.co']);
            
        if (app()->environment('local')) {
            $this->addDirective(Directive::CONNECT, 'ws://localhost:*')
                 ->addDirective(Directive::CONNECT, 'http://localhost:*')
                 ->addDirective(Directive::SCRIPT, 'http://localhost:*')
                 ->addDirective(Directive::STYLE, 'http://localhost:*');
        }
    }
}

import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import AppLogo from "@/components/app-logo";
import { Quote, ShieldCheck, Star, Activity } from "lucide-react";

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 font-sans selection:bg-primary/30 text-foreground">
      {/* Left Column - Branding & Testimonials (Fixed) */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-950 relative overflow-hidden p-12 text-white border-r border-white/5">
        {/* Background Patterns - Orange/Black Theme */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-600/20 via-zinc-950 to-zinc-950 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-green-600/10 via-zinc-950 to-zinc-950 pointer-events-none" />

        {/* 3D-like Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />

        <div className="relative z-10">
          <Link href="/">
            <AppLogo className="text-white h-10 w-auto" />
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <div className="space-y-4">
            <div className="flex gap-1 text-orange-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-5 fill-current" />
              ))}
            </div>
            <blockquote className="space-y-4">
              <Quote className="size-10 text-white/20 -mb-4 transform -scale-x-100" />
              <p className="text-2xl font-medium leading-relaxed font-heading">
                "C'est la solution que j'attendais. Gestion de stock impeccable, facturation rapide, et un support réactif. Indispensable."
              </p>
              <footer className="flex items-center gap-4 pt-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 p-[2px] shadow-lg">
                  <div className="size-full rounded-full bg-zinc-900 flex items-center justify-center text-sm font-bold text-white">
                    PS
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-white">Le PDG</div>
                  <div className="text-sm text-zinc-400">Pharmacie Saran Nana Medical SARL</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-sm text-zinc-500 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-green-500" />
            <span>Données sécurisées (SSL)</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-orange-500" />
            <span>99.9% Uptime</span>
          </div>
          <span>© {new Date().getFullYear()} NextGenStock</span>
        </div>
      </div>

      {/* Right Column - Form Area */}
      <div className="relative flex items-center justify-center p-6 md:p-12 bg-background">
        {/* Mobile Logo for small screens */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/">
            <AppLogo className="h-8 w-auto" />
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}

          {/* Trust Badges Footer (Mobile/Desktop) */}
          <div className="pt-8 border-t border-border flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs text-muted-foreground grayscale opacity-70">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" />
              <span>RGPD Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif italic font-bold">Secure</span>
              <span>Connexion Chiffrée</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

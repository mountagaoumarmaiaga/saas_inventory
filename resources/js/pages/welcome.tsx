import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Star, ShieldCheck, Users, CheckCircle2, ChevronRight, LayoutDashboard, Zap, Shield, Menu, Package, TrendingUp, ShoppingCart, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';
import { cn } from '@/lib/utils';

export default function Welcome() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="NextGenStock - Gestion de Stock pour tous" />

            <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary">

                {/* Navbar - Transparent at top, Glass on scroll */}
                <header
                    className={cn(
                        "fixed top-0 inset-x-0 z-50 h-20 transition-all duration-300 ease-in-out flex items-center",
                        isScrolled
                            ? "bg-background/80 backdrop-blur-md border-b border-border/10 shadow-sm supports-[backdrop-filter]:bg-background/60"
                            : "bg-transparent border-b border-transparent"
                    )}
                >
                    <div className="container mx-auto px-6 h-full flex items-center justify-between">
                        <AppLogo className="h-10 w-auto" />

                        <nav className="hidden md:flex items-center gap-8">
                            {['Solutions', 'Clientèle', 'Tarifs'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:scale-105 transform",
                                        isScrolled ? "text-muted-foreground hover:text-foreground" : "text-foreground/80 hover:text-white"
                                    )}
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className={cn(
                                    "text-sm font-medium transition-all hidden sm:block",
                                    isScrolled ? "text-foreground hover:text-primary" : "text-foreground/80 hover:text-foreground"
                                )}
                            >
                                Connexion
                            </Link>
                            <Button asChild className="rounded-xl px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-[0.98] border-0">
                                <Link href="/register">Essai Gratuit</Link>
                            </Button>
                        </div>
                    </div>
                </header>

                <main>
                    <section className="relative pt-32 pb-20 lg:pt-0 lg:h-screen lg:flex lg:items-center overflow-hidden">
                        {/* Blob Backgrounds - Neutral/Pro */}
                        <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 right-0 translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="container mx-auto px-6 relative z-10 w-full">
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                                {/* Text Content */}
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="space-y-8 max-w-2xl lg:order-1"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase shadow-sm"
                                    >
                                        <Zap className="size-3.5" />
                                        La solution Tout-en-un
                                    </motion.div>

                                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-[1.1] text-foreground">
                                        Pilotez votre activité <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                                            en temps réel.
                                        </span>
                                    </h1>

                                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-sans">
                                        Commerce, Industrie, Services... Peu importe votre secteur. Centralisez vos stocks, factures et clients sur une plateforme unique et intuitive avec une interface premium.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <Button size="lg" className="h-14 px-8 rounded-2xl text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1" asChild>
                                            <Link href="/register">
                                                Commencer maintenant
                                                <ChevronRight className="ml-2 size-5" />
                                            </Link>
                                        </Button>

                                        <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-lg border-border/60 backdrop-blur-sm bg-background/50 hover:bg-muted/80 gap-2 group transition-all hover:-translate-y-1">
                                            <Play className="size-4 fill-current group-hover:scale-110 transition-transform text-primary" />
                                            Voir la vidéo
                                        </Button>
                                    </div>

                                    <div className="pt-6 flex flex-wrap items-center gap-6 lg:gap-8 text-sm font-medium text-muted-foreground border-t border-border/40">
                                        <div className="flex items-center gap-2 text-foreground font-semibold">
                                            <ShieldCheck className="size-5 text-success" />
                                            RGPD & Sécurité
                                        </div>
                                        <div className="flex items-center gap-2 text-foreground font-semibold">
                                            <Users className="size-5 text-primary" />
                                            Validé par +1500 PME
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Visual Mockup - General Business Dashboard */}
                                <motion.div
                                    initial={{ opacity: 0, x: 50, rotateY: 10 }}
                                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                    className="relative hidden lg:block h-[500px] lg:order-2 perspective-1000"
                                >
                                    {/* Image Mockup */}
                                    <div className="w-full h-full rounded-[2rem] shadow-2xl border-4 border-white/40 dark:border-white/10 overflow-hidden relative mx-auto transform hover:scale-[1.02] transition-transform duration-700 bg-background flex items-center justify-center ring-1 ring-border/50">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                                        <img
                                            src="/images/nextgenstock_ui.png"
                                            alt="NextGenStock Dashboard Interface"
                                            className="w-full h-full object-cover object-left-top"
                                        />
                                    </div>

                                    {/* Testimonial Card - Keeping the Real Client */}
                                    <motion.div style={{ y: y1 }} className="absolute -bottom-6 -left-8 z-40">
                                        <div className="p-5 bg-background/60 backdrop-blur-2xl border border-border/40 rounded-2xl shadow-xl max-w-[340px] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                            <div className="flex gap-1 mb-2">
                                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="size-3.5 fill-accent text-accent" />)}
                                            </div>
                                            <p className="text-sm font-medium leading-relaxed italic text-foreground tracking-tight">
                                                "Depuis qu'on utilise l'application, la gestion de notre pharmacie est devenue un jeu d'enfant. Un outil indispensable."
                                            </p>
                                            <div className="mt-4 flex items-center gap-3">
                                                <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-md">
                                                    PS
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">Le PDG</p>
                                                    <p className="text-xs text-muted-foreground">Pharmacie Saran Nana Medical SARL</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="py-8 border-t border-border/40 bg-muted/10">
                    <div className="container mx-auto px-6 text-center text-xs text-muted-foreground">
                        <p>© 2024 NextGenStock - Solution SaaS de Gestion de Stock.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

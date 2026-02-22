import React, { useState, useRef, FormEvent } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, LogOut, CheckCircle, Send, Building2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// --- Dancing Mascot ---
const DancingMascot = () => {
    const groupRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Mesh>(null);
    const rightArmRef = useRef<THREE.Mesh>(null);
    const headRef = useRef<THREE.Mesh>(null);
    const bodyRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.position.y = Math.abs(Math.sin(time * 6)) * 0.4;
            groupRef.current.rotation.y = Math.sin(time * 3) * 0.4;
        }
        if (leftArmRef.current && rightArmRef.current) {
            leftArmRef.current.rotation.z = Math.sin(time * 6) * 0.8 - 0.5;
            leftArmRef.current.rotation.x = Math.cos(time * 6) * 0.5;
            rightArmRef.current.rotation.z = -Math.sin(time * 6) * 0.8 + 0.5;
            rightArmRef.current.rotation.x = -Math.cos(time * 6) * 0.5;
        }
        if (headRef.current) {
            headRef.current.rotation.z = Math.sin(time * 12) * 0.15;
            headRef.current.rotation.x = Math.sin(time * 6) * 0.25;
        }
    });

    const primaryColor = "#4f46e5";
    const secondaryColor = "#818cf8";

    return (
        <group ref={groupRef} position={[0, -1, 0]}>
            <mesh ref={headRef} position={[0, 2.2, 0]}>
                <boxGeometry args={[1.2, 1.2, 1.2]} />
                <meshStandardMaterial color={primaryColor} roughness={0.3} metalness={0.8} />
                <mesh position={[-0.25, 0.1, 0.61]}>
                    <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0.25, 0.1, 0.61]}>
                    <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>
            </mesh>
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.4]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
            <mesh ref={bodyRef} position={[0, 0.7, 0]}>
                <boxGeometry args={[1.5, 1.4, 1]} />
                <meshStandardMaterial color={secondaryColor} roughness={0.4} metalness={0.3} />
            </mesh>
            <group position={[-0.9, 1.2, 0]}>
                <mesh ref={leftArmRef} position={[-0.4, -0.4, 0]}>
                    <capsuleGeometry args={[0.2, 0.8]} />
                    <meshStandardMaterial color={primaryColor} />
                </mesh>
            </group>
            <group position={[0.9, 1.2, 0]}>
                <mesh ref={rightArmRef} position={[0.4, -0.4, 0]}>
                    <capsuleGeometry args={[0.2, 0.8]} />
                    <meshStandardMaterial color={primaryColor} />
                </mesh>
            </group>
            <mesh position={[-0.4, -0.4, 0]}>
                <capsuleGeometry args={[0.25, 0.8]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
            <mesh position={[0.4, -0.4, 0]}>
                <capsuleGeometry args={[0.25, 0.8]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
        </group>
    );
};

export default function PendingApproval() {
    // Current user from Inertia props
    const { auth } = usePage().props as any;

    const [requestSent, setRequestSent] = useState(false);

    // Inertia form helper
    const { data, setData, post, processing, errors } = useForm({
        company_name: '',
        phone: '',
        message: ''
    });

    const submitRequest = (e: FormEvent) => {
        e.preventDefault();
        // Post data to the access request handler
        post(route('access.request'), {
            preserveScroll: true,
            onSuccess: () => setRequestSent(true),
        });
    };

    return (
        <>
            <Head title="Accès en attente" />

            <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
                <main className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">

                    {/* Left Section - Form & Content (Takes 7 columns on large screens) */}
                    <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                                Bienvenue, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{auth?.user?.name || 'Nouveau Client'}</span> 👋
                            </h1>

                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Votre compte a été créé avec succès, mais vous n'êtes pas encore rattaché à un espace de travail.
                                Pour utiliser l'application, l'administrateur doit valider votre accès.
                            </p>

                            <AnimatePresence mode="wait">
                                {!requestSent ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                        className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-5"
                                        onSubmit={submitRequest}
                                    >
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className="bg-indigo-100 text-indigo-700 p-2 rounded-lg">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-800">Demande d'accès</h2>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company_name" className="text-slate-700 font-medium">Nom de l'entreprise (ou projet)</Label>
                                            <Input
                                                id="company_name"
                                                value={data.company_name}
                                                onChange={e => setData('company_name', e.target.value)}
                                                className="bg-white"
                                                placeholder="Ex: Tech Solutions Mali"
                                                required
                                            />
                                            {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-slate-700 font-medium">Numéro de téléphone / WhatsApp</Label>
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                className="bg-white"
                                                placeholder="+223 00000000"
                                                required
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-slate-700 font-medium">Message (Optionnel)</Label>
                                            <Textarea
                                                id="message"
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                className="bg-white resize-none h-24"
                                                placeholder="Laissez un message à l'administrateur..."
                                            />
                                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md py-6 text-lg rounded-xl"
                                            disabled={processing}
                                        >
                                            {processing ? 'Envoi en cours...' : (
                                                <>
                                                    Envoyer ma demande <Send className="w-5 h-5 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm"
                                    >
                                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle className="w-10 h-10 text-emerald-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-emerald-900 mb-3">Demande envoyée !</h3>
                                        <p className="text-emerald-700 text-lg leading-relaxed">
                                            Nous avons bien reçu vos informations. Vous serez contacté dans les <strong>24 heures à suivre</strong> par un email de confirmation qui vous donnera accès à votre espace !
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-6">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center text-slate-500 hover:text-slate-800 font-medium transition-colors mb-4 sm:mb-0"
                                >
                                    <LogOut className="w-5 h-5 mr-2" />
                                    Se déconnecter
                                </Link>

                                <div className="flex space-x-4">
                                    <a href="mailto:mountagaoumarmaiga@gmail.com" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors" title="Contacter par Email">
                                        <Mail className="w-5 h-5" />
                                    </a>
                                    <a href="tel:+22361139057" className="bg-slate-100 p-3 rounded-full text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors" title="Contacter par Téléphone">
                                        <Phone className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Section - 3D Mascot (Takes 5 columns on large screens) */}
                    <div className="lg:col-span-5 relative bg-gradient-to-br from-indigo-600 to-purple-800 min-h-[400px] lg:min-h-full flex flex-col items-center justify-center overflow-hidden">

                        {/* Motif de fond stylisé */}
                        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGwyMCAyMEw0MCAwdjQwbC0yMC0yMEwwIDB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] bg-repeat"></div>

                        <div className="absolute top-10 text-center w-full z-10 px-4">
                            <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md shadow-lg text-white font-semibold text-sm border border-white/20">
                                Un peu de patience, on arrive... 🕺
                            </span>
                        </div>

                        {/* Conteneur 3D Canvas robuste */}
                        <div className="w-full h-[500px] lg:h-full lg:absolute lg:inset-0">
                            <Canvas camera={{ position: [0, 1.5, 7], fov: 50 }} className="w-full h-full cursor-grab active:cursor-grabbing">
                                <ambientLight intensity={0.6} />
                                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fff" />
                                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                                <Environment preset="city" />

                                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                                    <DancingMascot />
                                </Float>

                                {/* Ombre de contact */}
                                <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000" />

                                <OrbitControls
                                    enableZoom={false}
                                    enablePan={false}
                                    autoRotate
                                    autoRotateSpeed={1}
                                    maxPolarAngle={Math.PI / 2 + 0.1}
                                    minPolarAngle={Math.PI / 3}
                                />
                            </Canvas>
                        </div>

                        <div className="absolute bottom-6 w-full text-center z-10">
                            <p className="text-indigo-100/70 text-sm font-medium">CEO: mountagaoumarmaiga@gmail.com</p>
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
}

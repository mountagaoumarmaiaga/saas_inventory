import React, { useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Mail, Phone, LogOut, CheckCircle } from 'lucide-react';

// --- Composant du Bonhomme 3D Dansant ---
const DancingMascot = () => {
    const groupRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Mesh>(null);
    const rightArmRef = useRef<THREE.Mesh>(null);
    const headRef = useRef<THREE.Mesh>(null);
    const bodyRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (groupRef.current) {
            // Rebond global (Bounce)
            groupRef.current.position.y = Math.abs(Math.sin(time * 5)) * 0.5;
            // Rotation du corps
            groupRef.current.rotation.y = Math.sin(time * 2) * 0.3;
        }

        // Mouvement des bras (balancement en opposition)
        if (leftArmRef.current && rightArmRef.current) {
            leftArmRef.current.rotation.z = Math.sin(time * 5) * 0.8 - 0.5;
            leftArmRef.current.rotation.x = Math.cos(time * 5) * 0.5;

            rightArmRef.current.rotation.z = -Math.sin(time * 5) * 0.8 + 0.5;
            rightArmRef.current.rotation.x = -Math.cos(time * 5) * 0.5;
        }

        // Hochement de tête en rythme
        if (headRef.current) {
            headRef.current.rotation.z = Math.sin(time * 10) * 0.1;
            headRef.current.rotation.x = Math.sin(time * 5) * 0.2;
        }
    });

    // Couleurs du branding (Thème Indigo/Bleu du dashboard)
    const primaryColor = "#4f46e5"; // Indigo 600
    const secondaryColor = "#818cf8"; // Indigo 400

    return (
        <group ref={groupRef} position={[0, -1, 0]}>
            {/* Tête */}
            <mesh ref={headRef} position={[0, 2.2, 0]}>
                <boxGeometry args={[1.2, 1.2, 1.2]} />
                <meshStandardMaterial color={primaryColor} roughness={0.3} metalness={0.8} />

                {/* Yeux (Lunettes Joyeuses) */}
                <mesh position={[-0.25, 0.1, 0.61]}>
                    <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0.25, 0.1, 0.61]}>
                    <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                </mesh>
            </mesh>

            {/* Cou */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.4]} />
                <meshStandardMaterial color="#333333" />
            </mesh>

            {/* Corps */}
            <mesh ref={bodyRef} position={[0, 0.7, 0]}>
                <boxGeometry args={[1.5, 1.4, 1]} />
                <meshStandardMaterial color={secondaryColor} roughness={0.4} metalness={0.3} />
            </mesh>

            {/* Bras Gauche */}
            <group position={[-0.9, 1.2, 0]}>
                <mesh ref={leftArmRef} position={[-0.4, -0.4, 0]}>
                    <capsuleGeometry args={[0.2, 0.8]} />
                    <meshStandardMaterial color={primaryColor} />
                </mesh>
            </group>

            {/* Bras Droit */}
            <group position={[0.9, 1.2, 0]}>
                <mesh ref={rightArmRef} position={[0.4, -0.4, 0]}>
                    <capsuleGeometry args={[0.2, 0.8]} />
                    <meshStandardMaterial color={primaryColor} />
                </mesh>
            </group>

            {/* Jambe Gauche */}
            <mesh position={[-0.4, -0.4, 0]}>
                <capsuleGeometry args={[0.25, 0.8]} />
                <meshStandardMaterial color="#333333" />
            </mesh>

            {/* Jambe Droite */}
            <mesh position={[0.4, -0.4, 0]}>
                <capsuleGeometry args={[0.25, 0.8]} />
                <meshStandardMaterial color="#333333" />
            </mesh>
        </group>
    );
};

export default function PendingApproval() {
    return (
        <>
            <Head title="En attente de validation" />

            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 min-h-[600px]">

                    /* --- Section de Gauche : Contenu & Contacts --- */
                    <div className="p-8 md:p-12 flex flex-col justify-center h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-8 h-8 text-indigo-600" />
                            </div>

                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                Compte créé avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">succès</span>
                            </h1>

                            <p className="text-lg text-slate-600 leading-relaxed">
                                Merci de vous être inscrit sur notre plateforme de gestion de stock. Pour des raisons de sécurité et pour vous attribuer le bon espace de travail,
                                <strong className="text-slate-900 font-semibold block mt-2">votre compte nécessite une validation manuelle par l'administrateur.</strong>
                            </p>

                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mt-8 space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Contacter le CEO pour activation immédiate</h3>

                                <a href="mailto:mountagaoumarmaiga@gmail.com" className="flex items-center group transition-colors hover:bg-slate-100 p-2 -mx-2 rounded-lg">
                                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Email</p>
                                        <p className="text-slate-600 font-medium group-hover:text-indigo-600 transition-colors">mountagaoumarmaiga@gmail.com</p>
                                    </div>
                                </a>

                                <a href="tel:+22361139057" className="flex items-center group transition-colors hover:bg-slate-100 p-2 -mx-2 rounded-lg">
                                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Téléphone / WhatsApp</p>
                                        <p className="text-slate-600 font-medium group-hover:text-emerald-600 transition-colors">+223 61139057</p>
                                    </div>
                                </a>
                            </div>

                            <div className="pt-6">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="inline-flex items-center px-6 py-3 border border-slate-300 shadow-sm text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                >
                                    <LogOut className="w-5 h-5 mr-2 text-slate-400" />
                                    Se déconnecter en attendant
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    /* --- Section de Droite : Animation 3D --- */
                    <div className="relative h-64 md:h-full w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-r-3xl flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>

                        <div className="absolute top-8 text-center w-full z-10">
                            <span className="inline-block px-4 py-1 rounded-full bg-white/60 backdrop-blur-sm shadow-sm text-indigo-800 font-medium text-sm border border-indigo-100">
                                Un peu de patience, on arrive... 🕺
                            </span>
                        </div>

                        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                            <pointLight position={[-10, -10, -10]} intensity={0.5} />

                            <Environment preset="city" />

                            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                                <DancingMascot />
                            </Float>

                            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
                            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
                        </Canvas>
                    </div>

                </div>
            </div>
        </>
    );
}

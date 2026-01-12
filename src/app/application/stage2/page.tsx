'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import UnskippableVideo from '../../../components/UnskippableVideo';
import Stage2Form from '../../../components/Stage2Form';

export default function Stage2Page() {
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);

    const handleVideoComplete = () => {
        setIsVideoCompleted(true);
        // Smooth scroll to form after a slight delay
        setTimeout(() => {
            const formElement = document.getElementById('stage2-form-section');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-white">

            {/* Hero Section */}
            <div className="relative py-20 bg-[#1a237e] text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6"
                    >
                        STAGE 2: VERIFICATION
                    </motion.h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Verification and Final Selection.
                    </p>
                </div>
            </div>

            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    {/* Video Section */}
                    <div className="mb-12">
                        <UnskippableVideo
                            src="/videos/video2.mp4"
                            onComplete={handleVideoComplete}
                        />
                        <p className="text-center text-sm text-gray-400 mt-4 italic">
                            * You must watch the entire video to proceed. Skipping is disabled.
                        </p>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 mb-12">
                        <h2 className="text-3xl font-black text-[#1a237e] mb-8">Instructions for Stage 2</h2>

                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <div className="flex gap-4">
                                <div className={`flex-shrink-0 w-8 h-8 font-bold rounded-full flex items-center justify-center transition-colors ${isVideoCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-[#1a237e]'}`}>
                                    {isVideoCompleted ? '✓' : '1'}
                                </div>
                                <p className="pt-1">Watch <b>Orientation Video 2</b> above. This is a mandatory requirement for final selection.</p>
                            </div>

                            <div className="flex gap-4">
                                <div className={`flex-shrink-0 w-8 h-8 font-bold rounded-full flex items-center justify-center transition-colors ${isVideoCompleted ? 'bg-blue-100 text-[#1a237e]' : 'bg-gray-100 text-gray-400'}`}>
                                    2
                                </div>
                                <p className="pt-1">Prepare your documents: Student ID, Result/Transcript, Admission Letter, Govt ID, School Fees Proof, and Passport Photo.</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-400 font-bold rounded-full flex items-center justify-center">3</div>
                                <p className="pt-1">Upload clear copies in the form below once the video is complete.</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Section - Only visible after video completion */}
                    <AnimatePresence>
                        {isVideoCompleted && (
                            <motion.div
                                id="stage2-form-section"
                                initial={{ opacity: 0, height: 0, y: 50 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <Stage2Form />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isVideoCompleted && (
                        <div className="text-center p-8 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 opacity-70">
                            <p className="font-bold text-gray-500 uppercase tracking-widest">
                                Verification Form Locked
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                Complete the video above to unlock the document upload section.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

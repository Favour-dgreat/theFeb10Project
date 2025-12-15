'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowBigRight } from 'lucide-react';

const Section01 = () => {
    return (
        <section className="py-12 md:py-20 px-4 bg-[url('/images/H1_jpg.jpg')] bg-cover bg-center bg-no-repeat min-h-[500px] md:min-h-[600px] flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white max-w-7xl mx-auto font-bold p-4 mb-6 leading-tight">
                        2026 Undergraduate Scholarship Applications Are Now Open
                    </h2>

                    <button className="bg-white text-[#2e3b86] hover:cursor-pointer text-lg sm:text-2xl md:text-3xl lg:text-4xl px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold uppercase hover:bg-gray-200 transition-colors flex items-center gap-2 md:gap-3 mx-auto"
                    onClick={() => window.location.href = '/scholarship'}>
                        Apply Now <ArrowBigRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                    </button>

                </motion.div>

                {/* Overlapping Cards */}

            </div>
        </section>
    );
};

export default Section01;

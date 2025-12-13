'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Section04 = () => {
    return (
        <section className="py-12 md:py-20 px-4 bg-white bg-[url('/images/H4_jpg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Side - Content from the Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-full p-4 sm:p-6 md:p-12"
                    >
                        {/* Title and Orange Separator based on the image */}
                        <div className="mb-6">
                            <div className="w-16 sm:w-20 md:w-25 h-2 bg-orange-500 mb-4" />
                            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#2e3b86] font-bold">
                                Who We Are
                            </h1>
                        </div>

                        {/* Text Content based on the image */}
                        <p className="text-base sm:text-lg text-[#2e3b86] font-semibold mb-6 max-w-md">
                            We offer scholarship opportunities to exceptional students from economically disadvantaged backgrounds in government-owned and privately-operated junior and senior secondary schools in Nigeria. Applications for scholarships are processed annually from June to August.
                        </p>


                    </motion.div>

                    {/* Right Side - Image/Flags based on the image, wrapped in a div to take up the other column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block relative h-[400px] md:h-[300px]"
                    >
                        {/* Placeholder for the image of the flags/desk */}
                        {/* In a real scenario, you would use an <img> tag here. */}
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/your-flags-desk-image.jpg')" }} aria-label="Small flags of various countries on a white desk" />

                        {/* Overlay gradient - kept from your original request */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Section04;

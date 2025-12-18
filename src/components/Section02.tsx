'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Section02 = () => {
    return (
        <section className="py-12 md:py-20 px-4 bg-[url('/images/New4.jpg')] lg:bg-[url('/images/H2_jpg.jpg')] bg-cover bg-center bg-no-repeat min-h-[500px] md:min-h-[600px] flex items-center">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <Image className='lg:hidden' src="/images/Flagsonly.jpg" alt="Flags of various countries on a white desk" width={400} height={300} />

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
                                About Us
                            </h1>
                        </div>

                        {/* Text Content based on the image */}
                        <p className="text-base sm:text-lg text-[#2e3b86] font-semibold mb-6">
                            What began as a simple act of service has grown into a purposeful African impact movement. The FEB 10 Project was founded out of a deep burden and a commitment to transform lives through compassion, empowerment, and opportunity. From supporting orphanages to investing in promising students, we exist to help individuals rise and reach their full potential.  
                        </p>

                        <a href="/about" className="font-bold text-[#2e3b86] hover:text-orange-500 transition duration-300 inline-block">
                            &gt;&gt;&gt; Read More
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block relative h-[400px] md:h-[300px]"
                    >
                        {/* Placeholder for the image of the flags/desk */}
                        {/* In a real scenario, you would use an <img> tag here. */}
                        {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/Flagsonly.jpg')" }} aria-label="Small flags of various countries on a white desk" /> */}

                        {/* Overlay gradient - kept from your original request */}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Section02;

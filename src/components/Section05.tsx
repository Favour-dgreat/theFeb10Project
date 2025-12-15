'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Section05 = () => {
    return (
        <section className="relative py-12 sm:py-16 md:py-20 px-4 bg-white bg-[url('/images/H5_jpg.jpg')] bg-cover bg-center bg-no-repeat">
            {/* Full-width Orange Overlay for the bottom section */}
            <div className="absolute inset-x-0 bottom-0 h-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10"> {/* z-10 ensures content sits on top of the overlay */}

                {/* We add padding to push the content below the image and onto the orange overlay area */}
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 pt-20 sm:pt-32 md:pt-40 items-start">

                    {/* Left Side - Our Mission */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative p-4 md:p-0"
                    >
                        {/* Title: Our Mission */}
                        <div className="mb-4">
                            <div className="w-16 sm:w-20 md:w-25 h-2 bg-white mb-4" />
                            {/* Title text color is white in the image's orange section */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#2e3b86] font-bold mb-2">
                                Our Mission
                            </h1>
                            {/* Orange line below the title in the image is not present; text is white. 
                                The image shows the text sitting on the orange background. */}
                        </div>

                        {/* Text Content */}
                        <p className="text-base sm:text-lg text-white font-normal mb-4 max-w-md">
                            To transform lives by bridging the gap between potential and opportunity through scholarships, grants, youth empowerment, mentorship, and development programs that provide resources, direction, and hope.

                        </p>

                        <a href="#" className="font-semibold text-white hover:text-gray-200 transition duration-300 text-sm inline-block">
                            &gt;&gt;&gt; Read More
                        </a>
                    </motion.div>

                    {/* Right Side - Our Vision */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative p-4 md:p-0"
                    >
                        {/* Title: Our Vision */}
                        <div className="mb-4">
                            <div className="w-16 sm:w-20 md:w-25 h-2 bg-white mb-4" />
                            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#2e3b86] font-bold mb-2">
                                Our Vision
                            </h1>
                        </div>

                        {/* Text Content */}
                        <p className="text-base sm:text-lg text-white font-normal mb-4 max-w-md">
                            A world where no potential is wasted, where people across Africa and beyond are equipped, funded, and empowered to live a meaningful life, rise into their fullest capacity and impact their world.

                        </p>

                        <a href="#" className="font-semibold text-white hover:text-gray-200 transition duration-300 text-sm inline-block">
                            &gt;&gt;&gt; Read More
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Section05;
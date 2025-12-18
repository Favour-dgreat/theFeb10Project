'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Section03 = () => {
    return (
        <section className="py-12 sm:py-20 md:py-40 px-4 sm:px-6 md:px-10 bg-[url('/images/New1.jpg')] lg:bg-[url('/images/H3_jpg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="max-w-7xl mx-auto">

                <div className="grid md:grid-cols-2 items-center">
                    
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
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-2xl text-white font-bold leading-tight">
                                Empowering the<br />  Next Generation - <br />  <span className="text-orange-500">One Project</span> at a time
                            </h1>
                        </div>
                        <Image className='lg:hidden' src="/images/students.jpg" alt="Flags of various countries on a white desk" width={400} height={300} />


                    </motion.div>

                    {/* Right Side - Empty space or decorative element */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block relative h-[400px] md:h-[300px]"
                    >
                        {/* Decorative space */}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Section03;

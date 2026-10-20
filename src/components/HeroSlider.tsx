'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDE_DURATION = 8000; // 8 seconds per slide

const slides = [
    {
        id: 1,
        image: '/images/Scholarship_Awardees_Homepage_jpg.jpg',
        text: "2026: Supporting Scholars. Shaping Tomorrow's Leaders",
    },
    {
        id: 2,
        image: '/images/ScrollBanner1_jpg.jpg',
        text: "We Don't Just Give - We Equip.",
    },
    {
        id: 3,
        image: '/images/ScrollBanner2_jpg.jpg',
        text: 'Inspiring Hope. Unlocking Potential. Transforming Students.',
    },
    {
        id: 4,
        image: '/images/ScrollBanner3_jpg.jpg',
        text: '2023: Over 3000 Students Empowered through our Career Talk Initiative in Ondo State.',
    },
    {
        id: 5,
        image: '/images/ScrollBanner4_jpg.jpg',
        text: 'Shaping Young Minds Through Our School Outreach Initiative.',
    },
    {
        id: 6,
        image: '/images/ScrollBanner5_jpg.jpg',
        text: "2017: Our First Step of Love - Reaching Motherless Babies' Homes and Orphanages in Oyo State.",
    },
];

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    // Auto-advance slides with extended timing, resetting whenever index changes
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);

        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-black">
            {/* Slides with smooth cross-fade to eliminate flickering */}
            {slides.map((slide, index) => {
                const isActive = index === currentIndex;
                return (
                    <div
                        key={slide.id}
                        aria-hidden={!isActive}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                            isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                    >
                        <Image
                            src={slide.image}
                            alt="Slide Background"
                            fill
                            sizes="100vw"
                            className="object-cover opacity-60"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better text readability */}

                        <div className="absolute inset-0 flex items-center justify-center px-12 md:px-20 lg:px-24 text-center z-10">
                            <h1
                                className={`text-white text-3xl md:text-5xl lg:text-6xl font-bold max-w-5xl leading-tight drop-shadow-lg transition-all duration-1000 ease-out ${
                                    isActive
                                        ? 'opacity-100 translate-y-0 scale-100'
                                        : 'opacity-0 translate-y-2 scale-95'
                                }`}
                            >
                                {slide.text}
                            </h1>
                        </div>
                    </div>
                );
            })}

            {/* Left Control Arrow */}
            <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Right Control Arrow */}
            <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 md:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};


export default HeroSlider;

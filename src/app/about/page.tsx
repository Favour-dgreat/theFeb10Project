import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function About() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/About_Image.jpg"
                    alt="About Banner"
                    fill
                    className="object-cover md"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                        Igniting Purpose in the Next Generation
                    </h1>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lg md:text-2xl leading-relaxed font-medium text-[#f06436]">
                        The Feb10Project was founded in 2017 by Sunny Willz — an entrepreneur, educator, and impact-focused leader passionate about unlocking human potential, equipping young people with purpose-driven education, and empowering the next generation to create meaningful and lasting impact.
                    </p>
                </div>
            </section>

            {/* Main Content Narrative */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="relative h-[200px] md:h-[500px] w-full">
                        <Image
                            src="/images/About_Image2_jpg.jpg"
                            alt="Sunny Willz"
                            fill
                            className="object-contain bg-gray-50"
                        />
                    </div>
                    <div className="p-8 md:p-12 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2e3b86]">
                            The FEB10 Project: A Movement Born From Burden, Built for Impact
                        </h2>
                        <div className="text-lg text-gray-700 space-y-6">
                            <p>
                                The FEB10 Project was not born from abundance; it was born from a burden.
                                A burden to lift others. A burden to change stories. A burden to ensure that one life could count for many.
                            </p>
                            <p>
                                In 2017-2018, during his National Youth Service, our founder Sunny Willz felt a quiet but persistent tug on his heart: “Your life should count for more.” That inner conviction would soon reshape the meaning of a very personal date — February 10, his birthday.
                            </p>
                            <p>
                                Rather than centering the day on personal celebration, Sunny chose to dedicate February 10 each year to service, compassion, and impact. What began as a simple birthday outreach, visiting orphanages in Ibadan with gifts, care, and love, quickly revealed the transformative power of intentional giving.
                            </p>
                            <p>
                                Over time, this annual act of compassion grew beyond charity. It became a vision. A calling. A blueprint for transformation.
                            </p>
                            <p>
                                From supporting orphanages and motherless babies’ homes, to hosting career development outreaches in underserved communities, and empowering secondary school students with educational resources and leadership training, the FEB10 Project has evolved into a structured, purpose-driven movement.
                            </p>
                            <p>
                                Through its initiatives and programs, the FEB10 Project has reached and impacted close to 7,000 young people across Africa, equipping them with hope, clarity, skills, and the belief that their background does not determine their future.
                            </p>
                            <p>
                                Today, the FEB10 Project stands as a multi-dimensional empowerment initiative committed to unlocking human potential and transforming lives across borders.
                            </p>
                            <p>
                                From one man’s birthday to a growing global vision; spreading impact across Africa and beyond, our goal remains clear:
                            </p>
                            <p className="font-bold text-[#2e3b86]">
                                To build a future where every person, especially young people with drive, brilliance, and character, can rise, regardless of background or financial limitation.
                            </p>
                            <div className="pt-4 border-t border-gray-100">
                                <p className="italic">Every February 10, we renew this mission.</p>
                                <p className="italic">Every year, we expand its reach.</p>
                                <p className="italic font-medium text-[#f06436]">Every life touched becomes proof that one person’s burden can become many people’s breakthrough.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Vision */}
                <div id="vision" className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#f06436] shadow-md hover:shadow-xl transition-shadow duration-300 scroll-mt-24">
                    <h3 className="text-2xl font-bold text-[#2e3b86] mb-4">OUR VISION</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        A world where no potential is wasted, where people across Africa and beyond are equipped, funded, and empowered to live a meaningful life, rise into their fullest capacity and impact their world.
                    </p>
                </div>

                {/* Mission */}
                <div id="mission" className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#2e3b86] shadow-md hover:shadow-xl transition-shadow duration-300 scroll-mt-24">
                    <h3 className="text-2xl font-bold text-[#2e3b86] mb-4">OUR MISSION</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        To transform lives by bridging the gap between potential and opportunity through scholarships, grants, youth empowerment, mentorship, and development programs that provide resources, direction, and hope.
                    </p>
                </div>
            </section>

            {/* Pillars Section */}
            <section className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#2e3b86] mb-12">
                        OUR PILLARS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Scholarships & Educational Support",
                                desc: "We provide financial assistance, scholarships, and grants to students who demonstrate strong commitment to their education but face financial challenges, ensuring that no dream dies because of lack."
                            },
                            {
                                title: "Youth Empowerment & Leadership Development",
                                desc: "We equip young people with the mindset, skills, and tools needed to lead, innovate, and excel, thereby building a generation of value-driven leaders across Africa."
                            },
                            {
                                title: "Career & Capacity Development",
                                desc: "Through training, resources, mentorship, and exposure, we help young people discover their strengths, develop relevant skills, and build purposeful careers."
                            },
                            {
                                title: "Community Impact & Social Intervention",
                                desc: "From orphanage support to community outreaches, we continue the heart of the project: serving underserved communities and standing in the gap where hope is needed most."
                            },
                            {
                                title: "Funding, Innovation & Opportunity Networks",
                                desc: "We create pathways for growth by offering grants, partnerships, and access to a global network that unlocks opportunities for talented youths, dreamers, builders, and changemakers."
                            }
                        ].map((pillar, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-[#f06436]">
                                <div className="flex items-center mb-4">
                                    <span className="bg-[#2e3b86] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">
                                        {idx + 1}
                                    </span>
                                    <h3 className="text-xl font-bold text-[#2e3b86]">{pillar.title}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Summary Statement */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#2e3b86] text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">SUMMARY STATEMENT</h2>
                    <div className="text-xl md:text-2xl font-light italic leading-relaxed space-y-4">
                        <p>The FEB10 Project is more than a charity.</p>
                        <p>More than a scholarship.</p>
                        <p>More than an initiative.</p>
                        <p className="mt-8 font-medium not-italic text-[#f06436]">
                            It is a movement born from burden, built on compassion, grounded in purpose, and driven by a vision to transform the world, one life, one community, and one story at a time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Founder's Story */}
            <section id="founders-letter" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2e3b86] mb-8">
                    FOUNDER’S STORY
                </h2>
                <div className="bg-[#f8f9ff] p-12 rounded-3xl border border-blue-100 shadow-xl">
                    <p className="text-2xl text-gray-700 italic mb-8">
                        “THE HEART BEHIND THE FEB10 PROJECT”
                    </p>
                    <a
                        href="https://sunnywillz.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#2e3b86] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#f06436] transition-all duration-300 transform hover:scale-105"
                    >
                        Read the Founder’s Letter
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}

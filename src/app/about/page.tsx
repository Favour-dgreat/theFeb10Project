import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function About() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-[#2e3b86] text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
                        The FEB10 Project
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium text-[#f06436] mb-8">
                        A Movement Born From Burden, Built For Impact
                    </h2>
                    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-lg">
                        <p className="text-lg leading-relaxed mb-6">
                            The FEB10 Project was never born from abundance, it was born from a burden. A burden to lift others. A burden to change stories and make one life count for many.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            In 2017, during his National Youth Service, our founder felt a quiet but persistent tug; “Your life should count for more.”
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            February 10, usually a day most people use to celebrate themselves, became instead a day dedicated to transforming others. What began as a simple visit to orphanages in Ibadan with gifts, care, and compassion soon revealed the transformative power of giving back.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Today, the FEB10 Project stands as a multi-dimensional empowerment initiative committed to transforming the lives of people all over the globe.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Vision */}
                <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#f06436] shadow-md hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-[#2e3b86] mb-4">OUR VISION</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        A world where no potential is wasted, where people across Africa and beyond are equipped, funded, and empowered to live a meaningful life, rise into their fullest capacity and impact their world.
                    </p>
                </div>

                {/* Mission */}
                <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#2e3b86] shadow-md hover:shadow-xl transition-shadow duration-300">
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
                                desc: "We provide financial assistance, scholarships, and grants to academically brilliant but financially challenged students, ensuring that no dream dies because of lack."
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
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2e3b86] mb-8 text-center">
                    FOUNDER’S STORY
                </h2>
                <h3 className="text-xl text-[#f06436] text-center mb-12 font-medium">
                    THE HEART BEHIND THE FEB10 PROJECT
                </h3>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed">

                        <blockquote className="border-l-4 border-[#f06436] pl-6 italic text-xl text-gray-500 my-8">
                            “If one day with little can change lives… what could happen if this became a tradition?”
                        </blockquote>

                        <p>
                            My name is <span className="font-bold text-[#2e3b86]">Sunny Willz</span>, and the FEB10 Project is not just something I started, it is something that started in me long before I ever had a name for it. It didn’t begin with abundance, nor perfection, and definitely not with a grand vision. It began with a burden.
                        </p>

                        <div>
                            <h4 className="text-2xl font-bold text-[#2e3b86] mb-4">The Birth of a Burden (2017)</h4>
                            <p className="mb-4">
                                In 2017, as a youth corps member in Ibadan, I felt a gentle but persistent pull in my spirit, a desire for my life to count for more. My birthday, February 10, was approaching. A day most people spend receiving love, gifts, and attention. But deep inside, I felt led to flip the script.
                            </p>
                            <p className="mb-4 font-medium">
                                Instead of asking, “What can I get for my birthday?”<br />
                                I found myself asking, “Whose life can be better because I was born?”
                            </p>
                            <p>
                                So, with little resources and a heart full of conviction, I launched a small fundraiser. That first FEB10 outreach took us to three orphanages and two motherless babies’ homes in Ibadan, Oyo State. We didn’t have much, but we gave what we had; foodstuffs, gifts, basic supplies, and most importantly, we gave presence.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-2xl font-bold text-[#2e3b86] mb-4">The Evolution of Purpose (2018 – 2023)</h4>
                            <p className="mb-4">
                                The FEB10 Project didn’t remain the same. It evolved, because purpose grows with you. A few years later, in another edition of the project, something new was birthed. This time, we shifted our focus to secondary school students in Ondo State.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-4">
                                <li>Helping them discover possibilities beyond their environment</li>
                                <li>Guiding them with wisdom we once needed ourselves</li>
                                <li>Equipping them with books, materials, and direction</li>
                                <li>Opening visions they didn’t know they could have</li>
                            </ul>
                            <p>The FEB10 Project was no longer just about charity; it was becoming a vehicle for empowerment.</p>
                        </div>

                        <div className="bg-[#f0f4ff] p-8 rounded-xl">
                            <h4 className="text-2xl font-bold text-[#2e3b86] mb-4">The Heart of It All</h4>
                            <p className="mb-4">If you ask me what the FEB10 Project truly is, I’ll tell you:</p>
                            <p className="mb-4">
                                It is my desire to impact the world with the investment of my personality - my story, my experience, my empathy, my calling. It is the decision to turn my birthday, February 10, from a day of receiving into a day of releasing.
                            </p>
                            <p className="font-medium text-[#f06436]">
                                From a day of celebration into a day of transformation.<br />
                                From a personal milestone into a movement.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

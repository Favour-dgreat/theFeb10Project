import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FoundersLetter() {
    return (
        <main className="min-h-screen bg-white">

            {/* Banner Section */}
            <section className="relative h-[50vh] md:h-[60vh] w-full bg-black">
                <Image
                    src="/images/Founders_Letter_wide_NoText_jpg.jpg"
                    alt="Founder's Letter Banner"
                    fill
                    className="object-cover object-[15%_5%] md:object-[50%_5%] opacity-80"
                    priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8 md:p-16 text-right">
                    <div className="max-w-8xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                            Founder's Letter
                        </h1>
                        <div className="w-48 h-1.5 bg-[#f06436] mt-4 rounded-full ml-auto" />
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">

                    <div className="prose prose-lg md:prose-xl text-gray-700 leading-relaxed space-y-8">

                        {/* Intro Quote */}
                        <p className="text-2xl md:text-3xl font-bold text-[#2e3b86] leading-tight not-prose border-l-4 border-[#2e3b86] pl-6 py-2">
                            The FEB10 Project was never born from abundance. <br />
                            It was born from a burden — the kind that refuses to leave you alone.
                        </p>

                        <p>
                            From an early age, life taught me that potential and opportunity do not always arrive together. I grew up in a home where effort was constant, but resources were limited. My father, of blessed memory, never had the privilege of formal education. Life introduced him to responsibility long before it introduced him to comfort. Yet, with his hands, his sweat, and his dignity, he believed deeply in one thing: that young people must be given a chance to rise.
                        </p>

                        <p>
                            He did everything within his power to send me to the university. Getting in was one battle. Staying in was another. From my first year, survival became a daily negotiation. School fees, rent, food, learning materials — every semester felt like a test of endurance. I wanted excellence, but excellence demands stability, and stability was often out of reach.
                        </p>

                        {/* Float Image Right on Desktop */}
                        <div className="float-none md:float-right md:ml-8 md:mb-8 md:w-1/3 w-full mb-8 rounded-2xl overflow-hidden shadow-xl border-4 border-gray-100">
                            <div className="relative aspect-[3/4]">
                                <Image
                                    src="/images/FoundersLetter_Portrait.jpg"
                                    alt="Sunny Willz - Founder"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <p>
                            Still, I refused to give up. By God’s grace, through discipline, sacrifice, and resilience, I graduated with a first-class degree. But behind that result was a story of struggle — a story many brilliant students across Africa are still living today.
                        </p>

                        <p>
                            That truth stayed with me.
                        </p>

                        <p>
                            In 2017-2018, during my National Youth Service, February 10 approached — my birthday. Instead of asking what I would receive, I asked a different question: What if this day could mean something to someone else? With very little, I started a small act of giving. That first year, we reached orphanages and motherless babies’ homes. We brought supplies, but more importantly, we brought presence. The smiles we saw, the gratitude we witnessed — they changed me.
                        </p>

                        <p>
                            What started as a single day of compassion planted a seed. If a little could do this much, what could consistency do?
                        </p>

                        <p>
                            Over the years, the FEB10 Project evolved naturally — from outreach to empowerment, from moments to movement. We began engaging young minds, opening their eyes to possibility, sharing knowledge, encouragement, and hope. Quietly, steadily, lives were being touched.
                        </p>

                        <p>
                            Today, through the FEB10 Project and its initiatives, we have reached close to 7,000 young people across Africa. Not because we had everything figured out, but because we believed that impact does not require perfection — it requires commitment.
                        </p>

                        <p>
                            The FEB10 Project 2026 Undergraduate Scholarship is a continuation of that belief. It exists to stand in the gap for undergraduates who are brilliant, disciplined, and driven, but burdened by financial uncertainty. It is for students who are fighting quietly, carrying dreams bigger than their circumstances. It is a reminder that lack should never be the end of the story.
                        </p>

                        <p>
                            At its core, this project is about more than scholarships. It is about belief. About resilience. About finishing the race even when the odds are against you. It is about proving that one act of kindness, one decision to give back, one heart willing to act — can ripple outward in ways we may never fully see.
                        </p>

                        <p>
                            If there is one truth I hope this letter leaves with you, it is this: your story is not over. Where you start does not determine where you finish. And no matter how small your contribution may seem, it matters.
                        </p>

                        <p>
                            If each of us chooses to do a little — to lift one person, support one dream, and give back in our own way — the world becomes brighter, fairer, and full of hope.
                        </p>

                        <p>
                            We look forward to joining hands with organizations, partners, and individuals who share our vision of empowering young people and unlocking potential. No single person or institution can create lasting impact alone; it is through collaboration, shared purpose, and collective action that we can transform lives. Together, by each of us contributing our time, resources, and expertise, we can make a meaningful difference — creating a brighter, fairer, and more hopeful future for the next generation and leaving a lasting impact on the world we all share.
                        </p>

                        <p className="text-xl font-bold text-[#2e3b86] pt-4">
                            This is why we do what we do. <br />
                            And this is only the beginning.
                        </p>

                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-left">
                            <Image
                                src="/images/signature.png"
                                alt="Sunny Willz Signature"
                                width={180}
                                height={180}
                                className="rounded-full"
                            />
                        </div>
                        <div>
                            <Image
                                src="/images/logo.png"
                                alt="FEB10 Project Logo"
                                width={100}
                                height={40}
                                className="opacity-80"
                            />
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}

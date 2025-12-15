'use client';

import Navbar from '../../components/Navbar';
import ScholarshipInfo from '../../components/ScholarshipInfo';
import ScholarshipForm from '../../components/ScholarshipForm';
import Footer from '../../components/Footer';

export default function ScholarshipPage() {
    return (
        <main className="bg-gray-50 min-h-screen">

            <div className="pt-24 md:pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Column: Info & Accordions (Approx 60-65% width) */}
                        <div className="lg:col-span-7 xl:col-span-8">
                            <ScholarshipInfo />
                        </div>

                        {/* Right Column: Application Form (Approx 35-40% width) */}
                        <div className="lg:col-span-5 xl:col-span-4">
                            <ScholarshipForm />
                        </div>
                    </div>

                </div>
            </div>
                <Footer />
        </main>
    );
}

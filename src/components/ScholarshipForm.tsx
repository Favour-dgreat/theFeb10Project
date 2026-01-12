'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ScholarshipForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        firstName: '',
        surname: '',
        middleName: '',
        email: '',
        phone: '',
        gender: '',
        state: '',

        // Step 2
        isEnrolled: null as boolean | null,
        agreesToProcess: null as boolean | null,

        // Step 3
        consentCommunication: false,
        consentInstructions: false,
    });

    const [error, setError] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (error) setError('');
    };

    const handleRadioChange = (name: string, value: boolean) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.consentCommunication || !formData.consentInstructions) {
            setError("Please accept all consents to proceed.");
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/scholarship/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setApplicationId(result.applicationId);
                setIsSubmitted(true);
            } else {
                setError(result.error || "Submission failed. Please try again.");
            }
        } catch (err) {
            console.error("Submission Error:", err);
            setError("Something went wrong. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-green-100 text-center sticky top-8"
            >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-black text-[#2e3b86] mb-4">Application Received!</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for applying. A confirmation email has been sent to your inbox with your unique Application ID and next steps.
                </p>


            </motion.div>
        );
    }

    return (
        <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 sticky top-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">APPLICATION FORM</h3>
            <div className="p-3 bg-yellow-100 border-l-4 border-[#FFD700] mb-6 rounded-r-md">
                <p className="text-sm text-yellow-800">
                    Please fill each field carefully and review before sending your application.
                </p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between mb-8 px-2 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                {[1, 2, 3].map((step) => (
                    <div
                        key={step}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300
              ${currentStep >= step ? 'bg-[#f06436] text-white shadow-md scale-110' : 'bg-white text-gray-400 border border-gray-300'}
            `}
                    >
                        {step}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <h4 className="font-bold text-[#1a237e] border-b pb-2 mb-4">SECTION 1: Basic Information</h4>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all text-black bg-white"
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    required
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all text-black bg-white"
                                    placeholder="Surname"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Middle Name</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all text-black bg-white"
                                placeholder="Middle Name (Optional)"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all text-black bg-white"
                                placeholder="example@email.com"
                            />
                            <p className="text-[10px] text-gray-500 mt-1">Must be valid — all scholarship communication will be sent here.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all text-black bg-white"
                                    placeholder="+234..."
                                />
                                <p className="text-[10px] text-gray-500 mt-1">WhatsApp-enabled preferred.</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all bg-white text-black"
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">State of Residence</label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all bg-white text-black"
                            >
                                <option value="">Select State</option>
                                <option value="Abia">Abia</option>
                                <option value="Adamawa">Adamawa</option>
                                <option value="Akwa Ibom">Akwa Ibom</option>
                                <option value="Anambra">Anambra</option>
                                <option value="Bauchi">Bauchi</option>
                                <option value="Bayelsa">Bayelsa</option>
                                <option value="Benue">Benue</option>
                                <option value="Borno">Borno</option>
                                <option value="Cross River">Cross River</option>
                                <option value="Delta">Delta</option>
                                <option value="Ebonyi">Ebonyi</option>
                                <option value="Edo">Edo</option>
                                <option value="Ekiti">Ekiti</option>
                                <option value="Enugu">Enugu</option>
                                <option value="FCT">Federal Capital Territory</option>
                                <option value="Gombe">Gombe</option>
                                <option value="Imo">Imo</option>
                                <option value="Jigawa">Jigawa</option>
                                <option value="Kaduna">Kaduna</option>
                                <option value="Kano">Kano</option>
                                <option value="Katsina">Katsina</option>
                                <option value="Kebbi">Kebbi</option>
                                <option value="Kogi">Kogi</option>
                                <option value="Kwara">Kwara</option>
                                <option value="Lagos">Lagos</option>
                                <option value="Nasarawa">Nasarawa</option>
                                <option value="Niger">Niger</option>
                                <option value="Ogun">Ogun</option>
                                <option value="Ondo">Ondo</option>
                                <option value="Osun">Osun</option>
                                <option value="Oyo">Oyo</option>
                                <option value="Plateau">Plateau</option>
                                <option value="Rivers">Rivers</option>
                                <option value="Sokoto">Sokoto</option>
                                <option value="Taraba">Taraba</option>
                                <option value="Yobe">Yobe</option>
                                <option value="Zamfara">Zamfara</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Eligibility Confirmation */}
                {currentStep === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h4 className="font-bold text-[#1a237e] border-b pb-2 mb-4">SECTION 2: Eligibility Confirmation</h4>

                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-800 mb-3">
                                Are you a currently enrolled undergraduate student at The Federal University of Technology, Akure?
                            </p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="isEnrolled"
                                        checked={formData.isEnrolled === true}
                                        onChange={() => handleRadioChange('isEnrolled', true)}
                                        className="accent-[#1a237e]"
                                    />
                                    <span>Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="isEnrolled"
                                        checked={formData.isEnrolled === false}
                                        onChange={() => handleRadioChange('isEnrolled', false)}
                                        className="accent-[#1a237e]"
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                            {formData.isEnrolled === false && (
                                <p className="text-red-500 text-xs mt-2">Sorry, this scholarship is only for FUTA students.</p>
                            )}
                        </div>



                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-800 mb-3">
                                Do you agree to follow the full multi-step application process, including video orientation and document verification?
                            </p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="agreesToProcess"
                                        checked={formData.agreesToProcess === true}
                                        onChange={() => handleRadioChange('agreesToProcess', true)}
                                        className="accent-[#1a237e]"
                                    />
                                    <span>Yes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="agreesToProcess"
                                        checked={formData.agreesToProcess === false}
                                        onChange={() => handleRadioChange('agreesToProcess', false)}
                                        className="accent-[#1a237e]"
                                    />
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Consent */}
                {currentStep === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h4 className="font-bold text-[#1a237e] border-b pb-2 mb-4">SECTION 3: Consent</h4>

                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-white transition-colors">
                                <input
                                    type="checkbox"
                                    name="consentCommunication"
                                    checked={formData.consentCommunication}
                                    onChange={handleInputChange}
                                    className="mt-1 w-5 h-5 accent-[#1a237e]"
                                />
                                <span className="text-sm text-gray-700">
                                    I agree that all communications regarding my application will be sent to the email I provided above.
                                </span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-white transition-colors">
                                <input
                                    type="checkbox"
                                    name="consentInstructions"
                                    checked={formData.consentInstructions}
                                    onChange={handleInputChange}
                                    className="mt-1 w-5 h-5 accent-[#1a237e]"
                                />
                                <span className="text-sm text-gray-700">
                                    I consent to receiving an automated email with instructions for the next step.
                                </span>
                            </label>
                        </div>

                    </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="pt-4 mt-6 border-t border-gray-200">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm font-semibold mb-3 text-center bg-red-50 p-2 rounded"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="flex gap-4">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors w-1/3"
                            >
                                Back
                            </button>
                        )}

                        <button
                            type={currentStep === 3 ? "submit" : "button"}
                            disabled={isSubmitting}
                            onClick={(e) => {
                                if (currentStep < 3) {
                                    e.preventDefault();

                                    // Step 1 Validation
                                    if (currentStep === 1) {
                                        if (!formData.firstName || !formData.surname || !formData.email || !formData.phone || !formData.gender || !formData.state) {
                                            setError("Please fill in all required fields.");
                                            return;
                                        }
                                    }

                                    // Step 2 Validation
                                    if (currentStep === 2) {
                                        if (formData.isEnrolled === null || formData.agreesToProcess === null) {
                                            setError("Please answer all questions.");
                                            return;
                                        }
                                    }

                                    setError('');
                                    nextStep();
                                }
                            }}
                            className={`px-6 py-3 font-bold rounded-lg transition-colors ${currentStep === 3
                                ? 'w-2/3 bg-[#1a237e] text-white hover:bg-blue-900 disabled:bg-blue-300'
                                : `bg-[#f06436] text-white hover:bg-[#d95328] ${currentStep === 1 ? 'w-full' : 'w-2/3'}`
                                }`}
                        >
                            {currentStep === 3 ? (isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION") : "Continue"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ScholarshipForm;

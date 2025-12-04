import React, { useState } from 'react';

const AppreciationSection: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-16 md:py-24 bg-blue-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="order-2 md:order-1 space-y-6">
                        <div className="inline-block bg-green-600 px-4 py-1 rounded-full text-sm font-semibold tracking-wide mb-2">
                            LEADERSHIP & VISION
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                            Appreciation to His Excellency
                        </h2>
                        <h3 className="text-xl md:text-2xl text-blue-200 font-medium">
                            Prof. Babagana Umara Zulum, CON, mni
                        </h3>

                        <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px]' : 'max-h-[200px] overflow-hidden'}`}>
                            <div className="space-y-4 text-lg text-blue-100 leading-relaxed">
                                <p>
                                    We express our profound gratitude and unreserved appreciation to His Excellency, Prof. Babagana Umara Zulum, CON, mni, FNSE, the Executive Governor of Borno State, for his purposeful, transformative, and relentless leadership.
                                </p>
                                <p>
                                    Under his stewardship, Borno State has witnessed a renaissance of hope and development. We acknowledge the remarkable progress recorded across key sectors, particularly in Education and Human Capital Development, Agriculture, Healthcare, Good Governance, Security, and Infrastructure. His Excellency’s administration has not only rebuilt physical structures but has also restored the confidence of the common man in government through an unwavering commitment to servant leadership.
                                </p>
                                <p>
                                    For us in Kaga Local Government, the impact of his administration is visible and deeply felt. From road rehabilitation and healthcare expansion to revitalized educational facilities and targeted empowerment initiatives, His Excellency has laid a solid foundation for sustainable growth. His dedication to the security and welfare of the citizenry has been the bedrock upon which our communities are rebuilding and thriving.
                                </p>
                                <p>
                                    This Strategic Development Plan (2026–2027) is inspired by his vision. It is designed not to stand alone, but to complement, strengthen, and sustain the excellent work His Excellency is championing. By aligning our local goals with the Borno State 25-Year Development Framework and the 10-Year Strategic Transformation Plan, we pledge to be reliable partners in his mission to deliver a prosperous, secure, and inclusive future for all.
                                </p>
                                <p>
                                    We pray that Almighty Allah continues to grant His Excellency wisdom, strength, and protection as he steers the affairs of our great state toward the Borno of our dreams.
                                </p>
                            </div>

                            {/* Gradient Overlay for collapsed state */}
                            {!isExpanded && (
                                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-900 to-transparent pointer-events-none"></div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center space-x-2 text-green-400 font-semibold hover:text-green-300 transition-colors group"
                        >
                            <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    <div className="order-1 md:order-2 flex justify-center sticky top-24">
                        <div className="relative">
                            <img
                                src="/he.jpg"
                                alt="His Excellency Prof. Babagana Umara Zulum"
                                className="relative rounded-2xl shadow-2xl w-full max-w-md object-cover border-4 border-white/20"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AppreciationSection;

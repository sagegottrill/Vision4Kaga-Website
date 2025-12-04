import React from 'react';

const AppreciationSection: React.FC = () => {
    return (
        <section className="py-16 md:py-24 bg-blue-900 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
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
                        <p className="text-lg text-blue-100 leading-relaxed">
                            We extend our profound gratitude to the Executive Governor of Borno State for his unwavering support,
                            visionary leadership, and commitment to the development of Kaga Local Government. His transformative
                            policies and dedication to peace and prosperity continue to inspire us all.
                        </p>

                    </div>

                    <div className="order-1 md:order-2 flex justify-center">
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

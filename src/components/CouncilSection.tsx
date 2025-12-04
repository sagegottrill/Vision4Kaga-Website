import React from 'react';

interface CouncilMember {
    name: string;
    ward?: string;
    role?: string;
    image?: string;
}

const councilMembers: CouncilMember[] = [
    { name: "Hon. Bukar Ali Hassan", role: "Vice Chairman", image: "/vc.jpeg" },
    { name: "ZANNA MUSTAPHA MAINA", ward: "BENISHEIKH" },
    { name: "ALHAJI BALA MOHAMMED", ward: "BORGOZO" },
    { name: "SADIQ SHETTIMA", ward: "DOGOMA/JALORI" },
    { name: "IBRAHIM MOHAMMED", ward: "DONGO" },
    { name: "MOHAMMED ALHAJI KUNDULI", ward: "FAI/AFA/MAUDORI" },
    { name: "FATIMA MALLAM AJI", ward: "GALANGI" },
    { name: "HON. MODU ALI KOLO", ward: "GUWO" },
    { name: "TIJJANI GONI ALI", ward: "KARAWARU" },
    { name: "FUGU MOHAMMED", ward: "MAINOK" },
    { name: "GARBA GONI MODU", ward: "MARGUBA" },
    { name: "MOHAMMED ALHAJI BUKAR", ward: "NGAMDU" },
    { name: "ABAKAR MODU MUSTAPHA", ward: "SHETTIMARI" },
    { name: "ALHAJI GARBA AUDU", ward: "TOBOLO" },
    { name: "MODU MUSA BULAMA", ward: "WAJIRO" },
    { name: "IBRAHIM BUNU", ward: "WASARAM" }
];

const CouncilSection: React.FC = () => {
    return (
        <section id="council" className="py-20 bg-slate-50 overflow-hidden relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block bg-white border border-gray-200 px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-gray-600 mb-4 shadow-sm">
                        MEET THE TEAM
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                        The Council
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Meet the dedicated team working tirelessly to build a better future for our community.
                    </p>
                </div>

                <div className="relative py-4">
                    <div className="flex animate-scroll gap-8 items-center">
                        {[...councilMembers, ...councilMembers].map((member, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 w-72 md:w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${member.image ? '' : 'p-8 flex flex-col justify-center items-center text-center h-56 border-b-4 border-green-600'}`}
                            >
                                {member.image ? (
                                    <>
                                        <div className="aspect-w-1 aspect-h-1 w-full relative h-72">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                                <p className="text-green-400 font-medium text-sm tracking-wide uppercase">{member.role}</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-2xl">
                                            🏛️
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{member.name}</h3>
                                        <div className="bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                                            <p className="text-gray-600 font-medium text-xs tracking-wide uppercase">WARD: {member.ward}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 50s linear infinite;
            width: max-content;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
            </div>
        </section>
    );
};

export default CouncilSection;

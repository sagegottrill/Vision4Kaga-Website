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
        <section id="council" className="py-12 md:py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-900 mb-4">
                        The Council
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Meet the dedicated team working tirelessly to build a better future for our community.
                    </p>
                </div>

                <div className="relative">
                    <div className="flex animate-scroll gap-6 md:gap-8 items-center">
                        {[...councilMembers, ...councilMembers].map((member, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 w-72 md:w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${member.image ? '' : 'p-6 flex flex-col justify-center items-center text-center h-48 border-t-4 border-green-600'}`}
                            >
                                {member.image ? (
                                    <>
                                        <div className="aspect-w-1 aspect-h-1 w-full relative h-64">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6 text-center">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                            <p className="text-green-600 font-medium">{member.role}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                        <div className="bg-blue-50 px-4 py-1 rounded-full">
                                            <p className="text-blue-900 font-medium text-sm">WARD: {member.ward}</p>
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
            animation: scroll 40s linear infinite;
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

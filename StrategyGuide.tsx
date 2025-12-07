import React from 'react';

const strategies = [
  { 
    id: "Q1", 
    title: "Q1 (Jan-Mar)", 
    text: "Start with Guatemala. Feb switch to Costa Rica. Mar switch to Colombia (lowest volatility)."
  },
  { 
    id: "Q2", 
    title: "Q2 (Apr-Jun)", 
    text: "Stable in Apr-May. Watch out for June volatility - stay alert!"
  },
  { 
    id: "Q3", 
    title: "Q3 (Jul-Sep)", 
    text: "The Golden Window. Lowest costs of the year. Maximize volume here."
  },
  { 
    id: "Q4", 
    title: "Q4 (Oct-Dec)", 
    text: "Switch to Colombia in Oct, then back to Guatemala for year-end."
  },
];

export const StrategyGuide: React.FC = () => {
  return (
    <section className="mb-12">
       {/* Section Header */}
       <div className="flex items-center justify-center mb-8">
         <div className="bg-white border-4 border-black p-4 shadow-hard transform -rotate-1">
           <h2 className="font-display text-4xl uppercase tracking-tighter text-black">
             Strategy Comic Guide
           </h2>
         </div>
       </div>

       {/* Comic Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-4 border-black bg-white shadow-hard-lg">
         {strategies.map((s, i) => (
            <div 
              key={s.id} 
              className={`
                relative p-6 border-b-4 lg:border-b-0 lg:border-r-4 border-black last:border-0 
                min-h-[300px] flex flex-col group transition-all duration-300
                hover:bg-gray-50
              `}
            >
              {/* Comic Panel Number */}
              <div className="absolute top-2 left-2 w-8 h-8 bg-black text-white font-display text-xl flex items-center justify-center border-2 border-white shadow-sm z-10">
                {i + 1}
              </div>

              {/* Title Box */}
              <div className="mb-6 self-start bg-white border-2 border-black px-3 py-1 transform -rotate-2 group-hover:rotate-0 transition-transform shadow-hard-sm">
                <h3 className="font-display text-xl uppercase leading-none">{s.title}</h3>
              </div>
              
              {/* Comic Bubbles */}
              <div className="flex-grow flex items-center justify-center relative">
                {/* Speech Bubble */}
                <div className="bg-white border-4 border-black p-4 rounded-[50%_20%/10%_40%] relative shadow-hard-sm z-10">
                    <p className="font-display text-lg leading-tight text-center uppercase">
                        {s.text}
                    </p>
                    {/* Tail */}
                    <div className="absolute -bottom-4 left-1/2 w-6 h-6 bg-white border-b-4 border-r-4 border-black transform rotate-45"></div>
                </div>

                {/* Halftone Effect Background */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/halftone-dots.png')] pointer-events-none"></div>
              </div>
              
              {/* Bottom Line */}
              <div className="mt-4 h-2 bg-black w-1/2 mx-auto rounded-full opacity-20 group-hover:w-3/4 transition-all"></div>
            </div>
         ))}
       </div>
    </section>
  );
};
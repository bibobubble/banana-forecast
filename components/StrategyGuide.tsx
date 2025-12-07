
import React from 'react';

const strategies = [
  { 
    id: "Q1", 
    title: "Q1 (Jan-Mar)", 
    subtitle: "Hybrid Strategy", 
    text: "Start with Guatemala. Feb switch to Costa Rica. Mar switch to Colombia (lowest volatility).", 
    bg: "bg-pop-yellow" 
  },
  { 
    id: "Q2", 
    title: "Q2 (Apr-Jun)", 
    subtitle: "Guatemala Lock", 
    text: "Stable in Apr-May. Watch out for June volatility - stay alert!", 
    bg: "bg-pop-cyan" 
  },
  { 
    id: "Q3", 
    title: "Q3 (Jul-Sep)", 
    subtitle: "The Golden Window", 
    text: "Lowest costs of the year. Maximize volume here.", 
    bg: "bg-pop-magenta" 
  },
  { 
    id: "Q4", 
    title: "Q4 (Oct-Dec)", 
    subtitle: "The Pivot", 
    text: "Switch to Colombia in Oct, then back to Guatemala for year-end.", 
    bg: "bg-pop-lime" 
  },
];

export const StrategyGuide: React.FC = () => {
  return (
    <section className="mb-12">
       {/* Section Header */}
       <div className="flex items-center justify-center mb-8">
         <div className="bg-white border-4 border-black p-4 shadow-hard transform rotate-1">
           <h2 className="font-display text-4xl uppercase tracking-tighter">
             Strategy Comic Guide
           </h2>
         </div>
       </div>

       {/* Comic Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {strategies.map((s, i) => (
            <div 
              key={s.id} 
              className="bg-white border-4 border-black shadow-hard-sm relative overflow-hidden group hover:-translate-y-2 transition-transform h-full flex flex-col"
            >
              {/* Comic Header Panel */}
              <div className={`${s.bg} border-b-4 border-black p-4 relative`}>
                <h3 className="font-display text-3xl uppercase leading-none">{s.title}</h3>
                <div className="absolute -bottom-3 right-2 bg-black text-white px-2 py-1 font-body font-bold text-xs uppercase tracking-widest transform -rotate-2">
                  {s.subtitle}
                </div>
              </div>
              
              {/* Comic Content Panel */}
              <div className="p-6 flex-grow flex items-center relative">
                {/* Speech Bubble Tail */}
                <div className="absolute top-0 left-6 w-4 h-4 bg-white border-l-4 border-black transform rotate-45 -translate-y-2 z-10"></div>
                
                <p className="font-body font-bold text-lg leading-tight text-black">
                  "{s.text}"
                </p>
                
                {/* Comic Number Background */}
                <div className="absolute bottom-0 right-1 font-display text-6xl text-gray-100 -z-0 pointer-events-none select-none">
                  {i + 1}
                </div>
              </div>
            </div>
         ))}
       </div>
    </section>
  );
};

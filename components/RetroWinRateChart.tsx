
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label
} from 'recharts';

const DATA = [
  { name: 'Guatemala', value: 46.4, fill: '#FF00FF' }, // Magenta
  { name: 'Colombia',  value: 29.8, fill: '#FFE135' }, // Yellow
  { name: 'Panama',    value: 13.1, fill: '#32CD32' }, // Lime
  { name: 'Costa Rica',value: 10.7, fill: '#00FFFF' }, // Cyan
];

const CustomBarLabel = (props: any) => {
  const { x, y, width, value } = props;
  return (
    <text 
      x={x + width + 5} 
      y={y + 16} // Center vertically roughly
      fill="black" 
      fontFamily="Rubik Mono One, monospace" 
      fontSize={12}
      fontWeight="bold"
      textAnchor="start"
      alignmentBaseline="middle"
    >
      {value}%
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-4 border-black p-2 shadow-hard-sm">
        <p className="font-display uppercase text-lg">{payload[0].payload.name}</p>
        <p className="font-mono text-sm font-bold">LOWEST PRICE RATE: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export const RetroWinRateChart: React.FC = () => {
  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
       {/* Retro Dot Background */}
       <div 
         className="absolute inset-0 pointer-events-none opacity-20"
         style={{ 
            backgroundImage: `radial-gradient(#000 2px, transparent 2px)`,
            backgroundSize: '10px 10px'
         }}
       ></div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          layout="vertical" 
          data={DATA} 
          margin={{ top: 20, right: 60, left: 0, bottom: 25 }}
          barCategoryGap={15}
        >
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fontFamily: 'Bebas Neue', fontSize: 18, fill: 'black' }}
            width={110}
            tickLine={false}
            axisLine={{ stroke: 'black', strokeWidth: 4 }}
          />
           <text
            x="50%"
            y="95%"
            textAnchor="middle"
            fill="black"
            style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '12px' }}
          >
            Frequency of Lowest Price (%)
          </text>
          
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
          
          <Bar 
            dataKey="value" 
            label={<CustomBarLabel />}
            stroke="black"
            strokeWidth={3}
          >
            {DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

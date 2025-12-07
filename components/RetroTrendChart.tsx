
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label
} from 'recharts';

const RAW_DATA = [
  { year: '2019', guatemala: 0.45, colombia: 0.70, costaRica: 0.65, panama: 0.60 },
  { year: '2020', guatemala: 0.52, colombia: 0.72, costaRica: 0.68, panama: 0.65 },
  { year: '2021', guatemala: 0.58, colombia: 0.73, costaRica: 0.72, panama: 0.75 },
  { year: '2022', guatemala: 0.65, colombia: 0.75, costaRica: 0.75, panama: 0.82 },
  { year: '2023', guatemala: 0.72, colombia: 0.78, costaRica: 0.79, panama: 0.88 },
  { year: '2024', guatemala: 0.80, colombia: 0.80, costaRica: 0.82, panama: 0.95 },
  { year: '2025', guatemala: 0.85, colombia: 0.82, costaRica: 0.85, panama: 1.05 },
  { year: '2026 (F)', guatemala: 0.92, colombia: 0.84, costaRica: 0.90, panama: 1.15 },
];

const COLORS = {
  colombia: '#FFE135',
  costaRica: '#00FFFF',
  guatemala: '#FF00FF',
  panama: '#32CD32'
};

// Custom Square Dot for 8-bit effect
const PixelDot = (props: any) => {
  const { cx, cy, stroke } = props;
  return (
    <rect 
      x={cx - 4} 
      y={cy - 4} 
      width={8} 
      height={8} 
      fill={stroke} 
      stroke="black" 
      strokeWidth={2} 
    />
  );
};

const RPTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-4 border-black p-2 shadow-hard-sm font-mono text-xs">
        <div className="bg-black text-white px-1 mb-2">YEAR: {label}</div>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 border border-black" style={{ backgroundColor: entry.color }}></div>
             <span className="uppercase">{entry.name}: ${entry.value?.toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const RetroTrendChart: React.FC = () => {
  return (
    <div className="w-full h-full bg-white relative">
       {/* Pixel Grid Background */}
       <div 
         className="absolute inset-0 pointer-events-none opacity-10"
         style={{ 
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
         }}
       ></div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={RAW_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.2} vertical={false} />
          <XAxis 
            dataKey="year" 
            tick={{ fontFamily: 'Rubik Mono One, monospace', fontSize: 10, fill: 'black' }}
            axisLine={{ stroke: 'black', strokeWidth: 3 }}
            tickLine={false}
            interval={1}
          >
            <Label value="Year" offset={0} position="insideBottom" style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '12px' }} />
          </XAxis>
          <YAxis 
            tick={{ fontFamily: 'Rubik Mono One, monospace', fontSize: 10, fill: 'black' }}
            axisLine={{ stroke: 'black', strokeWidth: 3 }}
            tickLine={{ stroke: 'black', strokeWidth: 2 }}
          >
             <Label value="Price ($/kg)" angle={-90} position="insideLeft" style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '12px', textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip content={<RPTooltip />} />
          <Legend wrapperStyle={{ fontFamily: 'Bebas Neue', fontSize: '14px', paddingTop: '10px' }}/>

          {/* Stepped Lines for Retro Feel */}
          <Line 
            type="stepAfter" 
            dataKey="guatemala" 
            name="GUATEMALA"
            stroke={COLORS.guatemala} 
            strokeWidth={4} 
            dot={<PixelDot />}
            activeDot={{ r: 8, stroke: 'black', strokeWidth: 2 }}
          />
          <Line 
            type="stepAfter" 
            dataKey="colombia" 
            name="COLOMBIA"
            stroke={COLORS.colombia} 
            strokeWidth={4} 
            dot={<PixelDot />}
            activeDot={{ r: 8, stroke: 'black', strokeWidth: 2 }}
          />
          <Line 
            type="stepAfter" 
            dataKey="costaRica" 
            name="COSTA RICA"
            stroke={COLORS.costaRica} 
            strokeWidth={4} 
            dot={<PixelDot />}
            activeDot={{ r: 8, stroke: 'black', strokeWidth: 2 }}
          />
          <Line 
            type="stepAfter" 
            dataKey="panama" 
            name="PANAMA"
            stroke={COLORS.panama} 
            strokeWidth={4} 
            dot={<PixelDot />}
            activeDot={{ r: 8, stroke: 'black', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

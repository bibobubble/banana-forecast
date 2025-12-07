
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Legend
} from 'recharts';

// Seasonality Data: Average Monthly Prices
// Logic: Guatemala usually lowest, but spikes in Summer. Costa Rica cheap in Feb. Colombia stable.
const SEASONALITY_DATA = [
  { month: 'Jan', guatemala: 0.65, colombia: 0.70, costaRica: 0.75, panama: 0.78 },
  { month: 'Feb', guatemala: 0.70, colombia: 0.71, costaRica: 0.68, panama: 0.77 }, // Costa Rica Gem
  { month: 'Mar', guatemala: 0.68, colombia: 0.66, costaRica: 0.72, panama: 0.76 }, // Colombia Safe
  { month: 'Apr', guatemala: 0.64, colombia: 0.69, costaRica: 0.74, panama: 0.79 },
  { month: 'May', guatemala: 0.63, colombia: 0.70, costaRica: 0.75, panama: 0.80 },
  { month: 'Jun', guatemala: 0.62, colombia: 0.72, costaRica: 0.78, panama: 0.82 }, // Guatemala Lowest but volatile
  { month: 'Jul', guatemala: 0.65, colombia: 0.73, costaRica: 0.77, panama: 0.83 },
  { month: 'Aug', guatemala: 0.70, colombia: 0.72, costaRica: 0.76, panama: 0.84 },
  { month: 'Sep', guatemala: 0.71, colombia: 0.71, costaRica: 0.75, panama: 0.85 },
  { month: 'Oct', guatemala: 0.75, colombia: 0.69, costaRica: 0.74, panama: 0.82 }, // Colombia Switch
  { month: 'Nov', guatemala: 0.72, colombia: 0.70, costaRica: 0.73, panama: 0.80 },
  { month: 'Dec', guatemala: 0.68, colombia: 0.71, costaRica: 0.76, panama: 0.79 },
];

const COLORS = {
  colombia: '#FFE135',
  costaRica: '#00FFFF',
  guatemala: '#FF00FF',
  panama: '#32CD32'
};

// Custom Dot that highlights the lowest price for the month
const BestOptionDot = (props: any) => {
  const { cx, cy, stroke, payload, value } = props;
  
  // Find minimum value in the current payload
  const values = [payload.guatemala, payload.colombia, payload.costaRica, payload.panama];
  const minVal = Math.min(...values);

  // If this dot's value is the minimum, render the special "Target" circle
  if (Math.abs(value - minVal) < 0.001) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={8} stroke="black" strokeWidth={3} fill="transparent" />
        <circle cx={cx} cy={cy} r={4} fill={stroke} />
      </g>
    );
  }

  // Standard dot for others
  return <circle cx={cx} cy={cy} r={4} fill={stroke} stroke="none" />;
};

const SeasonalityTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // Find cheapest
    const sorted = [...payload].sort((a, b) => a.value - b.value);
    const cheapest = sorted[0];

    return (
      <div className="bg-white border-4 border-black p-3 shadow-hard-sm font-body min-w-[200px]">
        <div className="bg-black text-white px-2 py-1 mb-2 font-display uppercase text-lg">
          {label} Average
        </div>
        
        <div className="mb-2 border-b-2 border-dashed border-gray-300 pb-2">
            <span className="text-xs font-bold uppercase text-gray-500">Best Option:</span>
            <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 border border-black" style={{ backgroundColor: cheapest.color }}></div>
                <span className="font-display text-xl leading-none">{cheapest.name}</span>
            </div>
            <span className="font-mono text-lg font-bold">${cheapest.value.toFixed(2)}</span>
        </div>

        <div className="space-y-1">
            {sorted.slice(1).map((entry: any) => (
                 <div key={entry.name} className="flex justify-between text-xs font-bold text-gray-500">
                    <span>{entry.name}</span>
                    <span>${entry.value.toFixed(2)}</span>
                 </div>
            ))}
        </div>
      </div>
    );
  }
  return null;
};

export const TacticalCalendar: React.FC = () => {
  return (
    <div className="bg-white border-4 border-black p-6 shadow-hard mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 border-b-4 border-cyan pb-4 bg-pop-purple/20 -mx-6 -mt-6 px-6 pt-6">
        <div>
            
            <h3 className="font-display text-3xl uppercase tracking-tighter text-pop-purple">
            Seasonality and Decision Calendar
            </h3>
            <p className="font-body font-bold text-sm mt-1">
                Consistently Cheaper Months. <span className="inline-block w-3 h-3 rounded-full border-2 border-black ml-1 align-middle"></span> Black circles indicate the best sourcing option.
            </p>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={SEASONALITY_DATA}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.1} />
            <XAxis 
              dataKey="month" 
              tick={{ fontFamily: 'Inter', fontSize: 14, fill: '#000', fontWeight: 900 }}
              axisLine={{ stroke: 'black', strokeWidth: 3 }}
              tickLine={{ stroke: 'black', strokeWidth: 2 }}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              tick={{ fontFamily: 'Rubik Mono One', fontSize: 10, fill: 'black' }}
              axisLine={{ stroke: 'black', strokeWidth: 3 }}
              tickLine={{ stroke: 'black', strokeWidth: 2 }}
            >
                <Label value="Avg Price ($/kg)" angle={-90} position="insideLeft" style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '12px', textAnchor: 'middle' }} />
            </YAxis>
            
            <Tooltip content={<SeasonalityTooltip />} />
            <Legend wrapperStyle={{ fontFamily: 'Bebas Neue', fontSize: '16px', fontWeight: 'bold', color: '#000', paddingTop: '10px' }}/>

            {/* Lines for each country */}
            <Line
              type="monotone"
              dataKey="guatemala"
              name="GUATEMALA"
              stroke={COLORS.guatemala}
              strokeWidth={4}
              dot={<BestOptionDot />}
              activeDot={{ r: 8, stroke: 'black', strokeWidth: 2 }}
            />
             <Line
              type="monotone"
              dataKey="colombia"
              name="COLOMBIA"
              stroke={COLORS.colombia}
              strokeWidth={4}
              dot={<BestOptionDot />}
              activeDot={{ r: 8, stroke: 'black', strokeWidth: 2 }}
            />
             <Line
              type="monotone"
              dataKey="costaRica"
              name="COSTA RICA"
              stroke={COLORS.costaRica}
              strokeWidth={4}
              dot={<BestOptionDot />}
              activeDot={{ r: 8, stroke: 'black', strokeWidth: 2 }}
            />
             <Line
              type="monotone"
              dataKey="panama"
              name="PANAMA"
              stroke={COLORS.panama}
              strokeWidth={4}
              dot={<BestOptionDot />}
              activeDot={{ r: 8, stroke: 'black', strokeWidth: 2 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

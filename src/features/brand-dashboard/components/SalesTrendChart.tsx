import React, { useState } from 'react';

export const SalesTrendChart: React.FC = () => {
  const [activeToggle, setActiveToggle] = useState<'day' | 'week'>('day');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Data points corresponding to Mon (0) to Sun (6) matching the image exactly
  const dayPoints = [
    { label: 'Mon', value: 4200, x: 80, y: 154, displayValue: '4,200 EGP' },
    { label: 'Tue', value: 3800, x: 187, y: 166, displayValue: '3,800 EGP' },
    { label: 'Wed', value: 5100, x: 293, y: 127, displayValue: '5,100 EGP' },
    { label: 'Thu', value: 4600, x: 400, y: 142, displayValue: '4,600 EGP' },
    { label: 'Fri', value: 6300, x: 507, y: 91, displayValue: '6,300 EGP' },
    { label: 'Sat', value: 7900, x: 613, y: 43, displayValue: '7,900 EGP' },
    { label: 'Sun', value: 7200, x: 720, y: 64, displayValue: '7,200 EGP' },
  ];

  const weekPoints = [
    { label: 'Week 1', value: 5500, x: 80, y: 115, displayValue: '5,500 EGP' },
    { label: 'Week 2', value: 4800, x: 187, y: 136, displayValue: '4,800 EGP' },
    { label: 'Week 3', value: 6200, x: 293, y: 94, displayValue: '6,200 EGP' },
    { label: 'Week 4', value: 5800, x: 400, y: 106, displayValue: '5,800 EGP' },
    { label: 'Week 5', value: 7100, x: 507, y: 67, displayValue: '7,100 EGP' },
    { label: 'Week 6', value: 7800, x: 613, y: 46, displayValue: '7,800 EGP' },
    { label: 'Week 7', value: 7400, x: 720, y: 58, displayValue: '7,400 EGP' },
  ];

  const currentPoints = activeToggle === 'day' ? dayPoints : weekPoints;

  const yLines = [8000, 6000, 4000, 2000, 0];

  // Helper function to map grid line values to Y coordinates
  const mapValueToY = (value: number) => {
    return 280 - (value / 8000) * 240;
  };

  // Generate dynamic smooth bezier path
  const buildBezierPath = (pts: typeof dayPoints) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const dx = (next.x - curr.x) * 0.45; // Perfect smooth curve tension
      d += ` C ${curr.x + dx} ${curr.y}, ${next.x - dx} ${next.y}, ${next.x} ${next.y}`;
    }
    return d;
  };

  const pathD = buildBezierPath(currentPoints);
  const areaD = `${pathD} L 720 280 L 80 280 Z`;

  return (
    <div id="sales-trend-card" className="bg-white border border-[#EBE8E2] rounded-[24px] p-3.5 xs:p-5 md:p-8 shadow-xs">
      {/* Header of Sales Trend block */}
      <div id="sales-trend-header" className="flex flex-col xs:flex-row xs:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div id="sales-trend-title-wrapper" className="text-start">
          <h2 id="sales-trend-title" className="text-[24px] font-bold font-sans text-gray-900 leading-tight">
            Sales Trend
          </h2>
          <p id="sales-trend-description" className="text-[13px] font-normal font-sans text-gray-400 mt-1">
            Revenue performance over time
          </p>
        </div>

        {/* Toggle Option bar */}
        <div id="sales-trend-toggle-group" className="flex items-center bg-[#F7F5F0] p-1 rounded-xl border border-[#EDEAE4] self-start xs:self-auto">
          <button
            id="toggle-btn-day"
            onClick={() => setActiveToggle('day')}
            className={`px-5 py-1.5 rounded-lg font-semibold font-sans text-xs transition-all cursor-pointer ${
              activeToggle === 'day'
                ? 'bg-[#A36427] text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Day
          </button>
          
          <button
            id="toggle-btn-week"
            onClick={() => setActiveToggle('week')}
            className={`px-5 py-1.5 rounded-lg font-semibold font-sans text-xs transition-all cursor-pointer ${
              activeToggle === 'week'
                ? 'bg-[#A36427] text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {/* SVG Canvas Stage container */}
      <div id="chart-viewport-container" className="relative w-full select-none pb-2 overflow-hidden">
        <div className="w-full relative">
          <svg
            id="trend-chart-svg"
            width="100%"
            height="100%"
            viewBox="0 0 760 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible w-full h-auto aspect-[760/340] sm:aspect-auto md:h-[340px]"
          >
            {/* Gradients */}
            <defs>
              {/* Dynamic warm area gradient under the curve styled like the image */}
              <linearGradient id="areaGlow" x1="400" y1="40" x2="400" y2="280" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A36427" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#A36427" stopOpacity="0.10" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid dashed lines (8000, 6000, 4000, 2000, 0) */}
            {yLines.map((val) => {
              const y = mapValueToY(val);
              return (
                <g key={val} id={`grid-line-group-${val}`}>
                  <text
                    id={`grid-label-${val}`}
                    x="64"
                    y={y + 4}
                    fill="#A0A0A0"
                    className="text-[13px] sm:text-[11px] font-bold sm:font-medium font-sans"
                    textAnchor="end"
                  >
                    {val}
                  </text>
                  
                  {/* Tick mark next to each label on the Y-Axis pointing left */}
                  <line
                    id={`y-tick-${val}`}
                    x1="74"
                    y1={y}
                    x2="80"
                    y2={y}
                    stroke="#D2CFC9"
                    strokeWidth="1.25"
                  />
                  
                  {val > 0 && (
                    <line
                      id={`dashed-grid-${val}`}
                      x1="80"
                      y1={y}
                      x2="720"
                      y2={y}
                      stroke="#ECE9E4"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  )}
                </g>
              );
            })}

            {/* Solid Y-Axis line on the left */}
            <line
              id="y-axis-line"
              x1="80"
              y1="40"
              x2="80"
              y2="280"
              stroke="#D2CFC9"
              strokeWidth="1.25"
            />

            {/* Vertical grid dashed lines for each Day/Week point */}
            {currentPoints.map((pt, idx) => {
              if (idx === 0) return null; // Monday/first point sits on the solid Y-axis line
              return (
                <line
                  key={`grid-vert-${idx}`}
                  id={`dashed-grid-v-${idx}`}
                  x1={pt.x}
                  y1="40"
                  x2={pt.x}
                  y2="280"
                  stroke="#ECE9E4"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Solid X-Axis line at the baseline */}
            <line
              id="x-axis-line"
              x1="80"
              y1="280"
              x2="726"
              y2="280"
              stroke="#D2CFC9"
              strokeWidth="1.25"
            />

            {/* X-Axis Ticks pointing downwards */}
            {currentPoints.map((pt, idx) => (
              <line
                key={`x-tick-${idx}`}
                id={`x-tick-${idx}`}
                x1={pt.x}
                y1="280"
                x2={pt.x}
                y2="286"
                stroke="#D2CFC9"
                strokeWidth="1.25"
              />
            ))}

            {/* Area under the curve */}
            <path id="chart-area-path" d={areaD} fill="url(#areaGlow)" />

            {/* Line curve path matching the warm bronze color */}
            <path
              id="chart-stroke-path"
              d={pathD}
              stroke="#A36427"
              strokeWidth="3.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Points on the curve (invisible by default, shows rings on hover) */}
            {currentPoints.map((pt, idx) => {
              const isHovered = hoveredPoint === idx;
              return (
                <g
                  key={idx}
                  id={`chart-dot-group-${idx}`}
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="cursor-pointer"
                >
                  {/* Invisible enlarged hover trigger shape */}
                  <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />
                  
                  {/* Outer breathing/scale ring on hover */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 12 : 0}
                    fill="#A36427"
                    fillOpacity="0.15"
                    className="transition-all duration-300"
                  />

                  {/* Dot core on hover */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 6 : 0}
                    fill="white"
                    stroke="#A36427"
                    strokeWidth="3"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* X-Axis labels (Mon, Tue, Wed...) centered under ticks */}
            {currentPoints.map((pt, idx) => (
              <text
                key={idx}
                id={`xAxis-label-${idx}`}
                x={pt.x}
                y="302"
                fill="#A0A0A0"
                className="text-[13px] sm:text-[11px] font-bold sm:font-medium font-sans"
                textAnchor="middle"
              >
                {pt.label}
              </text>
            ))}

            {/* Tooltip Overlay (SVG-native, ensuring pixel-perfect position across all screen sizes) */}
            {hoveredPoint !== null && (
              <g id="chart-svg-tooltip" className="pointer-events-none transition-all duration-150">
                {/* Tooltip shadow and container rect */}
                <rect
                  id="tooltip-bg"
                  x={currentPoints[hoveredPoint].x - 48}
                  y={currentPoints[hoveredPoint].y - 48}
                  width="96"
                  height="30"
                  rx="8"
                  fill="#111827"
                />
                {/* Small indicator triangle pointing down */}
                <polygon
                  points={`${currentPoints[hoveredPoint].x - 6},${currentPoints[hoveredPoint].y - 18} ${currentPoints[hoveredPoint].x + 6},${currentPoints[hoveredPoint].y - 18} ${currentPoints[hoveredPoint].x},${currentPoints[hoveredPoint].y - 12}`}
                  fill="#111827"
                />
                <text
                  id="tooltip-text"
                  x={currentPoints[hoveredPoint].x}
                  y={currentPoints[hoveredPoint].y - 28}
                  fill="#FFFFFF"
                  className="text-[12px] font-bold font-sans"
                  textAnchor="middle"
                >
                  {currentPoints[hoveredPoint].displayValue}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

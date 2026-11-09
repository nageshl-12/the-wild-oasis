import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts';

import Heading from '../../ui/Heading';

function DurationChart({ confirmedStays }) {
  // 1. Group stays by duration
  const durationData = Object.entries(
    confirmedStays.reduce((acc, stay) => {
      const duration = `${stay.numNights} Nights`;

      acc[duration] = (acc[duration] || 0) + 1;

      return acc;
    }, {}),
  ).map(([name, value]) => ({
    name,
    value,
  }));

  // 2. Generate random colors
  const colors = durationData.map(
    () =>
      // eslint-disable-next-line react-hooks/purity
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')}`,
  );

  return (
    <div className="bg-white px-1 py-3 rounded-md">
      <Heading fieldName="Stay Duration Summery" validate={false} />

      <ResponsiveContainer height={300} width="98%">
        <PieChart margin={{ left: 18 }}>
          <Pie
            data={durationData}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {durationData.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationChart;

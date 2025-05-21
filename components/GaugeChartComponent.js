import dynamic from 'next/dynamic';

const GaugeChart = dynamic(() => import('react-gauge-chart'), { ssr: false });

export default function GaugeChartComponent({ percentage, label }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto my-6">
      <h2 className="text-lg font-semibold text-center mb-4">{label}</h2>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={20}
        percent={percentage}
        colors={['#FF5F6D', '#FFC371']}
        arcWidth={0.3}
        textColor="#000000"
      />
      <p className="text-center mt-4 text-sm font-medium">
        {Math.round(percentage * 100)}%
      </p>
    </div>
  );
}

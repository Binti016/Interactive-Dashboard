import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import dynamic from 'next/dynamic';

const GaugeChart = dynamic(() => import('react-gauge-chart'), { ssr: false });

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function CustomerCharts({ customers }) {
  if (customers.length === 0) return null;

  const genderCounts = customers.reduce((acc, customer) => {
    const gender = customer.Gender?.toUpperCase() || 'Unknown';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const divisionCounts = customers.reduce((acc, customer) => {
    const division = customer.Division || 'Unknown';
    acc[division] = (acc[division] || 0) + 1;
    return acc;
  }, {});

  const maritalDivisionCounts = {};
  customers.forEach((customer) => {
    const division = customer.Division || 'Unknown';
    const marital = customer.MaritalStatus?.toUpperCase() || 'Unknown';
    if (!maritalDivisionCounts[division]) {
      maritalDivisionCounts[division] = {};
    }
    maritalDivisionCounts[division][marital] =
      (maritalDivisionCounts[division][marital] || 0) + 1;
  });

  const genderData = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        label: 'Gender Distribution',
        data: Object.values(genderCounts),
        backgroundColor: ['#3b82f6', '#ec4899', '#10b981'],
      },
    ],
  };

  const divisionData = {
    labels: Object.keys(divisionCounts),
    datasets: [
      {
        label: 'Customers by Division',
        data: Object.values(divisionCounts),
        backgroundColor: '#60a5fa', 
      },
    ],
  };

  const uniqueMaritalStatuses = Object.keys(
    customers.reduce((acc, customer) => {
      const status = customer.MaritalStatus?.toUpperCase() || 'Unknown';
      acc[status] = true;
      return acc;
    }, {})
  );

  const stackedBarData = {
    labels: Object.keys(maritalDivisionCounts),
    datasets: uniqueMaritalStatuses.map((status, index) => ({
      label: status,
      data: Object.values(maritalDivisionCounts).map((m) => m[status] || 0),
      backgroundColor: ['#60a5fa', '#f87171', '#34d399', '#a78bfa'][index % 4],
    })),
  };

  const stackedBarOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  const femalePercentage =
    customers.length > 0
      ? customers.filter((c) => c.Gender?.toUpperCase() === 'F').length / customers.length
      : 0;

  const incomeGenderBuckets = {
    '<10k': { M: 0, F: 0 },
    '10k-30k': { M: 0, F: 0 },
    '30k-50k': { M: 0, F: 0 },
    '50k+': { M: 0, F: 0 },
  };

  customers.forEach((c) => {
    const income = parseFloat(c.Income);
    const gender = c.Gender?.toUpperCase();
    if (!isNaN(income) && (gender === 'M' || gender === 'F')) {
      if (income < 10000) incomeGenderBuckets['<10k'][gender]++;
      else if (income <= 30000) incomeGenderBuckets['10k-30k'][gender]++;
      else if (income <= 50000) incomeGenderBuckets['30k-50k'][gender]++;
      else incomeGenderBuckets['50k+'][gender]++;
    }
  });

  const incomeByGenderData = {
    labels: Object.keys(incomeGenderBuckets),
    datasets: [
      {
        label: 'Male',
        data: Object.values(incomeGenderBuckets).map((group) => group.M),
        backgroundColor: '#60a5fa',
      },
      {
        label: 'Female',
        data: Object.values(incomeGenderBuckets).map((group) => group.F),
        backgroundColor: '#f472b6',
      },
    ],
  };

  const incomeByGenderOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: { stacked: false },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <div className="bg-white p-4 rounded shadow h-96">
        <h2 className="text-lg font-semibold mb-2 text-center">Gender Distribution</h2>
        <div className="h-72 ml-35">
          <Pie data={genderData} />
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow h-96">
        <h2 className="text-lg font-semibold mb-2 text-center">Customers by Division</h2>
        <div className="h-72 mt-8">
          <Bar data={divisionData} />
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow h-96">
        <h2 className="text-lg font-semibold mb-2 text-center">Marital Status by Division</h2>
        <div className="h-72 mt-8">
          <Bar data={stackedBarData} options={stackedBarOptions} />
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow h-96 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold mb-2 text-center">Female Customer Percentage</h2>
        <div className="h-72 w-full flex justify-center items-center">
          <GaugeChart
            id="gauge-chart"
            nrOfLevels={20}
            percent={femalePercentage}
            colors={['#FF5F6D', '#FFC371']}
            arcWidth={0.3}
            textColor="#000000"
            formatTextValue={() => `${Math.round(femalePercentage * 100)}%`}
          />
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow h-96">
        <h2 className="text-lg font-semibold mb-2 text-center">Income Distribution by Gender</h2>
        <div className="h-72 mt-8">
          <Bar data={incomeByGenderData} options={incomeByGenderOptions} />
        </div>
      </div>
    </div>
  );
}

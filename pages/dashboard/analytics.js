import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
    <div className="relative min-h-screen bg-[url('/Renata.jpeg')] bg-cover bg-center">
     
      <div className="absolute inset-0 bg-blue-900 opacity-90 backdrop-blur-sm"></div>

     
      <div className="relative z-10 p-8 max-w-4xl mx-auto text-white">
        <h1 className="text-3xl font-bold text-white mb-6">About Us</h1>

        <p className="mb-4">
          This dashboard application is built to streamline internal workflows, visualize key business metrics,
          and manage users efficiently. It provides an intuitive and responsive interface for data-driven decisions.
        </p>

        <p className="mb-4">
          <strong>Developed specifically for Renata Ltd.</strong>, the platform aims to support the company's
          operational teams such as Admin, Sales, and Viewers by providing customized analytics and role-based
          access to essential tools.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Core Features</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>📊 Interactive Data Analytics with Filters</li>
          <li>👥 Role-Based User Management</li>
          <li>⚙️ Settings and Configurations for Custom Use</li>
          <li>📁 Export Options for Reports and Charts</li>
          <li>📈 Responsive UI with Real-Time Insights</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Our Mission</h2>
        <p className="mb-4">
          To empower Renata’s internal teams with powerful data tools that simplify workflows,
          improve visibility, and enable smarter decisions at every level.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Tech Stack</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Next.js</li>
          <li>Tailwind CSS</li>
          <li>Chart.js & Gauge Chart</li>
          <li>LocalStorage Authentication</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Feedback</h2>
        <p>
          For feedback or suggestions, please contact the development team or submit feedback through the internal portal.
        </p>
      </div>
    </div>
    </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useAuth } from '../../context/AuthContext';
import CustomerCharts from '../../components/CustomerCharts';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { Download, RefreshCcw, ArrowLeft, ArrowRight } from 'lucide-react';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ gender: 'All', division: 'All' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredData = customers.filter((c) => {
      const genderMatch = filters.gender === 'All' || c.Gender === filters.gender;
      const divisionMatch = filters.division === 'All' || c.Division === filters.division;
      return genderMatch && divisionMatch;
    });
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [filters, customers]);

  const uniqueGenders = [...new Set(customers.map((c) => c.Gender))];
  const uniqueDivisions = [...new Set(customers.map((c) => c.Division))];

  const genderOptions = [{ label: 'All', value: 'All' }, ...uniqueGenders.map((g) => ({ label: g, value: g }))];
  const divisionOptions = [{ label: 'All', value: 'All' }, ...uniqueDivisions.map((d) => ({ label: d, value: d }))];

  const handleFilterChange = (field) => (selected) => {
    setFilters((prev) => ({ ...prev, [field]: selected.value }));
  };

  const resetFilters = () => {
    setFilters({ gender: 'All', division: 'All' });
  };

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headers = Object.keys(filtered[0]).join(',');
    const rows = filtered.map((row) => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'customers.csv';
    link.click();
  };

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const currentRows = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <motion.h1
            className="text-4xl font-bold text-blue-900 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            📊 Customer Analytics
          </motion.h1>

          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3" />
              <div className="h-72 bg-gray-200 rounded-lg" />
              <div className="h-48 bg-gray-200 rounded-lg" />
            </div>
          ) : (
            <>
            
              <motion.div
                className="bg-white rounded-xl shadow p-6 flex flex-wrap gap-6 items-end border border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-40">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <Select
                    options={genderOptions}
                    defaultValue={genderOptions[0]}
                    onChange={handleFilterChange('gender')}
                    value={genderOptions.find((o) => o.value === filters.gender)}
                    isSearchable={false}
                  />
                </div>
                <div className="w-40">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                  <Select
                    options={divisionOptions}
                    defaultValue={divisionOptions[0]}
                    onChange={handleFilterChange('division')}
                    value={divisionOptions.find((o) => o.value === filters.division)}
                    isSearchable={false}
                  />
                </div>

                <button
                  onClick={resetFilters}
                  className="ml-auto px-4 py-2 border rounded-md bg-white hover:bg-gray-100 text-sm text-gray-600 flex items-center gap-2 transition"
                >
                  <RefreshCcw size={16} />
                  Reset Filters
                </button>
              </motion.div>

             
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-blue-700 mt-10 mb-4">Customer Overview</h2>
                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <CustomerCharts customers={filtered} />
                </div>
              </motion.div>

            
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center mt-10 mb-4">
                  <h2 className="text-2xl font-semibold text-blue-700">Customer Details</h2>
                  {filtered.length > 0 && (
                    <button
                      onClick={exportCSV}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition"
                    >
                      <Download size={16} />
                      Export CSV
                    </button>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow p-4 overflow-x-auto border border-gray-100">
                  {filtered.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No customers found for selected filters.</p>
                  ) : (
                    <>
                      <table className="min-w-full table-auto text-sm text-left">
                        <thead className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                          <tr>
                            {Object.keys(filtered[0]).map((key) => (
                              <th key={key} className="px-4 py-3 font-semibold">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {currentRows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition">
                              {Object.values(row).map((value, i) => (
                                <td key={i} className="px-4 py-3 text-gray-800">
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                 
                      <div className="mt-6 flex justify-center items-center gap-4">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm flex items-center gap-1 disabled:opacity-50"
                        >
                          <ArrowLeft size={16} />
                          Prev
                        </button>
                        <span className="font-medium text-gray-700">
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm flex items-center gap-1 disabled:opacity-50"
                        >
                          Next
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

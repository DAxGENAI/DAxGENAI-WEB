import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';

const DataVisualization = () => {
  const [activeTab, setActiveTab] = useState('bar');

  const barData = [
    { name: 'Python', value: 85, color: '#0ea5e9' },
    { name: 'SQL', value: 78, color: '#8b5cf6' },
    { name: 'Excel', value: 92, color: '#10b981' },
    { name: 'Power BI', value: 73, color: '#f59e0b' },
    { name: 'R', value: 65, color: '#ef4444' },
  ];

  const pieData = [
    { name: 'Data Analysis', value: 35, color: '#0ea5e9' },
    { name: 'Machine Learning', value: 25, color: '#8b5cf6' },
    { name: 'Visualization', value: 20, color: '#10b981' },
    { name: 'Statistics', value: 15, color: '#f59e0b' },
    { name: 'Others', value: 5, color: '#ef4444' },
  ];

  const lineData = [
    { month: 'Jan', students: 120, growth: 15 },
    { month: 'Feb', students: 150, growth: 25 },
    { month: 'Mar', students: 180, growth: 20 },
    { month: 'Apr', students: 220, growth: 22 },
    { month: 'May', students: 280, growth: 27 },
    { month: 'Jun', students: 350, growth: 25 },
  ];

  const areaData = [
    { month: 'Jan', completion: 75, satisfaction: 88 },
    { month: 'Feb', completion: 82, satisfaction: 92 },
    { month: 'Mar', completion: 78, satisfaction: 85 },
    { month: 'Apr', completion: 90, satisfaction: 94 },
    { month: 'May', completion: 88, satisfaction: 91 },
    { month: 'Jun', completion: 95, satisfaction: 96 },
  ];

  const tabs = [
    { id: 'bar', label: 'Bar Chart', icon: '📊' },
    { id: 'pie', label: 'Pie Chart', icon: '🥧' },
    { id: 'line', label: 'Line Chart', icon: '📈' },
    { id: 'area', label: 'Area Chart', icon: '📊' },
  ];

  const renderChart = () => {
    switch (activeTab) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
              <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
              <Line type="monotone" dataKey="students" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }} />
              <Line type="monotone" dataKey="growth" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
              <Area type="monotone" dataKey="completion" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
              <Area type="monotone" dataKey="satisfaction" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-sky-900 text-sky-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BarChart className="h-4 w-4" />
            <span>Data Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-6">
            Visualize Your Success
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            See how our training programs are transforming careers with real data and measurable results.
          </p>
        </motion.div>

        {/* Chart Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Chart Container */}
        <motion.div 
          className="bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {renderChart()}
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: 'Students Trained', value: '2000+', icon: '👥' },
            { label: 'Success Rate', value: '98%', icon: '🎯' },
            { label: 'Average Salary Increase', value: '45%', icon: '💰' },
            { label: 'Course Completion', value: '95%', icon: '✅' },
          ].map((stat, index) => (
            <div key={index} className="bg-slate-800 rounded-xl p-6 border border-slate-600 text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-slate-100 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DataVisualization; 
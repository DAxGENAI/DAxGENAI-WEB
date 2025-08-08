import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const DataVisualization = () => {
  const [activeChart, setActiveChart] = useState('line');

  // Sample data for visualizations
  const studentProgressData = [
    { month: 'Jan', students: 120, completion: 85, satisfaction: 92 },
    { month: 'Feb', students: 150, completion: 88, satisfaction: 94 },
    { month: 'Mar', students: 180, completion: 90, satisfaction: 96 },
    { month: 'Apr', students: 220, completion: 92, satisfaction: 95 },
    { month: 'May', students: 280, completion: 94, satisfaction: 97 },
    { month: 'Jun', students: 320, completion: 96, satisfaction: 98 },
  ];

  const coursePopularityData = [
    { name: 'Python', students: 680, fill: '#3B82F6' },
    { name: 'SQL', students: 520, fill: '#10B981' },
    { name: 'Power BI', students: 340, fill: '#F59E0B' },
    { name: 'Machine Learning', students: 420, fill: '#EF4444' },
    { name: 'Excel', students: 380, fill: '#8B5CF6' },
    { name: 'Generative AI', students: 380, fill: '#06B6D4' },
  ];

  const skillRadarData = [
    { skill: 'Python', value: 95, fullMark: 100 },
    { skill: 'SQL', value: 88, fullMark: 100 },
    { skill: 'Power BI', value: 92, fullMark: 100 },
    { skill: 'Statistics', value: 85, fullMark: 100 },
    { skill: 'Machine Learning', value: 90, fullMark: 100 },
    { skill: 'Data Visualization', value: 93, fullMark: 100 },
  ];

  const salaryIncreaseData = [
    { experience: '0-1 years', before: 45000, after: 65000 },
    { experience: '1-3 years', before: 55000, after: 75000 },
    { experience: '3-5 years', before: 65000, after: 85000 },
    { experience: '5+ years', before: 75000, after: 95000 },
  ];

  const chartTypes = [
    { id: 'line', name: 'Student Progress' },
    { id: 'pie', name: 'Course Popularity' },
    { id: 'radar', name: 'Skill Assessment' },
    { id: 'bar', name: 'Salary Impact' },
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={studentProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="students" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={coursePopularityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="students"
              >
                {coursePopularityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={skillRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Skill Level"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salaryIncreaseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="experience" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="before" fill="#EF4444" name="Before Training" />
              <Bar dataKey="after" fill="#10B981" name="After Training" />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Data-Driven Success Stories
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive analytics and see how DAxGENAI transforms careers through data.
          </p>
        </motion.div>

        {/* Chart Type Selector */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {chartTypes.map((chart) => (
            <motion.button
              key={chart.id}
              onClick={() => setActiveChart(chart.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeChart === chart.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {chart.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Chart Container */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {renderChart()}
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">2,000+</div>
            <div className="text-gray-600">Students Trained</div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">₹21L</div>
            <div className="text-gray-600">Avg. Salary Increase</div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
            <div className="text-gray-600">Months to Master</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataVisualization; 
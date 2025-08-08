import React from 'react';
import { Briefcase, GraduationCap, Target, CheckCircle } from 'lucide-react';

const About = () => {
  const achievements = [
    "Senior Data Analyst at NeuNex AI & Analytics",
    "5+ years of industry experience",
    "Trained over 2000 successful students",
    "Expert in AI and Machine Learning technologies",
    "Specialized in practical, hands-on training methods",
    "Industry-recognized certifications and expertise"
  ];

  return (
    <section id="about" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Your Trainer</h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Learn from an experienced professional who has helped thousands of students 
            successfully transition into data analysis and AI careers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-200">Professional Experience</h3>
                  <p className="text-sm sm:text-base text-slate-400">Senior Data Analyst at NeuNex AI & Analytics</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-200">Teaching Excellence</h3>
                  <p className="text-sm sm:text-base text-slate-400">Over 2000 students successfully trained</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-200">Specialized Training</h3>
                  <p className="text-sm sm:text-base text-slate-400">Personalized one-on-one coaching approach</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h4 className="text-base sm:text-lg font-bold mb-4">Key Achievements</h4>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-sky-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-slate-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional Trainer"
                className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 lg:h-auto object-cover"
              />
            </div>
            <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-full h-full bg-gradient-primary rounded-2xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React from 'react';
import { Check, Star, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { trackPricingClick } from './Analytics';

const Pricing = () => {
  const plan = {
    name: "Course Package",
    price: "24,817",
    period: "per course",
    description: "Complete a full course with dedicated support",
    features: [
      "3 Months Training",
      "Daily 1-on-1 Sessions",
      "All course materials",
      "Practice projects",
      "Certificate of completion",
      "3 months email support",
      "Career guidance session"
    ],
    cta: "Start Course Package"
  };

  const addOns = [
    {
      name: "Extra Session",
      price: "₹6,557",
      description: "Additional 1-hour personalized session"
    },
    {
      name: "Rush Delivery",
      price: "₹16,517",
      description: "Complete course in half the standard time"
    },
    {
      name: "Group Session",
      price: "₹12,367",
      description: "Bring a colleague for shared learning (per person)"
    }
  ];

  return (
    <section id="pricing" className="section section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Transparent Pricing</h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Choose the training option that best fits your goals and budget. All packages include personalized attention and comprehensive support.
          </p>
        </div>

        {/* Single Horizontal Pricing Card */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="relative card border-2 border-sky-400 overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                <Star className="h-4 w-4 fill-current" />
                <span>Most Popular</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Pricing Info */}
              <div className="p-8 lg:p-12 bg-slate-800/50">
                <h3 className="text-2xl lg:text-3xl font-bold mb-3">{plan.name}</h3>
                <p className="text-slate-400 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl lg:text-5xl font-bold text-gradient">₹{plan.price}</span>
                  <span className="text-lg text-slate-400 ml-2">{plan.period}</span>
                </div>

                <button 
                  onClick={() => trackPricingClick(plan.name)}
                  className="w-full btn-primary py-4 px-8 text-lg">
                  {plan.cta}
                </button>
              </div>

              {/* Right Side - Features */}
              <div className="p-8 lg:p-12">
                <h4 className="text-xl font-bold mb-6">What's Included:</h4>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-sky-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Add-On Services</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 sm:p-6 border border-slate-700">
                <h4 className="text-sm sm:text-base font-semibold mb-2">{addon.name}</h4>
                <p className="text-slate-400 text-sm mb-4">{addon.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl sm:text-2xl font-bold text-gradient">{addon.price}</span>
                  <button className="text-sky-400 hover:text-sky-300 font-medium text-sm">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="card bg-gradient-primary text-white py-6 sm:py-8 px-4 sm:px-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Special Launch Offer</h3>
            <p className="text-sm sm:text-base text-slate-200 mb-6">Book your first session within the next 7 days and get 20% off any package!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Flexible scheduling</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>One-on-one attention</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4" />
                <span>Money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
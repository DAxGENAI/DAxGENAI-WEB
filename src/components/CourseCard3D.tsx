import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import { Star, ArrowRight, CheckCircle, Clock, Users } from 'lucide-react';

interface CourseCard3DProps {
  title: string;
  description: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  logo: string;
  logoName: string;
  price?: string;
  tools?: string[];
  learningOutcomes?: string[];
  certificate?: boolean;
  lastUpdated?: string;
  onClick?: () => void;
}

const CourseCard3D: React.FC<CourseCard3DProps> = ({
  title,
  description,
  duration,
  level,
  rating,
  students,
  logo,
  logoName,
  price,
  tools = [],
  learningOutcomes = [],
  certificate = false,
  lastUpdated,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        setIsClicked(!isClicked);
        onClick?.();
      }}
    >
      {/* 3D Card Container */}
      <div className="relative h-96 w-full perspective-1000">
        <motion.div
          className="relative w-full h-full transform-style-preserve-3d"
          animate={{
            rotateY: isHovered ? 15 : 0,
            rotateX: isHovered ? -5 : 0,
            z: isHovered ? 20 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Front of card */}
          <div className="absolute inset-0 bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-600">
            {/* 3D Logo Section */}
            <div className="relative h-36 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotateY: isHovered ? 180 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-6xl">{logo}</div>
              </motion.div>
              
              {/* Floating particles effect */}
              {isHovered && (
                <>
                  <motion.div
                    className="absolute top-4 left-4 w-2 h-2 bg-sky-400 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-8 right-6 w-1 h-1 bg-indigo-400 rounded-full"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-6 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full"
                    animate={{
                      y: [0, -12, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  />
                </>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-300 line-clamp-2">
                  {description}
                </p>
              </div>

              {/* Course Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>{duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Users className="h-4 w-4" />
                    <span>{students.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-sky-900 text-sky-300 text-xs font-medium rounded-full">
                    {level}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-slate-100">{rating}</span>
                  </div>
                </div>
              </div>

              {/* Tools and Features */}
              {tools.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-slate-400 mb-2">Tools you'll learn:</p>
                  <div className="flex flex-wrap gap-1">
                    {tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price and Certificate */}
              <div className="flex items-center justify-between">
                {price && (
                  <div className="text-lg font-bold text-sky-400">
                    {price}
                  </div>
                )}
                {certificate && (
                  <div className="flex items-center gap-1 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">Certificate</span>
                  </div>
                )}
              </div>
            </div>

            {/* Hover Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-sky-600/90 to-transparent opacity-0 flex items-end"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-5 w-5" />
                  <span className="font-semibold">Learn More</span>
                </div>
                <p className="text-sm opacity-90">
                  Click to explore course details and book your demo session
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseCard3D; 
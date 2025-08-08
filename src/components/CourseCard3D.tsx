import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere } from '@react-three/drei';
import { Star, ArrowRight } from 'lucide-react';

interface CourseCard3DProps {
  title: string;
  description: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  logo: string;
  logoName: string;
  index: number;
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
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
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
          <div className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* 3D Logo Section */}
            <div className="relative h-36 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
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
                    className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full"
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

            {/* Content */}
            <div className="p-5 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  {level}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                  {logoName}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                {title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
                {description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                </div>
                <motion.button
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </div>
            </div>

            {/* Glow effect on hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>

          {/* Back of card (3D effect) */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl transform rotate-y-180"
            style={{ backfaceVisibility: 'hidden' }}
            animate={{
              opacity: isHovered ? 0.1 : 0,
            }}
          />
        </motion.div>
      </div>

      {/* Shadow */}
      <motion.div
        className="absolute -bottom-2 left-2 right-2 h-2 bg-black/10 rounded-xl blur-sm"
        animate={{
          scaleX: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.3 : 0.1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default CourseCard3D; 
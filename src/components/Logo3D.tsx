import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Torus } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Logo3DProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

const LogoGeometry: React.FC<{ interactive?: boolean }> = ({ interactive = true }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
      
      if (hovered && interactive) {
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <group>
      {/* Main logo container */}
      <motion.group
        ref={meshRef}
        animate={{
          scale: hovered ? 1.1 : 1,
          rotateY: clicked ? Math.PI * 2 : 0,
        }}
        transition={{ duration: 0.3 }}
        onPointerOver={() => interactive && setHovered(true)}
        onPointerOut={() => interactive && setHovered(false)}
        onPointerDown={() => interactive && setClicked(true)}
        onPointerUp={() => interactive && setClicked(false)}
      >
        {/* Base platform */}
        <Box args={[2, 0.2, 2]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#3B82F6" />
        </Box>

        {/* Data cube */}
        <Box args={[0.8, 0.8, 0.8]} position={[-0.6, 0, 0]}>
          <meshStandardMaterial color="#10B981" />
        </Box>

        {/* AI sphere */}
        <Sphere args={[0.4, 16, 16]} position={[0.6, 0, 0]}>
          <meshStandardMaterial color="#8B5CF6" />
        </Sphere>

        {/* Analytics ring */}
        <Torus args={[0.3, 0.1, 8, 16]} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#F59E0B" />
        </Torus>

        {/* Connection lines */}
        <group>
          <Box args={[0.1, 0.1, 1.2]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#EF4444" />
          </Box>
          <Box args={[0.1, 0.1, 0.6]} position={[0, 0.3, 0.3]} rotation={[0, Math.PI / 4, 0]}>
            <meshStandardMaterial color="#06B6D4" />
          </Box>
        </group>
      </motion.group>

      {/* Floating particles */}
      {hovered && (
        <>
          <motion.mesh
            position={[-1, 1, 0]}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sphere args={[0.05, 8, 8]}>
              <meshStandardMaterial color="#3B82F6" />
            </Sphere>
          </motion.mesh>
          <motion.mesh
            position={[1, 1, 0]}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Sphere args={[0.05, 8, 8]}>
              <meshStandardMaterial color="#10B981" />
            </Sphere>
          </motion.mesh>
          <motion.mesh
            position={[0, 1.5, 0]}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Sphere args={[0.05, 8, 8]}>
              <meshStandardMaterial color="#8B5CF6" />
            </Sphere>
          </motion.mesh>
        </>
      )}
    </group>
  );
};

const Logo3D: React.FC<Logo3DProps> = ({ 
  className = '', 
  size = 200, 
  interactive = true 
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: interactive ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <LogoGeometry interactive={interactive} />
      </Canvas>
      
      {/* Overlay text for branding */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-xs font-bold text-gray-600 opacity-80">DAx</div>
          <div className="text-xs font-bold text-blue-600 opacity-80">GENAI</div>
        </div>
      </div>
    </motion.div>
  );
};

// Animated logo variant
export const AnimatedLogo3D: React.FC<Logo3DProps> = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: "spring", stiffness: 100 }}
    >
      <Logo3D {...props} />
    </motion.div>
  );
};

// Floating logo variant
export const FloatingLogo3D: React.FC<Logo3DProps> = (props) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotateY: [0, 360],
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
      }}
    >
      <Logo3D {...props} />
    </motion.div>
  );
};

export default Logo3D; 
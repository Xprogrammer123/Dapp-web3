import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Earth = ({ walletImages }) => {
  const earthRef = useRef();
  const markersGroup = useRef();

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (markersGroup.current) {
      markersGroup.current.rotation.y += 0.001;
    }
  });

  const texture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');

  useEffect(() => {
    if (markersGroup.current && walletImages) {
      // Clear existing markers
      while (markersGroup.current.children.length) {
        markersGroup.current.remove(markersGroup.current.children[0]);
      }

      // Add new markers
      walletImages.forEach((image, index) => {
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const radius = 2.5;

        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);

        const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);

        marker.position.set(x, y, z);
        markersGroup.current.add(marker);
      });
    }
  }, [walletImages]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group>
        <mesh ref={earthRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        <group ref={markersGroup} />
      </group>
    </>
  );
};

const Globe = ({ walletImages }) => {
  return (
    <div className="h-[600px] glass-card">
      <h2 className="text-2xl font-bold p-6 text-gradient text-center">Global Wallet Network</h2>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Earth walletImages={walletImages} />
      </Canvas>
    </div>
  );
};

export default Globe;
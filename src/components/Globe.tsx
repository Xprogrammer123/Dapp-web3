// Globe.tsx
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface EarthProps {
  walletImages: string[];
}

const Earth: React.FC<EarthProps> = ({ walletImages }) => {
  const earthRef = useRef<THREE.Group>(null);
  const markersGroup = useRef<THREE.Group>(null);

  // Rotate globe and animate markers
  useFrame(({ clock }) => {
    if (earthRef.current) earthRef.current.rotation.y += 0.001;
    if (markersGroup.current) {
      markersGroup.current.children.forEach((sprite, index) => {
        const time = clock.getElapsedTime() + index * 0.5;
        sprite.position.y += Math.sin(time) * 0.002; // Subtle floating
        sprite.scale.setScalar(0.5 + Math.sin(time * 0.7) * 0.05); // Pulse effect
      });
    }
  });

  // Create wireframe lines for the globe
  useEffect(() => {
    if (!earthRef.current) return;

    const lines: THREE.Line[] = [];
    const radius = 2;

    // Meridians (longitudinal)
    for (let i = 0; i < 12; i++) {
      const phi = (i / 12) * Math.PI * 2;
      const material = new THREE.LineBasicMaterial({ color: 0x666666, opacity: 0.3, transparent: true });
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let j = 0; j <= 20; j++) {
        const theta = Math.PI * (j / 20);
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);
        vertices.push(x, y, z);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      const line = new THREE.Line(geometry, material);
      lines.push(line);
      earthRef.current.add(line);
    }

    // Parallels (latitudinal)
    for (let i = 0; i < 6; i++) {
      const theta = (i / 6) * Math.PI - Math.PI / 2;
      const material = new THREE.LineBasicMaterial({ color: 0x666666, opacity: 0.3, transparent: true });
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let j = 0; j <= 20; j++) {
        const phi = (j / 20) * Math.PI * 2;
        const x = radius * Math.cos(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta) * Math.sin(phi);
        const z = radius * Math.sin(theta);
        vertices.push(x, y, z);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      const line = new THREE.Line(geometry, material);
      lines.push(line);
      earthRef.current.add(line);
    }

    // Cleanup
    return () => {
      lines.forEach((line) => {
        line.geometry.dispose();
        line.material.dispose();
      });
    };
  }, []);

  // Add circular wallet images as sprites
  useEffect(() => {
    if (!markersGroup.current || !walletImages) return;

    // Clear existing markers
    while (markersGroup.current.children.length) {
      markersGroup.current.remove(markersGroup.current.children[0]);
    }

    // Custom shader for circular sprites
    const spriteMaterial = (texture: THREE.Texture) =>
      new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texture },
          opacity: { value: 1.0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D map;
          uniform float opacity;
          varying vec2 vUv;
          void main() {
            vec2 centeredUv = vUv - 0.5;
            float dist = length(centeredUv);
            if (dist > 0.5) discard; // Circular mask
            vec4 tex = texture2D(map, vUv);
            gl_FragColor = vec4(tex.rgb, tex.a * opacity);
          }
        `,
        transparent: true,
      });

    // Add new markers
    walletImages.forEach((image, index) => {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 2.5;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      const texture = new THREE.TextureLoader().load(image);
      const material = spriteMaterial(texture);
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(0.5, 0.5, 0.5);
      sprite.position.set(x, y, z);
      sprite.userData = { index }; // For animation offset

      markersGroup.current.add(sprite);
    });

    // Cleanup
    return () => {
      markersGroup.current.children.forEach((sprite: THREE.Sprite) => {
        (sprite.material as THREE.ShaderMaterial).dispose();
      });
    };
  }, [walletImages]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <group ref={earthRef}>
        <group ref={markersGroup} />
      </group>
    </>
  );
};

interface GlobeProps {
  walletImages: string[];
}

const Globe: React.FC<GlobeProps> = ({ walletImages }) => {
  return (
    <div className="h-screen bg-transparent">
      <h2 className="text-3xl md:text-6xl font-bold p-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 text-center">
        Global Wallet Network
      </h2>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <Earth walletImages={walletImages} />
      </Canvas>
    </div>
  );
};

export default Globe;
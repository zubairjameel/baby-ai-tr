import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

const Neuron = ({ position, color, label, strength, activationLevel }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Animate pulse
    useFrame((state) => {
        if (meshRef.current) {
            // Base scale based on strength + pulse if activated
            // More intense pulse frequency and amplitude
            const pulse = Math.sin(state.clock.elapsedTime * 6) * 0.1;
            const targetScale = (0.5 + (strength * 0.1)) * (1 + activationLevel * 0.8 + pulse * activationLevel);

            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.2);
        }
    });

    const glowIntensity = 1.0 + (activationLevel * 5); // Super bright on activation

    return (
        <group position={position}>
            {/* Soma (Body) */}
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[0.8, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={glowIntensity}
                    toneMapped={false} // Allow bloom to blow out
                />
            </mesh>

            {/* Halo / Glow Sphere (for extra volume) */}
            {activationLevel > 0.1 && (
                <mesh position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
                    <sphereGeometry args={[0.8, 16, 16]} />
                    <meshBasicMaterial color={color} transparent opacity={0.2 * activationLevel} />
                </mesh>
            )}

            {/* Dendrites (Spikes) */}
            {[...Array(6)].map((_, i) => (
                <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                    <cylinderGeometry args={[0.05, 0.02, 1.2 + (strength * 0.2), 8]} />
                    <meshStandardMaterial color={color} opacity={0.7} transparent />
                </mesh>
            ))}

            {/* Label (Only show on hover or high activation) */}
            {(hovered || activationLevel > 0.5) && (
                <Html distanceFactor={15}>
                    <div style={{
                        color: 'white',
                        background: 'rgba(0,0,0,0.8)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        border: `1px solid ${color}`
                    }}>
                        {label} ({strength.toFixed(1)})
                    </div>
                </Html>
            )}
        </group>
    );
};

export default Neuron;

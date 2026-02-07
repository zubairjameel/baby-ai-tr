import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const BrainModel = () => {
    const group = useRef();
    // Load the full scene to preserve original materials and hierarchy
    const { scene } = useGLTF('/models/brain.glb');

    // Auto-rotate the hologram slowly
    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.1;
        }
    });

    return (
        // Scale = 30 to ensure it's large enough to contain the neurons
        <group ref={group} dispose={null} scale={[30, 30, 30]} rotation={[0, Math.PI, 0]}>
            {/* Render the GLB exactly as imported */}
            <primitive object={scene} />
        </group>
    );
};

useGLTF.preload('/models/brain.glb');

export default BrainModel;

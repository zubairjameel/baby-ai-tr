import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const BrainModel = () => {
    const group = useRef();
    const { nodes } = useGLTF('/models/brain.glb');

    // Auto-rotate the hologram slowly
    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group ref={group} dispose={null} scale={[20, 20, 20]} rotation={[0, Math.PI, 0]}>
            {/* Render meshes as Holographic Points */}
            {Object.keys(nodes).map((key) => {
                const node = nodes[key];
                if (node.isMesh) {
                    return (
                        <points key={key} geometry={node.geometry}>
                            <pointsMaterial
                                size={0.05} // Small dots
                                color="#22d3ee" // Cyan/Electric Blue
                                transparent
                                opacity={0.8}
                                sizeAttenuation
                                blending={THREE.AdditiveBlending}
                            />
                        </points>
                    )
                }
                return null;
            })}
        </group>
    );
};

useGLTF.preload('/models/brain.glb');

export default BrainModel;

import React, { useRef, useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BrainModel = () => {
    const group = useRef();
    const { scene } = useGLTF('/models/brain.glb');

    // Make the model transparent so we can see the internal neurons
    useLayoutEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.material.transparent = true;
                obj.material.opacity = 0.15; // Very subtle ghost-like shell
                obj.material.depthWrite = false; // Allow seeing structure inside
                obj.material.side = THREE.DoubleSide;
                // Preserve original color but make it glass-like
                obj.material.blending = THREE.AdditiveBlending;
            }
        });
    }, [scene]);

    // Auto-rotate the hologram slowly
    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group ref={group} dispose={null} scale={[30, 30, 30]} rotation={[0, Math.PI, 0]}>
            <primitive object={scene} />
        </group>
    );
};

useGLTF.preload('/models/brain.glb');

export default BrainModel;

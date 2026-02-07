import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Signal = ({ startPos, endPos, progress, color }) => {
    const meshRef = useRef();

    // Lerp position based on progress
    const start = new THREE.Vector3(...startPos);
    const end = new THREE.Vector3(...endPos);

    // Calculate current position
    const currentPos = new THREE.Vector3().lerpVectors(start, end, progress);

    return (
        <group position={currentPos}>
            {/* The Core Energy Ball */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>

            {/* A Point Light to illuminate surrounding neurons as it passes */}
            <pointLight distance={5} intensity={5} color={color} decay={2} />
        </group>
    );
};

export default Signal;

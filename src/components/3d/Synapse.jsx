import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Synapse = ({ start, end, type, activationLevel }) => {
    const lineRef = useRef();

    // Create geometry from start to end
    const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);

    // Visualize activation with a moving particle or just color intensity
    const connectionColor = activationLevel > 0.1 ? '#fbbf24' : '#6366f1'; // Gold if active, Blue-ish default
    const opacity = 0.2 + (activationLevel * 0.8);

    // Using a simple thin tube or line
    // If we want thickness, Cylinder or TubeGeometry is better than LineBasicMaterial

    // Calculate orientation for cylinder
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(endVec, startVec);
    const length = direction.length();

    // Midpoint
    const position = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);

    // Orientation logic involving quaternion... simplified:
    // We can just use Line for simplicity, or lookAt on a Cylinder.
    // Let's use Line for performance if many connections, but user asked for "Tube".
    // Let's use a very thin Cylinder for "Tube" effect.

    // Very thin electric line
    return (
        <mesh position={position} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())}>
            <cylinderGeometry args={[0.03, 0.03, length, 6]} />
            <meshStandardMaterial
                color={connectionColor}
                transparent
                opacity={opacity}
                emissive={connectionColor}
                emissiveIntensity={activationLevel * 3} // Bloom heavy
                toneMapped={false}
            />
        </mesh>
    );
};

export default Synapse;

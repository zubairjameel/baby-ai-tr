import React from 'react';
import { Text } from '@react-three/drei';
import { BRAIN_REGIONS } from '../../store/constants';

const BrainRegions = () => {
    return (
        <group>
            {Object.values(BRAIN_REGIONS).map((region) => (
                <group key={region.id} position={region.position}>
                    {/* Subtle Region Marker (Fog/Orb) */}
                    <mesh>
                        <sphereGeometry args={[4, 16, 16]} />
                        <meshStandardMaterial
                            color={region.color}
                            transparent
                            opacity={0.02} // Almost invisible, let particles define it
                            wireframe
                            wireframeLinewidth={0.5}
                        />
                    </mesh>
                </group>
            ))}

            {/* Optional: Central Brain Stem / Core visual if needed */}
        </group>
    );
};

export default BrainRegions;

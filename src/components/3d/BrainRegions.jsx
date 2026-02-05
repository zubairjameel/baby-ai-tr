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
                            opacity={0.05} // Very subtle ghost orb
                            wireframe
                        />
                    </mesh>

                    {/* Region Label */}
                    <Text
                        position={[0, 8, 0]}
                        fontSize={2}
                        color={region.color}
                        anchorX="center"
                        anchorY="middle"
                        fillOpacity={0.5}
                    >
                        {region.label}
                    </Text>
                </group>
            ))}

            {/* Optional: Central Brain Stem / Core visual if needed */}
        </group>
    );
};

export default BrainRegions;

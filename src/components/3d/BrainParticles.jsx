import React, { useMemo } from 'react';
import * as THREE from 'three';
import { BRAIN_REGIONS } from '../../store/constants';

const BrainParticles = () => {
    const count = 3000; // Number of particles

    const particles = useMemo(() => {
        const temp = [];
        const regions = Object.values(BRAIN_REGIONS);

        for (let i = 0; i < count; i++) {
            // Pick a random region
            const region = regions[Math.floor(Math.random() * regions.length)];
            const [cx, cy, cz] = region.position;

            // Random point within a sphere around that region center
            // Using rejection sampling or just random in box for speed/simplicity
            // Let's use spherical coordinates for better roundness
            const r = Math.random() * 8; // Radius of region cluster
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            const x = cx + r * Math.sin(phi) * Math.cos(theta);
            const y = cy + r * Math.sin(phi) * Math.sin(theta);
            const z = cz + r * Math.cos(phi);

            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#818cf8" // Indigoid purple/blue
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default BrainParticles;

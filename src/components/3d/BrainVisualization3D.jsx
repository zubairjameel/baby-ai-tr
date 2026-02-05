import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Environment } from '@react-three/drei';
import { useBrainStore } from '../../store/useBrainStore';
import BrainRegions from './BrainRegions';
import Neuron from './Neuron';
import Synapse from './Synapse';

const BrainVisualization3D = () => {
    const nodes = useBrainStore(state => state.nodes);
    const links = useBrainStore(state => state.links);
    const decayActivation = useBrainStore(state => state.decayActivation);

    // Animation Loop for decay
    useEffect(() => {
        const interval = setInterval(() => {
            decayActivation();
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Overlay Stats */}
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, pointerEvents: 'none' }}>
                <h2 className="glow-text" style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-muted)' }}>CORTEX VISUALIZER 3D</h2>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.7 }}>
                    Active Neurons: {nodes.length} | Synapses: {links.length}
                </p>
            </div>

            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 45]} fov={60} />
                <OrbitControls
                    enablePan={false}
                    maxDistance={80}
                    minDistance={10}
                    autoRotate
                    autoRotateSpeed={0.5}
                />

                {/* Environment */}
                <color attach="background" args={['#050510']} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4c1d95" />

                <Suspense fallback={null}>
                    <group rotation={[0, Math.PI / 4, 0]}>
                        {/* Brain Structure */}
                        <BrainRegions />

                        {/* Nodes (Neurons) */}
                        {nodes.map((node) => (
                            <Neuron
                                key={node.id}
                                {...node}
                            />
                        ))}

                        {/* Links (Synapses) */}
                        {links.map((link, i) => {
                            // Find positions
                            // Note: link.source/target might be just IDs or Objects depending on how store handles it.
                            // Implementation plan/store implies strings or objects. 
                            // Store addLink keeps them as strings/objects consistent with logic.
                            // But here we need to find the Node object to get position.
                            const sourceNode = nodes.find(n => n.id === (link.source.id || link.source));
                            const targetNode = nodes.find(n => n.id === (link.target.id || link.target));

                            if (!sourceNode || !targetNode) return null;

                            return (
                                <Synapse
                                    key={i}
                                    start={sourceNode.position}
                                    end={targetNode.position}
                                    activationLevel={link.activationLevel}
                                    type={link.type}
                                />
                            );
                        })}
                    </group>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default BrainVisualization3D;

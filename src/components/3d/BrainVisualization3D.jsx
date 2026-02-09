import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useBrainStore } from '../../store/useBrainStore';
import BrainRegions from './BrainRegions';
import BrainParticles from './BrainParticles';
import BrainModel from './BrainModel';
import Neuron from './Neuron';
import Signal from './Signal';
import Synapse from './Synapse';

// Error Boundary for the model loader
class ModelErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError(error) { return { hasError: true }; }
    componentDidCatch(error, errorInfo) { console.log("No brain model found, using particles."); }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

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
        <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000005' }}>
            <Canvas gl={{ antialias: false, pixelRatio: 1.5 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 45]} fov={60} />
                <OrbitControls
                    enablePan={false}
                    maxDistance={80}
                    minDistance={10}
                    autoRotate
                    autoRotateSpeed={0.8}
                />

                {/* Environment & Lighting (Sci-Fi Deep Space) */}
                <color attach="background" args={['#000005']} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#db2777" />
                <pointLight position={[0, 20, 0]} intensity={0.5} color="#06b6d4" />

                <Suspense fallback={null}>
                    <group rotation={[0, Math.PI / 4, 0]}>
                        {/* 
                            Brain Hologram (External Model) 
                            Falls back to generated particles if model is missing/broken 
                        */}
                        <ModelErrorBoundary fallback={<BrainParticles />}>
                            <BrainModel />
                        </ModelErrorBoundary>

                        {/* Visual Structure */}
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

                        {/* Signals (Light Trails) */}
                        {useBrainStore(state => state.signals).map(signal => (
                            <Signal key={signal.id} {...signal} />
                        ))}

                    </group>
                </Suspense>

                <EffectComposer disableNormalPass>
                    {/* Toned down bloom to match reference: higher threshold, lower intensity */}
                    <Bloom
                        luminanceThreshold={0.6} // Only very bright things glow
                        luminanceSmoothing={0.1} // Sharp cutoff
                        height={300}
                        intensity={0.5} // Subtle glow, not blinding
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default BrainVisualization3D;

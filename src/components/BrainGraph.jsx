import React, { useEffect, useRef, useState, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { memoryStore } from '../services/memory';

const BrainGraph = () => {
    const [data, setData] = useState({ nodes: [], links: [] });
    const [dimensions, setDimensions] = useState({ w: 800, h: 600 });
    const containerRef = useRef(null);
    const graphRef = useRef(null);

    // Subscribe to memory updates
    useEffect(() => {
        const unsubscribe = memoryStore.subscribe((newData) => {
            // Create a shallow copy to trigger re-render if needed, 
            // but react-force-graph mutates objects internally for physics.
            setData(prev => ({
                nodes: [...newData.nodes],
                links: [...newData.links]
            }));
        });
        return unsubscribe;
    }, []);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    w: containerRef.current.clientWidth,
                    h: containerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="glass-panel" ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '16px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, pointerEvents: 'none' }}>
                <h2 className="glow-text" style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-muted)' }}>CORTEX VISUALIZER</h2>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.7 }}>
                    Active Nodes: {data.nodes.length} | Synapses: {data.links.length}
                </p>
            </div>

            <ForceGraph2D
                ref={graphRef}
                width={dimensions.w}
                height={dimensions.h}
                graphData={data}
                backgroundColor="rgba(0,0,0,0)" // Transparent, let CSS handle bg
                nodeLabel="id"
                nodeColor={node => node.group === 'Action' ? '#EF4444' : node.group === 'Concept' ? '#3B82F6' : '#ec4899'}
                nodeRelSize={6}
                linkColor={() => 'rgba(255,255,255,0.2)'}
                linkWidth={1.5}
                particles={4}
                particleSpeed={0.02}
                particleWidth={2}
                d3VelocityDecay={0.6} // More friction, less jitter
                cooldownTicks={100}
                onEngineStop={() => graphRef.current?.zoomToFit(400, 50)}
            />
        </div>
    );
};

export default BrainGraph;

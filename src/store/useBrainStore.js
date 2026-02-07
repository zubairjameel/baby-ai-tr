import { create } from 'zustand';
import { BRAIN_REGIONS } from './constants';

export const useBrainStore = create((set, get) => ({
    nodes: [],
    links: [],
    signals: [], // { id, startPos, endPos, progress, speed, color }

    // Actions
    addNode: (node) => set((state) => {
        const exists = state.nodes.find(n => n.id === node.id);
        if (exists) {
            return {
                nodes: state.nodes.map(n =>
                    n.id === node.id ? { ...n, strength: n.strength + 0.5, activationLevel: 1.0 } : n
                )
            };
        }
        return { nodes: [...state.nodes, { ...node, strength: 1, activationLevel: 1.0 }] };
    }),

    addLink: (link) => set((state) => {
        const exists = state.links.find(l =>
            l.source === link.source && l.target === link.target && l.type === link.type
        );
        if (exists) {
            return {
                links: state.links.map(l =>
                    l === exists ? { ...l, strength: l.strength + 0.2, activationLevel: 1.0 } : l
                )
            };
        }
        return { links: [...state.links, { ...link, strength: 1, activationLevel: 1.0 }] };
    }),

    // Activate specific concepts (e.g. when LLM thinking)
    activateConcepts: (conceptIds) => set((state) => {
        return {
            nodes: state.nodes.map(n =>
                conceptIds.includes(n.id) ? { ...n, activationLevel: 1.0 } : n
            ),
            links: state.links.map(l =>
                (conceptIds.includes(l.source) && conceptIds.includes(l.target))
                    ? { ...l, activationLevel: 1.0 } : l
            )
        };
    }),

    // Trigger a visual signal between regions (The Wow Factor)
    triggerSignal: (fromRegionId, toRegionId) => set((state) => {
        const startRegion = Object.values(BRAIN_REGIONS).find(r => r.id === fromRegionId);
        const endRegion = Object.values(BRAIN_REGIONS).find(r => r.id === toRegionId);

        if (!startRegion || !endRegion) return {};

        // Create a new signal
        const newSignal = {
            id: Math.random().toString(36).substr(2, 9),
            startPos: startRegion.position,
            endPos: endRegion.position,
            progress: 0,
            speed: 0.02, // Adjust for travel time
            color: '#fbbf24' // Gold/Energy color
        };

        return { signals: [...state.signals, newSignal] };
    }),

    // Decay activation over time (called by animation loop)
    decayActivation: () => set((state) => {
        // 1. Decay Nodes/Links
        const newNodes = state.nodes.map(n => ({
            ...n,
            activationLevel: Math.max(0, n.activationLevel - 0.02)
        }));

        const newLinks = state.links.map(l => ({
            ...l,
            activationLevel: Math.max(0, l.activationLevel - 0.02)
        }));

        // 2. Update Signals
        let activeSignals = state.signals.map(s => ({
            ...s,
            progress: s.progress + s.speed
        })).filter(s => s.progress < 1); // Remove finished signals

        return {
            nodes: newNodes,
            links: newLinks,
            signals: activeSignals
        };
    })
}));

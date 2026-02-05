import { create } from 'zustand';

export const useBrainStore = create((set, get) => ({
    nodes: [],
    links: [],

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

    // Decay activation over time (called by animation loop)
    decayActivation: () => set((state) => ({
        nodes: state.nodes.map(n => ({
            ...n,
            activationLevel: Math.max(0, n.activationLevel - 0.02)
        })),
        links: state.links.map(l => ({
            ...l,
            activationLevel: Math.max(0, l.activationLevel - 0.02)
        }))
    }))
}));

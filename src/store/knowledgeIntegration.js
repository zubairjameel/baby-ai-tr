import { BRAIN_REGIONS } from './constants';
import { useBrainStore } from './useBrainStore';

export function integrateKnowledge(geminiResponse) {
    const { nodes, links } = geminiResponse;
    const store = useBrainStore.getState();

    nodes.forEach(node => {
        // 1. Determine Region
        // Gemini might return "visual", "Visual", "Object" etc. Normalize it.
        let targetRegion = BRAIN_REGIONS.memory; // Default

        // Check if category matches a region key directly
        const catLower = (node.category || node.group || '').toLowerCase();

        if (BRAIN_REGIONS[catLower]) {
            targetRegion = BRAIN_REGIONS[catLower];
        } else {
            // Keyword search fallback
            for (const key in BRAIN_REGIONS) {
                if (BRAIN_REGIONS[key].keywords.some(k => catLower.includes(k) || node.id.toLowerCase().includes(k))) {
                    targetRegion = BRAIN_REGIONS[key];
                    break;
                }
            }
        }

        // 2. Calculate Position (Center of region + Random jitter)
        const [x, y, z] = targetRegion.position;
        const jitter = 4; // Spread of neurons within a region
        const position = [
            x + (Math.random() - 0.5) * jitter,
            y + (Math.random() - 0.5) * jitter,
            z + (Math.random() - 0.5) * jitter
        ];

        // 3. Add to Store
        store.addNode({
            id: node.id,
            label: node.id, // Display name
            group: node.group,
            category: targetRegion.id,
            color: targetRegion.color,
            position: position
        });
    });

    links.forEach(link => {
        store.addLink({
            source: link.source,
            target: link.target,
            type: link.type
        });
    });
}

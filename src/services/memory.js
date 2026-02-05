/**
 * Memory Service
 * Manages the "brain" of the AI - the graph of nodes and links.
 */

export class MemoryStore {
    constructor() {
        this.nodes = [];
        this.links = [];
        this.subscribers = [];
    }

    /**
     * Subscribe to changes
     * @param {Function} callback 
     */
    subscribe(callback) {
        this.subscribers.push(callback);
        // Initial call
        callback({ nodes: [...this.nodes], links: [...this.links] });
        return () => {
            this.subscribers = this.subscribers.filter(s => s !== callback);
        };
    }

    notify() {
        const data = { nodes: [...this.nodes], links: [...this.links] };
        this.subscribers.forEach(cb => cb(data));
    }

    /**
     * Add new knowledge to the graph
     * @param {Array} newNodes - [{ id, group, val }]
     * @param {Array} newLinks - [{ source, target, type }]
     */
    integrate(newNodes, newLinks) {
        let changed = false;

        newNodes.forEach(node => {
            const existing = this.nodes.find(n => n.id.toLowerCase() === node.id.toLowerCase());
            if (!existing) {
                this.nodes.push({ ...node, val: 1 });
                changed = true;
            } else {
                // Reinforce existing neuron
                existing.val = (existing.val || 1) + 0.5;
                changed = true;
            }
        });

        newLinks.forEach(link => {
            // Ensure source/target exist (simple safety check)
            // Note: react-force-graph handles string IDs for links
            const existing = this.links.find(l =>
                (l.source === link.source && l.target === link.target && l.type === link.type) ||
                (l.source.id === link.source && l.target.id === link.target && l.type === link.type) // handling object ref case
            );

            if (!existing) {
                this.links.push(link);
                changed = true;
            }
        });

        if (changed) this.notify();
    }

    getGraph() {
        return { nodes: this.nodes, links: this.links };
    }

    // Create a minimal text representation for the LLM
    getContext() {
        if (this.nodes.length === 0) return "Global Memory is empty. You know NOTHING.";

        let context = "Global Memory contains:\n";
        context += "Concepts: " + this.nodes.map(n => n.id).join(", ") + "\n";
        context += "Relationships:\n";
        this.links.forEach(l => {
            // Handle both string IDs and object references (after D3 hydration)
            const s = typeof l.source === 'object' ? l.source.id : l.source;
            const t = typeof l.target === 'object' ? l.target.id : l.target;
            context += `- ${s} ${l.type || 'is related to'} ${t}\n`;
        });
        return context;
    }
}

export const memoryStore = new MemoryStore();

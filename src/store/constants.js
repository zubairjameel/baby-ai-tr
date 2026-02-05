export const BRAIN_REGIONS = {
    visual: {
        id: 'visual',
        label: 'Visual Cortex',
        position: [-15, -5, -10],  // Back-left
        color: '#ff6b9d',          // Pink
        keywords: ['color', 'shape', 'size', 'appearance', 'look', 'see', 'visual', 'bright', 'dark']
    },
    language: {
        id: 'language',
        label: 'Language Center',
        position: [-10, 10, 5],    // Left-top
        color: '#4ecdc4',          // Cyan
        keywords: ['word', 'sentence', 'grammar', 'meaning', 'say', 'language', 'speak', 'talk', 'name']
    },
    motor: {
        id: 'motor',
        label: 'Motor Cortex',
        position: [15, -8, 0],     // Right-center
        color: '#ffe66d',          // Yellow
        keywords: ['action', 'movement', 'do', 'perform', 'behavior', 'run', 'walk', 'go', 'eat']
    },
    memory: {
        id: 'memory',
        label: 'Hippocampus',
        position: [0, 0, -15],     // Deep center
        color: '#a8e6cf',          // Green
        keywords: ['fact', 'remember', 'recall', 'memory', 'store', 'know', 'history', 'past']
    },
    logic: {
        id: 'logic',
        label: 'Prefrontal Cortex',
        position: [10, 8, 10],     // Front-right-top
        color: '#ffd3b6',          // Orange
        keywords: ['logic', 'reason', 'think', 'analyze', 'because', 'why', 'how', 'math', 'number', 'count']
    },
    emotion: {
        id: 'emotion',
        label: 'Amygdala',
        position: [0, -12, 8],     // Bottom-center
        color: '#ffaaa5',          // Coral
        keywords: ['feel', 'emotion', 'mood', 'happy', 'sad', 'angry', 'love', 'hate', 'like', 'good', 'bad']
    }
};

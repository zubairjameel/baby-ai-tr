import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
    constructor() {
        this.genAI = null;
        this.model = null;
        this.extractionModel = null;
    }

    initialize(apiKey) {
        if (!apiKey) {
            console.error("GeminiService: No API Key provided");
            return false;
        }
        this.genAI = new GoogleGenerativeAI(apiKey);
        // Using Gemini 3 Flash Preview (Official Gemini 3 Hackathon model)
        this.model = this.genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        this.extractionModel = this.genAI.getGenerativeModel({ model: "gemini-3-flash-preview", generationConfig: { responseMimeType: "application/json" } });
        return true;
    }

    /**
     * Extract entities and relationships from user text.
     * @param {string} text 
     * @returns {Promise<{nodes: [], links: []}>}
     */
    async extractKnowledge(text) {
        if (!this.extractionModel) return { nodes: [], links: [] };

        const prompt = `
      Analyze this text. Extract key ENTITIES (nouns, concepts) and RELATIONSHIPS (verbs, states).
      Return ONLY valid JSON.
      Format:
      {
        "nodes": [{ "id": "ConceptName", "group": "Concept", "category": "visual|language|motor|logic|emotion|memory" }],
        "links": [{ "source": "ConceptName", "target": "ConceptName", "type": "relation" }]
      }
      Rules:
      1. Keep IDs simple and capitalize First Letter (e.g. "Apple", "Red").
      2. No duplicates in output.
      3. If the user is asking a question, do NOT extract the question words, only the subjects.
      4. "Group": "Object", "Action", "Property", or "Living".
      5. "Category": Pick ONE that best fits the brain region:
         - "visual" (colors, shapes, looks)
         - "language" (words, names, grammar)
         - "motor" (actions, movement)
         - "logic" (reasoning, math, because)
         - "emotion" (feelings, likes, dislikes)
         - "memory" (facts, history, general)
      
      Text: "${text}"
    `;

        try {
            const result = await this.extractionModel.generateContent(prompt);
            const response = await result.response;
            return JSON.parse(response.text());
        } catch (e) {
            console.error("Extraction failed", e);

            // Check if it's a quota error
            if (e.message?.includes('quota') || e.message?.includes('429') || e.message?.includes('RESOURCE_EXHAUSTED')) {
                return {
                    nodes: [],
                    links: [],
                    error: "⚠️ API quota reached. The demo is temporarily paused. Please try again later or contact the developers for a fresh API key."
                };
            }

            return { nodes: [], links: [], error: e.message || e.toString() };
        }
    }

    /**
     * Generate a response acting as a Baby AI with limited memory.
     * @param {string} userText 
     * @param {string} memoryContext - String dump of graph state
     * @returns {Promise<string>}
     */
    async respond(userText, memoryContext) {
        if (!this.model) return "I need an API key to think!";

        const systemPrompt = `
      You are Baby AI, a digital 18-month-old.
      
      CORE RULES:
      1. TABULA RASA: You ONLY know what is in your [Global Memory].
      2. If [Global Memory] does not contain the answer, you DO NOT KNOW IT.
      3. If you don't know, ask "What that?" or "Dunno". Curiously.
      4. Speak like a smart toddler (1-3 word sentences mostly, simple grammar).
      5. If you recognize something in memory, say it happily!
      
      [Global Memory]:
      ${memoryContext}
      
      User said: "${userText}"
      
      Response (as Baby AI):
    `;

        try {
            const result = await this.model.generateContent(systemPrompt);
            const response = await result.response;
            return response.text();
        } catch (e) {
            console.error("Response failed", e);

            // Friendly quota message
            if (e.message?.includes('quota') || e.message?.includes('429') || e.message?.includes('RESOURCE_EXHAUSTED')) {
                return "Zzz... (Baby AI is tired. The free API quota has been reached. Please contact the developers or try again tomorrow!)";
            }

            return `Brain hurt... (${e.message || e.toString()})`;
        }
    }
}

export const geminiService = new GeminiService();

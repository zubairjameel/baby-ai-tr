# Baby AI

**A 3D Neural Interface that turns the "Black Box" of AI into a transparent, navigable mind.**

![Baby AI Logo](./Logo.jpeg)

---

## 🧠 The Vision

What if you could **watch an AI learn**? What if every thought, every connection, every piece of knowledge was visible in real-time as a living, breathing neural network?

**Baby AI** is an experiment in **transparent artificial intelligence**. It's not just a chatbot—it's a window into how AI thinks, learns, and grows from zero knowledge.

### The Core Concept

Most AI systems are **black boxes**—you ask a question, you get an answer, but you have no idea what's happening inside. Baby AI flips this paradigm:

- **Every conversation teaches the AI** - It starts with a *simulated* blank slate (enforced by prompts, not true zero-data)
- **Every concept becomes a neuron** - Knowledge is spatially mapped to anatomically-correct brain regions
- **Every connection is visible** - Watch synapses form as the AI links ideas together
- **Every thought lights up** - See neural pathways activate in real-time as the AI processes information

This isn't just visualization—it's **cognitive transparency**. You're not just using an AI; you're **raising one**.

---

## ✨ Key Features

### 🎯 Spatial Knowledge Mapping
- Concepts are placed in **anatomically-correct brain regions** (visual cortex, language areas, logic centers)
- Knowledge grows organically as you teach the AI
- Navigate the 3D brain to explore what the AI knows

### 🔗 Real-Time Neural Connections
- Watch **synapses form** as the AI links related concepts
- See the **strength of connections** grow with repeated use
- Observe **signal propagation** when the AI processes queries

### 🌌 Holographic Brain Visualization
- Stunning **3D particle-based brain** with cyan-to-magenta gradient
- Smooth camera controls and interactive exploration
- Anatomically-inspired structure (frontal lobe, cerebellum, brain stem)

### 💬 Minimal Black Glassmorphism UI
- Ultra-clean floating chat interface
- Pure black glassmorphism design
- Doesn't interfere with the brain visualization

### 🤖 Powered by Gemini 3 Flash Preview
- Uses Google's latest **Gemini 3 Flash Preview** model
- Fast, accurate knowledge extraction
- JSON-structured responses for precise neural mapping

---

## 🎬 The Experience

1. **Start with an empty brain** - The AI knows nothing
2. **Teach it anything** - "The sky is blue", "Paris is in France", "2+2=4"
3. **Watch neurons form** - See concepts appear as glowing nodes in the brain
4. **Ask questions** - The AI recalls what you taught it
5. **See it think** - Watch neural signals travel through the brain as it processes your query

---

## 🤖 Gemini 3 API Integration

Baby AI is powered by **Google's Gemini 3 Flash Preview** model, leveraging three critical features that make real-time neural visualization possible:

### 1. **Ultra-Low Latency** ⚡
The Gemini 3 Flash Preview model provides near-instant responses, enabling:
- **Real-time neuron spawning** - Concepts appear in the brain within milliseconds of teaching
- **Smooth signal animations** - Neural pathways light up without lag when processing queries
- **Fluid user experience** - No waiting for the AI to "think"—it feels alive

**Why it matters:** Traditional LLMs have 2-5 second response times. Gemini 3 Flash Preview's sub-second latency makes the brain visualization feel like a living organism, not a loading screen.

### 2. **Structured JSON Output** 📊
We use Gemini's `responseMimeType: "application/json"` feature to extract knowledge in a structured format:

```javascript
{
  "nodes": [
    { "id": "sky", "category": "visual", "description": "The sky" },
    { "id": "blue", "category": "visual", "description": "The color blue" }
  ],
  "connections": [
    { "from": "sky", "to": "blue", "relationship": "has_property" }
  ]
}
```

**Why it matters:** This allows us to:
- Map concepts to **specific brain regions** (visual cortex, language areas, logic centers)
- Create **precise neural connections** between related ideas
- Build a **navigable knowledge graph** in 3D space

Without JSON mode, we'd have to parse messy text responses—slow, error-prone, and unreliable.

### 3. **Instruction Adherence** 🎯
Gemini 3 Flash Preview follows complex system prompts with high fidelity, enabling:
- **Consistent knowledge extraction** - Always returns the same JSON structure
- **Spatial reasoning** - Correctly categorizes concepts into brain regions (e.g., "Paris" → language, "2+2" → logic)
- **Contextual memory** - Recalls previously taught concepts when answering questions

**Why it matters:** The AI must understand nuanced instructions like "categorize this concept into visual/language/logic/motor/memory" and "only use knowledge from the provided context." Gemini 3's instruction adherence makes this reliable.

---

### How It All Comes Together

1. **User teaches:** "The sky is blue"
2. **Gemini extracts (JSON mode):** `{ nodes: ["sky", "blue"], connections: [{"sky" → "blue"}] }`
3. **Brain visualizes (low latency):** Neurons spawn in the visual cortex within 200ms
4. **User asks:** "What color is the sky?"
5. **Gemini recalls (instruction adherence):** Uses only the taught knowledge to answer
6. **Brain animates (real-time):** Signal travels from visual → language regions

**Without Gemini 3's features, this project wouldn't be possible.** The combination of speed, structure, and reliability is what makes the "transparent AI mind" concept work.

---

## 🚀 Try It Live

**[baby-ai-tr.vercel.app](https://baby-ai-tr.vercel.app)**

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **3D Graphics:** React Three Fiber + Drei
- **State Management:** Zustand
- **AI Model:** Google Gemini 3 Flash Preview
- **Styling:** Vanilla CSS with glassmorphism
- **Deployment:** Vercel

---

## 🏃 Run Locally

### Prerequisites
- Node.js 16+
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/zubairjameel/baby-ai-tr.git
   cd baby-ai-tr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 🎯 Future Vision

This is just the beginning. The long-term vision is to **embody this AI in a physical robot**—a machine that learns like a child, with a transparent mind you can literally see growing.

Imagine:
- A robot that learns from scratch by interacting with the world
- A holographic display showing its neural network in real-time
- The ability to "debug" AI behavior by watching its thought process
- True human-AI collaboration through cognitive transparency

**Baby AI** is a proof-of-concept for this future—where AI isn't a mysterious oracle, but a partner whose mind you can understand.

---

## 🧪 Built For

**Google Gemini API Developer Competition 2025**

This project showcases:
- Creative use of Gemini 3 Flash Preview for knowledge extraction
- Real-time JSON-structured responses for neural mapping
- Low-latency interactions for smooth UX
- Novel approach to AI transparency and explainability

---

## 📜 License

MIT License - feel free to learn from, remix, and build upon this project.

---

## 🙏 Acknowledgments

- **Google Gemini Team** - For the incredible Gemini 3 API
- **Three.js Community** - For making 3D on the web accessible
- **Neuroscience** - For inspiring the anatomical brain structure

---

**Made with 🧠 by [Zubair Jameel](https://github.com/zubairjameel)**

*"The best way to understand intelligence is to make it visible."*

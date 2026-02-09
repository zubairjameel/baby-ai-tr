# 🧠 Baby AI - 3D Neural Interface

> A "Tamagotchi" for Artificial Intelligence. Teach it, watch it learn in 3D, and explore its growing mind.

This project is a **3D Visualization Interface** for Large Language Models (LLMs). Instead of just chatting with text, you can **see** how the AI forms memories, connects concepts, and "thinks".

## 🚀 What Problem Does This Solve?

### 1. The "Black Box" Problem
Standard AI (like ChatGPT) is opaque. You don't know *why* it knows something.
*   **Solution**: Baby AI visualizes every piece of knowledge as a glowing neuron. You can see exactly what it knows and how concepts (e.g., "Apple" -> "Red") are connected.

### 2. Educational Tool
It simplifies complex AI concepts like **RAG (Retrieval Augmented Generation)** and **Knowledge Graphs**.
*   **Use Case**: Schools can use this to teach students how neural networks and semantic memory work in a gamified way.

### 3. Personal Knowledge Base
It turns your notes into a 3D galaxy.
*   **Use Case**: Feed it your study notes, and it builds a navigable 3D map of your curriculum, showing you how topics link together.

## ✨ Key Features

*   **Holographic Brain**: A stunning 3D visualization of the AI's mind.
*   **Real-time Learning**: Teach it "Sky is Blue," and watch a new neuron spawn instantly in the Visual Cortex.
*   **Signal Animation**: Watch thought processes travel from "Vision" to "Logic" when you ask questions.
*   **Tabula Rasa (Blank Slate)**: It starts knowing *nothing*. You are the teacher.
*   **Neural Interface**: A futuristic, glass-morphism chat UI.

## 🛠️ Tech Stack

*   **Frontend**: React, Vite
*   **3D Engine**: Three.js, React Three Fiber
*   **AI**: Google Gemini 2.5 Flash
*   **State**: Zustand (for the in-memory graph)
*   **Styling**: Custom CSS (Glassmorphism)

## 📦 Installation

1.  Clone the repo:
    ```bash
    git clone https://github.com/your-repo/baby-ai.git
    cd baby-ai
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Add your API Key:
    *   Create a `.env` file.
    *   Add: `VITE_GEMINI_API_KEY=your_key_here`
4.  Run it:
    ```bash
    npm run dev
    ```

## 🎮 How to Play

1.  **Teach**: Type "A dog is an animal." -> Watch a node appear in the Visual cortex.
2.  **Quiz**: Ask "What is a dog?" -> Watch the signal travel and the AI answer from memory.
3.  **Explore**: Rotate and zoom into the brain to see the connections.

import React, { useState, useEffect } from 'react';
import BrainVisualization3D from './components/3d/BrainVisualization3D';
import ChatInterface from './components/ChatInterface';
import { geminiService } from './services/gemini';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Auto-initialize from .env if available
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (envKey && envKey !== 'your_api_key_here') {
      setApiKey(envKey);
      if (geminiService.initialize(envKey)) {
        setIsReady(true);
      }
    }
  }, []);

  useEffect(() => {
    if (apiKey && !isReady) {
      if (geminiService.initialize(apiKey)) {
        setIsReady(true);
      }
    }
  }, [apiKey]);

  const handleKeySubmit = (e) => {
    e.preventDefault();
    const key = e.target.elements.key.value;
    setApiKey(key);
  };

  // Only show initialization screen if no env key is set
  if (!isReady && (!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'your_api_key_here')) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1 className="glow-text">Baby AI Initialization</h1>
        <p style={{ color: 'var(--text-muted)' }}>Enter your Google Gemini API Key to wake the baby.</p>
        <form onSubmit={handleKeySubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            name="key"
            type="password"
            placeholder="Gemini API Key"
            style={{ padding: '10px', borderRadius: '8px', border: 'none', width: '300px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white' }}>
            Wake Up
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Brain View - Full screen */}
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
        <BrainVisualization3D />
      </div>

      {/* Chat View - Floating overlay */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10, pointerEvents: 'none' }}>
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;

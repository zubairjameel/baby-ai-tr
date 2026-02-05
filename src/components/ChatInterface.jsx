import React, { useState, useEffect, useRef } from 'react';
import { Send, Cpu, Brain, Zap } from 'lucide-react';
import { geminiService } from '../services/gemini';
import { memoryStore } from '../services/memory';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', content: "Mmm? (Baby AI is awake)" }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;

        const userText = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userText }]);
        setIsThinking(true);

        try {
            // 1. Extract Knowledge (Learning)
            const newKnowledge = await geminiService.extractKnowledge(userText);
            if (newKnowledge.nodes && newKnowledge.nodes.length > 0) {
                memoryStore.integrate(newKnowledge.nodes, newKnowledge.links);
            }

            // 2. Respond based on Memory
            const context = memoryStore.getContext();
            const response = await geminiService.respond(userText, context);

            setMessages(prev => [...prev, { role: 'ai', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: "Brain hurt... (Error)" }]);
            console.error(error);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '16px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }}></div>
                <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Interaction Log</h2>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        marginBottom: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            {msg.role === 'User' ? 'TEACHER' : 'BABY AI'}
                        </span>
                        <div style={{
                            maxWidth: '80%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: msg.role === 'user' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            border: `1px solid ${msg.role === 'user' ? 'rgba(99, 102, 241, 0.3)' : 'var(--glass-border)'}`,
                            color: 'var(--text-main)',
                            boxShadow: msg.role === 'ai' && '0 0 15px rgba(255,255,255,0.05)'
                        }}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', padding: '10px' }}>
                        <Brain size={16} className="pulse" />
                        <span>Forming neural connections...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Teach me something new..."
                        style={{
                            flex: 1,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            padding: '12px',
                            borderRadius: '8px',
                            color: 'white',
                            outline: 'none'
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isThinking}
                        style={{
                            background: 'var(--primary)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0 16px',
                            color: 'white',
                            cursor: isThinking ? 'not-allowed' : 'pointer',
                            opacity: isThinking ? 0.7 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;

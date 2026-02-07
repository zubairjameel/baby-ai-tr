import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain } from 'lucide-react';
import { geminiService } from '../services/gemini';
import { integrateKnowledge } from '../store/knowledgeIntegration';
import { useBrainStore } from '../store/useBrainStore';
import './ChatInterface.css';

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
            // 1. Extract Knowledge
            const newKnowledge = await geminiService.extractKnowledge(userText);

            // 2. Integrate into 3D Brain
            if (newKnowledge.nodes && newKnowledge.nodes.length > 0) {
                integrateKnowledge(newKnowledge);
                const nodeIds = newKnowledge.nodes.map(n => n.id);
                useBrainStore.getState().activateConcepts(nodeIds);
            }

            // 3. Get Context
            const state = useBrainStore.getState();
            const memoryContext = state.nodes.map(n =>
                `${n.id} (is a ${n.category})`
            ).join(', ') +
                "\nRelationships: " +
                state.links.map(l => `${l.source} ${l.type} ${l.target}`).join(', ');

            // 4. Respond
            const response = await geminiService.respond(userText, memoryContext);
            setMessages(prev => [...prev, { role: 'ai', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: "Brain hurt... (Error)" }]);
            console.error(error);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="chat-container">
            {/* Header */}
            <div className="chat-header">
                <div className="status-dot"></div>
                <h2 className="chat-title">Neural Interface</h2>
            </div>

            {/* Messages */}
            <div className="messages-area">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message-wrapper ${msg.role}`}>
                        <span className="message-label">
                            {msg.role === 'user' ? 'YOU' : 'AI'}
                        </span>
                        <div className="message-bubble">
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isThinking && (
                    <div className="thinking-indicator">
                        <Brain size={16} className="pulse" />
                        <span>Processing neural patterns...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="input-area">
                <div className="input-container">
                    <input
                        type="text"
                        className="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Teach the baby AI..."
                    />
                    <button
                        className="send-button"
                        onClick={handleSend}
                        disabled={isThinking}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;

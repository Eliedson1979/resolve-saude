import React, { useState, useRef, useEffect } from 'react';
import './ChatAssistant.css';

const ChatAssistant = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: `Olá ${user?.user_metadata?.full_name?.split(' ')[0] || ''} !Sou o assistente ResolveSaúde.Como posso ajudar com seu plano ou documentos hoje ? `,
            sender: 'ai'
        }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulação de resposta da IA
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                text: 'Estou analisando sua dúvida... Como protótipo, posso te informar que seu plano atual cobre exames preventivos anuais sem carência.',
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    const ChatIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <path d="M8 9h8"></path>
            <path d="M8 13h6"></path>
        </svg>
    );

    const SparklesIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            <path d="M5 3v4"></path>
            <path d="M19 17v4"></path>
            <path d="M3 5h4"></path>
            <path d="M17 19h4"></path>
        </svg>
    );

    return (
        <div className={`chat-assistant ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chat-trigger" onClick={() => setIsOpen(true)} title="Abrir Assistente ResolveSaúde">
                    <ChatIcon />
                    <span className="pulse"></span>
                </button>
            )}

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="ai-status">
                            <div className="ai-avatar-circle">
                                <SparklesIcon />
                            </div>
                            <div>
                                <h4>Resolve IA</h4>
                                <div className="status-indicator">
                                    <span className="dot"></span>
                                    <small>Online agora</small>
                                </div>
                            </div>
                        </div>
                        <button className="btn-close" onClick={() => setIsOpen(false)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.sender} `}>
                                <div className="bubble">{msg.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-wrapper">
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Pergunte algo sobre seu plano..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button className="btn-send" onClick={handleSend} disabled={!input.trim()}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                        <div className="chat-footer-note">
                            Respondemos instantaneamente com IA
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;

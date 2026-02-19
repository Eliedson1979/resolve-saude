import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Juridico.css';

const Juridico = ({ user }) => {
    const [activeTab, setActiveTab] = useState('processos');

    const stats = [
        { label: 'Processos Ativos', value: '12', icon: '⚖️', color: '#0ea5e9' },
        { label: 'Em Análise', value: '4', icon: '🔍', color: '#f59e0b' },
        { label: 'Concluídos', value: '45', icon: '✅', color: '#10b981' },
        { label: 'Urgentes', value: '2', icon: '🚨', color: '#ef4444' },
    ];

    const processos = [
        { id: '1', titulo: 'Liminar para Cirurgia Cardíaca', status: 'Em Andamento', data: '15 Fev 2026', prioridade: 'Alta', advogado: 'Dr. Roberto Silva' },
        { id: '2', titulo: 'Reembolso de Medicamentos Especializados', status: 'Aguardando Documentação', data: '10 Fev 2026', prioridade: 'Média', advogado: 'Dra. Marina Costa' },
        { id: '3', titulo: 'Manutenção de Plano de Saúde Pós-Demissão', status: 'Finalizado', data: '28 Jan 2026', prioridade: 'Baixa', advogado: 'Dr. Roberto Silva' },
    ];

    return (
        <div className="juridico-container">
            <header className="juridico-header">
                <div className="header-info">
                    <h1>Módulo Jurídico</h1>
                    <p>Gestão Inteligente de Processos e Direitos à Saúde</p>
                </div>
                <button className="btn-novo-processo">
                    <span>+</span> Novo Requerimento
                </button>
            </header>

            <section className="stats-grid">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-details">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </section>

            <div className="juridico-content">
                <aside className="juridico-sidebar-actions">
                    <nav className="juridico-nav">
                        <button
                            className={activeTab === 'processos' ? 'active' : ''}
                            onClick={() => setActiveTab('processos')}
                        >
                            📋 Meus Processos
                        </button>
                        <button
                            className={activeTab === 'documentos' ? 'active' : ''}
                            onClick={() => setActiveTab('documentos')}
                        >
                            📂 Documentos Legais
                        </button>
                        <button
                            className={activeTab === 'advogados' ? 'active' : ''}
                            onClick={() => setActiveTab('advogados')}
                        >
                            👨‍⚖️ Consultar Advogado
                        </button>
                    </nav>

                    <div className="action-card">
                        <h4>Canal Direto</h4>
                        <p>Dúvidas sobre seus direitos? Fale com nossa equipe jurídica.</p>
                        <button className="btn-secondary">Iniciar Chat</button>
                    </div>
                </aside>

                <main className="juridico-main-view">
                    <div className="main-card">
                        <div className="card-header">
                            <h2>Recentemente Atualizados</h2>
                            <div className="search-box">
                                <input type="text" placeholder="Buscar processo..." />
                            </div>
                        </div>

                        <div className="processos-list">
                            {processos.map((proc) => (
                                <div key={proc.id} className="processo-item">
                                    <div className="proc-info">
                                        <h3>{proc.titulo}</h3>
                                        <div className="proc-meta">
                                            <span>📅 {proc.data}</span>
                                            <span>👨‍⚖️ {proc.advogado}</span>
                                        </div>
                                    </div>
                                    <div className="proc-status">
                                        <span className={`badge-prioridade ${proc.prioridade.toLowerCase()}`}>
                                            {proc.prioridade}
                                        </span>
                                        <span className={`badge-status ${proc.status.toLowerCase().replace(/ /g, '-')}`}>
                                            {proc.status}
                                        </span>
                                    </div>
                                    <button className="btn-view">Visualizar</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Juridico;

import React, { useState, useEffect } from 'react';
import { consultasService } from '../services/consultasService';
import './Consultas.css';

const Consultas = () => {
    const [activeTab, setActiveTab] = useState('proximas');
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const mockConsultas = [
        { id: 1, subject: 'Dr. Roberto Santos (Cardiologia)', description: 'Hospital Santa Luzia', meeting_time: '2026-02-19T10:00:00', status: 'confirmada', isMock: true },
        { id: 2, subject: 'Dra. Ana Paula (Clínico Geral)', description: 'Centro Médico Resolve', meeting_time: '2026-02-21T14:30:00', status: 'agendado', isMock: true },
        { id: 3, subject: 'Dr. Carlos Lima (Dermatologia)', description: 'Clinica Pele Saudável', meeting_time: '2026-01-15T09:00:00', status: 'concluido', isMock: true },
    ];

    useEffect(() => {
        const loadConsultas = async () => {
            try {
                setLoading(true);
                const data = await consultasService.getConsultas();
                // Se não houver dados no DB, usamos o mock para demonstração visual
                setConsultas(data && data.length > 0 ? data : mockConsultas);
            } catch (err) {
                console.warn('Usando dados mockados:', err.message);
                setConsultas(mockConsultas);
            } finally {
                setLoading(false);
            }
        };

        loadConsultas();
    }, []);

    const filteredConsultas = activeTab === 'proximas'
        ? consultas.filter(c => c.status !== 'concluida' && c.status !== 'concluido')
        : consultas.filter(c => c.status === 'concluida' || c.status === 'concluido');

    if (loading) return <div className="loading-container">Carregando consultas...</div>;

    return (
        <div className="consultas-view">
            <header className="page-header">
                <div>
                    <h1>Minhas Consultas 📅</h1>
                    <p>Gerencie seus agendamentos e histórico médico.</p>
                </div>
                <button className="btn-primary">+ Agendar Consulta</button>
            </header>

            {/* ... resting of the component same as before but using Supabase fields ... */}
            <div className="tabs-container">
                <button className={`tab-btn ${activeTab === 'proximas' ? 'active' : ''}`} onClick={() => setActiveTab('proximas')}>Próximas</button>
                <button className={`tab-btn ${activeTab === 'historico' ? 'active' : ''}`} onClick={() => setActiveTab('historico')}>Histórico</button>
            </div>

            <section className="consultas-list">
                {filteredConsultas.map((consulta) => (
                    <div key={consulta.id} className="consulta-card">
                        <div className="consulta-main">
                            <div className="consulta-icon">👨‍⚕️</div>
                            <div className="consulta-details">
                                <h3>{consulta.subject}</h3>
                                <span className="especialidade">{consulta.isMock ? 'Exemplo' : 'Saúde'}</span>
                                <div className="info-row">
                                    <span>📍 {consulta.description || consulta.local}</span>
                                    <span>📅 {new Date(consulta.meeting_time).toLocaleString('pt-BR')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="consulta-actions">
                            <span className={`status-badge ${consulta.status}`}>{consulta.status}</span>
                            <button className="btn-outline">Ver Detalhes</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Consultas;

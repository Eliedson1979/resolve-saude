import React from 'react';
import './Dashboard.css';

const Dashboard = ({ user }) => {
    const userName = user?.user_metadata?.full_name || 'Usuário';

    const stats = [
        { label: 'Consultas Próximas', value: '3', icon: '📅', color: 'blue' },
        { label: 'Exames Pendentes', value: '2', icon: '🧪', color: 'purple' },
        { label: 'Guias Autorizadas', value: '8', icon: '✅', color: 'green' },
        { label: 'Pontos Resolve+', value: '450', icon: '💎', color: 'orange' },
    ];

    return (
        <div className="dashboard-view">
            <header className="page-header">
                <div>
                    <h1>Olá, {userName.split(' ')[0]}! 👋</h1>
                    <p>Confira o resumo do seu plano de saúde hoje.</p>
                </div>
                <button className="btn-primary">Nova Solicitação</button>
            </header>

            <section className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className={`stat-card ${stat.color}`}>
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-info">
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-value">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </section>

            <div className="dashboard-grid">
                <section className="dashboard-card main">
                    <div className="card-header">
                        <h3>Agenda da Semana</h3>
                        <button className="btn-text">Ver todos</button>
                    </div>
                    <div className="card-content">
                        <div className="timeline-item">
                            <div className="time">Amanhã, 10:00</div>
                            <div className="desc">
                                <strong>Cardiologista - Dr. Roberto</strong>
                                <span>Hospital Santa Luzia</span>
                            </div>
                            <div className="status confirmed">Confirmado</div>
                        </div>
                        <div className="timeline-item">
                            <div className="time">Sex, 14:30</div>
                            <div className="desc">
                                <strong>Clínico Geral - Dra. Ana</strong>
                                <span>Centro Médico Resolve</span>
                            </div>
                            <div className="status pending">Aguardando</div>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card alert">
                    <div className="card-header">
                        <h3>Dica ResolveSaúde 💡</h3>
                    </div>
                    <div className="card-content">
                        <p>Seu plano de saúde possui reembolso total para exames laboratoriais realizados fora da rede credenciada até o limite de R$ 350,00.</p>
                        <button className="btn-secondary">Saber mais</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;

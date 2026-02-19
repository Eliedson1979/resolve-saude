import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Dependentes.css';

const Dependentes = ({ user }) => {
    const [showModal, setShowModal] = useState(false);

    const dependentes = [
        {
            id: 1,
            nome: 'Ana Luiza Oliveira',
            parentesco: 'Cônjuge',
            nascimento: '12/05/1985',
            status: 'Ativo',
            avatar: '👩‍💼',
            plano: 'Executivo Plus'
        },
        {
            id: 2,
            nome: 'Vinícius Oliveira',
            parentesco: 'Filho',
            nascimento: '20/09/2012',
            status: 'Ativo',
            avatar: '👦',
            plano: 'Executivo Plus'
        },
        {
            id: 3,
            nome: 'Beatriz Oliveira',
            parentesco: 'Filha',
            nascimento: '05/02/2015',
            status: 'Aguardando Aprovação',
            avatar: '👧',
            plano: 'Executivo Plus'
        }
    ];

    return (
        <div className="dependentes-container">
            <header className="page-header">
                <div className="header-text">
                    <h1>Gestão de Dependentes</h1>
                    <p>Gerencie os membros da sua família vinculados ao seu benefício</p>
                </div>
                <button className="btn-add" onClick={() => setShowModal(true)}>
                    <span>+</span> Adicionar Dependente
                </button>
            </header>

            <div className="dependentes-grid">
                {dependentes.map((dep, index) => (
                    <motion.div
                        key={dep.id}
                        className="dependente-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className={`status-badge ${dep.status.toLowerCase().replace(/ /g, '-')}`}>
                            {dep.status}
                        </div>

                        <div className="card-top">
                            <div className="card-avatar">
                                <span className="avatar-icon">{dep.avatar}</span>
                            </div>
                            <div className="card-name">
                                <h3>{dep.nome}</h3>
                                <span className="card-parentesco">{dep.parentesco}</span>
                            </div>
                        </div>

                        <div className="card-body">
                            <div className="info-row">
                                <span className="label">Plano</span>
                                <span className="value">{dep.plano}</span>
                            </div>
                            <div className="info-row">
                                <span className="label">Nascimento</span>
                                <span className="value">{dep.nascimento}</span>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button className="btn-details">Ver Documentos</button>
                            <button className="btn-edit">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                ))}

                <motion.button
                    className="add-card-placeholder"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(true)}
                >
                    <div className="plus-icon">+</div>
                    <p>Adicionar novo membro</p>
                </motion.button>
            </div>

            <section className="quota-usage">
                <h2>Uso de Cota Familiar</h2>
                <div className="quota-card">
                    <div className="quota-info">
                        <span>Beneficiários (4/6)</span>
                        <span>66%</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '66%' }}></div>
                    </div>
                    <p className="quota-hint">Seu plano atual permite até 6 dependentes sem custos adicionais.</p>
                </div>
            </section>

            {showModal && (
                <div className="modal-overlay">
                    <motion.div
                        className="modal-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="modal-header">
                            <h2>Novo Dependente</h2>
                            <button className="close-modal" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <form className="modal-form">
                            <div className="form-group">
                                <label>Nome Completo</label>
                                <input type="text" placeholder="Digite o nome..." />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Grau de Parentesco</label>
                                    <select>
                                        <option>Cônjuge</option>
                                        <option>Filho(a)</option>
                                        <option>Pai/Mãe</option>
                                        <option>Outro</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Data de Nascimento</label>
                                    <input type="date" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>CPF</label>
                                <input type="text" placeholder="000.000.000-00" />
                            </div>
                            <button type="button" className="btn-submit">Enviar para Aprovação</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Dependentes;

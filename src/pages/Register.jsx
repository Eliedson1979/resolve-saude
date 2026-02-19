import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Login.css'; // Reutilizando a estrutura base de Login
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            return setError('As senhas não coincidem');
        }

        if (formData.password.length < 6) {
            return setError('A senha deve ter pelo menos 6 caracteres');
        }

        try {
            setLoading(true);
            await authService.signUp(formData.email, formData.password, formData.fullName);
            setShowSuccessModal(true);
        } catch (err) {
            setError(err.message || 'Erro ao realizar cadastro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <header className="login-header">
                    <Link to="/" className="nav-brand">
                        <span className="logo-emoji">🩺</span>
                        <span className="logo-text">ResolveSaúde</span>
                    </Link>
                    <h1>Crie sua conta</h1>
                    <p>Comece a organizar sua vida na saúde hoje mesmo.</p>
                </header>

                <form className="login-form" onSubmit={handleRegister}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="fullName">Nome Completo</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Seu nome completo"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="seu@email.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="••••••••"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-primary btn-full" disabled={loading}>
                        {loading ? 'Criando conta...' : 'Cadastrar'}
                    </button>
                </form>

                <footer className="login-footer">
                    <p>Já tem uma conta? <Link to="/login">Entre aqui</Link></p>
                </footer>
            </div>

            <div className="login-illustration">
                <div className="illustration-wrapper">
                    <div className="blob main-blob"></div>
                    <div className="blob secondary-blob"></div>

                    <div className="health-identity-card">
                        <div className="card-header">
                            <div className="avatar-placeholder"></div>
                            <div className="card-line long"></div>
                            <div className="card-line short"></div>
                        </div>
                        <div className="card-body">
                            <div className="status-badge-mini">CADASTRO</div>
                            <div className="card-chip"></div>
                        </div>
                    </div>

                    <div className="floating-stat stat-1">
                        <span className="stat-icon">🏥</span>
                        <div className="stat-info">
                            <div className="stat-bar"></div>
                            <div className="stat-bar half"></div>
                        </div>
                    </div>

                    <div className="decoration-circle c1"></div>
                    <div className="decoration-circle c2"></div>
                </div>
            </div>

            {/* Success Modal Elegant */}
            {showSuccessModal && (
                <div className="success-modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon-container">
                            <div className="success-icon">✓</div>
                        </div>
                        <h2>Conta Criada! ✨</h2>
                        <p>Sua jornada no **ResolveSaúde** começou. Prepare-se para uma experiência de saúde sem burocracia.</p>
                        <button className="btn-primary btn-full" onClick={() => navigate('/login')}>
                            Ir para o Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;

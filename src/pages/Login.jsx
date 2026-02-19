import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await authService.signIn(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('E-mail ou senha inválidos. Por favor, tente novamente.');
            console.error(err);
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
                    <h1>Bem-vindo de volta</h1>
                    <p>Acesse sua conta para gerenciar seu plano de saúde.</p>
                </header>

                <form className="login-form" onSubmit={handleLogin}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary btn-full" disabled={loading}>
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <footer className="login-footer">
                    <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
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
                            <div className="status-badge-mini">ATIVO</div>
                            <div className="card-chip"></div>
                        </div>
                    </div>

                    <div className="floating-stat stat-1">
                        <span className="stat-icon">❤️</span>
                        <div className="stat-info">
                            <div className="stat-bar"></div>
                            <div className="stat-bar half"></div>
                        </div>
                    </div>

                    <div className="floating-stat stat-2">
                        <span className="stat-icon">🧬</span>
                        <div className="stat-info">
                            <div className="stat-bar"></div>
                        </div>
                    </div>

                    <div className="decoration-circle c1"></div>
                    <div className="decoration-circle c2"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const [demoOpen, setDemoOpen] = useState(false);

    const plans = [
        {
            name: 'Básico',
            price: 'Grátis',
            period: '',
            badge: null,
            features: [
                'Gestão de até 10 documentos',
                'Agenda de consultas',
                'Suporte IA Básico',
                '1 dependente',
            ],
            featured: false,
            cta: 'Começar Grátis',
            ctaLink: '/register',
        },
        {
            name: 'Essencial',
            price: 'R$ 25',
            period: '/mês',
            badge: null,
            features: [
                'Até 50 documentos',
                'Agenda inteligente',
                'IA com respostas básicas',
                'Até 3 dependentes',
                'Suporte por e-mail',
            ],
            featured: false,
            cta: 'Assinar Essencial',
            ctaLink: '/register',
        },
        {
            name: 'Premium',
            price: 'R$ 70',
            period: '/mês',
            badge: 'Mais Popular',
            features: [
                'Documentos Ilimitados',
                'IA com Análise de Cobertura',
                'Desconto em farmácias parceiras',
                'Notificações via WhatsApp',
                'Até 6 dependentes',
                'Suporte Prioritário',
            ],
            featured: true,
            cta: 'Assinar Premium',
            ctaLink: '/register',
        },
        {
            name: 'Empresarial',
            price: 'R$ 100',
            period: '/mês',
            badge: 'Completo',
            features: [
                'Tudo do Premium',
                'Dependentes ilimitados',
                'Assessoria jurídica IA',
                'Relatórios gerenciais',
                'Suporte 24h dedicado',
                'Desconto em farmácias parceiras',
            ],
            featured: false,
            cta: 'Assinar Empresarial',
            ctaLink: '/register',
        },
    ];

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="landing-nav">
                <div className="nav-brand">
                    <span className="logo-emoji">🩺</span>
                    <span className="logo-text">ResolveSaúde</span>
                </div>
                <div className="nav-center-links">
                    <a href="#features">Funcionalidades</a>
                    <a href="#how-it-works">Como Funciona</a>
                    <a href="#pricing">Planos</a>
                    <a href="#faq">FAQ</a>
                </div>
                <div className="nav-links">
                    <Link to="/login" className="btn-login-outline">Entrar</Link>
                    <Link to="/register" className="btn-primary">Começar Agora</Link>
                </div>
            </nav>

            {/* Hero */}
            <header className="hero-section">
                <div className="hero-content">
                    <div className="hero-tag">✨ Plataforma de Saúde com IA</div>
                    <h1>Descomplique seu plano de saúde com <span>IA</span></h1>
                    <p>Organize suas consultas, documentos e tenha orientação médica inteligente em um só lugar. Pare de lutar contra a burocracia.</p>
                    <div className="hero-btns">
                        <Link to="/register" className="btn-primary btn-lg">
                            Criar Minha Conta
                        </Link>
                        <button className="btn-demo btn-lg" onClick={() => setDemoOpen(true)}>
                            <span className="play-icon">▶</span> Ver Demo
                        </button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <strong>+12k</strong><span>Usuários Ativos</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <strong>98%</strong><span>Satisfação</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <strong>4.9★</strong><span>Avaliação</span>
                        </div>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="dashboard-mockup-wrapper">
                        <div className="mockup-glass-bg"></div>

                        {/* Elemento Flutuante: Consulta */}
                        <div className="floating-card card-appointment">
                            <div className="card-icon">📅</div>
                            <div className="card-text">
                                <small>Próxima Consulta</small>
                                <strong>Cardiologista - 14h</strong>
                            </div>
                            <div className="status-dot pulse"></div>
                        </div>

                        {/* Elemento Flutuante: Documento */}
                        <div className="floating-card card-document">
                            <div className="doc-preview">📄</div>
                            <div className="card-text">
                                <strong>Resultado de Exame</strong>
                                <small>Disponível agora</small>
                            </div>
                        </div>

                        {/* Elemento Flutuante: Chat IA */}
                        <div className="floating-chat">
                            <div className="ai-avatar">✨</div>
                            <div className="chat-bubble">
                                Seu plano cobre este exame! Deseja agendar?
                            </div>
                        </div>

                        {/* Fundo Principal do Mockup */}
                        <div className="mockup-main-frame">
                            <div className="mockup-nav"></div>
                            <div className="mockup-content">
                                <div className="mockup-chart">
                                    <div className="bar" style={{ height: '60%' }}></div>
                                    <div className="bar" style={{ height: '80%' }}></div>
                                    <div className="bar" style={{ height: '40%' }}></div>
                                    <div className="bar" style={{ height: '90%' }}></div>
                                </div>
                                <div className="mockup-list">
                                    <div className="list-item"></div>
                                    <div className="list-item"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features */}
            <section className="features-section" id="features">
                <div className="section-header">
                    <h2>Por que escolher o ResolveSaúde?</h2>
                    <p>Tudo que você precisa para gerenciar sua saúde em um único lugar.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📅</div>
                        <h3>Agenda Inteligente</h3>
                        <p>Nunca mais perca uma consulta ou prazo de autorização de guias.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📄</div>
                        <h3>Repositório Seguro</h3>
                        <p>Seus laudos, receitas e exames sempre à mão, organizados por categoria.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✨</div>
                        <h3>Assistente Resolve IA</h3>
                        <p>Dúvidas sobre coberturas e carências respondidas instantaneamente.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚖️</div>
                        <h3>Suporte Jurídico</h3>
                        <p>Orientações legais sobre seus direitos junto ao plano de saúde.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">👨‍👩‍👧</div>
                        <h3>Gestão de Família</h3>
                        <p>Gerencie todos os dependentes do plano em um painel unificado.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>100% Seguro</h3>
                        <p>Criptografia de ponta a ponta. Seus dados médicos sempre protegidos.</p>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="how-it-works" id="how-it-works">
                <div className="section-header">
                    <h2>Como Funciona?</h2>
                    <p>Três passos simples para recuperar a paz de espírito com sua saúde.</p>
                </div>
                <div className="steps-grid">
                    <div className="step-item">
                        <div className="step-number">1</div>
                        <h3>Cadastre-se</h3>
                        <p>Crie sua conta em segundos e conecte seu perfil.</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">2</div>
                        <h3>Faça o Upload</h3>
                        <p>Envie fotos de seus exames, laudos ou receitas pelo app.</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">3</div>
                        <h3>Resolva</h3>
                        <p>Nossa IA analisa e organiza tudo, além de te lembrar dos próximos passos.</p>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="pricing-section" id="pricing">
                <div className="section-header">
                    <h2>Planos para sua Tranquilidade</h2>
                    <p>Escolha o plano que melhor atende às suas necessidades. Sem surpresas.</p>
                </div>
                <div className="pricing-grid">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                            {plan.badge && <div className="badge">{plan.badge}</div>}
                            <h3>{plan.name}</h3>
                            <div className="price">
                                {plan.price}<span>{plan.period}</span>
                            </div>
                            <ul>
                                {plan.features.map((f) => (
                                    <li key={f}>✅ {f}</li>
                                ))}
                            </ul>
                            <Link
                                to={plan.ctaLink}
                                className={plan.featured ? 'btn-primary' : 'btn-outline'}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="faq-section" id="faq">
                <div className="section-header">
                    <h2>Perguntas Frequentes</h2>
                </div>
                <div className="faq-list">
                    <details>
                        <summary>O ResolveSaúde é um plano de saúde?</summary>
                        <p>Não. Somos uma plataforma de gestão e auxílio para quem JÁ POSSUI um plano de saúde, ajudando a lidar com a burocracia e organização.</p>
                    </details>
                    <details>
                        <summary>Meus dados estão seguros?</summary>
                        <p>Sim. Utilizamos criptografia de ponta a ponta e o Supabase para garantir que apenas você tenha acesso aos seus documentos médicos.</p>
                    </details>
                    <details>
                        <summary>A IA pode dar diagnósticos médicos?</summary>
                        <p>Não. Nossa IA foca em orientação burocrática, organização de informações e esclarecimento de termos do seu contrato de saúde.</p>
                    </details>
                    <details>
                        <summary>Posso cancelar a qualquer momento?</summary>
                        <p>Sim. Não há fidelidade. Você pode cancelar ou mudar de plano quando quiser sem burocracia.</p>
                    </details>
                    <details>
                        <summary>Posso testar antes de assinar?</summary>
                        <p>Sim! O plano Básico é gratuito para sempre e você pode fazer upgrade a qualquer momento.</p>
                    </details>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="cta-banner">
                <div className="cta-content">
                    <h2>Pronto para resolver sua saúde?</h2>
                    <p>Junte-se a mais de 12 mil brasileiros que já simplificaram seu plano de saúde.</p>
                    <Link to="/register" className="btn-primary btn-lg">Criar Conta Grátis →</Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="logo-emoji">🩺</span>
                        <span className="logo-text">ResolveSaúde</span>
                        <p className="footer-tagline">Simplificando o acesso à saúde.</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Produto</h4>
                            <a href="#features">Funcionalidades</a>
                            <a href="#pricing">Preços</a>
                            <a href="#how-it-works">Como Funciona</a>
                        </div>
                        <div className="footer-column">
                            <h4>Legal</h4>
                            <a href="#">Privacidade</a>
                            <a href="#">Termos de Uso</a>
                        </div>
                        <div className="footer-column">
                            <h4>Conta</h4>
                            <Link to="/login">Entrar</Link>
                            <Link to="/register">Cadastrar</Link>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 ResolveSaúde. Todos os direitos reservados.</p>
                </div>
            </footer>

            {/* Demo Modal */}
            {demoOpen && (
                <div className="demo-modal-overlay" onClick={() => setDemoOpen(false)}>
                    <div className="demo-modal demo-modal-video" onClick={e => e.stopPropagation()}>
                        <div className="demo-modal-header">
                            <div className="demo-header-left">
                                <span className="demo-live-dot"></span>
                                <h3>🩺 Tour pelo ResolveSaúde</h3>
                            </div>
                            <button className="demo-close" onClick={() => setDemoOpen(false)}>✕</button>
                        </div>
                        <div className="demo-video-wrapper">
                            <video
                                src="/demo-tour.webp"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                                className="demo-video"
                            >
                                Seu navegador não suporta a reprodução de vídeo.
                            </video>
                        </div>
                        <div className="demo-modal-footer">
                            <p className="demo-footer-text">Pronto para começar?</p>
                            <Link to="/register" className="btn-primary" onClick={() => setDemoOpen(false)}>
                                Criar Conta Grátis →
                            </Link>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LandingPage;

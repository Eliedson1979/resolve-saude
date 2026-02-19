import React, { useState } from 'react';
import './Configuracoes.css';

const Configuracoes = ({ user }) => {
  const userName = user?.user_metadata?.full_name || 'Usuário';
  const userEmail = user?.email || 'usuario@email.com';

  const [activeSection, setActiveSection] = useState('perfil');
  const [saveStatus, setSaveStatus] = useState(null);

  // Estado do Perfil
  const [perfil, setPerfil] = useState({
    nome: userName,
    email: userEmail,
    telefone: '(11) 99999-9999',
    dataNascimento: '1990-05-15',
    cpf: '***.***.***-**',
  });

  // Estado das Notificações
  const [notificacoes, setNotificacoes] = useState({
    emailConsultas: true,
    emailDocumentos: true,
    emailJuridico: false,
    pushConsultas: true,
    pushDocumentos: false,
    pushJuridico: true,
    lembretes: true,
    whatsapp: false,
  });

  // Estado de Aparência
  const [aparencia, setAparencia] = useState({
    tema: 'dark',
    idioma: 'pt-BR',
    tamanhoFonte: 'medio',
    reducaoMovimento: false,
    altoContraste: false,
  });

  // Estado de Segurança
  const [seguranca, setSeguranca] = useState({
    autenticacaoDois: false,
    sessaoAtiva: true,
    alertasLogin: true,
  });

  const sections = [
    { id: 'perfil', icon: '👤', label: 'Perfil' },
    { id: 'plano', icon: '💳', label: 'Meu Plano' },
    { id: 'notificacoes', icon: '🔔', label: 'Notificações' },
    { id: 'seguranca', icon: '🔐', label: 'Segurança' },
    { id: 'aparencia', icon: '🎨', label: 'Aparência' },
  ];

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  const Toggle = ({ checked, onChange, id }) => (
    <label className="toggle-switch" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-slider"></span>
    </label>
  );

  return (
    <div className="configuracoes-view">
      {/* Header */}
      <header className="page-header config-header">
        <div>
          <h1>⚙️ Configurações</h1>
          <p>Gerencie suas preferências e dados da conta.</p>
        </div>
        <button
          className={`btn-save ${saveStatus === 'saving' ? 'saving' : ''} ${saveStatus === 'saved' ? 'saved' : ''}`}
          onClick={handleSave}
        >
          {saveStatus === 'saving' && <span className="spinner"></span>}
          {saveStatus === 'saved' ? '✅ Salvo!' : saveStatus === 'saving' ? 'Salvando...' : '💾 Salvar Alterações'}
        </button>
      </header>

      <div className="config-layout">
        {/* Sidebar de Navegação */}
        <nav className="config-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`config-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span>{section.label}</span>
              {activeSection === section.id && <span className="nav-indicator">›</span>}
            </button>
          ))}
        </nav>

        {/* Conteúdo da Seção */}
        <div className="config-content">

          {/* ===== PERFIL ===== */}
          {activeSection === 'perfil' && (
            <div className="config-section">
              <div className="section-title">
                <h2>👤 Informações do Perfil</h2>
                <p>Seus dados pessoais e de contato.</p>
              </div>

              <div className="avatar-section">
                <div className="avatar-circle">
                  <span>{userName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="avatar-info">
                  <p className="avatar-name">{userName}</p>
                  <p className="avatar-plan">Plano Premium · Ativo</p>
                  <button className="btn-outline btn-sm">Alterar Foto</button>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    value={perfil.nome}
                    onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>E-mail</label>
                  <input
                    type="email"
                    value={perfil.email}
                    onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    value={perfil.telefone}
                    onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    value={perfil.dataNascimento}
                    onChange={(e) => setPerfil({ ...perfil, dataNascimento: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>CPF</label>
                  <input
                    type="text"
                    value={perfil.cpf}
                    readOnly
                    className="form-input readonly"
                  />
                  <span className="field-hint">🔒 CPF não pode ser alterado</span>
                </div>
              </div>

              <div className="danger-zone">
                <h3>⚠️ Zona de Perigo</h3>
                <p>Ações irreversíveis para sua conta.</p>
                <div className="danger-actions">
                  <button className="btn-danger-outline">Exportar Meus Dados</button>
                  <button className="btn-danger">Excluir Conta</button>
                </div>
              </div>
            </div>
          )}

          {/* ===== PLANO ===== */}
          {activeSection === 'plano' && (
            <div className="config-section">
              <div className="section-title">
                <h2>💳 Meu Plano de Saúde</h2>
                <p>Informações do convênio vinculado à sua conta.</p>
              </div>

              <div className="plan-card-display">
                <div className="plan-card-visual">
                  <div className="plan-card-header">
                    <span className="plan-logo">🩺</span>
                    <span className="plan-type">Premium</span>
                  </div>
                  <div className="plan-card-body">
                    <p className="plan-holder">{userName}</p>
                    <p className="plan-number">Nº 0012-3456-789-0</p>
                  </div>
                  <div className="plan-card-footer">
                    <span>ResolveSaúde</span>
                    <span>Válido até 12/2026</span>
                  </div>
                </div>
              </div>

              <div className="plan-details-grid">
                <div className="plan-detail-item">
                  <span className="detail-label">Operadora</span>
                  <span className="detail-value">Amil Saúde</span>
                </div>
                <div className="plan-detail-item">
                  <span className="detail-label">Tipo de Plano</span>
                  <span className="detail-value">Individual Premium</span>
                </div>
                <div className="plan-detail-item">
                  <span className="detail-label">Cobertura</span>
                  <span className="detail-value badge-green">Nacional</span>
                </div>
                <div className="plan-detail-item">
                  <span className="detail-label">Carência</span>
                  <span className="detail-value badge-blue">Cumprida</span>
                </div>
                <div className="plan-detail-item">
                  <span className="detail-label">Vencimento da Mensalidade</span>
                  <span className="detail-value">Todo dia 10</span>
                </div>
                <div className="plan-detail-item">
                  <span className="detail-label">Valor Mensal</span>
                  <span className="detail-value">R$ 890,00</span>
                </div>
              </div>

              <div className="plan-actions">
                <button className="btn-primary">📄 Ver Contrato Completo</button>
                <button className="btn-outline">🔄 Atualizar Dados do Plano</button>
              </div>
            </div>
          )}

          {/* ===== NOTIFICAÇÕES ===== */}
          {activeSection === 'notificacoes' && (
            <div className="config-section">
              <div className="section-title">
                <h2>🔔 Preferências de Notificação</h2>
                <p>Escolha como e quando deseja ser notificado.</p>
              </div>

              <div className="notif-group">
                <h3 className="notif-group-title">📧 E-mail</h3>
                <div className="toggle-list">
                  {[
                    { key: 'emailConsultas', label: 'Confirmação e lembretes de consultas', desc: '24h antes de cada consulta agendada' },
                    { key: 'emailDocumentos', label: 'Atualizações de documentos', desc: 'Quando um documento for processado' },
                    { key: 'emailJuridico', label: 'Atualizações jurídicas', desc: 'Novidades nos seus processos' },
                  ].map(item => (
                    <div key={item.key} className="toggle-item">
                      <div className="toggle-text">
                        <span className="toggle-label">{item.label}</span>
                        <span className="toggle-desc">{item.desc}</span>
                      </div>
                      <Toggle
                        id={item.key}
                        checked={notificacoes[item.key]}
                        onChange={(val) => setNotificacoes({ ...notificacoes, [item.key]: val })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="notif-group">
                <h3 className="notif-group-title">📱 Push (Aplicativo)</h3>
                <div className="toggle-list">
                  {[
                    { key: 'pushConsultas', label: 'Notificações de consultas', desc: 'Alarmes e lembretes no celular' },
                    { key: 'pushDocumentos', label: 'Documentos prontos', desc: 'Aviso imediato quando disponível' },
                    { key: 'pushJuridico', label: 'Eventos jurídicos', desc: 'Prazos e atualizações urgentes' },
                    { key: 'lembretes', label: 'Lembretes gerais', desc: 'Renovação do plano e dicas de saúde' },
                  ].map(item => (
                    <div key={item.key} className="toggle-item">
                      <div className="toggle-text">
                        <span className="toggle-label">{item.label}</span>
                        <span className="toggle-desc">{item.desc}</span>
                      </div>
                      <Toggle
                        id={item.key}
                        checked={notificacoes[item.key]}
                        onChange={(val) => setNotificacoes({ ...notificacoes, [item.key]: val })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="notif-group">
                <h3 className="notif-group-title">💬 WhatsApp</h3>
                <div className="toggle-list">
                  <div className="toggle-item">
                    <div className="toggle-text">
                      <span className="toggle-label">Notificações via WhatsApp</span>
                      <span className="toggle-desc">Receba mensagens no número cadastrado</span>
                    </div>
                    <Toggle
                      id="whatsapp"
                      checked={notificacoes.whatsapp}
                      onChange={(val) => setNotificacoes({ ...notificacoes, whatsapp: val })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== SEGURANÇA ===== */}
          {activeSection === 'seguranca' && (
            <div className="config-section">
              <div className="section-title">
                <h2>🔐 Segurança da Conta</h2>
                <p>Proteja seus dados com as melhores práticas de segurança.</p>
              </div>

              <div className="security-status">
                <div className="security-score">
                  <div className="score-ring">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--primary)" strokeWidth="10"
                        strokeDasharray="189 264" strokeDashoffset="0" strokeLinecap="round"/>
                    </svg>
                    <span className="score-value">72%</span>
                  </div>
                  <div className="score-info">
                    <p className="score-label">Nível de Segurança</p>
                    <p className="score-desc">Habilite a autenticação de dois fatores para aumentar sua proteção.</p>
                  </div>
                </div>
              </div>

              <div className="config-card">
                <h3>🔑 Alterar Senha</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Senha Atual</label>
                    <input type="password" placeholder="••••••••" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Nova Senha</label>
                    <input type="password" placeholder="••••••••" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Confirmar Nova Senha</label>
                    <input type="password" placeholder="••••••••" className="form-input" />
                  </div>
                </div>
                <button className="btn-primary btn-sm">Atualizar Senha</button>
              </div>

              <div className="config-card">
                <h3>🛡️ Autenticação e Sessões</h3>
                <div className="toggle-list">
                  {[
                    { key: 'autenticacaoDois', label: 'Autenticação de Dois Fatores (2FA)', desc: 'Adiciona uma camada extra de segurança no login', badge: 'Recomendado' },
                    { key: 'alertasLogin', label: 'Alertas de Login', desc: 'Receba notificações quando um novo dispositivo acessar sua conta' },
                  ].map(item => (
                    <div key={item.key} className="toggle-item">
                      <div className="toggle-text">
                        <span className="toggle-label">
                          {item.label}
                          {item.badge && <span className="badge-recommended">{item.badge}</span>}
                        </span>
                        <span className="toggle-desc">{item.desc}</span>
                      </div>
                      <Toggle
                        id={item.key}
                        checked={seguranca[item.key]}
                        onChange={(val) => setSeguranca({ ...seguranca, [item.key]: val })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="config-card sessions-card">
                <h3>💻 Sessões Ativas</h3>
                <div className="session-item">
                  <div className="session-icon">🖥️</div>
                  <div className="session-info">
                    <p className="session-device">Chrome — Linux</p>
                    <p className="session-details">São Paulo, BR · Agora mesmo</p>
                  </div>
                  <span className="session-current">Atual</span>
                </div>
                <button className="btn-danger-outline btn-sm">Encerrar Todas as Outras Sessões</button>
              </div>
            </div>
          )}

          {/* ===== APARÊNCIA ===== */}
          {activeSection === 'aparencia' && (
            <div className="config-section">
              <div className="section-title">
                <h2>🎨 Aparência</h2>
                <p>Personalize a interface do ResolveSaúde ao seu gosto.</p>
              </div>

              <div className="config-card">
                <h3>🌙 Tema</h3>
                <div className="theme-selector">
                  {[
                    { id: 'dark', icon: '🌙', label: 'Escuro' },
                    { id: 'light', icon: '☀️', label: 'Claro' },
                    { id: 'auto', icon: '⚙️', label: 'Automático' },
                  ].map(tema => (
                    <button
                      key={tema.id}
                      className={`theme-option ${aparencia.tema === tema.id ? 'selected' : ''}`}
                      onClick={() => setAparencia({ ...aparencia, tema: tema.id })}
                    >
                      <span>{tema.icon}</span>
                      <span>{tema.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="config-card">
                <h3>🔤 Tamanho da Fonte</h3>
                <div className="font-size-selector">
                  {[
                    { id: 'pequeno', label: 'Pequeno', size: '13px' },
                    { id: 'medio', label: 'Médio', size: '15px' },
                    { id: 'grande', label: 'Grande', size: '18px' },
                  ].map(f => (
                    <button
                      key={f.id}
                      className={`font-option ${aparencia.tamanhoFonte === f.id ? 'selected' : ''}`}
                      onClick={() => setAparencia({ ...aparencia, tamanhoFonte: f.id })}
                      style={{ fontSize: f.size }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="config-card">
                <h3>♿ Acessibilidade</h3>
                <div className="toggle-list">
                  {[
                    { key: 'reducaoMovimento', label: 'Reduzir Movimentos', desc: 'Desativa animações e transições' },
                    { key: 'altoContraste', label: 'Alto Contraste', desc: 'Aumenta o contraste para melhor legibilidade' },
                  ].map(item => (
                    <div key={item.key} className="toggle-item">
                      <div className="toggle-text">
                        <span className="toggle-label">{item.label}</span>
                        <span className="toggle-desc">{item.desc}</span>
                      </div>
                      <Toggle
                        id={item.key}
                        checked={aparencia[item.key]}
                        onChange={(val) => setAparencia({ ...aparencia, [item.key]: val })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="config-card">
                <h3>🌍 Idioma</h3>
                <select
                  className="form-input select-input"
                  value={aparencia.idioma}
                  onChange={(e) => setAparencia({ ...aparencia, idioma: e.target.value })}
                >
                  <option value="pt-BR">🇧🇷 Português (Brasil)</option>
                  <option value="en-US">🇺🇸 English (US)</option>
                  <option value="es-ES">🇪🇸 Español</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;

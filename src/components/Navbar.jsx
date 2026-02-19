import React from 'react';
import { notificacoesService } from '../services/notificacoesService';
import './Navbar.css';

const Navbar = ({ user, onMenuClick }) => {
    const [notificacoes, setNotificacoes] = React.useState([]);
    const [showNotif, setShowNotif] = React.useState(false);
    const fullName = user?.user_metadata?.full_name || 'Usuário';

    const unreadCount = notificacoes.filter(n => !n.read).length;

    React.useEffect(() => {
        if (!user) return;

        // Carregar notificações iniciais
        notificacoesService.getNotificacoes().then(setNotificacoes);

        // Ouvir novas notificações em tempo real
        const subscription = notificacoesService.onNewNotification((newNotif) => {
            setNotificacoes(prev => [newNotif, ...prev]);
        });

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [user]);

    const handleRead = async (id) => {
        await notificacoesService.markAsRead(id);
        setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <button className="menu-mobile-btn" onClick={onMenuClick} title="Abrir menu">
                    ☰
                </button>

                <div className="navbar-brand">
                    <span className="brand-logo">🩺</span>
                    <span className="brand-name">ResolveSaúde</span>
                </div>

                <div className="navbar-search">
                    <div className="search-icon-wrapper">🔍</div>
                    <input type="text" placeholder="Buscar consultas, exames ou médicos..." />
                </div>

                <div className="navbar-actions">
                    <div className="notif-container">
                        <button
                            className={`btn-icon ${showNotif ? 'active' : ''}`}
                            onClick={() => setShowNotif(!showNotif)}
                            title="Notificações"
                        >
                            🔔
                            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
                        </button>

                        {showNotif && (
                            <div className="notif-dropdown">
                                <div className="notif-header">
                                    <h3>Notificações</h3>
                                    {unreadCount > 0 && (
                                        <button onClick={() => notificacoesService.markAllAsRead()}>Limpar todas</button>
                                    )}
                                </div>
                                <div className="notif-list">
                                    {notificacoes.length > 0 ? (
                                        notificacoes.map(n => (
                                            <div key={n.id} className={`notif-item ${n.read ? 'read' : 'unread'}`} onClick={() => handleRead(n.id)}>
                                                <div className={`notif-dot ${n.type || 'info'}`}></div>
                                                <div className="notif-content">
                                                    <strong>{n.title}</strong>
                                                    <p>{n.message}</p>
                                                    <span>{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="notif-empty">
                                            <p>Tudo limpo por aqui! ✨</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="user-profile">
                        <div className="user-info-text">
                            <span className="user-name">{fullName}</span>
                            <span className="user-plan">Plano Premium</span>
                        </div>
                        <img
                            src={`https://ui-avatars.com/api/?name=${fullName}&background=0ea5e9&color=fff&bold=true`}
                            alt={fullName}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

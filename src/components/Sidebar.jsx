import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '📅', label: 'Consultas', path: '/consultas' },
    { icon: '📄', label: 'Documentos', path: '/documentos' },
    { icon: '⚖️', label: 'Jurídico', path: '/juridico' },
    { icon: '👨‍👩‍👧', label: 'Dependentes', path: '/dependentes' },
    { icon: '⚙️', label: 'Configurações', path: '/configuracoes' },
  ];

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-brand">
          <span className="logo-emoji">🩺</span>
          <span className="logo-text">ResolveSaúde</span>
        </div>
        <button className="sidebar-close-btn" onClick={onClose}>✕</button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-logout" onClick={handleLogout}>
          <span>🚪</span> Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

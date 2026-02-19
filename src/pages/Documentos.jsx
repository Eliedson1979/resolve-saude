import React, { useState, useEffect } from 'react';
import { documentosService } from '../services/documentosService';
import './Documentos.css';

const Documentos = () => {
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('todos');

    // Estados para Upload
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadData, setUploadData] = useState({ title: '', category: 'exame' });

    const mockDocs = [
        { id: 1, title: 'Resultado Sangue - Jan/2026', category: 'exame', created_at: '2026-01-20T10:00:00', file_url: '#' },
        { id: 2, title: 'Receita Amoxicilina', category: 'receita', created_at: '2026-02-05T15:30:00', file_url: '#' },
    ];

    const loadDocs = async () => {
        try {
            setLoading(true);
            const data = await documentosService.getDocumentos();
            setDocumentos(data && data.length > 0 ? data : mockDocs);
        } catch (err) {
            console.error('Erro ao carregar Docs:', err);
            setDocumentos(mockDocs);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocs();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setUploadData(prev => ({ ...prev, title: file.name }));
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return alert('Selecione um arquivo primeiro');

        try {
            setUploading(true);
            await documentosService.uploadDocumento(selectedFile, uploadData);
            alert('Documento enviado com sucesso!');
            setIsModalOpen(false);
            setSelectedFile(null);
            setUploadData({ title: '', category: 'exame' });
            loadDocs(); // Recarregar lista
        } catch (err) {
            console.error('Erro no upload:', err);
            alert('Erro ao enviar documento. Verifique se o bucket "documentos" existe no Supabase.');
        } finally {
            setUploading(false);
        }
    };

    const filteredDocs = filter === 'todos'
        ? documentos
        : documentos.filter(doc => doc.category === filter);

    const getCategoryEmoji = (cat) => {
        const emojis = { exame: '🧪', receita: '📄', carteirinha: '🪪', laudo: '📋', outros: '📁' };
        return emojis[cat] || '📁';
    };

    return (
        <div className="documentos-view">
            <header className="page-header">
                <div>
                    <h1>Meus Documentos 📄</h1>
                    <p>Organize e acesse seus exames, laudos e receitas.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    + Enviar Arquivo
                </button>
            </header>

            <div className="filter-bar">
                {['todos', 'exame', 'receita', 'laudo', 'carteirinha'].map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            <div className="docs-grid">
                {filteredDocs.map(doc => (
                    <div key={doc.id} className="doc-card">
                        <div className="doc-icon">{getCategoryEmoji(doc.category)}</div>
                        <div className="doc-info">
                            <h3>{doc.title}</h3>
                            <span className="doc-date">
                                {new Date(doc.created_at).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                        <div className="doc-actions">
                            {/* Depois eu libero os links de download e visualização */}
                            {/* <a href={doc.file_url} target="_blank" rel="noreferrer" className="btn-icon">👁️</a>
                            <a href={doc.file_url} download className="btn-icon">⬇️</a> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Upload */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Enviar Documento</h2>
                        <form onSubmit={handleUpload}>
                            <div className="form-group">
                                <label>Arquivo</label>
                                <input type="file" onChange={handleFileChange} required />
                            </div>
                            <div className="form-group">
                                <label>Título</label>
                                <input
                                    type="text"
                                    value={uploadData.title}
                                    onChange={e => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Ex: Resultado de Exame"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Categoria</label>
                                <select
                                    value={uploadData.category}
                                    onChange={e => setUploadData(prev => ({ ...prev, category: e.target.value }))}
                                >
                                    <option value="exame">Exame</option>
                                    <option value="receita">Receita</option>
                                    <option value="laudo">Laudo</option>
                                    <option value="carteirinha">Carteirinha</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>
                            <div className="modal-btns">
                                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-primary" disabled={uploading}>
                                    {uploading ? 'Enviando...' : 'Confirmar Upload'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documentos;

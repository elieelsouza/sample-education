import React, { useState } from 'react';
import {
  Gavel,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarClock,
  LayoutGrid,
  ListFilter,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * ============================================================================
 * TELA ADM (GESTÃO ACADÊMICA / DIES): DELIBERAÇÃO DE AULAS EXCEPCIONAIS
 * Com alternância entre Visão Quadro Kanban (3 Colunas) e Lista Detalhada
 * ============================================================================
 */
export default function ExceptionalClassesReview() {
  const { exceptionalRequests, reviewExceptionalRequest } = useAcademic();

  const [viewMode, setViewMode] = useState('LIST'); // 'LIST' | 'KANBAN'
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [notesMap, setNotesMap] = useState({});

  const filteredRequests = exceptionalRequests.filter((req) => {
    if (statusFilter === 'TODOS') return true;
    return req.status === statusFilter;
  });

  const handleNoteChange = (reqId, text) => {
    setNotesMap((prev) => ({ ...prev, [reqId]: text }));
  };

  const handleDecision = (reqId, decision) => {
    const customNote = notesMap[reqId];
    reviewExceptionalRequest(reqId, decision, customNote);
  };

  const columns = [
    { key: 'Pendente', title: 'Em Análise (Pendentes)', badgeClass: 'badge-gold' },
    { key: 'Deferida', title: 'Solicitações Deferidas', badgeClass: 'badge-green' },
    { key: 'Indeferida', title: 'Solicitações Indeferidas', badgeClass: 'badge-danger' },
  ];

  return (
    <div className="page-container">
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <Gavel size={14} />
            Mesa de Deliberação Pedagógica • SEDUC-SE
          </div>
          <h2>Análise e Deferimento de Aulas Excepcionais</h2>
          <p>
            Avalie pedidos de <strong>Reposição</strong> e <strong>Antecipação de Aula</strong>{' '}
            submetidos pelos docentes e registre o despacho de deferimento ou indeferimento.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="subtabs-bar">
            <button
              type="button"
              className={`subtab-btn ${viewMode === 'LIST' ? 'active' : ''}`}
              onClick={() => setViewMode('LIST')}
            >
              <ListFilter size={14} />
              Visão Detalhada
            </button>
            <button
              type="button"
              className={`subtab-btn ${viewMode === 'KANBAN' ? 'active' : ''}`}
              onClick={() => setViewMode('KANBAN')}
            >
              <LayoutGrid size={14} />
              Quadro Kanban
            </button>
          </div>
        </div>
      </div>

      {/* Visão 1: Quadro Kanban de 3 Colunas */}
      {viewMode === 'KANBAN' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '1.15rem',
            alignItems: 'start',
          }}
        >
          {columns.map((col) => {
            const colItems = exceptionalRequests.filter((r) => r.status === col.key);
            return (
              <section key={col.key} className="section-card">
                <div className="section-card-header">
                  <span className="section-card-title" style={{ fontSize: '0.95rem' }}>
                    {col.title}
                  </span>
                  <span className={`badge ${col.badgeClass}`}>{colItems.length}</span>
                </div>
                <div
                  className="section-card-body"
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                >
                  {colItems.length === 0 ? (
                    <p style={{ fontSize: '0.8rem', color: 'var(--seduc-text-muted)', textAlign: 'center' }}>
                      Nenhuma solicitação nesta coluna.
                    </p>
                  ) : (
                    colItems.map((req) => (
                      <div
                        key={req.id}
                        style={{
                          border: '1px solid var(--seduc-border)',
                          borderRadius: '10px',
                          padding: '0.95rem',
                          background: 'var(--seduc-bg-page)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span className="badge badge-blue">{req.protocol}</span>
                          <span className="badge badge-neutral">{req.type}</span>
                        </div>
                        <h4 style={{ fontSize: '0.92rem', marginTop: '0.25rem' }}>
                          {req.className} • {req.disciplineName}
                        </h4>
                        <p style={{ fontSize: '0.76rem', color: 'var(--seduc-text-secondary)' }}>
                          {req.teacherName}
                        </p>
                        <p style={{ fontSize: '0.77rem', marginTop: '0.4rem' }}>
                          <strong>De:</strong> {req.originalDate} → <strong>Para:</strong>{' '}
                          {req.proposedDate}
                        </p>
                        <p style={{ fontSize: '0.77rem', marginTop: '0.35rem' }}>{req.reason}</p>

                        <div style={{ display: 'flex', gap: '0.45rem', marginTop: '0.75rem' }}>
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            style={{ flex: 1 }}
                            onClick={() => handleDecision(req.id, 'Deferida')}
                          >
                            <CheckCircle2 size={13} /> Deferir
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            style={{ flex: 1 }}
                            onClick={() => handleDecision(req.id, 'Indeferida')}
                          >
                            <XCircle size={13} /> Indeferir
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* Visão 2: Lista Detalhada com Filtros e Campo de Parecer */
        <>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['TODOS', 'Pendente', 'Deferida', 'Indeferida'].map((st) => (
              <button
                key={st}
                type="button"
                className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setStatusFilter(st)}
              >
                {st === 'TODOS' ? 'Todas as Solicitações' : `Status: ${st}`}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {filteredRequests.length === 0 ? (
              <div className="section-card">
                <div className="section-card-body" style={{ textAlign: 'center', padding: '2.5rem' }}>
                  <CalendarClock size={36} color="var(--seduc-text-muted)" />
                  <h3 style={{ marginTop: '0.5rem' }}>Nenhuma solicitação neste filtro</h3>
                </div>
              </div>
            ) : (
              filteredRequests.map((req) => {
                const isPending = req.status === 'Pendente';
                const isApproved = req.status === 'Deferida';

                return (
                  <section
                    key={req.id}
                    className="section-card"
                    style={{
                      borderLeft: `6px solid ${
                        isPending
                          ? 'var(--seduc-gold)'
                          : isApproved
                          ? 'var(--seduc-green)'
                          : 'var(--seduc-danger)'
                      }`,
                    }}
                  >
                    <div className="section-card-body">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          flexWrap: 'wrap',
                          marginBottom: '0.9rem',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span className="badge badge-blue">{req.protocol}</span>
                            <span
                              className={`badge ${
                                req.type.includes('Reposição') ? 'badge-gold' : 'badge-blue'
                              }`}
                            >
                              {req.type}
                            </span>
                            <span style={{ fontSize: '0.76rem', color: 'var(--seduc-text-muted)' }}>
                              Protocolado em {req.createdAt}
                            </span>
                          </div>

                          <h3 style={{ fontSize: '1.08rem', marginTop: '0.4rem' }}>
                            {req.disciplineName} — Turma {req.className}
                          </h3>
                          <p style={{ fontSize: '0.82rem', color: 'var(--seduc-text-secondary)' }}>
                            Docente: <strong>{req.teacherName}</strong> • Escola:{' '}
                            <strong>{req.schoolName}</strong>
                          </p>
                        </div>

                        <div>
                          {isPending && (
                            <span className="badge badge-gold">
                              <Clock size={14} /> Pendente de Análise
                            </span>
                          )}
                          {isApproved && (
                            <span className="badge badge-green">
                              <CheckCircle2 size={14} /> Deferida
                            </span>
                          )}
                          {req.status === 'Indeferida' && (
                            <span className="badge badge-danger">
                              <XCircle size={14} /> Indeferida
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                          gap: '0.85rem',
                          padding: '0.85rem',
                          borderRadius: '10px',
                          background: 'var(--seduc-bg-page)',
                          marginBottom: '0.9rem',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.71rem', fontWeight: 700, color: 'var(--seduc-text-muted)' }}>
                            DATA ORIGINAL
                          </div>
                          <div style={{ fontWeight: 700 }}>{req.originalDate}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.71rem', fontWeight: 700, color: 'var(--seduc-text-muted)' }}>
                            NOVA DATA PROPOSTA
                          </div>
                          <div style={{ fontWeight: 800, color: 'var(--seduc-blue-primary)' }}>
                            {req.proposedDate}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.71rem', fontWeight: 700, color: 'var(--seduc-text-muted)' }}>
                            TURNO / SALA
                          </div>
                          <div style={{ fontWeight: 600, fontSize: '0.83rem' }}>{req.proposedSlot}</div>
                        </div>
                      </div>

                      <div className="two-col-equal" style={{ marginBottom: '0.95rem' }}>
                        <div style={{ fontSize: '0.83rem' }}>
                          <strong>Justificativa Docente:</strong> {req.reason}
                        </div>
                        <div style={{ fontSize: '0.83rem' }}>
                          <strong>Plano Pedagógico:</strong> {req.pedagogicalPlan}
                        </div>
                      </div>

                      <div
                        style={{
                          paddingTop: '0.85rem',
                          borderTop: '1px solid var(--seduc-border-light)',
                          display: 'flex',
                          gap: '0.85rem',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          style={{ flex: 1, minWidth: '250px' }}
                          placeholder="Despacho / Parecer da Coordenação Pedagógica..."
                          value={
                            notesMap[req.id] !== undefined ? notesMap[req.id] : req.reviewerNote
                          }
                          onChange={(e) => handleNoteChange(req.id, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleDecision(req.id, 'Deferida')}
                        >
                          <CheckCircle2 size={16} /> Deferir Solicitação
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDecision(req.id, 'Indeferida')}
                        >
                          <XCircle size={16} /> Indeferir
                        </button>
                      </div>
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

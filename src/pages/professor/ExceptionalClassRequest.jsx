import React, { useState } from 'react';
import {
  CalendarClock,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRightLeft,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * ============================================================================
 * TELA PROFESSOR (DIÁRIO ELETRÔNICO): SOLICITAÇÃO DE AULAS EXCEPCIONAIS
 * ============================================================================
 * Atende ao requisito:
 * "Desenvolver a tela de solicitação de aulas excepcionais, permitindo o pedido
 * de reposição ou antecipação de aula."
 */
export default function ExceptionalClassRequest() {
  const {
    classes,
    disciplines,
    activeTeacherId,
    exceptionalRequests,
    createExceptionalRequest,
  } = useAcademic();

  const [form, setForm] = useState({
    type: 'Reposição de Aula',
    classId: classes[0]?.id || 'tur-1',
    disciplineName: disciplines[2]?.name || 'Desenvolvimento Web Front-End (React JS)',
    originalDate: '2026-11-18',
    proposedDate: '2026-11-28',
    proposedSlot: 'Sábado Letivo • 08:00 às 10:30 (Lab. Informática 02)',
    reason: '',
    pedagogicalPlan: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.reason.trim() || !form.pedagogicalPlan.trim()) return;

    createExceptionalRequest({
      ...form,
      teacherId: activeTeacherId,
    });

    setForm({
      ...form,
      reason: '',
      pedagogicalPlan: '',
    });
  };

  return (
    <div className="page-container">
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <CalendarClock size={15} />
            Diário Eletrônico SEDUC-SE • Requerimento Pedagógico
          </div>
          <h2>Solicitação de Aulas Excepcionais (Reposição ou Antecipação)</h2>
          <p>
            Envie pedidos fundamentados de <strong>Reposição de Aula</strong> ou{' '}
            <strong>Antecipação de Aula</strong> para análise e deferimento da Gestão Acadêmica.
          </p>
        </div>
      </div>

      <div className="two-col-grid">
        {/* Coluna 1: Formulário de Solicitação de Aula Excepcional */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <ArrowRightLeft size={19} color="#164194" />
                Novo Requerimento de Aula Excepcional
              </div>
              <div className="section-card-subtitle">
                Escolha a modalidade (Reposição ou Antecipação) e informe a nova data proposta
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <form onSubmit={handleSubmit} className="form-grid">
              {/* Seletor visual de Modalidade: Reposição vs Antecipação */}
              <div className="form-group col-12">
                <label className="form-label">Modalidade da Solicitação</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  {['Reposição de Aula', 'Antecipação de Aula'].map((typeOption) => {
                    const active = form.type === typeOption;
                    return (
                      <button
                        key={typeOption}
                        type="button"
                        onClick={() => setForm({ ...form, type: typeOption })}
                        style={{
                          padding: '0.7rem',
                          borderRadius: '8px',
                          border: `2px solid ${
                            active ? 'var(--seduc-blue-primary)' : 'var(--seduc-border)'
                          }`,
                          background: active ? 'var(--seduc-blue-soft)' : 'var(--seduc-bg-surface)',
                          color: active ? 'var(--seduc-blue-primary)' : 'var(--seduc-text-main)',
                          fontWeight: 700,
                          fontSize: '0.84rem',
                          cursor: 'pointer',
                        }}
                      >
                        {typeOption}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group col-12">
                <label className="form-label">Turma</label>
                <select
                  className="form-control"
                  value={form.classId}
                  onChange={(e) => setForm({ ...form, classId: e.target.value })}
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-12">
                <label className="form-label">Disciplina</label>
                <select
                  className="form-control"
                  value={form.disciplineName}
                  onChange={(e) => setForm({ ...form, disciplineName: e.target.value })}
                >
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.code} — {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-6">
                <label className="form-label">
                  Data da Aula Original <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={form.originalDate}
                  onChange={(e) => setForm({ ...form, originalDate: e.target.value })}
                  required
                />
              </div>

              <div className="form-group col-6">
                <label className="form-label">
                  Nova Data Proposta <span className="required">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={form.proposedDate}
                  onChange={(e) => setForm({ ...form, proposedDate: e.target.value })}
                  required
                />
              </div>

              <div className="form-group col-12">
                <label className="form-label">Horário / Turno e Espaço Físico Necessário</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.proposedSlot}
                  onChange={(e) => setForm({ ...form, proposedSlot: e.target.value })}
                  placeholder="Ex: Sábado Letivo • 08:00 às 10:30 (Lab. Informática 02)"
                  required
                />
              </div>

              <div className="form-group col-12">
                <label className="form-label">
                  Justificativa do Pedido <span className="required">*</span>
                </label>
                <textarea
                  className="form-control"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="Descreva o motivo institucional ou pedagógico da reposição/antecipação..."
                  required
                />
              </div>

              <div className="form-group col-12">
                <label className="form-label">
                  Plano de Aula / Tópicos que serão Ministrados <span className="required">*</span>
                </label>
                <textarea
                  className="form-control"
                  value={form.pedagogicalPlan}
                  onChange={(e) => setForm({ ...form, pedagogicalPlan: e.target.value })}
                  placeholder="Informe os conteúdos e atividades previstos para garantir a carga horária letiva..."
                  required
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={16} />
                  Enviar Solicitação para a Gestão Acadêmica
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Coluna 2: Acompanhamento das Solicitações e Pareceres da Gestão */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <CalendarClock size={19} color="#164194" />
                Histórico e Status das Solicitações ({exceptionalRequests.length})
              </div>
              <div className="section-card-subtitle">
                Acompanhe em tempo real o deferimento ou indeferimento pela Coordenação
              </div>
            </div>
          </div>

          <div
            className="section-card-body"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}
          >
            {exceptionalRequests.map((req) => {
              const isPending = req.status === 'Pendente';
              const isApproved = req.status === 'Deferida';

              return (
                <div
                  key={req.id}
                  style={{
                    border: '1px solid var(--seduc-border)',
                    borderLeft: `5px solid ${
                      isPending
                        ? 'var(--seduc-gold)'
                        : isApproved
                        ? 'var(--seduc-green)'
                        : 'var(--seduc-danger)'
                    }`,
                    borderRadius: '10px',
                    padding: '1rem',
                    background: 'var(--seduc-bg-surface)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                      <span className="badge badge-blue">{req.protocol}</span>
                      <span className="badge badge-neutral">{req.type}</span>
                    </div>

                    {isPending && (
                      <span className="badge badge-gold">
                        <Clock size={13} /> Aguardando Deferimento
                      </span>
                    )}
                    {isApproved && (
                      <span className="badge badge-green">
                        <CheckCircle2 size={13} /> Deferida pela Gestão
                      </span>
                    )}
                    {req.status === 'Indeferida' && (
                      <span className="badge badge-danger">
                        <XCircle size={13} /> Indeferida
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '0.96rem', marginTop: '0.45rem' }}>
                    {req.className} • {req.disciplineName}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--seduc-text-secondary)' }}>
                    Aula Original: <strong>{req.originalDate}</strong> → Nova Data:{' '}
                    <strong>{req.proposedDate}</strong> ({req.proposedSlot})
                  </p>

                  <p style={{ fontSize: '0.8rem', marginTop: '0.45rem' }}>
                    <strong>Justificativa:</strong> {req.reason}
                  </p>

                  {req.reviewerNote && (
                    <div
                      style={{
                        marginTop: '0.65rem',
                        padding: '0.55rem 0.75rem',
                        borderRadius: '6px',
                        background: isApproved
                          ? 'var(--seduc-green-light)'
                          : 'var(--seduc-danger-light)',
                        fontSize: '0.78rem',
                      }}
                    >
                      <strong>Parecer da Gestão Acadêmica:</strong> {req.reviewerNote}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

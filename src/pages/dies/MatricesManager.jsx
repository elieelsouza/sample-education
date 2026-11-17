import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  ShieldCheck,
  Clock,
  PlusCircle,
  AlertTriangle,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * ============================================================================
 * TELA ADM (DIES): CADASTRO E AUTORIZAÇÃO DE MATRIZES CURRICULARES
 * ============================================================================
 * Atende aos requisitos:
 * - "Criar telas para cadastro e manutenção de Cursos, Matrizes Curriculares e Disciplinas."
 * - "DIES - Responsável por criar portarias e autorizar criação de novas matrizes curriculares"
 */
export default function MatricesManager() {
  const {
    matrices,
    courses,
    disciplines,
    ordinances,
    addMatrix,
    toggleMatrixAuthorization,
  } = useAcademic();

  const [matrixForm, setMatrixForm] = useState({
    code: 'MATRIZ-CTDS-2026.2',
    name: '',
    courseId: courses[0]?.id || 'cur-1',
    year: 2026,
    ordinanceNumber: ordinances[0]?.number || 'Portaria SEDUC/DIES nº 114/2026',
    authorizedByDies: true,
    disciplineIds: disciplines.slice(0, 4).map((d) => d.id),
  });

  const handleToggleDiscInForm = (discId) => {
    setMatrixForm((prev) => {
      const exists = prev.disciplineIds.includes(discId);
      const nextIds = exists
        ? prev.disciplineIds.filter((id) => id !== discId)
        : [...prev.disciplineIds, discId];
      return { ...prev, disciplineIds: nextIds };
    });
  };

  const handleCreateMatrix = (e) => {
    e.preventDefault();
    if (!matrixForm.code.trim() || !matrixForm.name.trim() || matrixForm.disciplineIds.length === 0) {
      return;
    }
    addMatrix(matrixForm);
    setMatrixForm({
      ...matrixForm,
      code: `MATRIZ-SEDUC-${Math.floor(100 + Math.random() * 899)}`,
      name: '',
    });
  };

  return (
    <div className="page-container">
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <Layers size={15} />
            Homologação Curricular • DIES / SEDUC Sergipe
          </div>
          <h2>Matrizes Curriculares e Autorização Normativa</h2>
          <p>
            Monte a estrutura curricular dos cursos e emita a autorização da DIES para liberar sua
            implementação nas unidades escolares pela Gestão Acadêmica.
          </p>
        </div>
      </div>

      <div className="two-col-grid">
        {/* Formulário de Criação de Nova Matriz Curricular */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <PlusCircle size={19} color="#164194" />
                Nova Matriz Curricular
              </div>
              <div className="section-card-subtitle">
                Associe o curso, a portaria DIES e selecione os componentes curriculares
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <form onSubmit={handleCreateMatrix} className="form-grid">
              <div className="form-group col-7">
                <label className="form-label">
                  Código da Matriz <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={matrixForm.code}
                  onChange={(e) =>
                    setMatrixForm({ ...matrixForm, code: e.target.value.toUpperCase() })
                  }
                  required
                />
              </div>

              <div className="form-group col-5">
                <label className="form-label">Ano de Vigência</label>
                <input
                  type="number"
                  className="form-control"
                  value={matrixForm.year}
                  onChange={(e) => setMatrixForm({ ...matrixForm, year: e.target.value })}
                  required
                />
              </div>

              <div className="form-group col-12">
                <label className="form-label">
                  Título Descritivo da Matriz <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={matrixForm.name}
                  onChange={(e) => setMatrixForm({ ...matrixForm, name: e.target.value })}
                  placeholder="Ex: Matriz Curricular 2026 — Ensino Médio Integral e Técnico"
                  required
                />
              </div>

              <div className="form-group col-12">
                <label className="form-label">Curso Vinculado</label>
                <select
                  className="form-control"
                  value={matrixForm.courseId}
                  onChange={(e) => setMatrixForm({ ...matrixForm, courseId: e.target.value })}
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-12">
                <label className="form-label">Portaria de Autorização DIES</label>
                <select
                  className="form-control"
                  value={matrixForm.ordinanceNumber}
                  onChange={(e) =>
                    setMatrixForm({ ...matrixForm, ordinanceNumber: e.target.value })
                  }
                >
                  {ordinances.map((ord) => (
                    <option key={ord.id} value={ord.number}>
                      {ord.number}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seleção de Disciplinas da Matriz */}
              <div className="form-group col-12">
                <label className="form-label">
                  Disciplinas que compõem a Matriz ({matrixForm.disciplineIds.length} selecionadas)
                </label>
                <div
                  style={{
                    border: '1px solid var(--seduc-border)',
                    borderRadius: '8px',
                    padding: '0.65rem',
                    maxHeight: '210px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                  }}
                >
                  {disciplines.map((disc) => {
                    const checked = matrixForm.disciplineIds.includes(disc.id);
                    return (
                      <label
                        key={disc.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.4rem 0.55rem',
                          borderRadius: '6px',
                          background: checked ? 'var(--seduc-blue-soft)' : 'transparent',
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleToggleDiscInForm(disc.id)}
                          />
                          <strong>{disc.code}</strong> — {disc.name}
                        </span>
                        <span className="badge badge-neutral">{disc.weeklyHours}h/sem</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="form-group col-12">
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={matrixForm.authorizedByDies}
                    onChange={(e) =>
                      setMatrixForm({ ...matrixForm, authorizedByDies: e.target.checked })
                    }
                  />
                  Já publicar como Homologada / Autorizada pela DIES
                </label>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <ShieldCheck size={17} />
                  Salvar e Registrar Matriz Curricular
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Lista de Matrizes Curriculares e Painel de Homologação DIES */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <Layers size={19} color="#164194" />
                Matrizes Curriculares Cadastradas ({matrices.length})
              </div>
              <div className="section-card-subtitle">
                Autorize ou suspenda matrizes curriculares com efeito imediato para a Gestão Acadêmica
              </div>
            </div>
          </div>

          <div
            className="section-card-body"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {matrices.map((mat) => {
              const course = courses.find((c) => c.id === mat.courseId);
              const matDisciplines = disciplines.filter((d) => mat.disciplineIds.includes(d.id));
              const totalWeeklyHours = matDisciplines.reduce((acc, d) => acc + d.weeklyHours, 0);
              const totalAnnualHours = matDisciplines.reduce((acc, d) => acc + d.annualHours, 0);

              return (
                <div
                  key={mat.id}
                  style={{
                    border: '1px solid var(--seduc-border)',
                    borderLeft: `5px solid ${
                      mat.authorizedByDies ? 'var(--seduc-green)' : 'var(--seduc-gold)'
                    }`,
                    borderRadius: '10px',
                    padding: '1.1rem',
                    background: 'var(--seduc-bg-surface)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span className="badge badge-blue">{mat.code}</span>
                        {mat.authorizedByDies ? (
                          <span className="badge badge-green">
                            <CheckCircle2 size={13} /> Autorizada pela DIES
                          </span>
                        ) : (
                          <span className="badge badge-gold">
                            <AlertTriangle size={13} /> Aguardando Homologação DIES
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '1rem', marginTop: '0.4rem' }}>{mat.name}</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--seduc-text-secondary)' }}>
                        Curso: <strong>{course ? course.name : 'Curso Geral'}</strong> • Ato:{' '}
                        <strong>{mat.ordinanceNumber}</strong>
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`btn btn-sm ${
                        mat.authorizedByDies ? 'btn-outline' : 'btn-gold'
                      }`}
                      onClick={() =>
                        toggleMatrixAuthorization(mat.id, ordinances[0]?.number)
                      }
                    >
                      <ShieldCheck size={15} />
                      {mat.authorizedByDies
                        ? 'Revogar Homologação'
                        : 'Autorizar Criação de Matriz (DIES)'}
                    </button>
                  </div>

                  {/* Disciplinas da Matriz */}
                  <div
                    style={{
                      marginTop: '0.85rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px dashed var(--seduc-border)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        color: 'var(--seduc-text-secondary)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span>COMPONENTES CURRICULARES ({matDisciplines.length})</span>
                      <span>
                        <Clock size={12} style={{ display: 'inline' }} /> Total:{' '}
                        {totalWeeklyHours}h/semana ({totalAnnualHours}h/ano)
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {matDisciplines.map((d) => (
                        <span key={d.id} className="badge badge-neutral">
                          {d.code} • {d.name} ({d.weeklyHours}h)
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

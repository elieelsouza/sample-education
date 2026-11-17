import React, { useState } from 'react';
import {
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  PlusCircle,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';
import StatCard from '../../components/common/StatCard';

/**
 * ============================================================================
 * TELA ADM (GESTÃO ACADÊMICA): DISTRIBUIÇÃO DE PROFESSORES & CARGA HORÁRIA
 * ============================================================================
 * Atende ao requisito:
 * "...a distribuição de professor (orquestrando a carga horária para que não fique ocioso)."
 */
export default function TeacherAllocation() {
  const {
    teachersWithWorkload,
    classes,
    disciplines,
    allocateTeacherToSchedule,
    removeScheduleItem,
  } = useAcademic();

  // Seleciona por padrão o primeiro professor que possua carga horária ociosa
  const defaultIdleTeacher =
    teachersWithWorkload.find((t) => t.idleHours > 0) || teachersWithWorkload[0];

  const [allocForm, setAllocForm] = useState({
    teacherId: defaultIdleTeacher?.id || 'prof-2',
    classId: classes[0]?.id || 'tur-1',
    disciplineId: disciplines[1]?.id || 'disc-2',
    day: 'Quarta-feira',
    slot: '10:50 - 12:30',
  });

  // Indicadores consolidados de carga horária da rede
  const totalContracted = teachersWithWorkload.reduce(
    (sum, t) => sum + t.contractedRegencyHours,
    0
  );
  const totalAllocated = teachersWithWorkload.reduce((sum, t) => sum + t.allocatedHours, 0);
  const totalIdle = teachersWithWorkload.reduce((sum, t) => sum + t.idleHours, 0);
  const teachersWithIdleCount = teachersWithWorkload.filter((t) => t.idleHours > 0).length;

  const handleAllocate = (e) => {
    e.preventDefault();
    allocateTeacherToSchedule(allocForm.classId, {
      teacherId: allocForm.teacherId,
      disciplineId: allocForm.disciplineId,
      day: allocForm.day,
      slot: allocForm.slot,
    });
  };

  return (
    <div className="page-container">
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <UserCheck size={15} />
            Gestão Acadêmica • Orquestração Docente Anti-Ociosidade
          </div>
          <h2>Distribuição de Professores e Orquestração de Carga Horária</h2>
          <p>
            Monitore em tempo real a jornada contratual em regência de cada professor e distribua as
            turmas para zerar horas ociosas na rede estadual.
          </p>
        </div>
        {totalIdle === 0 ? (
          <span className="badge badge-green">
            <CheckCircle2 size={14} /> 100% da Carga Horária Otimizada (Zero Ociosidade)
          </span>
        ) : (
          <span className="badge badge-gold">
            <AlertCircle size={14} /> {totalIdle}h semanais ociosas aguardando alocação
          </span>
        )}
      </div>

      {/* KPIs de Carga Horária */}
      <div className="stats-grid">
        <StatCard
          label="Carga Contratada em Regência"
          value={`${totalContracted}h/sem`}
          subtitle="Soma da jornada em sala dos docentes"
          icon={Clock}
          variant="blue"
        />
        <StatCard
          label="Carga Horária Alocada"
          value={`${totalAllocated}h/sem`}
          subtitle="Horas efetivamente distribuídas em turmas"
          icon={CheckCircle2}
          variant="green"
        />
        <StatCard
          label="Saldo Ocioso na Rede"
          value={`${totalIdle}h/sem`}
          subtitle={
            totalIdle === 0
              ? 'Nenhum professor ocioso!'
              : `${teachersWithIdleCount} docente(s) com carga incompleta`
          }
          icon={AlertCircle}
          variant={totalIdle > 0 ? 'gold' : 'green'}
        />
      </div>

      <div className="two-col-grid">
        {/* Painel de Alocação Rápida para Eliminar Ociosidade */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <Sparkles size={19} color="#164194" />
                Orquestrador de Carga Horária (Alocar Professor)
              </div>
              <div className="section-card-subtitle">
                Atribua uma turma e disciplina ao professor para completar sua jornada contratual
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <form onSubmit={handleAllocate} className="form-grid">
              <div className="form-group col-12">
                <label className="form-label">
                  Selecionar Professor (Priorize docentes com horas ociosas)
                </label>
                <select
                  className="form-control"
                  value={allocForm.teacherId}
                  onChange={(e) => setAllocForm({ ...allocForm, teacherId: e.target.value })}
                >
                  {teachersWithWorkload.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — Alocado: {t.allocatedHours}h/{t.contractedRegencyHours}h (
                      {t.idleHours > 0 ? `${t.idleHours}h OCIOSAS` : 'Carga Completa'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-12">
                <label className="form-label">Turma para Alocação</label>
                <select
                  className="form-control"
                  value={allocForm.classId}
                  onChange={(e) => setAllocForm({ ...allocForm, classId: e.target.value })}
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-12">
                <label className="form-label">Disciplina (CH Semanal)</label>
                <select
                  className="form-control"
                  value={allocForm.disciplineId}
                  onChange={(e) => setAllocForm({ ...allocForm, disciplineId: e.target.value })}
                >
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.code} — {d.name} (+{d.weeklyHours}h semanais)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-6">
                <label className="form-label">Dia da Semana</label>
                <select
                  className="form-control"
                  value={allocForm.day}
                  onChange={(e) => setAllocForm({ ...allocForm, day: e.target.value })}
                >
                  <option value="Segunda-feira">Segunda-feira</option>
                  <option value="Terça-feira">Terça-feira</option>
                  <option value="Quarta-feira">Quarta-feira</option>
                  <option value="Quinta-feira">Quinta-feira</option>
                  <option value="Sexta-feira">Sexta-feira</option>
                </select>
              </div>

              <div className="form-group col-6">
                <label className="form-label">Horário</label>
                <select
                  className="form-control"
                  value={allocForm.slot}
                  onChange={(e) => setAllocForm({ ...allocForm, slot: e.target.value })}
                >
                  <option value="07:00 - 08:40">07:00 - 08:40</option>
                  <option value="08:55 - 10:35">08:55 - 10:35</option>
                  <option value="10:50 - 12:30">10:50 - 12:30</option>
                  <option value="13:30 - 15:10">13:30 - 15:10</option>
                  <option value="15:20 - 17:00">15:20 - 17:00</option>
                </select>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <PlusCircle size={17} />
                  Alocar Professor e Atualizar Carga Horária
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Painel Visual de Quadro Docente e Medidores de Ociosidade */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <UserCheck size={19} color="#164194" />
                Mapa de Ocupação Docente da Rede ({teachersWithWorkload.length} Professores)
              </div>
              <div className="section-card-subtitle">
                Acompanhe quem está com carga horária ideal, ociosa ou acima do limite
              </div>
            </div>
          </div>

          <div
            className="section-card-body"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
          >
            {teachersWithWorkload.map((teacher) => {
              const isIdle = teacher.workloadStatus === 'IDLE';
              const isOptimal = teacher.workloadStatus === 'OPTIMAL';
              const isOverload = teacher.workloadStatus === 'OVERLOAD';

              return (
                <div
                  key={teacher.id}
                  style={{
                    border: '1px solid var(--seduc-border)',
                    borderLeft: `5px solid ${
                      isOptimal
                        ? 'var(--seduc-green)'
                        : isIdle
                        ? 'var(--seduc-gold)'
                        : 'var(--seduc-danger)'
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="badge badge-blue">{teacher.registration}</span>
                        {isOptimal && (
                          <span className="badge badge-green">
                            <CheckCircle2 size={12} /> Carga Completa (Sem Ociosidade)
                          </span>
                        )}
                        {isIdle && (
                          <span className="badge badge-gold">
                            <AlertCircle size={12} /> Carga Ociosa: faltam {teacher.idleHours}h/sem
                          </span>
                        )}
                        {isOverload && (
                          <span className="badge badge-danger">
                            <AlertCircle size={12} /> Sobrecarga (+{teacher.overloadHours}h acima)
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '1rem', marginTop: '0.35rem' }}>{teacher.name}</h3>
                      <p style={{ fontSize: '0.78rem', color: 'var(--seduc-text-secondary)' }}>
                        Habilitação: <strong>{teacher.specialty}</strong>
                      </p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--seduc-text-muted)' }}>
                        Regência Alocada / Contratada
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                        {teacher.allocatedHours}h / {teacher.contractedRegencyHours}h
                      </div>
                    </div>
                  </div>

                  {/* Barra de Progresso da Carga Horária */}
                  <div className="workload-meter" style={{ marginTop: '0.65rem' }}>
                    <div
                      className={`workload-meter-fill ${
                        isOptimal ? 'optimal' : isIdle ? 'idle' : 'overload'
                      }`}
                      style={{ width: `${teacher.occupancyPercent}%` }}
                    />
                  </div>

                  {/* Turmas/Horários Alocados para este Professor */}
                  <div style={{ marginTop: '0.85rem' }}>
                    <div
                      style={{
                        fontSize: '0.73rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: 'var(--seduc-text-secondary)',
                        marginBottom: '0.45rem',
                      }}
                    >
                      Turmas Distribuídas ({teacher.allocations.length} alocações):
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {teacher.allocations.map((aloc) => (
                        <div
                          key={aloc.scheduleId}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.4rem 0.65rem',
                            borderRadius: '6px',
                            background: 'var(--seduc-bg-page)',
                            fontSize: '0.78rem',
                          }}
                        >
                          <span>
                            <strong>{aloc.classCode}</strong> • {aloc.disciplineName} ({aloc.day},{' '}
                            {aloc.slot})
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span className="badge badge-blue">{aloc.weeklyHours}h/sem</span>
                            <button
                              type="button"
                              className="btn btn-outline btn-sm"
                              style={{ padding: '0.2rem 0.4rem' }}
                              onClick={() => removeScheduleItem(aloc.classId, aloc.scheduleId)}
                              title="Desalocar esta turma"
                            >
                              <Trash2 size={12} />
                            </button>
                          </span>
                        </div>
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

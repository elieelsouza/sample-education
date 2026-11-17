import React, { useState } from 'react';
import {
  UsersRound,
  PlusCircle,
  Clock,
  School,
  Trash2,
  DoorOpen,
  Calendar,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * ============================================================================
 * TELA ADM (GESTÃO ACADÊMICA): CRIAÇÃO DE TURMAS, LIMITE DE VAGAS E HORÁRIOS
 * ============================================================================
 * Atende ao requisito:
 * "Desenvolver formulários para a criação de turmas, definição de limite de vagas e horários."
 */
export default function ClassesManager() {
  const {
    classes,
    schools,
    matrices,
    disciplines,
    teachers,
    addClass,
    deleteClass,
    allocateTeacherToSchedule,
    removeScheduleItem,
  } = useAcademic();

  const authorizedMatrices = matrices.filter((m) => m.authorizedByDies);

  // Estado do formulário de criação de nova turma
  const [classForm, setClassForm] = useState({
    code: '',
    name: '',
    schoolId: schools[0]?.id || 'esc-1',
    matrixId: authorizedMatrices[0]?.id || 'mat-1',
    shift: 'Integral (07:00 às 16:20)',
    room: '',
    maxSeats: 40,
    enrolledCount: 30,
  });

  // Estado rápido para adicionar horário a uma turma existente
  const [slotForm, setSlotForm] = useState({
    classId: classes[0]?.id || 'tur-1',
    day: 'Segunda-feira',
    slot: '07:00 - 08:40',
    disciplineId: disciplines[0]?.id || 'disc-1',
    teacherId: teachers[0]?.id || 'prof-1',
  });

  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!classForm.code.trim() || !classForm.name.trim()) return;
    addClass(classForm);
    setClassForm({
      ...classForm,
      code: '',
      name: '',
      room: '',
    });
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!slotForm.classId) return;
    allocateTeacherToSchedule(slotForm.classId, {
      day: slotForm.day,
      slot: slotForm.slot,
      disciplineId: slotForm.disciplineId,
      teacherId: slotForm.teacherId,
    });
  };

  return (
    <div className="page-container">
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <UsersRound size={15} />
            Gestão Acadêmica • Organização Escolar
          </div>
          <h2>Criação de Turmas, Limite de Vagas e Grade de Horários</h2>
          <p>
            Abra turmas vinculadas às matrizes autorizadas pela DIES, defina a capacidade máxima de
            matrículas por sala e estruture os horários semanais.
          </p>
        </div>
      </div>

      <div className="two-col-equal">
        {/* Formulário 1: Criação de Nova Turma e Limite de Vagas */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <PlusCircle size={19} color="#164194" />
                Formulário de Criação de Turma e Vagas
              </div>
              <div className="section-card-subtitle">
                Configure código, turno, sala, matriz curricular e limite de vagas da turma
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <form onSubmit={handleCreateClass} className="form-grid">
              <div className="form-group col-4">
                <label className="form-label">
                  Código da Turma <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={classForm.code}
                  onChange={(e) =>
                    setClassForm({ ...classForm, code: e.target.value.toUpperCase() })
                  }
                  placeholder="Ex: 2º ANO B - CTDS"
                  required
                />
              </div>

              <div className="form-group col-8">
                <label className="form-label">
                  Descrição da Turma <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={classForm.name}
                  onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                  placeholder="Ex: 2ª Série B — Técnico em Desenvolvimento de Sistemas"
                  required
                />
              </div>

              <div className="form-group col-12">
                <label className="form-label">Unidade Escolar (SEDUC-SE)</label>
                <select
                  className="form-control"
                  value={classForm.schoolId}
                  onChange={(e) => setClassForm({ ...classForm, schoolId: e.target.value })}
                >
                  {schools.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-12">
                <label className="form-label">Matriz Curricular Homologada (DIES)</label>
                <select
                  className="form-control"
                  value={classForm.matrixId}
                  onChange={(e) => setClassForm({ ...classForm, matrixId: e.target.value })}
                >
                  {authorizedMatrices.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.code} — {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-6">
                <label className="form-label">Turno de Funcionamento</label>
                <select
                  className="form-control"
                  value={classForm.shift}
                  onChange={(e) => setClassForm({ ...classForm, shift: e.target.value })}
                >
                  <option value="Integral (07:00 às 16:20)">Integral (07:00 às 16:20)</option>
                  <option value="Matutino (07:00 às 12:20)">Matutino (07:00 às 12:20)</option>
                  <option value="Vespertino (13:00 às 18:20)">Vespertino (13:00 às 18:20)</option>
                  <option value="Noturno (18:50 às 22:30)">Noturno (18:50 às 22:30)</option>
                </select>
              </div>

              <div className="form-group col-6">
                <label className="form-label">Sala / Laboratório</label>
                <input
                  type="text"
                  className="form-control"
                  value={classForm.room}
                  onChange={(e) => setClassForm({ ...classForm, room: e.target.value })}
                  placeholder="Ex: Bloco B • Sala 12"
                  required
                />
              </div>

              <div className="form-group col-6">
                <label className="form-label">
                  Limite Máximo de Vagas <span className="required">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={classForm.maxSeats}
                  onChange={(e) => setClassForm({ ...classForm, maxSeats: e.target.value })}
                  min={15}
                  max={60}
                  required
                />
              </div>

              <div className="form-group col-6">
                <label className="form-label">Alunos Já Matriculados</label>
                <input
                  type="number"
                  className="form-control"
                  value={classForm.enrolledCount}
                  onChange={(e) => setClassForm({ ...classForm, enrolledCount: e.target.value })}
                  min={0}
                  max={classForm.maxSeats}
                  required
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <PlusCircle size={17} />
                  Criar Turma no Sistema Acadêmico
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Formulário 2: Definição de Horários Semanais da Turma */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <Clock size={19} color="#164194" />
                Definir Horários de Aula na Grade da Turma
              </div>
              <div className="section-card-subtitle">
                Adicione tempos de aula (dia, faixa de horário, disciplina e docente)
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <form onSubmit={handleAddSlot} className="form-grid">
              <div className="form-group col-12">
                <label className="form-label">Selecionar Turma Destino</label>
                <select
                  className="form-control"
                  value={slotForm.classId}
                  onChange={(e) => setSlotForm({ ...slotForm, classId: e.target.value })}
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.code} — {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-6">
                <label className="form-label">Dia da Semana</label>
                <select
                  className="form-control"
                  value={slotForm.day}
                  onChange={(e) => setSlotForm({ ...slotForm, day: e.target.value })}
                >
                  <option value="Segunda-feira">Segunda-feira</option>
                  <option value="Terça-feira">Terça-feira</option>
                  <option value="Quarta-feira">Quarta-feira</option>
                  <option value="Quinta-feira">Quinta-feira</option>
                  <option value="Sexta-feira">Sexta-feira</option>
                </select>
              </div>

              <div className="form-group col-6">
                <label className="form-label">Bloco de Horário (Tempos Geminados)</label>
                <select
                  className="form-control"
                  value={slotForm.slot}
                  onChange={(e) => setSlotForm({ ...slotForm, slot: e.target.value })}
                >
                  <option value="07:00 - 08:40">1º e 2º Tempo (07:00 - 08:40)</option>
                  <option value="08:55 - 10:35">3º e 4º Tempo (08:55 - 10:35)</option>
                  <option value="10:50 - 12:30">5º e 6º Tempo (10:50 - 12:30)</option>
                  <option value="13:30 - 15:10">7º e 8º Tempo (13:30 - 15:10)</option>
                  <option value="15:20 - 17:00">9º e 10º Tempo (15:20 - 17:00)</option>
                </select>
              </div>

              <div className="form-group col-12">
                <label className="form-label">Componente Curricular (Disciplina)</label>
                <select
                  className="form-control"
                  value={slotForm.disciplineId}
                  onChange={(e) => setSlotForm({ ...slotForm, disciplineId: e.target.value })}
                >
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.code} — {d.name} ({d.weeklyHours}h/semana)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-12">
                <label className="form-label">Professor Regente</label>
                <select
                  className="form-control"
                  value={slotForm.teacherId}
                  onChange={(e) => setSlotForm({ ...slotForm, teacherId: e.target.value })}
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — {t.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <Calendar size={17} />
                  Inserir Horário na Grade da Turma
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Listagem detalhada das Turmas, Ocupação de Vagas e Grade Horária */}
      <section className="section-card">
        <div className="section-card-header">
          <div>
            <div className="section-card-title">
              <School size={19} color="#164194" />
              Turmas Ativas, Controle de Vagas e Quadro de Horários ({classes.length})
            </div>
            <div className="section-card-subtitle">
              Acompanhe o limite de vagas por turma e os horários definidos pela secretaria escolar
            </div>
          </div>
        </div>

        <div
          className="section-card-body"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}
        >
          {classes.map((cls) => {
            const school = schools.find((s) => s.id === cls.schoolId);
            const matrix = matrices.find((m) => m.id === cls.matrixId);
            const availableSeats = Math.max(0, cls.maxSeats - cls.enrolledCount);
            const seatPercent = Math.min(100, Math.round((cls.enrolledCount / cls.maxSeats) * 100));

            return (
              <div
                key={cls.id}
                style={{
                  border: '1px solid var(--seduc-border)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  background: 'var(--seduc-bg-surface)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-blue">{cls.code}</span>
                      <span className="badge badge-neutral">{cls.shift}</span>
                      <span className="badge badge-green">
                        <DoorOpen size={12} /> {cls.room}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', marginTop: '0.4rem' }}>{cls.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--seduc-text-secondary)' }}>
                      Unidade: <strong>{school?.name}</strong> • Matriz:{' '}
                      <strong>{matrix?.code}</strong>
                    </p>
                  </div>

                  {/* Indicador de Limite de Vagas */}
                  <div
                    style={{
                      minWidth: '240px',
                      background: 'var(--seduc-bg-page)',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '8px',
                      border: '1px solid var(--seduc-border-light)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.77rem',
                        fontWeight: 700,
                      }}
                    >
                      <span>Ocupação: {cls.enrolledCount}/{cls.maxSeats} vagas</span>
                      <span style={{ color: 'var(--seduc-green-dark)' }}>
                        {availableSeats} disponíveis
                      </span>
                    </div>
                    <div className="workload-meter">
                      <div
                        className="workload-meter-fill optimal"
                        style={{ width: `${seatPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Grade de Horários da Turma */}
                <div style={{ marginTop: '1rem' }} className="table-responsive">
                  <table className="seduc-table">
                    <thead>
                      <tr>
                        <th>Dia da Semana</th>
                        <th>Horário</th>
                        <th>Disciplina</th>
                        <th>Professor Alocado</th>
                        <th>CH</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cls.schedule.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', color: 'var(--seduc-text-muted)' }}>
                            Nenhum horário cadastrado para esta turma. Utilize o formulário acima.
                          </td>
                        </tr>
                      ) : (
                        cls.schedule.map((item) => {
                          const disc = disciplines.find((d) => d.id === item.disciplineId);
                          const prof = teachers.find((t) => t.id === item.teacherId);
                          return (
                            <tr key={item.id}>
                              <td>
                                <strong>{item.day}</strong>
                              </td>
                              <td>
                                <span className="badge badge-blue">{item.slot}</span>
                              </td>
                              <td>{disc ? `${disc.code} — ${disc.name}` : 'Disciplina'}</td>
                              <td>{prof ? prof.name : 'Docente não definido'}</td>
                              <td>{disc ? `${disc.weeklyHours}h/sem` : '4h'}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-outline btn-sm"
                                  onClick={() => removeScheduleItem(cls.id, item.id)}
                                  title="Remover este horário"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => deleteClass(cls.id)}
                  >
                    <Trash2 size={14} /> Excluir Turma
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

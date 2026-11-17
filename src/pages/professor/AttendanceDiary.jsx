import React, { useState, useMemo } from 'react';
import {
  ClipboardCheck,
  CheckCheck,
  BookOpen,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  History,
  Search,
  LayoutGrid,
  List,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * ============================================================================
 * TELA PROFESSOR (DIÁRIO ELETRÔNICO): CHAMADA ÁGIL (CARDS RÁPIDOS OU TABELA)
 * ============================================================================
 */
export default function AttendanceDiary() {
  const {
    classes,
    disciplines,
    students,
    diaryLogs,
    activeTeacherId,
    registerAttendanceAndTopic,
  } = useAcademic();

  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || 'tur-1');
  const [selectedDiscId, setSelectedDiscId] = useState(disciplines[2]?.id || 'disc-3');
  const [lessonDate, setLessonDate] = useState(new Date().toISOString().slice(0, 10));
  const [lessonsCount, setLessonsCount] = useState(2);
  const [topic, setTopic] = useState('');
  const [methodology, setMethodology] = useState(
    'Aula prática guiada em laboratório com resolução de estudos de caso.'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [displayMode, setDisplayMode] = useState('CARDS'); // 'CARDS' | 'TABLE'

  const [attendanceMap, setAttendanceMap] = useState({});

  const classStudents = useMemo(() => {
    return students.filter((s) => s.classId === selectedClassId);
  }, [students, selectedClassId]);

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return classStudents;
    const q = searchTerm.toLowerCase();
    return classStudents.filter(
      (s) => s.name.toLowerCase().includes(q) || s.enrollment.toLowerCase().includes(q)
    );
  }, [classStudents, searchTerm]);

  const getStudentStatus = (studentId) => attendanceMap[studentId] || 'P';

  const handleSetStatus = (studentId, status) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAllPresent = () => {
    const nextMap = {};
    classStudents.forEach((stu) => {
      nextMap[stu.id] = 'P';
    });
    setAttendanceMap(nextMap);
  };

  const handleSaveDiary = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    registerAttendanceAndTopic({
      date: lessonDate,
      classId: selectedClassId,
      disciplineId: selectedDiscId,
      teacherId: activeTeacherId,
      lessonsCount,
      topic,
      methodology,
      attendanceMap,
    });

    setTopic('');
    setAttendanceMap({});
  };

  const presentToday = classStudents.filter((s) => getStudentStatus(s.id) !== 'F').length;
  const absentToday = classStudents.filter((s) => getStudentStatus(s.id) === 'F').length;

  return (
    <div className="page-container">
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <ClipboardCheck size={14} />
            Diário Eletrônico • Portal EducaSE
          </div>
          <h2>Registro Ágil de Frequência por Chamada e Conteúdo Ministrado</h2>
          <p>
            Alterne entre o modo de <strong>Cartões Rápidos (Toque Único)</strong> ou{' '}
            <strong>Lista Compacta</strong> para realizar a chamada e registrar os tópicos do dia.
          </p>
        </div>

        <div className="subtabs-bar">
          <button
            type="button"
            className={`subtab-btn ${displayMode === 'CARDS' ? 'active' : ''}`}
            onClick={() => setDisplayMode('CARDS')}
          >
            <LayoutGrid size={14} />
            Chamada em Cards
          </button>
          <button
            type="button"
            className={`subtab-btn ${displayMode === 'TABLE' ? 'active' : ''}`}
            onClick={() => setDisplayMode('TABLE')}
          >
            <List size={14} />
            Lista Compacta
          </button>
        </div>
      </div>

      {/* Configuração da Aula */}
      <section className="section-card">
        <div className="section-card-body">
          <div className="form-grid">
            <div className="form-group col-4">
              <label className="form-label">Turma</label>
              <select
                className="form-control"
                value={selectedClassId}
                onChange={(e) => {
                  setSelectedClassId(e.target.value);
                  setAttendanceMap({});
                }}
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-4">
              <label className="form-label">Disciplina</label>
              <select
                className="form-control"
                value={selectedDiscId}
                onChange={(e) => setSelectedDiscId(e.target.value)}
              >
                {disciplines.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.code} — {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-2">
              <label className="form-label">Data da Aula</label>
              <input
                type="date"
                className="form-control"
                value={lessonDate}
                onChange={(e) => setLessonDate(e.target.value)}
              />
            </div>

            <div className="form-group col-2">
              <label className="form-label">Quantidade de Tempos</label>
              <select
                className="form-control"
                value={lessonsCount}
                onChange={(e) => setLessonsCount(Number(e.target.value))}
              >
                <option value={1}>1 Tempo (50m)</option>
                <option value={2}>2 Tempos Geminados</option>
                <option value={3}>3 Tempos</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <form onSubmit={handleSaveDiary} className="two-col-grid">
        {/* Coluna 1: Tópicos Ministrados */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <BookOpen size={19} />
                Tópicos Ministrados e Metodologia
              </div>
              <div className="section-card-subtitle">
                Resumo da chamada: {presentToday} presentes • {absentToday} ausentes
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <div className="form-grid">
              <div className="form-group col-12">
                <label className="form-label">
                  Conteúdo Programático Ministrado <span className="required">*</span>
                </label>
                <textarea
                  className="form-control"
                  style={{ minHeight: '115px' }}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Descreva os tópicos trabalhados na aula de hoje..."
                  required
                />
              </div>

              <div className="form-group col-12">
                <label className="form-label">Estratégia Metodológica / Recursos</label>
                <textarea
                  className="form-control"
                  value={methodology}
                  onChange={(e) => setMethodology(e.target.value)}
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <CheckCircle2 size={18} />
                  Registrar Frequência e Tópicos no Diário
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Coluna 2: Chamada por Cards Rápidos ou Tabela */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <ClipboardCheck size={19} />
                Chamada da Turma ({classStudents.length} Estudantes)
              </div>
              <div className="section-card-subtitle">
                P = Presente | F = Falta | FJ = Falta Justificada
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleMarkAllPresent}
            >
              <CheckCheck size={15} />
              Todos Presentes
            </button>
          </div>

          <div className="section-card-body">
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search
                size={15}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--seduc-text-muted)',
                }}
              />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '2.1rem' }}
                placeholder="Pesquisar estudante por nome ou matrícula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {displayMode === 'CARDS' ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(235px, 1fr))',
                  gap: '0.75rem',
                }}
              >
                {filteredStudents.map((stu) => {
                  const currentStatus = getStudentStatus(stu.id);
                  const attendancePercent = Math.round(
                    ((stu.totalClassesHeld - stu.absences) / stu.totalClassesHeld) * 100
                  );
                  const isRisk = attendancePercent < 78;

                  return (
                    <div
                      key={stu.id}
                      style={{
                        border: `1.5px solid ${
                          currentStatus === 'F'
                            ? 'var(--seduc-danger)'
                            : currentStatus === 'FJ'
                            ? 'var(--seduc-gold)'
                            : 'var(--seduc-border-light)'
                        }`,
                        borderRadius: '12px',
                        padding: '0.85rem',
                        background:
                          currentStatus === 'F'
                            ? 'var(--seduc-danger-light)'
                            : 'var(--seduc-bg-page)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.6rem',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.87rem' }}>{stu.name}</div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.72rem',
                            color: 'var(--seduc-text-muted)',
                            marginTop: '0.2rem',
                          }}
                        >
                          <span>Mat: {stu.enrollment}</span>
                          <span
                            style={{
                              fontWeight: 700,
                              color: isRisk ? 'var(--seduc-danger)' : 'var(--seduc-green-dark)',
                            }}
                          >
                            {attendancePercent}% freq.
                          </span>
                        </div>
                      </div>

                      <div className="attendance-toggle-group" style={{ width: '100%' }}>
                        {['P', 'F', 'FJ'].map((st) => (
                          <button
                            key={st}
                            type="button"
                            style={{ flex: 1 }}
                            className={`att-btn ${
                              currentStatus === st ? `active-${st}` : ''
                            }`}
                            onClick={() => handleSetStatus(stu.id, st)}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="seduc-table">
                  <thead>
                    <tr>
                      <th>Estudante</th>
                      <th>Assiduidade</th>
                      <th style={{ textAlign: 'right' }}>Presença</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((stu) => {
                      const currentStatus = getStudentStatus(stu.id);
                      const attendancePercent = Math.round(
                        ((stu.totalClassesHeld - stu.absences) / stu.totalClassesHeld) * 100
                      );
                      const isRisk = attendancePercent < 78;

                      return (
                        <tr key={stu.id}>
                          <td>
                            <div style={{ fontWeight: 700 }}>{stu.name}</div>
                            <div style={{ fontSize: '0.73rem', color: 'var(--seduc-text-muted)' }}>
                              Matrícula: {stu.enrollment}
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${isRisk ? 'badge-danger' : 'badge-green'}`}>
                              {isRisk && <AlertTriangle size={12} />}
                              {attendancePercent}% ({stu.absences} faltas)
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="attendance-toggle-group">
                              {['P', 'F', 'FJ'].map((st) => (
                                <button
                                  key={st}
                                  type="button"
                                  className={`att-btn ${
                                    currentStatus === st ? `active-${st}` : ''
                                  }`}
                                  onClick={() => handleSetStatus(stu.id, st)}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </form>

      {/* Histórico de Aulas Ministradas */}
      <section className="section-card">
        <div className="section-card-header">
          <div className="section-card-title">
            <History size={19} />
            Aulas Registradas no Diário Eletrônico ({diaryLogs.length})
          </div>
        </div>
        <div className="section-card-body table-responsive">
          <table className="seduc-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Turma / Disciplina</th>
                <th>Tópicos Ministrados</th>
                <th>Resumo da Chamada</th>
              </tr>
            </thead>
            <tbody>
              {diaryLogs.map((log) => {
                const cls = classes.find((c) => c.id === log.classId);
                const disc = disciplines.find((d) => d.id === log.disciplineId);
                return (
                  <tr key={log.id}>
                    <td>
                      <span className="badge badge-blue">
                        <Calendar size={12} /> {log.date}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{cls?.code}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--seduc-text-secondary)' }}>
                        {disc?.name}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{log.topic}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--seduc-text-muted)' }}>
                        {log.methodology}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-green">{log.presentCount} P</span>{' '}
                      <span className="badge badge-danger">{log.absentCount} F</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

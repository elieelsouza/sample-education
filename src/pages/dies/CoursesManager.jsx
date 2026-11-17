import React, { useState } from 'react';
import { BookCopy, BookOpen, PlusCircle, Trash2, Clock, Award } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * ============================================================================
 * TELA ADM (DIES): CADASTRO E MANUTENÇÃO DE CURSOS E DISCIPLINAS
 * ============================================================================
 * Atende ao requisito:
 * "Criar telas para cadastro e manutenção de Cursos, Matrizes Curriculares e Disciplinas."
 */
export default function CoursesManager() {
  const {
    courses,
    disciplines,
    ordinances,
    addCourse,
    deleteCourse,
    addDiscipline,
    deleteDiscipline,
  } = useAcademic();

  // Estado do formulário de Curso
  const [courseForm, setCourseForm] = useState({
    code: '',
    name: '',
    modality: 'Educação Profissional Técnica Integrada ao Médio',
    totalHours: 3200,
    durationSeries: '3 Séries (Anual)',
    ordinanceNumber: ordinances[0]?.number || 'Portaria SEDUC/DIES nº 114/2026',
  });

  // Estado do formulário de Disciplina
  const [discForm, setDiscForm] = useState({
    code: '',
    name: '',
    area: 'Formação Técnica e Profissional',
    weeklyHours: 4,
    annualHours: 160,
  });

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!courseForm.code.trim() || !courseForm.name.trim()) return;
    addCourse(courseForm);
    setCourseForm({
      ...courseForm,
      code: '',
      name: '',
    });
  };

  const handleAddDiscipline = (e) => {
    e.preventDefault();
    if (!discForm.code.trim() || !discForm.name.trim()) return;
    addDiscipline(discForm);
    setDiscForm({
      code: '',
      name: '',
      area: 'Formação Técnica e Profissional',
      weeklyHours: 4,
      annualHours: 160,
    });
  };

  const handleWeeklyChange = (val) => {
    const weekly = Number(val) || 1;
    setDiscForm({
      ...discForm,
      weeklyHours: weekly,
      annualHours: weekly * 40, // 40 semanas letivas padrão SEDUC
    });
  };

  return (
    <div className="page-container">
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <BookCopy size={15} />
            Catálogo Curricular da Rede • DIES / SEDUC-SE
          </div>
          <h2>Cadastro e Manutenção de Cursos e Disciplinas</h2>
          <p>
            Gerencie os cursos autorizados pela SEDUC Sergipe e os componentes curriculares (BNCC e
            Parte Diversificada/Técnica) que compõem as matrizes.
          </p>
        </div>
      </div>

      <div className="two-col-equal">
        {/* Coluna 1: Cadastro e Manutenção de Cursos */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <Award size={19} color="#164194" />
                Cadastro de Cursos da Rede Estadual
              </div>
              <div className="section-card-subtitle">
                Defina código, modalidade, carga horária total e portaria de autorização
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <form onSubmit={handleAddCourse} className="form-grid">
              <div className="form-group col-4">
                <label className="form-label">
                  Sigla / Código <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={courseForm.code}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, code: e.target.value.toUpperCase() })
                  }
                  placeholder="Ex: CTI-REDES"
                  required
                />
              </div>

              <div className="form-group col-8">
                <label className="form-label">
                  Nome do Curso <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  placeholder="Ex: Técnico Integrado em Redes de Computadores"
                  required
                />
              </div>

              <div className="form-group col-7">
                <label className="form-label">Modalidade de Ensino</label>
                <select
                  className="form-control"
                  value={courseForm.modality}
                  onChange={(e) => setCourseForm({ ...courseForm, modality: e.target.value })}
                >
                  <option value="Educação Profissional Técnica Integrada ao Médio">
                    Educação Profissional Técnica Integrada ao Médio
                  </option>
                  <option value="Ensino Médio Integral">Ensino Médio em Tempo Integral</option>
                  <option value="Ensino Médio Regular">Ensino Médio Regular</option>
                  <option value="Educação de Jovens e Adultos (EJA)">
                    Educação de Jovens e Adultos (EJA)
                  </option>
                </select>
              </div>

              <div className="form-group col-5">
                <label className="form-label">Carga Horária Total (h)</label>
                <input
                  type="number"
                  className="form-control"
                  value={courseForm.totalHours}
                  onChange={(e) => setCourseForm({ ...courseForm, totalHours: e.target.value })}
                  min={800}
                  step={100}
                  required
                />
              </div>

              <div className="form-group col-5">
                <label className="form-label">Duração / Regime</label>
                <select
                  className="form-control"
                  value={courseForm.durationSeries}
                  onChange={(e) => setCourseForm({ ...courseForm, durationSeries: e.target.value })}
                >
                  <option value="3 Séries (Anual)">3 Séries (Anual)</option>
                  <option value="4 Semestres (Subsequente)">4 Semestres (Subsequente)</option>
                  <option value="3 Módulos (EJA)">3 Módulos (EJA)</option>
                </select>
              </div>

              <div className="form-group col-7">
                <label className="form-label">Portaria DIES Vinculada</label>
                <select
                  className="form-control"
                  value={courseForm.ordinanceNumber}
                  onChange={(e) =>
                    setCourseForm({ ...courseForm, ordinanceNumber: e.target.value })
                  }
                >
                  {ordinances.map((ord) => (
                    <option key={ord.id} value={ord.number}>
                      {ord.number}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <PlusCircle size={17} />
                  Cadastrar Curso
                </button>
              </div>
            </form>

            {/* Tabela de Cursos Cadastrados */}
            <div style={{ marginTop: '1.35rem' }} className="table-responsive">
              <table className="seduc-table">
                <thead>
                  <tr>
                    <th>Curso</th>
                    <th>CH Total</th>
                    <th>Portaria</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>
                          <span className="badge badge-blue" style={{ marginRight: '6px' }}>
                            {course.code}
                          </span>
                          {course.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--seduc-text-muted)' }}>
                          {course.modality} • {course.durationSeries}
                        </div>
                      </td>
                      <td>
                        <strong>{course.totalHours}h</strong>
                      </td>
                      <td>
                        <span className="badge badge-green">{course.ordinanceNumber}</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => deleteCourse(course.id)}
                          title="Excluir Curso"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Coluna 2: Cadastro e Manutenção de Disciplinas */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <BookOpen size={19} color="#164194" />
                Cadastro de Disciplinas (Componentes Curriculares)
              </div>
              <div className="section-card-subtitle">
                A carga horária semanal de cada disciplina alimenta o cálculo de alocação do professor
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <form onSubmit={handleAddDiscipline} className="form-grid">
              <div className="form-group col-4">
                <label className="form-label">
                  Código <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={discForm.code}
                  onChange={(e) =>
                    setDiscForm({ ...discForm, code: e.target.value.toUpperCase() })
                  }
                  placeholder="Ex: TEC-305"
                  required
                />
              </div>

              <div className="form-group col-8">
                <label className="form-label">
                  Nome da Disciplina <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={discForm.name}
                  onChange={(e) => setDiscForm({ ...discForm, name: e.target.value })}
                  placeholder="Ex: Engenharia de Software e Testes"
                  required
                />
              </div>

              <div className="form-group col-6">
                <label className="form-label">Área do Conhecimento (BNCC / Eixo)</label>
                <select
                  className="form-control"
                  value={discForm.area}
                  onChange={(e) => setDiscForm({ ...discForm, area: e.target.value })}
                >
                  <option value="Formação Técnica e Profissional">
                    Formação Técnica e Profissional
                  </option>
                  <option value="Matemática (BNCC)">Matemática e suas Tecnologias (BNCC)</option>
                  <option value="Linguagens (BNCC)">Linguagens e suas Tecnologias (BNCC)</option>
                  <option value="Ciências da Natureza (BNCC)">
                    Ciências da Natureza (BNCC)
                  </option>
                  <option value="Ciências Humanas (BNCC)">
                    Ciências Humanas e Sociais (BNCC)
                  </option>
                </select>
              </div>

              <div className="form-group col-3">
                <label className="form-label">CH Semanal</label>
                <input
                  type="number"
                  className="form-control"
                  value={discForm.weeklyHours}
                  onChange={(e) => handleWeeklyChange(e.target.value)}
                  min={1}
                  max={10}
                  required
                />
              </div>

              <div className="form-group col-3">
                <label className="form-label">CH Anual (40 sem.)</label>
                <input
                  type="number"
                  className="form-control"
                  value={discForm.annualHours}
                  readOnly
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <PlusCircle size={17} />
                  Adicionar Disciplina ao Catálogo
                </button>
              </div>
            </form>

            {/* Tabela de Disciplinas */}
            <div style={{ marginTop: '1.35rem' }} className="table-responsive">
              <table className="seduc-table">
                <thead>
                  <tr>
                    <th>Código / Disciplina</th>
                    <th>Área / Eixo</th>
                    <th>Carga Horária</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {disciplines.map((disc) => (
                    <tr key={disc.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{disc.name}</div>
                        <div style={{ fontSize: '0.73rem', color: 'var(--seduc-text-muted)' }}>
                          Código: {disc.code}
                        </div>
                      </td>
                      <td style={{ fontSize: '0.78rem' }}>{disc.area}</td>
                      <td>
                        <span className="badge badge-blue">
                          <Clock size={12} /> {disc.weeklyHours}h/sem ({disc.annualHours}h/ano)
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => deleteDiscipline(disc.id)}
                          title="Remover Disciplina"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

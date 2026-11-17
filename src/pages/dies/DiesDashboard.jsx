import React, { useState } from 'react';
import {
  Landmark,
  FileBadge,
  School,
  PlusCircle,
  CheckCircle2,
  MapPin,
  FileText,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';
import StatCard from '../../components/common/StatCard';

/**
 * ============================================================================
 * TELA ADM (DIES): PORTARIAS NORMATIVAS & UNIDADES ESCOLARES (LAYOUT BENTO)
 * ============================================================================
 */
export default function DiesDashboard() {
  const { ordinances, schools, matrices, courses, addOrdinance, addSchool } = useAcademic();

  const [showNewForms, setShowNewForms] = useState(true);

  const [ordForm, setOrdForm] = useState({
    number: 'Portaria SEDUC/DIES nº 230/2026',
    publishDate: new Date().toISOString().slice(0, 10),
    type: 'Homologação de Matriz Curricular',
    summary: '',
  });

  const [schoolForm, setSchoolForm] = useState({
    inep: '',
    name: '',
    dre: 'DEA - Diretoria de Educação de Aracaju',
    city: 'Aracaju / SE',
    modality: 'Ensino Médio em Tempo Integral e Profissional',
    OrdinanceRef: ordinances[0]?.number || 'Portaria SEDUC/DIES nº 114/2026',
    status: 'Ativa',
  });

  const handleCreateOrdinance = (e) => {
    e.preventDefault();
    if (!ordForm.number.trim() || !ordForm.summary.trim()) return;
    addOrdinance(ordForm);
    setOrdForm({
      number: `Portaria SEDUC/DIES nº ${Math.floor(231 + Math.random() * 150)}/2026`,
      publishDate: new Date().toISOString().slice(0, 10),
      type: 'Homologação de Matriz Curricular',
      summary: '',
    });
  };

  const handleCreateSchool = (e) => {
    e.preventDefault();
    if (!schoolForm.name.trim() || !schoolForm.inep.trim()) return;
    addSchool(schoolForm);
    setSchoolForm({
      ...schoolForm,
      inep: '',
      name: '',
    });
  };

  const authorizedMatricesCount = matrices.filter((m) => m.authorizedByDies).length;

  return (
    <div className="page-container">
      {/* Hero Banner em Gradiente Azul/Esmeralda */}
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <Landmark size={14} />
            Diretoria de Inspeção Escolar • DIES / SEDUC Sergipe
          </div>
          <h2>Central Normativa de Portarias e Credenciamento Escolar</h2>
          <p>
            Publique atos normativos no Diário Oficial, credencie novas unidades de ensino da rede
            estadual e habilite matrizes curriculares para a Gestão Acadêmica.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-gold"
          onClick={() => setShowNewForms(!showNewForms)}
        >
          {showNewForms ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
          {showNewForms ? 'Recolher Painéis de Cadastro' : 'Abrir Formulários DIES'}
        </button>
      </div>

      {/* KPIs Bento Grid */}
      <div className="stats-grid">
        <StatCard
          label="Portarias Emitidas"
          value={ordinances.length}
          subtitle="Atos normativos vigentes em 2026"
          icon={FileBadge}
          variant="blue"
        />
        <StatCard
          label="Unidades Escolares"
          value={schools.length}
          subtitle="Escolas credenciadas na Rede SEDUC"
          icon={School}
          variant="green"
        />
        <StatCard
          label="Cursos no Catálogo"
          value={courses.length}
          subtitle="Ofertas autorizadas pela DIES"
          icon={FileText}
          variant="gold"
        />
        <StatCard
          label="Matrizes Homologadas"
          value={`${authorizedMatricesCount}/${matrices.length}`}
          subtitle="Liberadas para implementação"
          icon={Layers}
          variant="green"
        />
      </div>

      {/* Painéis Retráteis de Cadastro (Portaria + Nova Escola) */}
      {showNewForms && (
        <div className="two-col-equal">
          <section className="section-card">
            <div className="section-card-header">
              <div>
                <div className="section-card-title">
                  <FileBadge size={19} />
                  Publicar Nova Portaria DIES/SEDUC
                </div>
                <div className="section-card-subtitle">
                  Ato oficial que autoriza matrizes curriculares, cursos e novas escolas
                </div>
              </div>
            </div>

            <div className="section-card-body">
              <form onSubmit={handleCreateOrdinance} className="form-grid">
                <div className="form-group col-7">
                  <label className="form-label">
                    Nº da Portaria <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={ordForm.number}
                    onChange={(e) => setOrdForm({ ...ordForm, number: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group col-5">
                  <label className="form-label">Data de Publicação</label>
                  <input
                    type="date"
                    className="form-control"
                    value={ordForm.publishDate}
                    onChange={(e) => setOrdForm({ ...ordForm, publishDate: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group col-12">
                  <label className="form-label">Natureza do Ato Normativo</label>
                  <select
                    className="form-control"
                    value={ordForm.type}
                    onChange={(e) => setOrdForm({ ...ordForm, type: e.target.value })}
                  >
                    <option value="Homologação de Matriz Curricular">
                      Homologação de Matriz Curricular
                    </option>
                    <option value="Autorização de Curso e Matriz">
                      Autorização de Curso e Matriz
                    </option>
                    <option value="Credenciamento de Unidade Escolar">
                      Credenciamento de Unidade Escolar
                    </option>
                  </select>
                </div>

                <div className="form-group col-12">
                  <label className="form-label">
                    Texto da Ementa Normativa <span className="required">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    value={ordForm.summary}
                    onChange={(e) => setOrdForm({ ...ordForm, summary: e.target.value })}
                    placeholder="Descreva a resolução normativa emitida pela DIES..."
                    required
                  />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <PlusCircle size={17} />
                    Emitir e Publicar Portaria
                  </button>
                </div>
              </form>
            </div>
          </section>

          <section className="section-card">
            <div className="section-card-header">
              <div>
                <div className="section-card-title">
                  <School size={19} />
                  Credenciar Nova Unidade Escolar
                </div>
                <div className="section-card-subtitle">
                  Cadastre uma nova escola estadual vinculada a uma portaria DIES
                </div>
              </div>
            </div>

            <div className="section-card-body">
              <form onSubmit={handleCreateSchool} className="form-grid">
                <div className="form-group col-4">
                  <label className="form-label">
                    Código INEP <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={schoolForm.inep}
                    onChange={(e) => setSchoolForm({ ...schoolForm, inep: e.target.value })}
                    placeholder="28031099"
                    maxLength={8}
                    required
                  />
                </div>

                <div className="form-group col-8">
                  <label className="form-label">
                    Nome da Escola <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={schoolForm.name}
                    onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
                    placeholder="Ex: Centro de Excelência Lourival Fontes"
                    required
                  />
                </div>

                <div className="form-group col-7">
                  <label className="form-label">Diretoria Regional (DRE)</label>
                  <select
                    className="form-control"
                    value={schoolForm.dre}
                    onChange={(e) => setSchoolForm({ ...schoolForm, dre: e.target.value })}
                  >
                    <option value="DEA - Diretoria de Educação de Aracaju">
                      DEA - Diretoria de Educação de Aracaju
                    </option>
                    <option value="DRE 01 - Sul Sergipano (Estância)">
                      DRE 01 - Sul Sergipano (Estância)
                    </option>
                    <option value="DRE 02 - Centro-Sul (Lagarto)">
                      DRE 02 - Centro-Sul (Lagarto)
                    </option>
                    <option value="DRE 03 - Agreste Central (Itabaiana)">
                      DRE 03 - Agreste Central (Itabaiana)
                    </option>
                    <option value="DRE 08 - Grande Aracaju (N. Sra. do Socorro)">
                      DRE 08 - Grande Aracaju (N. Sra. do Socorro)
                    </option>
                  </select>
                </div>

                <div className="form-group col-5">
                  <label className="form-label">Município / UF</label>
                  <input
                    type="text"
                    className="form-control"
                    value={schoolForm.city}
                    onChange={(e) => setSchoolForm({ ...schoolForm, city: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group col-6">
                  <label className="form-label">Modalidade de Ensino</label>
                  <select
                    className="form-control"
                    value={schoolForm.modality}
                    onChange={(e) => setSchoolForm({ ...schoolForm, modality: e.target.value })}
                  >
                    <option value="Ensino Médio em Tempo Integral e Profissional">
                      Médio Integral e Profissional
                    </option>
                    <option value="Ensino Médio em Tempo Integral">
                      Ensino Médio em Tempo Integral
                    </option>
                    <option value="Ensino Médio Regular e EJA">Ensino Médio Regular e EJA</option>
                  </select>
                </div>

                <div className="form-group col-6">
                  <label className="form-label">Portaria DIES de Criação</label>
                  <select
                    className="form-control"
                    value={schoolForm.OrdinanceRef}
                    onChange={(e) => setSchoolForm({ ...schoolForm, OrdinanceRef: e.target.value })}
                  >
                    {ordinances.map((ord) => (
                      <option key={ord.id} value={ord.number}>
                        {ord.number}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-success" style={{ width: '100%' }}>
                    <School size={17} />
                    Credenciar Unidade Escolar
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      )}

      {/* Galeria Bento de Escolas Credenciadas */}
      <section className="section-card">
        <div className="section-card-header">
          <div>
            <div className="section-card-title">
              <School size={19} />
              Rede de Unidades Escolares Credenciadas ({schools.length})
            </div>
            <div className="section-card-subtitle">
              Visualização em cartões das escolas autorizadas pela DIES e suas matrizes implementadas
            </div>
          </div>
        </div>

        <div className="section-card-body">
          <div className="cards-bento-grid">
            {schools.map((sch) => (
              <div
                key={sch.id}
                style={{
                  border: '1px solid var(--seduc-border)',
                  borderTop: '4px solid var(--seduc-blue-primary)',
                  borderRadius: '14px',
                  padding: '1.15rem',
                  background: 'var(--seduc-bg-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <span className="badge badge-blue">INEP {sch.inep}</span>
                    <span className="badge badge-green">{sch.status}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginTop: '0.55rem' }}>{sch.name}</h3>
                  <p style={{ fontSize: '0.79rem', color: 'var(--seduc-text-secondary)', marginTop: '0.2rem' }}>
                    <MapPin size={12} style={{ display: 'inline' }} /> {sch.city} • {sch.dre}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '0.7rem',
                    borderTop: '1px dashed var(--seduc-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.76rem',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{sch.OrdinanceRef}</span>
                  <span className="badge badge-gold">
                    {sch.implementedMatrices.length} matriz(es)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quadro de Portarias Vigentes */}
      <section className="section-card">
        <div className="section-card-header">
          <div>
            <div className="section-card-title">
              <FileBadge size={19} />
              Acervo de Portarias Normativas DIES ({ordinances.length})
            </div>
          </div>
        </div>

        <div className="section-card-body">
          <div className="cards-bento-grid">
            {ordinances.map((ord) => (
              <div
                key={ord.id}
                style={{
                  border: '1px solid var(--seduc-border-light)',
                  borderLeft: '4px solid var(--seduc-gold)',
                  borderRadius: '12px',
                  padding: '1rem',
                  background: 'var(--seduc-bg-page)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ color: 'var(--seduc-blue-primary)', fontSize: '0.88rem' }}>
                    {ord.number}
                  </strong>
                  <span className="badge badge-green">
                    <CheckCircle2 size={12} /> {ord.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  {ord.type} • D.O.E.: {ord.publishDate}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--seduc-text-secondary)' }}>
                  {ord.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

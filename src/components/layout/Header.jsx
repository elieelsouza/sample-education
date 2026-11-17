import React from 'react';
import {
  Landmark,
  Building2,
  BookOpenCheck,
  Users,
  FileBadge,
  BookCopy,
  Layers,
  CalendarRange,
  UsersRound,
  UserCheck,
  Gavel,
  ClipboardCheck,
  Award,
  CalendarClock,
  GraduationCap,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * Header Command-Center com Navegação Horizontal em Duas Camadas:
 * 1. Barra Principal (Identidade Portal EducaSE + Dock de Perfis)
 * 2. Ribbon Sub-Header (Abas horizontais do módulo ativo + Seletor de Professor)
 */
export default function Header() {
  const {
    activeRole,
    switchRole,
    activeTab,
    setActiveTab,
    activeTeacherId,
    setActiveTeacherId,
    teachers,
    exceptionalRequests,
    matrices,
    teachersWithWorkload,
  } = useAcademic();

  const pendingRequestsCount = exceptionalRequests.filter((r) => r.status === 'Pendente').length;
  const pendingMatricesCount = matrices.filter((m) => !m.authorizedByDies).length;
  const idleTeachersCount = teachersWithWorkload.filter((t) => t.idleHours > 0).length;

  const navigationByRole = {
    DIES: [
      { id: 'dies-overview', label: 'Portarias & Escolas', icon: FileBadge },
      { id: 'dies-courses', label: 'Catálogo de Cursos & Disciplinas', icon: BookCopy },
      {
        id: 'dies-matrices',
        label: 'Homologação de Matrizes',
        icon: Layers,
        badge: pendingMatricesCount > 0 ? `${pendingMatricesCount} pend.` : null,
      },
      {
        id: 'dies-requests',
        label: 'Deliberação de Aulas Excepcionais',
        icon: Gavel,
        badge: pendingRequestsCount > 0 ? pendingRequestsCount : null,
      },
    ],
    GESTAO: [
      { id: 'gestao-school', label: 'Implementar Escola & Calendário', icon: CalendarRange },
      { id: 'gestao-classes', label: 'Turmas, Vagas & Horários', icon: UsersRound },
      {
        id: 'gestao-allocation',
        label: 'Orquestração de Professores',
        icon: UserCheck,
        badge: idleTeachersCount > 0 ? `${idleTeachersCount} ocioso(s)` : '100% Alocado',
      },
      {
        id: 'gestao-requests',
        label: 'Deferimento de Aulas Excepcionais',
        icon: Gavel,
        badge: pendingRequestsCount > 0 ? pendingRequestsCount : null,
      },
    ],
    PROFESSOR: [
      { id: 'prof-attendance', label: 'Diário de Frequência & Tópicos', icon: ClipboardCheck },
      { id: 'prof-grades', label: 'Pauta de Notas & Avaliações', icon: Award },
      { id: 'prof-exceptional', label: 'Requerer Aula Excepcional', icon: CalendarClock },
    ],
  };

  const currentTabs = navigationByRole[activeRole] || [];

  return (
    <header className="seduc-header">
      {/* Camada 1: Logo + Seletor Segmentado dos 3 Perfis */}
      <div className="seduc-header-inner">
        <div className="seduc-logo-group">
          <div className="seduc-crest" aria-hidden="true">
            <GraduationCap size={26} color="#FFFFFF" />
          </div>
          <div className="seduc-title-block">
            <h1>
              Portal EducaSE
              <span className="seduc-title-badge">SEED • SEDUC/SE</span>
            </h1>
            <p>Plataforma Integrada de Normatização (DIES), Gestão Escolar e Diário Docente</p>
          </div>
        </div>

        <div className="role-switcher-wrapper" role="navigation" aria-label="Alternar Perfil">
          <span className="role-switcher-label">
            <Users size={13} />
            Ambiente:
          </span>

          <button
            type="button"
            className={`role-tab-btn ${activeRole === 'DIES' ? 'active' : ''}`}
            onClick={() => switchRole('DIES')}
          >
            <Landmark size={15} />
            <span>ADM • DIES</span>
            {pendingMatricesCount > 0 && (
              <span className="role-counter-pill">{pendingMatricesCount}</span>
            )}
          </button>

          <button
            type="button"
            className={`role-tab-btn ${activeRole === 'GESTAO' ? 'active' : ''}`}
            onClick={() => switchRole('GESTAO')}
          >
            <Building2 size={15} />
            <span>ADM • Gestão Acadêmica</span>
            {pendingRequestsCount > 0 && (
              <span className="role-counter-pill">{pendingRequestsCount}</span>
            )}
          </button>

          <button
            type="button"
            className={`role-tab-btn ${activeRole === 'PROFESSOR' ? 'active' : ''}`}
            onClick={() => switchRole('PROFESSOR')}
          >
            <BookOpenCheck size={15} />
            <span>Diário do Professor</span>
          </button>
        </div>
      </div>

      {/* Camada 2: Ribbon Horizontal de Navegação do Módulo Ativo */}
      <div className="module-ribbon">
        <div className="module-ribbon-inner">
          <ul className="module-ribbon-tabs">
            {currentTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    type="button"
                    className={`ribbon-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && tab.badge !== null && (
                      <span className="ribbon-badge">{tab.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Contexto Rápido / Seletor de Professor quando no Diário Eletrônico */}
          {activeRole === 'PROFESSOR' ? (
            <div className="ribbon-context-pill">
              <span style={{ fontWeight: 700, color: '#FFB900' }}>Docente Ativo:</span>
              <select
                aria-label="Selecionar Professor Logado"
                value={activeTeacherId}
                onChange={(e) => setActiveTeacherId(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.79rem',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {teachers.map((t) => (
                  <option key={t.id} value={t.id} style={{ color: '#141b2d' }}>
                    {t.name} ({t.registration})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="ribbon-context-pill">
              <span style={{ color: '#FFB900', fontWeight: 700 }}>
                {activeRole === 'DIES'
                  ? 'Diretoria de Inspeção Escolar'
                  : 'Secretaria & Coordenação Pedagógica'}
              </span>
              <span>• Rede Estadual SEDUC-SE</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import { AcademicProvider, useAcademic } from './context/AcademicContext';
import GovTopBar from './components/layout/GovTopBar';
import Header from './components/layout/Header';
import Toast from './components/common/Toast';

// Telas ADM — DIES (Inspeção Escolar e Normatização)
import DiesDashboard from './pages/dies/DiesDashboard';
import CoursesManager from './pages/dies/CoursesManager';
import MatricesManager from './pages/dies/MatricesManager';

// Telas ADM — Gestão Acadêmica (Secretaria / Coordenação)
import SchoolImplementation from './pages/gestao/SchoolImplementation';
import ClassesManager from './pages/gestao/ClassesManager';
import TeacherAllocation from './pages/gestao/TeacherAllocation';
import ExceptionalClassesReview from './pages/gestao/ExceptionalClassesReview';

// Telas Professor — Diário Eletrônico
import AttendanceDiary from './pages/professor/AttendanceDiary';
import GradesEntry from './pages/professor/GradesEntry';
import ExceptionalClassRequest from './pages/professor/ExceptionalClassRequest';

/**
 * Workspace Principal (Layout Command-Center de Largura Total com Navegação Superior)
 */
function MainWorkspace() {
  const { activeTab } = useAcademic();

  const renderScreen = () => {
    switch (activeTab) {
      // Módulo ADM 1: DIES
      case 'dies-overview':
        return <DiesDashboard />;
      case 'dies-courses':
        return <CoursesManager />;
      case 'dies-matrices':
        return <MatricesManager />;
      case 'dies-requests':
        return <ExceptionalClassesReview />;

      // Módulo ADM 2: Gestão Acadêmica
      case 'gestao-school':
        return <SchoolImplementation />;
      case 'gestao-classes':
        return <ClassesManager />;
      case 'gestao-allocation':
        return <TeacherAllocation />;
      case 'gestao-requests':
        return <ExceptionalClassesReview />;

      // Módulo 3: Professor (Diário Eletrônico)
      case 'prof-attendance':
        return <AttendanceDiary />;
      case 'prof-grades':
        return <GradesEntry />;
      case 'prof-exceptional':
        return <ExceptionalClassRequest />;

      default:
        return <DiesDashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <GovTopBar />
      <Header />
      <main className="portal-workspace">{renderScreen()}</main>
      <footer className="portal-footer">
        <div className="portal-footer-inner">
          <span>
            <strong>Portal EducaSE • SEDUC / SEED Sergipe</strong> — Sistema Integrado de Gestão
            Escolar e Diário Eletrônico
          </span>
          <span>
            Padrão Visual inspirado em{' '}
            <a
              href="https://seduc.se.gov.br/"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--seduc-blue-primary)', fontWeight: 700 }}
            >
              seduc.se.gov.br
            </a>
          </span>
        </div>
      </footer>
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AcademicProvider>
      <MainWorkspace />
    </AcademicProvider>
  );
}

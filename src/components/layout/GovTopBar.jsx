import React from 'react';
import { SunMoon, RotateCcw, ExternalLink, Compass } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * Faixa Tricolor de Sergipe + Barra Institucional do Portal SEDUC-SE
 */
export default function GovTopBar() {
  const { highContrast, setHighContrast, resetDemoData } = useAcademic();

  return (
    <>
      <div className="sergipe-tricolor-strip" aria-hidden="true" />
      <div className="gov-topbar">
        <div className="gov-topbar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <a
              href="https://seduc.se.gov.br/"
              target="_blank"
              rel="noreferrer"
              className="gov-brand-pill"
              title="Portal Oficial SEDUC Sergipe"
            >
              <span className="gov-sergipe-flag-dots" aria-hidden="true">
                <span className="gov-dot green" />
                <span className="gov-dot gold" />
                <span className="gov-dot blue" />
              </span>
              <span>PORTAL EDUCASE • GOVERNO DE SERGIPE</span>
              <ExternalLink size={12} />
            </a>
            <span style={{ opacity: 0.78, fontSize: '0.73rem' }}>
              Secretaria de Estado da Educação e da Cultura (SEED / SEDUC-SE)
            </span>
          </div>

          <div className="gov-actions">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.73rem',
                color: '#FFB900',
                fontWeight: 600,
              }}
            >
              <Compass size={13} />
              Plataforma Unificada DIES • Gestão • Docente
            </span>

            <button
              type="button"
              className="gov-link-btn"
              onClick={() => setHighContrast(!highContrast)}
            >
              <SunMoon size={13} />
              {highContrast ? 'Tema Claro' : 'Alto Contraste'}
            </button>

            <button
              type="button"
              className="gov-link-btn"
              onClick={resetDemoData}
            >
              <RotateCcw size={13} />
              Resetar Base
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react';

/**
 * Componente reutilizável para exibir indicadores-chave (KPIs) em formato Bento Card
 * com faixa superior colorida segundo a identidade visual SEDUC Sergipe.
 */
export default function StatCard({ label, value, subtitle, icon: Icon, variant = 'blue' }) {
  return (
    <div className={`stat-card variant-${variant}`}>
      <div>
        <div className="stat-card-label">{label}</div>
        <div className="stat-card-value">{value}</div>
        {subtitle && <div className="stat-card-sub">{subtitle}</div>}
      </div>
      {Icon && (
        <div className={`stat-icon-box ${variant}`}>
          <Icon size={23} />
        </div>
      )}
    </div>
  );
}

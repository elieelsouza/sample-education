import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

export default function Toast() {
  const { toast } = useAcademic();

  if (!toast) return null;

  return (
    <div className="seduc-toast" role="status" aria-live="polite">
      <CheckCircle2 size={20} color="#FFB900" style={{ flexShrink: 0 }} />
      <span style={{ fontSize: '0.84rem', fontWeight: 500 }}>{toast.message}</span>
    </div>
  );
}

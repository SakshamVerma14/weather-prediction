import React from 'react';
import type { Alert, AlertSeverity, AlertType } from '../types';
import { FloodIcon, EarthquakeIcon, AvalancheIcon } from './icons';

interface AlertPanelProps {
  alerts: Alert[];
}

const getAlertStyles = (severity: AlertSeverity) => {
  switch (severity) {
    case 'Warning':
      return {
        bg: 'bg-gradient-to-r from-rose-900/40 to-rose-700/30 border-rose-500/60',
        iconColor: 'text-rose-200',
        titleColor: 'text-rose-100',
      };
    case 'Watch':
      return {
        bg: 'bg-gradient-to-r from-amber-900/40 to-amber-700/30 border-amber-400/60',
        iconColor: 'text-amber-200',
        titleColor: 'text-amber-100',
      };
    case 'Advisory':
      return {
        bg: 'bg-gradient-to-r from-indigo-900/40 to-indigo-700/30 border-indigo-400/60',
        iconColor: 'text-indigo-200',
        titleColor: 'text-indigo-100',
      };
    default:
      return {
        bg: 'bg-white/10 border-white/5',
        iconColor: 'text-slate-200',
        titleColor: 'text-slate-100',
      };
  }
};

const AlertIcon: React.FC<{ type: AlertType; className?: string }> = ({ type, className = '' }) => {
  switch (type) {
    case 'Flood':
      return <FloodIcon className={className} />;
    case 'Earthquake':
      return <EarthquakeIcon className={className} />;
    case 'Avalanche':
      return <AvalancheIcon className={className} />;
    default:
      return <FloodIcon className={className} />;
  }
};

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <div className="rounded-3xl border border-emerald-400/40 bg-emerald-900/30 p-8 text-center text-emerald-50 shadow-[0_15px_50px_rgba(0,63,46,0.4)]">
        <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">Alert center</p>
        <p className="mt-2 text-xl font-semibold">All clear · No active warnings</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const styles = getAlertStyles(alert.severity);
        return (
          <div
            key={alert.id}
            className={`relative flex items-start gap-4 rounded-3xl border p-5 text-slate-100 shadow-[0_18px_45px_rgba(5,8,22,0.55)] ${styles.bg}`}
          >
            <div className={`flex-shrink-0 rounded-2xl border border-white/20 bg-white/10 p-3 ${styles.iconColor}`}>
              <AlertIcon type={alert.type} className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className={`text-lg font-semibold ${styles.titleColor}`}>{alert.title}</h3>
                <span className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-[0.4em] text-white/80">
                  {alert.severity}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-100/80">{alert.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/70">Focus area · {alert.area}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
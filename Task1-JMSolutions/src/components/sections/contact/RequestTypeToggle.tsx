import { Siren, CalendarClock } from 'lucide-react';

interface RequestTypeToggleProps {
  defaultValue?: 'emergency' | 'schedule';
  onChange: (value: 'emergency' | 'schedule') => void;
  value: 'emergency' | 'schedule';
}

export function RequestTypeToggle({ value, onChange }: RequestTypeToggleProps) {
  return (
    <fieldset className="w-full m-0 p-0 border-0">
      <legend className="sr-only">Request type</legend>
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
        <label
          className={`relative flex items-center gap-3 p-4 border rounded-[8px] cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2 focus-within:ring-offset-bg-0 ${
            value === 'emergency'
              ? 'bg-ember/10 border-ember text-ember'
              : 'bg-card border-line text-fg-1 hover:border-fg-1'
          }`}
        >
          <input
            type="radio"
            name="requestType"
            value="emergency"
            checked={value === 'emergency'}
            onChange={() => onChange('emergency')}
            className="sr-only"
          />
          <Siren className="w-5 h-5 shrink-0" />
          <span className="font-display font-bold text-fg-0">Emergency (ASAP)</span>
          {value === 'emergency' && (
            <div className="absolute inset-0 pointer-events-none rounded-[8px] border border-ember shadow-[0_0_12px_rgba(216,69,43,0.3)]"></div>
          )}
        </label>

        <label
          className={`relative flex items-center gap-3 p-4 border rounded-[8px] cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2 focus-within:ring-offset-bg-0 ${
            value === 'schedule'
              ? 'bg-ice/10 border-ice text-ice'
              : 'bg-card border-line text-fg-1 hover:border-fg-1'
          }`}
        >
          <input
            type="radio"
            name="requestType"
            value="schedule"
            checked={value === 'schedule'}
            onChange={() => onChange('schedule')}
            className="sr-only"
          />
          <CalendarClock className="w-5 h-5 shrink-0" />
          <span className="font-display font-bold text-fg-0">Schedule a visit</span>
          {value === 'schedule' && (
             <div className="absolute inset-0 pointer-events-none rounded-[8px] border border-ice shadow-[0_0_12px_rgba(42,127,224,0.3)]"></div>
          )}
        </label>
      </div>
    </fieldset>
  );
}

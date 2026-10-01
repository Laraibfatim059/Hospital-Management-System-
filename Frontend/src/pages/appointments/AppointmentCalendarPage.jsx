import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  User,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM

// Mock Appointments for the calendar
const mockAppointments = [
  { id: 1, title: 'Ali Khan (Follow-up)', time: '09:00 AM', duration: 30, type: 'follow-up', status: 'Confirmed' },
  { id: 2, title: 'Ayesha Ahmed (Consultation)', time: '10:00 AM', duration: 60, type: 'consultation', status: 'Pending' },
  { id: 3, title: 'Omar Malik (Checkup)', time: '11:30 AM', duration: 30, type: 'checkup', status: 'Confirmed' },
  { id: 4, title: 'Fatima Shah (Emergency)', time: '02:00 PM', duration: 45, type: 'emergency', status: 'Completed' },
  { id: 5, title: 'Zainab Bibi (Consultation)', time: '04:00 PM', duration: 30, type: 'consultation', status: 'Confirmed' },
];

const parseTime = (timeStr) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
  return { h: parseInt(hours, 10), m: parseInt(minutes, 10) };
};

export function AppointmentCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevDay = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    setCurrentDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 1);
    setCurrentDate(next);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate position and height of appointment blocks
  const getEventStyle = (time, duration) => {
    const { h, m } = parseTime(time);
    const startHour = 8; // Timeline starts at 8 AM
    const topPx = ((h - startHour) * 60 + m) * (80 / 60); // 80px per hour
    const heightPx = duration * (80 / 60);
    return { top: `${topPx}px`, height: `${heightPx}px` };
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case 'follow-up': return 'bg-blue-100 text-blue-800 border-l-4 border-blue-600 dark:bg-blue-900/40 dark:text-blue-300';
      case 'consultation': return 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300';
      case 'checkup': return 'bg-purple-100 text-purple-800 border-l-4 border-purple-600 dark:bg-purple-900/40 dark:text-purple-300';
      case 'emergency': return 'bg-red-100 text-red-800 border-l-4 border-red-600 dark:bg-red-900/40 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-800 border-l-4 border-slate-600 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Daily Schedule</h1>
          <p className="text-slate-500 dark:text-slate-400">
            View your upcoming appointments and availability.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrevDay} className="p-2">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" onClick={handleToday} className="font-medium">
            Today
          </Button>
          <Button variant="outline" onClick={handleNextDay} className="p-2">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-center gap-3">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{formattedDate}</h2>
        </div>

        {/* Timeline Body */}
        <div className="relative overflow-y-auto max-h-[600px] p-6 bg-white dark:bg-slate-950">
          <div className="relative w-full" style={{ minHeight: `${HOURS.length * 80}px` }}>
            
            {/* Hour Grid Lines */}
            {HOURS.map((hour, index) => {
              const displayHour = hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`;
              return (
                <div 
                  key={hour} 
                  className="absolute w-full flex items-start" 
                  style={{ top: `${index * 80}px` }}
                >
                  <div className="w-16 shrink-0 text-right pr-4 text-xs font-medium text-slate-400 -mt-2">
                    {displayHour}
                  </div>
                  <div className="flex-1 border-t border-slate-100 dark:border-slate-800" />
                </div>
              );
            })}

            {/* Events Overlay */}
            <div className="absolute top-0 bottom-0 left-16 right-0 ml-4 relative">
              {mockAppointments.map(apt => {
                const style = getEventStyle(apt.time, apt.duration);
                const typeStyle = getTypeStyles(apt.type);
                
                return (
                  <div 
                    key={apt.id}
                    className={`absolute left-0 right-4 rounded-r-lg p-2 shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer hover:opacity-90 transition-opacity ${typeStyle}`}
                    style={style}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-sm leading-tight truncate pr-2">{apt.title}</p>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-black/5 dark:bg-white/10 uppercase tracking-wide">
                        {apt.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs opacity-80">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{apt.time} ({apt.duration}m)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="capitalize">{apt.type}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AppointmentCalendarPage;

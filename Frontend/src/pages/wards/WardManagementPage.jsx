import { useState } from 'react';
import { 
  Bed, 
  UserPlus
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Mock Ward Data
const initialWards = [
  {
    id: 'W-01',
    name: 'General Ward (Male)',
    capacity: 12,
    beds: Array.from({ length: 12 }).map((_, i) => ({
      id: `B${i + 1}`,
      status: i < 8 ? 'Occupied' : (i === 11 ? 'Maintenance' : 'Available'),
      patient: i < 8 ? `Patient ${i + 100}` : null
    }))
  },
  {
    id: 'W-02',
    name: 'General Ward (Female)',
    capacity: 10,
    beds: Array.from({ length: 10 }).map((_, i) => ({
      id: `B${i + 1}`,
      status: i < 4 ? 'Occupied' : 'Available',
      patient: i < 4 ? `Patient ${i + 200}` : null
    }))
  },
  {
    id: 'W-ICU',
    name: 'Intensive Care Unit (ICU)',
    capacity: 6,
    beds: Array.from({ length: 6 }).map((_, i) => ({
      id: `ICU-${i + 1}`,
      status: i < 5 ? 'Occupied' : 'Available',
      patient: i < 5 ? `Critical Patient ${i + 300}` : null
    }))
  }
];

export function WardManagementPage() {
  const [wards, setWards] = useState(initialWards);

  // Calculate global stats
  const totalBeds = wards.reduce((sum, w) => sum + w.capacity, 0);
  const occupiedBeds = wards.reduce((sum, w) => sum + w.beds.filter(b => b.status === 'Occupied').length, 0);
  const availableBeds = wards.reduce((sum, w) => sum + w.beds.filter(b => b.status === 'Available').length, 0);

  const getBedColor = (status) => {
    switch(status) {
      case 'Available': return 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-400 hover:bg-emerald-200';
      case 'Occupied': return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400';
      case 'Maintenance': return 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-400';
      default: return 'bg-slate-100 border-slate-300 text-slate-700';
    }
  };

  const handleBedClick = (wardId, bed) => {
    if (bed.status === 'Available') {
      if (window.confirm(`Admit new patient to ${wardId} - Bed ${bed.id}?`)) {
        // Mock admission
        setWards(wards.map(w => 
          w.id === wardId ? {
            ...w,
            beds: w.beds.map(b => b.id === bed.id ? { ...b, status: 'Occupied', patient: 'New Admitted Patient' } : b)
          } : w
        ));
        toast.success(`Patient successfully admitted to ${bed.id}`);
      }
    } else if (bed.status === 'Occupied') {
      if (window.confirm(`Discharge patient from ${wardId} - Bed ${bed.id}?`)) {
        // Mock discharge
        setWards(wards.map(w => 
          w.id === wardId ? {
            ...w,
            beds: w.beds.map(b => b.id === bed.id ? { ...b, status: 'Available', patient: null } : b)
          } : w
        ));
        toast.success(`Patient discharged from ${bed.id}`);
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Ward & Bed Management</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Monitor hospital capacity, admit patients, and manage inpatient wards.
          </p>
        </div>
        <Button variant="primary" className="shrink-0">
          <UserPlus className="w-4 h-4 mr-2" />
          Admit Patient
        </Button>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-sm font-medium text-slate-500">Total Capacity</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalBeds}</p>
            <span className="text-sm text-slate-500">Beds</span>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-500">Available</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{availableBeds}</p>
            <span className="text-sm text-slate-500">Beds Ready</span>
          </div>
        </Card>
        <Card className="p-4 border-l-4 border-l-red-500 bg-red-50/30 dark:bg-red-900/10">
          <p className="text-sm font-medium text-red-700 dark:text-red-500">Occupied</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{occupiedBeds}</p>
            <span className="text-sm text-slate-500 text-red-500 font-medium">({Math.round((occupiedBeds/totalBeds)*100)}% Full)</span>
          </div>
        </Card>
      </div>

      {/* Ward Visualizer */}
      <div className="space-y-8 mt-4">
        {wards.map((ward) => {
          const wAvail = ward.beds.filter(b => b.status === 'Available').length;
          
          return (
            <div key={ward.id} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">{ward.name}</h2>
                  <Badge variant="default" className="text-xs">{ward.id}</Badge>
                </div>
                <div className="text-sm font-medium">
                  {wAvail > 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400">{wAvail} Available</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">Full</span>
                  )}
                  <span className="text-slate-400 mx-2">|</span>
                  <span className="text-slate-500">Total: {ward.capacity}</span>
                </div>
              </div>

              {/* Bed Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {ward.beds.map((bed) => (
                  <button
                    key={bed.id}
                    onClick={() => handleBedClick(ward.id, bed)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${getBedColor(bed.status)} ${bed.status === 'Available' ? 'cursor-pointer hover:shadow-md' : 'cursor-pointer opacity-90'}`}
                  >
                    <Bed className="w-8 h-8 mb-2 opacity-80" />
                    <span className="font-bold text-sm">{bed.id}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold mt-1 opacity-75">
                      {bed.status}
                    </span>
                    {bed.status === 'Occupied' && (
                      <span className="text-xs truncate w-full text-center mt-2 font-medium opacity-90">
                        {bed.patient}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default WardManagementPage;

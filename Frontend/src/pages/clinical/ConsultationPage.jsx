
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { 
  ArrowLeft,
  User,
  Activity,
  FileText,
  Pill,
  Save,
  Plus,
  Trash2,
  CalendarDays
} from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Avatar } from '@/components/ui/Avatar';

// Note: In a real app we'd import the schema from validators.js. 
// We are mocking a complex consultation schema directly here for the specific EMR use case.
import { z } from 'zod';

const consultationFormSchema = z.object({
  symptoms: z.string().min(2, 'Please record patient symptoms'),
  diagnosis: z.string().min(2, 'Diagnosis is required'),
  notes: z.string().optional(),
  treatment: z.string().optional(),
  followUpDate: z.string().optional(),
  medications: z.array(z.object({
    name: z.string().min(1, 'Required'),
    dosage: z.string().min(1, 'Required'),
    frequency: z.string().min(1, 'Required'),
    duration: z.string().min(1, 'Required'),
  })).optional(),
});

// Mock Data
const mockAptData = {
  id: 'APT-301',
  patientId: 'PAT-1042',
  patientName: 'Kashif Mehmood',
  age: 48,
  gender: 'Male',
  bloodGroup: 'B+',
  vitals: {
    bp: '135/85',
    temp: '98.6°F',
    weight: '78 kg',
    pulse: '82 bpm'
  },
  reason: 'Hypertension Review',
};

export function ConsultationPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  // In reality, fetch appointment and patient data via ID
  const patient = mockAptData;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      symptoms: '',
      diagnosis: '',
      notes: '',
      treatment: '',
      followUpDate: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medications',
  });

  const onSubmit = async (data) => {
    try {
      await new Promise(r => setTimeout(r, 1200));
      console.log('Consultation Data:', data);
      toast.success('Consultation record saved successfully.');
      navigate('/doctor'); // Return to dashboard
    } catch (err) {
      console.error(err);
      toast.error('Failed to save consultation record.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-600 bg-white dark:bg-slate-900 rounded-full shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Active Consultation</h1>
            <p className="text-sm text-slate-500">Encounter ID: {appointmentId || 'New'}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(`/doctor/patients/${patient.patientId}`)}>
            <FileText className="w-4 h-4 mr-2" /> View Full History
          </Button>
          <Button variant="primary" form="emr-form" type="submit" isLoading={isSubmitting}>
            <Save className="w-4 h-4 mr-2" /> Complete Visit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Sidebar: Patient Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <Card.Body className="flex flex-col items-center text-center p-6">
              <Avatar name={patient.patientName} size="lg" className="mb-4" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{patient.patientName}</h2>
              <p className="text-slate-500 text-sm mb-4">
                {patient.gender}, {patient.age} years • {patient.bloodGroup}
              </p>
              
              <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-left">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Reason for Visit</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{patient.reason}</p>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header title="Latest Vitals (Triage)" icon={<Activity className="w-5 h-5 text-blue-500" />} />
            <Card.Body className="p-0">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                <li className="flex justify-between p-4">
                  <span className="text-slate-500">Blood Pressure</span>
                  <span className="font-medium text-slate-900 dark:text-white">{patient.vitals.bp}</span>
                </li>
                <li className="flex justify-between p-4">
                  <span className="text-slate-500">Heart Rate</span>
                  <span className="font-medium text-slate-900 dark:text-white">{patient.vitals.pulse}</span>
                </li>
                <li className="flex justify-between p-4">
                  <span className="text-slate-500">Temperature</span>
                  <span className="font-medium text-slate-900 dark:text-white">{patient.vitals.temp}</span>
                </li>
                <li className="flex justify-between p-4">
                  <span className="text-slate-500">Weight</span>
                  <span className="font-medium text-slate-900 dark:text-white">{patient.vitals.weight}</span>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </div>

        {/* Right Main Area: EMR Form */}
        <div className="lg:col-span-2">
          <form id="emr-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Clinical Notes Section */}
            <Card>
              <Card.Header title="Clinical Assessment" icon={<User className="w-5 h-5 text-emerald-500" />} />
              <Card.Body className="space-y-5">
                <Textarea 
                  label="Presenting Symptoms & Complaints *"
                  placeholder="Record patient's chief complaints..."
                  rows={3}
                  error={errors.symptoms?.message}
                  {...register('symptoms')}
                />
                
                <Input 
                  label="Primary Diagnosis *"
                  placeholder="e.g. Essential (primary) hypertension (I10)"
                  error={errors.diagnosis?.message}
                  {...register('diagnosis')}
                />
                
                <Textarea 
                  label="Treatment Plan & Advice"
                  placeholder="Dietary changes, recommended exercises, etc."
                  rows={2}
                  {...register('treatment')}
                />
                
                <Textarea 
                  label="Private Doctor Notes"
                  placeholder="Internal notes not printed on the prescription..."
                  rows={2}
                  {...register('notes')}
                />
              </Card.Body>
            </Card>

            {/* Prescription Builder */}
            <Card>
              <Card.Header 
                title="Prescription (Rx)" 
                icon={<Pill className="w-5 h-5 text-purple-500" />} 
                action={
                  <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', dosage: '', frequency: '', duration: '' })}>
                    <Plus className="w-4 h-4 mr-1" /> Add Medicine
                  </Button>
                }
              />
              <Card.Body>
                {fields.length === 0 ? (
                  <div className="text-center p-6 text-slate-500 text-sm">
                    No medications prescribed. Click "Add Medicine" to create a prescription.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {fields.map((item, index) => (
                      <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700 relative">
                        <button 
                          type="button" 
                          onClick={() => remove(index)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mr-6">
                          <div className="sm:col-span-2">
                            <Input 
                              label="Medication Name"
                              placeholder="e.g. Lisinopril"
                              error={errors.medications?.[index]?.name?.message}
                              {...register(`medications.${index}.name`)}
                            />
                          </div>
                          <Input 
                            label="Dosage"
                            placeholder="e.g. 10mg"
                            error={errors.medications?.[index]?.dosage?.message}
                            {...register(`medications.${index}.dosage`)}
                          />
                          <Input 
                            label="Frequency"
                            placeholder="e.g. 1x Daily (Morning)"
                            error={errors.medications?.[index]?.frequency?.message}
                            {...register(`medications.${index}.frequency`)}
                          />
                          <Input 
                            label="Duration"
                            placeholder="e.g. 30 Days"
                            error={errors.medications?.[index]?.duration?.message}
                            {...register(`medications.${index}.duration`)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Follow up */}
            <Card>
              <Card.Header title="Follow-up" icon={<CalendarDays className="w-5 h-5 text-amber-500" />} />
              <Card.Body>
                <div className="max-w-xs">
                  <Input 
                    type="date"
                    label="Next Visit Date (Optional)"
                    {...register('followUpDate')}
                  />
                </div>
              </Card.Body>
            </Card>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ConsultationPage;

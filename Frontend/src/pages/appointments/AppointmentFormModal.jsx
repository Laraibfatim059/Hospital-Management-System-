import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Clock } from 'lucide-react';

import { appointmentSchema } from '@/utils/validators';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/utils/cn';

// Mock Doctors
const DOCTORS = [
  { id: 'DOC-1', name: 'Dr. Ahmed Malik', dept: 'Cardiology' },
  { id: 'DOC-2', name: 'Dr. Sana Zafar', dept: 'Pediatrics' },
  { id: 'DOC-3', name: 'Dr. Tariq Mahmood', dept: 'Neurology' },
];

// Mock Time Slots
const ALL_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM'
];

// Randomize booked slots based on date + doctor to simulate availability
const getBookedSlots = (doctorId, date) => {
  if (!doctorId || !date) return [];
  // simple deterministic pseudo-random logic
  const seed = doctorId.length + new Date(date).getDate();
  return ALL_SLOTS.filter((_, i) => (i + seed) % 3 === 0);
};

export function AppointmentFormModal({ isOpen, onClose, appointment = null, onSuccess }) {
  const isEditing = !!appointment;

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: '',
      doctorId: '',
      date: '',
      time: '',
      type: 'Consultation',
      notes: '',
    },
  });

  const selectedDoctor = useWatch({ control, name: 'doctorId' });
  const selectedDate = useWatch({ control, name: 'date' });
  const selectedTime = useWatch({ control, name: 'time' });

  const bookedSlots = (selectedDoctor && selectedDate)
    ? getBookedSlots(selectedDoctor, selectedDate)
    : [];

  // Update available slots when doctor or date changes
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      // if currently selected time is now booked, clear it
      if (getBookedSlots(selectedDoctor, selectedDate).includes(selectedTime)) {
        setValue('time', '');
      }
    }
  }, [selectedDoctor, selectedDate, setValue, selectedTime]);

  // Populate form
  useEffect(() => {
    if (isOpen && appointment) {
      reset({
        patientId: appointment.patientId || appointment.patient || '', // adapt to mock data struct
        doctorId: appointment.doctorId || '',
        date: appointment.date || '',
        time: appointment.time || '',
        type: appointment.type || 'Consultation',
        notes: appointment.notes || '',
      });
    } else if (isOpen && !appointment) {
      reset({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        type: 'Consultation',
        notes: '',
      });
    }
  }, [isOpen, appointment, reset]);

  const onSubmit = async (data) => {
    try {
      if (!data.time) {
        toast.error('Please select an available time slot.');
        return;
      }
      
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast.success(isEditing ? 'Appointment rescheduled!' : 'Appointment booked successfully!');
      if (onSuccess) {
        onSuccess(data);
      }
      onClose();
    } catch {
      toast.error('Failed to book appointment.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Reschedule Appointment' : 'Book Appointment'}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} id="appointment-form" noValidate>
        <div className="space-y-5">
          <Input
            id="patientId"
            label="Patient ID or Name"
            placeholder="Search or enter PAT-XXXX"
            error={errors.patientId?.message}
            {...register('patientId')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="doctorId"
              label="Doctor"
              error={errors.doctorId?.message}
              {...register('doctorId')}
            >
              <option value="">Select a Doctor</option>
              {DOCTORS.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name} ({doc.dept})</option>
              ))}
            </Select>
            <Select
              id="type"
              label="Visit Type"
              error={errors.type?.message}
              {...register('type')}
            >
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Checkup">Routine Checkup</option>
              <option value="Emergency">Emergency</option>
            </Select>
          </div>

          <Input
            id="date"
            type="date"
            label="Date"
            error={errors.date?.message}
            {...register('date')}
          />

          {/* Time Slots Grid */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Select Time Slot
            </label>
            {!selectedDoctor || !selectedDate ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm text-slate-500 text-center border border-dashed border-slate-200 dark:border-slate-700">
                Please select a doctor and date to view available slots.
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {ALL_SLOTS.map((slot) => {
                  const isBooked = bookedSlots.includes(slot) && slot !== appointment?.time;
                  const isSelected = selectedTime === slot;
                  
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setValue('time', slot, { shouldValidate: true })}
                      className={cn(
                        "py-2 px-1 text-xs font-medium rounded-md border flex items-center justify-center gap-1.5 transition-all",
                        isBooked ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-60" 
                        : isSelected ? "bg-blue-600 border-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-1 dark:ring-offset-slate-900" 
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 cursor-pointer"
                      )}
                    >
                      <Clock className={cn("w-3 h-3", isSelected ? "text-white" : "text-slate-400")} />
                      {slot}
                    </button>
                  );
                })}
              </div>
            )}
            {errors.time && (
              <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>
            )}
            {/* hidden input to register the time field in React Hook Form */}
            <input type="hidden" {...register('time')} />
          </div>

          <Textarea
            id="notes"
            label="Additional Notes"
            placeholder="Symptoms, previous records to bring, etc."
            rows={2}
            error={errors.notes?.message}
            {...register('notes')}
          />
        </div>
      </form>

      <Modal.Footer className="mt-6 p-0 border-t-0 bg-transparent flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="appointment-form"
          variant="primary"
          isLoading={isSubmitting}
        >
          {isEditing ? 'Update Appointment' : 'Confirm Booking'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AppointmentFormModal;

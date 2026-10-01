import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { patientSchema } from '@/utils/validators';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

export function PatientFormModal({ isOpen, onClose, patient = null, onSuccess }) {
  const isEditing = !!patient;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      address: '',
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (isOpen && patient) {
      reset({
        firstName: patient.firstName || '',
        lastName: patient.lastName || '',
        email: patient.email || '',
        phone: patient.phone || '',
        dateOfBirth: patient.dateOfBirth || '',
        gender: patient.gender || '',
        bloodGroup: patient.bloodGroup || '',
        address: patient.address || '',
      });
    } else if (isOpen && !patient) {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        address: '',
      });
    }
  }, [isOpen, patient, reset]);

  const onSubmit = async (data) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success(isEditing ? 'Patient updated successfully!' : 'Patient registered successfully!');
      if (onSuccess) {
        onSuccess(data);
      }
      onClose();
    } catch {
      toast.error('An error occurred while saving the patient.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Patient Record' : 'Register New Patient'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} id="patient-form" noValidate>
        <div className="space-y-6">
          {/* Demographics Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">
              Demographics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="firstName"
                label="First Name"
                placeholder="e.g. Ali"
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <Input
                id="lastName"
                label="Last Name"
                placeholder="e.g. Khan"
                error={errors.lastName?.message}
                {...register('lastName')}
              />
              <Input
                id="dateOfBirth"
                type="date"
                label="Date of Birth"
                error={errors.dateOfBirth?.message}
                {...register('dateOfBirth')}
              />
              <Select
                id="gender"
                label="Gender"
                error={errors.gender?.message}
                {...register('gender')}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
              <Select
                id="bloodGroup"
                label="Blood Group (Optional)"
                error={errors.bloodGroup?.message}
                {...register('bloodGroup')}
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Select>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700" />

          {/* Contact Details Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">
              Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="patient@example.com"
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                id="phone"
                label="Phone Number"
                placeholder="+92 300 1234567"
                error={errors.phone?.message}
                {...register('phone')}
              />
              <div className="sm:col-span-2">
                <Input
                  id="address"
                  label="Residential Address"
                  placeholder="Full address"
                  error={errors.address?.message}
                  {...register('address')}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      <Modal.Footer className="mt-6 p-0 border-t-0 bg-transparent flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="patient-form"
          variant="primary"
          isLoading={isSubmitting}
        >
          {isEditing ? 'Save Changes' : 'Register Patient'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PatientFormModal;

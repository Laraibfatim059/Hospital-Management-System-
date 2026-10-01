import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { staffSchema } from '@/utils/validators';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Emergency',
  'General Medicine',
  'Surgery',
  'Pharmacy',
  'Laboratory',
  'Administration',
];

export function StaffFormModal({ isOpen, onClose, staffMember = null, onSuccess }) {
  const isEditing = !!staffMember;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      specialization: '',
      availability: '',
    },
  });

  const selectedRole = useWatch({ control, name: 'role' });
  const isDoctor = selectedRole === 'Doctor';

  // Populate form when editing or resetting on open/close
  useEffect(() => {
    if (isOpen && staffMember) {
      reset({
        firstName: staffMember.firstName || '',
        lastName: staffMember.lastName || '',
        email: staffMember.email || '',
        phone: staffMember.phone || '',
        role: staffMember.role || '',
        department: staffMember.department || '',
        specialization: staffMember.specialization || '',
        availability: staffMember.availability || '',
      });
    } else if (isOpen && !staffMember) {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        specialization: '',
        availability: '',
      });
    }
  }, [isOpen, staffMember, reset]);

  const onSubmit = async (data) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast.success(isEditing ? 'Staff record updated!' : 'New staff member added!');
      if (onSuccess) {
        onSuccess(data);
      }
      onClose();
    } catch {
      toast.error('An error occurred while saving the staff member.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Staff Member' : 'Add New Staff'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} id="staff-form" noValidate>
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="firstName"
                label="First Name"
                placeholder="e.g. Sana"
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <Input
                id="lastName"
                label="Last Name"
                placeholder="e.g. Zafar"
                error={errors.lastName?.message}
                {...register('lastName')}
              />
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="sana.zafar@hospital.com"
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
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700" />

          {/* Role & Assignment */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">
              Role & Assignment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                id="role"
                label="Staff Role"
                error={errors.role?.message}
                {...register('role')}
              >
                <option value="">Select a role</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Admin">Administrator</option>
                <option value="Other">Other Staff</option>
              </Select>

              <Select
                id="department"
                label="Assigned Department"
                error={errors.department?.message}
                {...register('department')}
              >
                <option value="">Select a department</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Select>
            </div>
          </div>

          {/* Doctor Specific Fields */}
          {isDoctor && (
            <>
              <div className="border-t border-slate-200 dark:border-slate-700" />
              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider">
                  Doctor Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="specialization"
                    label="Specialization"
                    placeholder="e.g. Interventional Cardiology"
                    error={errors.specialization?.message}
                    {...register('specialization')}
                  />
                  <Select
                    id="availability"
                    label="Availability/Shift"
                    error={errors.availability?.message}
                    {...register('availability')}
                  >
                    <option value="">Select shift</option>
                    <option value="Morning Shift (8AM - 2PM)">Morning Shift (8AM - 2PM)</option>
                    <option value="Evening Shift (2PM - 8PM)">Evening Shift (2PM - 8PM)</option>
                    <option value="Night Shift (8PM - 8AM)">Night Shift (8PM - 8AM)</option>
                    <option value="On Call">On Call</option>
                  </Select>
                </div>
              </div>
            </>
          )}
        </div>
      </form>

      <Modal.Footer className="mt-6 p-0 border-t-0 bg-transparent flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="staff-form"
          variant="primary"
          isLoading={isSubmitting}
        >
          {isEditing ? 'Save Changes' : 'Add Staff Member'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StaffFormModal;

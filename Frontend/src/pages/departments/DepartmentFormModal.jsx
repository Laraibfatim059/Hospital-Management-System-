import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { departmentSchema } from '@/utils/validators';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

export function DepartmentFormModal({ isOpen, onClose, department = null, onSuccess }) {
  const isEditing = !!department;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
      headOfDepartment: '',
      description: '',
      status: 'Active',
    },
  });

  useEffect(() => {
    if (isOpen && department) {
      reset({
        name: department.name || '',
        headOfDepartment: department.headOfDepartment || '',
        description: department.description || '',
        status: department.status || 'Active',
      });
    } else if (isOpen && !department) {
      reset({
        name: '',
        headOfDepartment: '',
        description: '',
        status: 'Active',
      });
    }
  }, [isOpen, department, reset]);

  const onSubmit = async (data) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast.success(isEditing ? 'Department updated successfully!' : 'New department added!');
      if (onSuccess) {
        onSuccess(data);
      }
      onClose();
    } catch {
      toast.error('An error occurred while saving the department.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Department' : 'Add New Department'}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} id="department-form" noValidate>
        <div className="space-y-4">
          <Input
            id="name"
            label="Department Name"
            placeholder="e.g. Cardiology"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            id="headOfDepartment"
            label="Head of Department (HOD)"
            placeholder="e.g. Dr. Ahmed Malik"
            error={errors.headOfDepartment?.message}
            {...register('headOfDepartment')}
          />
          <Textarea
            id="description"
            label="Description"
            placeholder="Brief description of the department's focus..."
            rows={3}
            error={errors.description?.message}
            {...register('description')}
          />
          <Select
            id="status"
            label="Operational Status"
            error={errors.status?.message}
            {...register('status')}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </div>
      </form>

      <Modal.Footer className="mt-6 p-0 border-t-0 bg-transparent flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          form="department-form"
          variant="primary"
          isLoading={isSubmitting}
        >
          {isEditing ? 'Save Changes' : 'Create Department'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DepartmentFormModal;

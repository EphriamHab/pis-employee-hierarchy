import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Button, Select, TextInput } from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IPosition } from '../models/types'; // Define your Position type as needed

interface PositionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<IPosition , 'id' | 'children'>) => void; // Exclude id and children when creating new positions
  positions: IPosition []; // List of existing positions to populate the dropdown
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  parentId: yup.number().nullable(),
});

const PositionForm: React.FC<PositionFormProps> = ({ isOpen, onClose, onSubmit, positions }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<Omit<IPosition, 'id' | 'children'>>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: '',
      description: '',
      parentId: null, // Set parentId to null instead of undefined
    },
  });

  const handleFormSubmit = (data: Omit<IPosition , 'id' | 'children'>) => {
    // Ensure parentId is either number or null, never undefined
    const positionData = {
      ...data,
      parentId: data.parentId ?? null,
    };
    onSubmit(positionData);
    onClose();
  };

  return (
    <Modal title="Add New Position" opened={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-4">
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Position Name"
                placeholder="Enter position name"
                error={errors.name?.message}
                {...field}
                className="w-full"
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextInput
                label="Description"
                placeholder="Enter position description"
                error={errors.description?.message}
                {...field}
                className="w-full"
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="parentId"
            control={control}
            render={({ field }) => (
              <Select
                label="Parent Position"
                placeholder="Select parent position"
                data={[{ value: 'null', label: 'No Parent' }, ...positions.map(pos => ({ value: pos.id.toString(), label: pos.name }))]}
                {...field}
                value={field.value !== null ? field.value.toString() : 'null'} // Ensure the value is a string
                onChange={(value) => field.onChange(value === 'null' ? null: value)} // Ensure parentId is correctly set
                className="w-full"
              />
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
            Add Position
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PositionForm;

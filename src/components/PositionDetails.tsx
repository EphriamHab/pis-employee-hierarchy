import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, TextInput } from '@mantine/core';
import { editPosition } from '../store/positionSlice';
import { IPosition } from '../models/types';
import { useAppDispatch } from '../store/hook';

interface EditPositionModalProps {
  position: IPosition | null;
  onClose: () => void;
  positions: IPosition[];
}

const PositionDetails: React.FC<EditPositionModalProps> = ({ position, onClose, positions }) => {
  const dispatch = useAppDispatch();
  const [localPosition, setLocalPosition] = useState<IPosition | null>(position);

  useEffect(() => {
    setLocalPosition(position);
  }, [position]);

  const handleInputChange = (field: keyof IPosition) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (localPosition) {
      setLocalPosition({ ...localPosition, [field]: event.target.value });
    }
  };

  const handleParentPositionChange = (value: string | null) => {
    if (localPosition) {
      setLocalPosition({
        ...localPosition,
        parentId: value !== 'null' && value !== null ? parseInt(value) : null,
      });
    }
  };

  const handleUpdatePosition = () => {
    if (localPosition) {
      dispatch(editPosition(localPosition));
      onClose();
    }
  };

  return (
    <Modal title="Update Position" opened={true} onClose={onClose} size="lg">
      <div className="p-4">
        {localPosition && (
          <>
            <TextInput
              value={localPosition.name}
              onChange={handleInputChange('name')}
              placeholder="Enter position name"
              className="mb-2"
            />
            <TextInput
              value={localPosition.description}
              onChange={handleInputChange('description')}
              placeholder="Enter position description"
              className="mb-2"
            />
            <Select
              placeholder="Select parent position"
              data={[
                { value: 'null', label: 'No Parent' },
                ...positions.map((pos) => ({
                  value: pos.id.toString(),
                  label: pos.name,
                })),
              ]}
              value={localPosition.parentId !== null ? localPosition.parentId.toString() : 'null'}
              onChange={handleParentPositionChange}
              className="w-full"
            />
            <Button onClick={handleUpdatePosition} className="w-full mt-6">
              Update Position
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PositionDetails;

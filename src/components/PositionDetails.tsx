import React from "react";
import { Modal, Button, Select, TextInput } from "@mantine/core"; // Import Mantine components
import { useDispatch } from "react-redux";
import { updatePosition } from "../store/positionSlice";
import { IPosition } from "../models/types";

interface EditPositionModalProps {
  position: IPosition | null;
  onClose: () => void;
  positions: IPosition[]; // Assuming positions is passed as a prop
}

const PositionDetails: React.FC<EditPositionModalProps> = ({
  position,
  onClose,
  positions,
}) => {
  const dispatch = useDispatch();

  const handleUpdatePosition = () => {
    if (position) {
      dispatch(updatePosition(position));
      onClose();
    }
  };

  const handleParentPositionChange = (value: string | null) => {
    const updatedPosition: IPosition = {
      ...position!,
      parentId: value !== "null" && value !== null ? parseInt(value) : null,
    };
    dispatch(updatePosition(updatedPosition));
  };

  return (
    <Modal opened={true} onClose={onClose} size="lg">
      <div className="p-4 text-center">
        <h2>Edit Position</h2>
        {position && (
          <React.Fragment>
            <TextInput
              value={position.name}
              onChange={(e) => {
                const updatedPosition: IPosition = {
                  ...position,
                  name: e.currentTarget.value,
                };
                dispatch(updatePosition(updatedPosition));
              }}
              placeholder="Enter position name"
              className="mb-2"
            />
            <TextInput
              value={position.description}
              onChange={(e) => {
                const updatedPosition: IPosition = {
                  ...position,
                  description: e.currentTarget.value,
                };
                dispatch(updatePosition(updatedPosition));
              }}
              placeholder="Enter position description"
              className="mb-2"
            />
            <Select
              placeholder="Select parent position"
              data={[
                { value: "null", label: "No Parent" },
                ...positions.map((pos) => ({
                  value: pos.id.toString(),
                  label: pos.name,
                })),
              ]}
              value={
                position.parentId !== null
                  ? position.parentId.toString()
                  : "null"
              }
              onChange={(value) => handleParentPositionChange(value)}
              className="w-full"
            />

            <Button onClick={handleUpdatePosition} className="w-full mt-6">
              Update Position
            </Button>
          </React.Fragment>
        )}
      </div>
    </Modal>
  );
};

export default PositionDetails;
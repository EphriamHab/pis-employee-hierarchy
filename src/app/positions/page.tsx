"use client";
import React, { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import PositionList from "../../components/PositionList";
import { Button } from "@mantine/core";
import { selectPositions, addPosition } from "../../store/positionSlice";
import PositionForm from "../../components/PositionForm";
import { IPosition } from "../../models/types";

const Position = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const positions: any = useSelector(selectPositions);
  const dispatch = useDispatch();

  const handleAddPosition = (data: Omit<IPosition, "id" | "children">) => {
    const newPosition: IPosition = {
      id: positions.length + 1, // Generate a new ID (simple increment logic for demonstration)
      ...data,
      children: [] as [],
    };
    dispatch(addPosition(newPosition));
  };

  return (
  
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button className="bg-blue-400" onClick={()=>setIsModalOpen(true)}>Add Position</Button>
        </div>
        <PositionForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddPosition}
          positions={positions}
        />
        <PositionList />
      </div>
  );
};

export default Position;

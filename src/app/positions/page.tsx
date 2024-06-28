"use client";
import React, { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import PositionList from "../../components/PositionList";
import { Button } from "@mantine/core";
import { selectPositions, createPosition } from "../../store/positionSlice";
import PositionForm from "../../components/PositionForm";
import { IPosition } from "../../models/types";
import { useAppDispatch } from "../../store/hook";

const Position = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const positions: any = useSelector(selectPositions);
  const dispatch = useAppDispatch();

  const handleAddPosition = (data: Omit<IPosition, "id" | "children">) => {
    const newId = positions.length > 0 ? Math.max(...positions.map((p:any) => p.id)) + 1 : 1;
    const newPosition: IPosition = {
      id: newId, 
      ...data,
    };
    dispatch(createPosition(newPosition));
    setIsModalOpen(false); 
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

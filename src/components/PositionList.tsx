import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectPositions,deletePosition,updatePosition } from '../store/positionSlice';
import { Table, Button, Modal} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import PositionDetails from './PositionDetails';
import {IPosition} from '../models/types';

interface PositionListProps {}

const PositionList: React.FC<PositionListProps> = () => {
  const dispatch = useDispatch();
  const positions: IPosition[] = useSelector(selectPositions);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleExpandToggle = (parentId: number) => {
    if (expandedRows.includes(parentId)) {
      setExpandedRows(expandedRows.filter(id => id !== parentId));
    } else {
      setExpandedRows([...expandedRows, parentId]);
    }
  };

  const handleDelete = (id: number) => {
    // Implement confirmation logic if needed, then dispatch delete action
    const confirmDelete = window.confirm(`Are you sure you want to delete position ID ${id}?`);
    if (confirmDelete) {
      dispatch(deletePosition(id));
    }
  };

  const handleEdit = (id: number) => {
    setSelectedPositionId(id);
    setIsEditModalOpen(true);
  };
  
  const renderTreeRows = (parent: number | null = null, level: number = 0) => {
    return positions
      .filter(position => position.parentId === parent)
      .map(position => (
        <React.Fragment key={position.id}>
          <tr className="bg-white border-b hover:bg-gray-50">
            <td className={`px-6 py-4 pl-${level * 4}`}>{position.id}</td>
            <td className={`px-6 py-4 pl-${level * 4}`}>{position.name}</td>
            <td className={`px-6 py-4 pl-${level * 4}`}>{position.description}</td>
            <td className={`pl-${level * 4} px-6 py-4 flex items-center space-x-2`}>
              <IconEdit
                className="cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={() =>handleEdit(position.id) }
              />
              <IconTrash
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDelete(position.id)}
              />
              <Button className="bg-blue-400" onClick={() => handleExpandToggle(position.id)}>
                Toggle
              </Button>
            </td>
          </tr>
          {expandedRows.includes(position.id) && (
            <tr key={`${position.id}-children`}>
              <td colSpan={4} className={`pl-${(level + 1) * 4} p-0`}>
                <table className="min-w-full">
                  <tbody>{renderTreeRows(position.id, level + 1)}</tbody>
                </table>
              </td>
            </tr>
          )}
        </React.Fragment>
      ));
  };

  return (
      <><Table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 tracking-wider">Position ID</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 tracking-wider">Position Name</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 tracking-wider">Description</th>
          <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">{renderTreeRows(null)}</tbody>
    </Table>
    {isEditModalOpen && selectedPositionId !== null && (
        <PositionDetails
          position={positions.find(position => position.id === selectedPositionId) || null}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedPositionId(null);
          } } positions={[]}        />
      )}
        </>
  );
};

export default PositionList;

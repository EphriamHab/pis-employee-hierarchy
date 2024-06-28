import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchPositions, selectPositions, selectLoading, selectError, deletePosition } from '../store/positionSlice';
import { Table, Button, Modal } from '@mantine/core';
import { IconEdit, IconTrash, IconChevronDown } from '@tabler/icons-react';
import PositionDetails from './PositionDetails';
import { IPosition } from '../models/types';
import { useAppDispatch } from '../store/hook';

interface PositionListProps {}

const PositionList: React.FC<PositionListProps> = () => {
  const dispatch = useAppDispatch();
  const positions: IPosition[] = useSelector(selectPositions);
  const loading: boolean = useSelector(selectLoading);
  const error: string | null = useSelector(selectError);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);
  
  const handleExpandToggle = (parentId: number) => {
    setExpandedRows((prev) => 
      prev.includes(parentId) ? prev.filter(id => id !== parentId) : [...prev, parentId]
    );
  };

  const handleDelete = (id: number) => {
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
            <td className={`pl-${level * 4} px-6 py-4`}>{position.name}</td>
            <td className={`pl-${level * 4} px-6 py-4`}>{position.description}</td>
            <td className="px-6 py-4 flex items-center space-x-2" style={{ paddingLeft: `${level * 1.5}rem` }}>
              <IconEdit
                className="cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={() => handleEdit(position.id)}
              />
              <IconTrash
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDelete(position.id)}
              />
              {positions.some(child => child.parentId === position.id) && (
                <Button className='cursor-pointer bg-blue-400' onClick={() => handleExpandToggle(position.id)}>View Child</Button>
              )}
            </td>
          </tr>
          {expandedRows.includes(position.id) && (
            <tr key={`${position.id}-children`}>
              <td colSpan={4} className="p-0">
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
    <>
      <Table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
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
          }}
          positions={positions}
        />
      )}
    </>
  );
};

export default PositionList;

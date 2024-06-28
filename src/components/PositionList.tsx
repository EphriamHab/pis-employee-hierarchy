import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchPositions, selectPositions, selectLoading, selectError, deletePosition } from '../store/positionSlice';
import { Group, Button, Modal, Text, Box } from '@mantine/core';
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
  const [expandedNodes, setExpandedNodes] = useState<number[]>([]);
  const [selectedPositionId, setSelectedPositionId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const handleExpandToggle = (nodeId: number) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
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

  const renderTreeNodes = (parentId: number | null = null, level: number = 0) => {
    return positions
      .filter(position => position.parentId === parentId)
      .map(position => (
        <Box key={position.id} mb="md">
          <Group style={{ paddingLeft: `${level * 1.5}rem` }}  align="center">
            <Group>
              {positions.some(child => child.parentId === position.id) && (
                <IconChevronDown
                  size={18}
                  style={{ transform: expandedNodes.includes(position.id) ? 'rotate(180deg)' : 'rotate(0deg)', cursor: 'pointer' }}
                  onClick={() => handleExpandToggle(position.id)}
                />
              )}
              <Text>{position.name}</Text>
              <Text color="black">- {position.description}</Text>
            </Group>
            <Group gap="xs">
              <IconEdit
                className="cursor-pointer"
                color="blue"
                size={18}
                onClick={() => handleEdit(position.id)}
              />
              <IconTrash
                className="cursor-pointer"
                color="red"
                size={18}
                onClick={() => handleDelete(position.id)}
              />
            </Group>
          </Group>
          {expandedNodes.includes(position.id) && (
            <Box mt="sm">{renderTreeNodes(position.id, level + 1)}</Box>
          )}
        </Box>
      ));
  };

  return (
    <>
      {loading && <Text>Loading...</Text>}
      {error && <Text color="red">{error}</Text>}
      <Box>
        {renderTreeNodes()}
      </Box>
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

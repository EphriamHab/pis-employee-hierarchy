import React from 'react';
import { Table, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const Position = () => {
  const rows = elements.map((element) => (
    <tr key={element.name} className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4">{element.position}</td>
      <td className="px-6 py-4">{element.name}</td>
      <td className="px-6 py-4">{element.symbol}</td>
      <td className="px-6 py-4">{element.mass}</td>
    </tr>
  ));

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button className='bg-blue-400'>Add Position</Button>
      </div>
      <Table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 tracking-wider">Position ID</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 tracking-wider">Position Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">{rows}</tbody>
      </Table>
    </div>
  );
};

export default Position;

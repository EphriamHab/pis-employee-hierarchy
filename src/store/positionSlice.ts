import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

import { IPosition } from '../models/types';


interface PositionState {
  positions: IPosition[];
}

const initialState: PositionState = {
  positions: [
    {
      id: 1, name: 'CEO', description: 'Chief Executive Officer', parentId: null,
      children: []
    },
    {
      id: 2, name: 'CTO', description: 'Chief Technology Officer', parentId: 1,
      children: []
    },
    {
      id: 3, name: 'CFO', description: 'Manages projects', parentId: 1,
      children: []
    },
    {
      id: 4, name: 'Project Manager', description: 'Manages projects', parentId: 2,
      children: []
    },
  ],
};

const positionSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    addPosition: (state, action: PayloadAction<IPosition>) => {
      state.positions.push(action.payload);
    },
    updatePosition: (state, action: PayloadAction<IPosition>) => {
      const index = state.positions.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.positions[index] = action.payload;
      }
    },
    deletePosition: (state, action: PayloadAction<number>) => {
      state.positions = state.positions.filter(p => p.id !== action.payload);
    },
    setPositions: (state, action: PayloadAction<IPosition[]>) => {
      state.positions = action.payload;
    },
  },
});

export const { addPosition, updatePosition, deletePosition, setPositions } = positionSlice.actions;
export const selectPositions = (state: RootState) => state.positions.positions;
export default positionSlice.reducer;

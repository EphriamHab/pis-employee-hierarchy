import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import  positionApi from '../utils/positionApi';
import { IPosition } from '../models/types';

interface PositionState {
  positions: IPosition[];
  loading: boolean;
  error: string | null;
}

const initialState: PositionState = {
  positions: [],
  loading: false,
  error: null,

};

const positionSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    addPosition: (state, action: PayloadAction<IPosition>) => {
      state.positions.push(action.payload);
    },
    updatePosition: (state, action: PayloadAction<IPosition>) => {
      const index = state.positions.findIndex(p => p.id === Number(action.payload.id));
      if (index !== -1) {
        state.positions[index] = action.payload;
        console.log('State after update:', state.positions[index]);
      } 
    },
    deletePosition: (state, action: PayloadAction<number>) => {
      state.positions = state.positions.filter(p => p.id !== action.payload);
    },
    setPositions: (state, action: PayloadAction<IPosition[]>) => {
      state.positions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addPosition, updatePosition, deletePosition, setPositions, setLoading,setError,} = positionSlice.actions;

export const fetchPositions = (): AppThunk => async dispatch => {
  dispatch(setLoading(true));
  try {
    const positions = await positionApi.fetchPositions();
    dispatch(setPositions(positions.map((position:any) => ({
      ...position,
      id: Number(position.id), 
    }))));
    dispatch(setLoading(false));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      dispatch(setLoading(false));
    } else {
      console.error('An unknown error occurred');
    }
  }
};

export const createPosition = (position: IPosition): AppThunk => async dispatch => {
  try {
    const newPosition = await positionApi.createPosition(position);
    dispatch(addPosition(newPosition));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

export const editPosition = (position: IPosition): AppThunk => async dispatch => {
  try {
    const updatedPosition = await positionApi.updatePosition(position);
    dispatch(updatePosition(updatedPosition));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

export const removePosition = (id: number): AppThunk => async dispatch => {
  try {
    await positionApi.deletePosition(id);
    dispatch(deletePosition(id));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};

export const selectPositions = (state: RootState) => state.positions.positions;
export const selectLoading = (state: RootState) => state.positions.loading;
export const selectError = (state: RootState) => state.positions.error;

export default positionSlice.reducer;

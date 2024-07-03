import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
import positionApi from "../utils/positionApi";
import { IPosition } from "../models/types";

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
  name: "positions",
  initialState,
  reducers: {
    addPosition: (state, action: PayloadAction<IPosition>) => {
      state.positions.push(action.payload);
    },
    updatePosition: (state, action: PayloadAction<IPosition>) => {
      const index = state.positions.findIndex(
        (p) => p.id === Number(action.payload.id)
      );
      if (index !== -1) {
        state.positions[index] = action.payload;
      }
    },
    deletePosition: (state, action: PayloadAction<number>) => {
      state.positions = state.positions.filter((p) => p.id !== action.payload);
    },
    deletePositions: (state, action: PayloadAction<number[]>) => {
      state.positions = state.positions.filter(
        (p) => !action.payload.includes(p.id)
      );
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

export const {
  addPosition,
  updatePosition,
  deletePosition,
  deletePositions,
  setPositions,
  setLoading,
  setError,
} = positionSlice.actions;

export const fetchPositions = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const positions = await positionApi.fetchPositions();
    dispatch(
      setPositions(
        positions.map((position: any) => ({
          ...position,
          id: Number(position.id),
        }))
      )
    );
    dispatch(setLoading(false));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setLoading(false));
    } else {
      console.error("An unknown error occurred");
    }
  }
};

export const createPosition =
  (position: IPosition): AppThunk =>
  async (dispatch) => {
    try {
      const newPosition = await positionApi.createPosition(position);
      dispatch(addPosition(newPosition));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

export const editPosition =
  (position: IPosition): AppThunk =>
  async (dispatch) => {
    try {
      const updatedPosition = await positionApi.updatePosition(position);
      dispatch(updatePosition(updatedPosition));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

export const removePosition =
  (id: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      const positions = getState().positions.positions;
      const allPositionsToDelete = getAllPositionsToDelete(positions, id);

      for (const positionId of allPositionsToDelete) {
        await positionApi.deletePosition(positionId);
        dispatch(deletePosition(positionId));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

const getAllPositionsToDelete = (
  positions: IPosition[],
  parentId: number
): number[] => {
  const positionsToDelete = [parentId];
  const childPositions = positions.filter(
    (position) => position.parentId === parentId
  );

  for (const childPosition of childPositions) {
    positionsToDelete.push(
      ...getAllPositionsToDelete(positions, childPosition.id)
    );
  }

  return positionsToDelete;
};

export const selectPositions = (state: RootState) => state.positions.positions;
export const selectLoading = (state: RootState) => state.positions.loading;
export const selectError = (state: RootState) => state.positions.error;

export default positionSlice.reducer;

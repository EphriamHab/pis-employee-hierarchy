// positionApi.ts
import axios from 'axios';
import { IPosition } from '../models/types';

const API_URL = 'http://localhost:5000/positions';

 const fetchPositions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching positions');
  }
};

 const createPosition = async (position: IPosition) => {
  try {
    const response = await axios.post(API_URL, position);
    return response.data;
  } catch (error) {
    throw new Error('Error creating position');
  }
};

 const updatePosition = async (position: IPosition) => {
  try {
    const response = await axios.put(`${API_URL}/${position.id}`, position);
    return response.data;
  } catch (error) {
    throw new Error('Error updating position');
  }
};

 const deletePosition = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error('Error deleting position');
  }
};

const positionApi = {
    fetchPositions,
    createPosition,
    updatePosition,
    deletePosition,
  };
  
export default positionApi;
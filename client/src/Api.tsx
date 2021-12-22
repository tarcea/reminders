import axios, { AxiosResponse } from "axios";

const apiUrl: string = 'http://localhost:3001';

export const getLists = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoLists: AxiosResponse<ApiDataType> = await axios.get(
      `${apiUrl}/lists`
    );
    return todoLists;
  } catch (error) {
    throw error;
  }
};

import axios, { AxiosResponse } from "axios";

const apiUrl: string = process.env.REACT_APP_API_URL!;

export const getLists = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const lists: AxiosResponse<ApiDataType> = await axios.get(
      `${apiUrl}/lists`
    );
    return lists;
  } catch (error) {
    throw error;
  }
};

export const getListById = async (id: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const list: AxiosResponse<ApiDataType> = await axios.get(
      `${apiUrl}/lists/${id}`
    );
    return list;
  } catch (error) {
    throw error;
  }
};

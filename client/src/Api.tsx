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

export const addList = async (
  formData: IList
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const list: Omit<IList, "_id"> = {
      name: formData.name,
      done: false,
    };

    const saveList: AxiosResponse<ApiDataType> = await axios.post(
      `${apiUrl}/lists`,
      list
    );
    return saveList;
  } catch (error) {
    throw error;
  }
};

export const deleteList = async (
  id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    console.log(`${apiUrl}/lists/${id}`)
    const deletedTodoList: AxiosResponse<ApiDataType> = await axios.delete(
      `${apiUrl}/lists/${id}`
    );
    return deletedTodoList;
  } catch (error) {
    throw error;
  }
};

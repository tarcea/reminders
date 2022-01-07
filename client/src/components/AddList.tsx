import React, { useState, FC, FormEvent, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import './styles/AddList.css';
import './styles/EditTodo.css';

const AddList: FC<{ saveList: Function }> = ({ saveList }) => {
  const initialState: Omit<IList, '_id' | 'done'> = { name: '', userId: '' };
  const [formData, setFormData] = useState(initialState);
  const value = useContext(UserContext);
  const { userId } = value!.currentUser;

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  console.log(userId)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveList({ ...formData, userId });
    console.log({ ...formData, userId })
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="add-list__form">
      <div>
        <input
          className='add-list'
          value={formData.name}
          placeholder='add a new list'
          onChange={handleChange}
          type='text'
          id='name'
          required
        />
      </div>
      <div>
        <button className="add-list--create">Create List</button>
      </div>
    </form >
  );
};

export default AddList;

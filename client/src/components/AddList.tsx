import React, { useState, FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const AddList: FC<{ saveList: Function }> = ({ saveList }) => {
  const initialState: Omit<IList, '_id' | 'done'> = { name: '' };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveList(formData);
    setFormData(initialState);
  };

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <div>
        <input
          className='add-list'
          value={formData.name}
          placeholder='your list name'
          onChange={handleChange}
          type='text'
          id='name'
          required
        />
      </div>
      <div>
        <button>Create List</button>
      </div>
    </form>
  );
};

export default AddList;

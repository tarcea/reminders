import React, { useEffect, useState, MouseEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import { getLists, addList, deleteList, addTodo } from '../Api';
import AddList from './AddList';
import List from './List';

const AllLists: FC<{ setCurrentId: Function, currentId: string }> = ({ setCurrentId, currentId }) => {
  const [lists, setLists] = useState<IList[]>([]);
  // const [currentId, setCurrentId] = useState<string>('');
  const fetchLists = async () => {
    try {
      const fetchedLists = await getLists();
      const lists: IList[] = fetchedLists.data.lists;
      setLists(lists);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleAddList = (formData: IList) => {
    addList(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! list not saved");
        }
        setLists(data.lists);
        fetchLists();
      })
      .catch(err => console.log(err));
  };

  const handleDeleteList = (id: string) => {
    deleteList(id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! TodoList not deleted");
        }
        setLists(data.lists);
        fetchLists();
      })
      .catch(err => console.log(err));
  };

  const handleAddTodo = (id: string) => {
    console.log(id);
  };

  return (
    <div>
      <AddList saveList={handleAddList} />
      All Lists {lists?.length}
      <ul>
        {lists?.map(li => (
          <li
            key={li._id}
            onClick={() => setCurrentId(li._id)}
          >
            <Link to={`/lists/${li._id}`}>{li.name}</Link>
            <button
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                handleDeleteList(li._id);
              }}>
              delete
            </button>
            <button
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                handleAddTodo(li._id);
              }}>
              add todos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllLists;
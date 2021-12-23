import React, { useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { getLists, addList, deleteList } from '../Api';
import AddList from './AddList';
import List from './List';

const AllLists: React.FC = () => {
  const [lists, setLists] = useState<IList[]>([]);
  const [currentId, setCurrentId] = useState<string>('');
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

  const saveList = (formData: IList) => {
    addList(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! list not saved");
        }
        setLists(data.lists);
        // fetchLists();
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


  return (
    <div>
      <AddList saveList={saveList} />
      <div>
        <List currentId={currentId} />
      </div>
      All Lists
      <ul>
        {lists?.map(li => (
          <li
            key={li._id}
            onClick={() => setCurrentId(li._id)}
          >
            {li.name}
            <button onClick={(e: MouseEvent) => {
              e.stopPropagation();
              handleDeleteList(li._id)
            }}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllLists;
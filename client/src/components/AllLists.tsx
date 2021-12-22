import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLists } from '../Api';
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
  }, [])

  return (
    <div>
      All Lists
      <ul>
        {lists.map(li => (
          <li
            key={li._id}
            onClick={() => setCurrentId(li._id)}
          >
            {li.name}
          </li>
        ))}
      </ul>
      <div>
        <List currentId={currentId} />
      </div>
    </div>
  );
};

export default AllLists;
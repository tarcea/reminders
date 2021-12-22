import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLists } from '../Api';

const AllLists: React.FC = () => {
  const [lists, setLists] = useState<IList[]>([]);

  const fetchLists = () => {
    getLists()
      .then(({ data: { lists } }: IList[] | any) =>
        setLists(lists)
      )
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    fetchLists();
  }, [])

  return (
    <div>
      All Lists
      <ul>
        {lists.map(li => (
          <li>{li.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllLists;
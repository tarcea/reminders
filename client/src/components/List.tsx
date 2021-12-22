import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getListById } from '../Api';

const List: FC<{ currentId: string }> = ({ currentId }) => {
  const [list, setList] = useState<IList>();

  const fetchListById = async (id: string) => {
    try {
      const fetchedList = await getListById(id);
      setList(fetchedList.data.list);

    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchListById(currentId);
  }, [currentId]);

  return (
    <div>
      {list?.todos?.length}
    </div>
  );
};

export default List;
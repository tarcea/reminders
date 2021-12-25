import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getListById } from '../Api';

const List: FC<{ currentId: string }> = ({ currentId }) => {
  const [list, setList] = useState<IList>();
  const { listId } = useParams();

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

  useEffect(() => {
    if (listId) {
      fetchListById(listId);
    }
  }, [listId]);

  return (
    <div>
      {list?.todos?.length} -- {list?.name}
    </div>
  );
};

export default List;
import React, { useEffect, useState, MouseEvent, FC } from 'react';
import './styles/AllLists.css'
import { Link } from 'react-router-dom';
import { getLists, addList, deleteList, addTodo } from '../Api';
import AddList from './AddList';
import { useNavigate } from "react-router-dom";
import List from './List';

const AllLists: FC<{ setCurrentId: Function, currentId: string }> = ({ setCurrentId, currentId }) => {
  const [lists, setLists] = useState<IList[]>([]);
  const navigate = useNavigate();

  const fetchLists = async () => {
    try {
      const fetchedLists = await getLists();
      const lists: IList[] = fetchedLists.data.lists.reverse();
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

  const today: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  };

  return (
    <div className="lists__container">
      <AddList saveList={handleAddList} />
      All Lists {lists?.length}
      <div className="list__items">
        {lists?.map(li => {
          const daysAgo = Math.floor((today.valueOf() - new Date(li.createdAt!).valueOf()) / (1000 * 3600 * 24))
          return (
            <div
              className="list__item"
              key={li._id}
              onClick={() => navigate(`/lists/${li._id}`)}
            // onClick={() => setCurrentId(li._id)}
            >
              <div className="list__item--dategroup">
                <p>
                  {new Date(li.createdAt!).toLocaleString('en-GB', options)}
                </p>
                <p className="list__item--daysago">
                  {daysAgo < 9 && (daysAgo === 0
                    ? 'today'
                    : daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`)}
                </p>
              </div>
              <h3>{li.name}</h3>
              <button
                className="list-item__button"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  handleDeleteList(li._id);
                }}>
                delete
              </button>
              <Link
                to={`/lists/${li._id}`}
              >
                <button
                  className="list-item__button"
                  onClick={(e: MouseEvent) => {
                    e.stopPropagation();
                  }}>
                  edit
                </button>
              </Link>
            </div>)
        })}
      </div>
    </div>
  );
};

export default AllLists;
import React, { useEffect, useState, MouseEvent, FC, useContext } from 'react';
import './styles/AllLists.css'
import { Link } from 'react-router-dom';
import { getLists, addList, deleteList, logOut } from '../Api';
import AddList from './AddList';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';

const AllLists: FC = () => {
  const [lists, setLists] = useState<IList[]>([]);
  const [userId, setUserId] = useState<String>('');
  const { currentUser, setCurrentUser } = useContext(UserContext)!;

  const navigate = useNavigate();

  const fetchLists = async () => {
    try {
      const fetchedLists = await getLists();
      const lists: IList[] = fetchedLists.data.lists?.reverse();
      const userId: string = fetchedLists.data.userId!;
      setLists(lists);
      setUserId(userId)
    } catch (err) {
      let message;
      if (err instanceof Error) {
        message = err.message;
        if (message.includes('401')) {
          logOut(setCurrentUser, navigate)
        }
      }
      console.log(err, message)
    }
  };

  useEffect(() => {
    fetchLists();
  }, [userId, currentUser]);

  const handleAddList = (formData: IList) => {
    addList(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! list not saved');
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
          throw new Error('Error! list not deleted');
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
      <div className="todo-list__pill">
        {lists?.length}
      </div>
      <AddList saveList={handleAddList} />
      <div className="list__items">
        {lists?.map(li => {
          const daysAgo = Math.floor((today.valueOf() - new Date(li.createdAt!).valueOf()) / (1000 * 3600 * 24))
          return (
            <div
              className="list-item"
              key={li._id}
              onClick={() => navigate(`/lists/${li._id}`)}
            >
              <div className="list-item--dategroup">
                <p className="list-item--daysago">
                  created {' '} {daysAgo === 0
                    ? 'today'
                    : daysAgo === 1 ? `${daysAgo} day ago` : `${daysAgo} days ago`}
                </p>
              </div>
              <div className="list-item__content">
                <h3>{li.name}</h3>
                <div className="list-item__actions">
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
                </div>
              </div>
              <p className="list-item--dategroup">
                updated on {new Date(li.updatedAt!).toLocaleString('en-GB', options)}
              </p>
            </div>)
        })}
      </div>
    </div>
  );
};

export default AllLists;
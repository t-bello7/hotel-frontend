/* eslint-disable */

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import { getUsers } from "../redux/actions/UserAction";
import Loader from '../components/Loader';

function User({ itemsPerPage }) {
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;
  // const adminn = userInfo?.admin;
  // if (!adminn) {
  //   return <h1>NOt found</h1>;
  // }

  const [itemOffset, setItemOffset] = useState(0);

  const usersLists = useSelector((state) => state.usersList);
  const { loading, usersList } = usersLists;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers ());
  }, [dispatch]);
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };


  const updateHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(updateUser(id));
    }
  };

  const items = usersList;
  const currentItems = items?.slice(itemOffset, itemOffset + itemsPerPage);
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setItemOffset(selectedPage * itemsPerPage);
  };

  return (
    <>
      {loading && <Loader />}

      {items.map((currentItems) => (
          <UserList
          currentItems={currentItems}
          deleteHandler={deleteHandler}
          updateHandler={updateHandler}
        />
        ))}
    </>
  );
}

export default User;

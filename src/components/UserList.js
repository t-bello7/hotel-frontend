/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../redux/actions/UserAction";

const UserList = ({
  currentItems,
  updateHandler,
  deleteHandler,
}) => {
  const [toggle, setToggle] = useState(false);
  const usersLists = useSelector((state) => state.usersList);
  const { loading, usersList } = usersLists;

  const dispatch = useDispatch();

  const HandleToggleChange = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <h1>Users List</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">
                Name
              </th>
              <th scope="col">
                Email
              </th>
              <th scope="col">
                Role
              </th>
              <th scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.slice()./*sort((a , b) => a.admin - b.admin).*/map((user) => (
              <tr key={user.id}>
                <td
                  scope="row"
                >
                  {user.name}
                </td>
                <td>
                  {user.email}
                </td>
                {user.admin === true ? (
                  <td>
                    <button>
                      Admin
                    </button>
                  </td>
                ) : (
                  <td>
                    User
                  </td>
                )}
                <td>
                  <button
                    onClick={() => deleteHandler(user.id)}
                  >
                    Delete
                  </button>
                  <>
                    <div
                      onClick={() => updateHandler(user.id)}
                    >
                      {user.admin === true ? (
                        <div>
                          <input
                            type="checkbox"
                            name="toggle"
                            id="toggle"
                            checked={toggle}
                            onChange={HandleToggleChange}
                          />
                          <label
                            htmlFor="toggle"
                          ></label>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="checkbox"
                            name="toggle"
                            id="toggle"
                            checked={toggle}
                            onChange={HandleToggleChange}
                          />
                          <label
                            htmlFor="toggle"
                          ></label>
                        </div>
                      )}
                    </div>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

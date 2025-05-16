import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  // const [disabledButtons, setDisabledButtons] = useState({});
  const { authorizationToken,user } = useAuth();


  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5200/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      // console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete the user on delete button
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5200/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log("users after delete", data);

      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Promote the user
  const promoteUser = async (id) => {
    try {
      // setDisabledButtons((prev) => ({ ...prev, [id]: true })); // Disable this button

      const response = await fetch(
        `http://localhost:5200/api/admin/users/makeAdmin/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log("User is successfully promoted to administrator!", data);

      if (response.ok) {
        getAllUsersData();
        toast.success("User is successfully promoted to administrator!");
      }
      // else {
      //   toast.error(data?.message || "Failed to promote user");
      //   setDisabledButtons((prev) => ({ ...prev, [id]: false })); // Re-enable on failure
      // }
    } catch (error) {
      console.log(error);
      toast.success(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <div className="admin-container">
        <h1 className="admin-header">Admin Users</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Promote</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link
                      to={`/admin/users/${user._id}/edit`}
                      className="edit-link"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="make-admin"
                      onClick={() => promoteUser(user._id)}
                      // disabled={
                      //   disabledButtons[user._id]
                      //     ? "Promoting..."
                      //     : user.isAdmin === "true"
                      //     ? "Promoted"
                      //     : "Promot"
                      // }
                    >
                      {user.isAdmin === "true" ? "Promoted" : "Promote"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUsers;

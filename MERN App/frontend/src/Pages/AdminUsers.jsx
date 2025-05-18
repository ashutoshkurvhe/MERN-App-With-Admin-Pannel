import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

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

  
  //Upadate Admin Role
  const updateAdminRole = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5200/api/admin/users/updateAdminRole/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      console.log("Admin Role Updated Successfully:", data);

      if (response.ok) {
        getAllUsersData(); // Refresh user list

        if (data.isAdmin) {
          toast.success("User is promoted to admin");
        } else {
          toast.success("User is demoted from admin");
        }
      } else {
        toast.error(data.message || "Admin role update failed");
      }
    } catch (error) {
      console.error("Admin Role Update Error:", error);
      toast.error("Something went wrong!");
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
              <th>Role</th>
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
                      onClick={() => updateAdminRole(user._id)}
                    >
                      {user.isAdmin === true ? "Promoted" : "Promote"}
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

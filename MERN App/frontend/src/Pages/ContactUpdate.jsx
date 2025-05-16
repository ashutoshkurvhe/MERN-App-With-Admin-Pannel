import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "./AdminUpdate.css"

const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    // password: "",
  });

  const params = useParams();
  // console.log("params single user:", params);
  const { authorizationToken } = useAuth();

  //get dingle user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5200/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      console.log(`users single data: ${data}`);
      setData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);



  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  // to update the data dynamicaly

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5200/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Updated Successfully");
      } else {
        toast.success("Failed to update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  return (
    <section className="admin-update-container">
      <div>
        <h1 className="admin-update-title">Update User Data</h1>
      </div>
      <div>
        {/* contact form content actual */}
        <section>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </section>
      </div>
    </section>
  );
};

export default AdminUpdate;

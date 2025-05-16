import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Admin-Layout.css";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  // console.log("admin layout", user.isAdmin);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="outer-cont">
        <div className="admin-cont">
          <nav>
            <h1>Admin Pannel</h1>
            <div className="admin-navs">
              <ul>
                <li>
                  <NavLink to="/admin/users">users</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/contacts">contacts</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/register">register</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/login">login</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;

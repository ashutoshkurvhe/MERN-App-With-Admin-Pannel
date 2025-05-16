import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "./AdminContacts.css"

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch("http://localhost:5200/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      // console.log(data);
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete the contact on delete button
  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5200/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log("contacts after delete", data);

      if (response.ok) {
        getContactsData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title">Admin Contacts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => {
              return (
                <tr key={index}>
                  <td>{contact.username}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>
                    <button className="actionBtn deleteBtn" onClick={()=> deleteContact(contact._id)}>Delete</button>
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

export default AdminContacts;

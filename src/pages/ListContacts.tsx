import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../constants/axios";
import contactInterface from "../interfaces/contactInterface";
import "./ListContacts.css";

const ListContacts = () => {
  const [data, setData] = useState<contactInterface[]>([]);
  const id = localStorage.getItem("id");

  const [searchField, setSearchField] = useState("");
  const [filteredContacts, setFilterContacts] = useState<contactInterface[]>(
    []
  );

  useEffect(() => {
    axios
      .post("/contacts", { id })
      .then((res) => {
        const newData = res.data.data;
        if (newData.length !== 0) {
          setData(newData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const newFilteredContacts = data.filter((item) => {
      return item.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterContacts(newFilteredContacts);
  }, [data, searchField]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const deleteHandler = async (id: number) => {
    try {
      const res = await axios.delete(`/contacts/${id}`);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="list-title">CONTACT LISTS</h1>
      <div className="search-box">
        <input
          className="search-input"
          type="search"
          placeholder="Search Contacts"
          onChange={onSearchChange}
        />
      </div>
      <table style={{ width: "100%", textAlign: "center" }}>
        <tr style={{ height: "80px" }}>
          <th>Photograph</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>

        {filteredContacts.map((item: contactInterface) => {
          return (
            <tr key={item.id} style={{ height: "80px" }}>
              <td>
                <img
                  src={item.photograph}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "100%",
                  }}
                  alt={item.name}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>
                <Link className="edit-btn" to={`/contacts/update/${item.id}`}>
                  Edit
                </Link>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ListContacts;

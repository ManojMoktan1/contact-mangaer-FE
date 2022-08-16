import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../constants/axios";
import contactInterface from "../interfaces/contactInterface";
import './ListContacts.css'

const ListContacts = () => {
  const [data, setData] = useState<contactInterface[]>([]);

  //extra
  const [searchField, setSearchField] = useState('');
//   const[contacts, setContacts] = useState([]);
  const[filteredContacts, setFilterContacts] = useState<contactInterface[]>([]);

  useEffect(() => {
    axios
      .get("/contacts")
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

  //extra
  useEffect(()=>{
    const newFilteredContacts = data.filter((item)=>{
      return item.name.toLocaleLowerCase().includes(searchField);
      });
      setFilterContacts(newFilteredContacts);

  },[data, searchField]);

  const onSearchChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);

  }

  const deleteHandler = async (id:number)=>{
    try{
     const res = await axios.delete(`/contacts/${id}`);
      if(res.status === 200){
        window.location.reload();
      }

    }catch(err){
      console.log(err);

    }


  }

  return (
    <div>
      <h1>CONTACT LISTS</h1>
      <div className="search-box">
        <input  
          className="search-input"       
          type='search' 
          placeholder='Search Contacts'
          onChange={onSearchChange}
          />
        </div>
        <table style={{width: '100%', textAlign: 'center'}}>
            <tr style={{height:'80px'}}>
                <th>Photograph</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Delete</th>
            </tr>
            

      {filteredContacts.map((item: contactInterface) => {
        return (
            <tr key={item.id} style={{height:'80px'}}>
                <td>
                    <img src= {item.photograph} style={{width: '60px',height: '60px', borderRadius: '100%'}} alt={item.name} />
                </td>
                <td>
                    {item.name} 
                </td>
                <td>
                    {item.email}
                </td>
                <td>
                    {item.address}
                </td>
                <td>
                    {item.phone}
                </td>
                <td>
                    <button style={{borderRadius: '10px', backgroundColor:'black', padding: '6px', cursor: 'pointer'}} 
                      onClick={() => deleteHandler(item.id)}>
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

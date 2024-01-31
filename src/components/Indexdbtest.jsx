import { Stores, initDB, deleteDb } from "../services/db";
import {addData, getStoreData, deleteData } from "../services/dbCrud";
import React from "react";
import { useState } from "react";

export default function Home() {
    const [error, setError] = useState('')

    const handleAddUser = async (e) => {
        e.preventDefault();
      
        const target = e.target;
        const name = target.name.value;
        const email = target.email.value;
        const id = Date.now();
      
        if (name.trim() === '' || email.trim() === '') {
          alert('Please enter a valid name and email');
          return;
        }
      
        try {
          const res = await addData(Stores.Users, { name, email, id });
          handleGetUsers();
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Something went wrong');
          }
        }
      };

    const [isDBReady, setIsDBReady] = useState(false);
  
    const handleInitDB = async () => {
      const status = await initDB();
      setIsDBReady(status);
    };
    const handleDeleteDB = async () => {
        deleteDb()
    }
    const [users, setUsers] = useState([]);

    // declare this async method
    const handleGetUsers = async () => {
      const usersData = await getStoreData(Stores.Users);
      setUsers(usersData);
    };

    const handleRemoveUser = async (id) => {
        try {
          await deleteData(Stores.Users, id);
          // refetch users after deleting data
          handleGetUsers();
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Something went wrong deleting the user');
          }
        }
      };
  
    return (
      <main style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h1>IndexedDB</h1>
        <button onClick={handleDeleteDB}>Delete Db</button>
{!isDBReady ? (
    <button onClick={handleInitDB}>Init DB</button>
  ) : (
    <>
      <h2>DB is ready</h2>
      {/* add user  form */}
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <button type="submit">Add User</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  )}    

  <br /><br />
  {users.length > 0 && (
      <table>
       
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>ID</td>
            {/* header */}
            <td>Actions</td>
          </tr>
        
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.id}</td>
              {/* here the button */}
              <td>
                <button onClick={() => handleRemoveUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
            
      </main>
    );
  }

  

  
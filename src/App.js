import { useEffect, useState } from "react";
import { Button } from "@blueprintjs/core";
import "./App.css";
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    useEffect(
        ()=>{
            fetch('https://jsonplaceholder.typicode.com/users')
            .then( (response) => response.json() )
            .then( (json) => setUsers(json))
            //https://jsonplaceholder.typicode.com/todos/users
        }
        ,[])

  return (
    <div className="App">
      <table className="bpr-html-table modifier">
        <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Action</th>
        </thead>
        <tbody>
            {users.map(user =>
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.website}</td>
                    <td>
                        <Button intent="primary">Update</Button>
                        <Button intent="danger">Delete</Button>
                    </td>
                </tr>
            )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

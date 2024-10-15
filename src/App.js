import { useEffect, useState } from "react";
import { Button, EditableText, InputGroup, Toaster } from "@blueprintjs/core";
import "./App.css";
import "./App.css";

const AppToaster = Toaster.create(
    {
        position: "top"
    }
)

function App() {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newWebsite, setNewWebsite] = useState("");
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => setUsers(json));
        //https://jsonplaceholder.typicode.com/todos/users
    }, []);

    function addUser() {
        const name = newName.trim();
        const email = newEmail.trim();
        const website = newWebsite.trim();

        // Check if all fields are filled
        if(name && email && website){
            // Make a POST request to add a new user
            fetch("https://jsonplaceholder.typicode.com/users",
                // Passing an object to say that we are POST-ing and not GET-ting
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        email,
                        website
                    }),
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }
            )
            .then((response) => response.json())
            .then(data => {
                // Update the users state with the new user
                setUsers([...users, data])
                AppToaster.show(
                    {
                        message: "User Added Successfully!",
                        intent: 'success',
                        timeout: '3000'
                    }
                )
                setNewName("");
                setNewEmail("");
                setNewWebsite("");

            })
        }
    }

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
                            <td><EditableText value={user.email}/></td>
                            <td><EditableText value={user.website}/></td>
                            <td>
                                <Button intent="primary">Update</Button>
                                <Button intent="danger">Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>

                <tfoot>
                    <tr>
                        <td></td> {/*  empty <td> for allignment */}
                        <td>
                            <InputGroup
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Enter username..."
                            />
                        </td>
                        <td>
                            <InputGroup
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="Enter your Email..."
                            />
                        </td>
                        <td>
                            <InputGroup
                                value={newWebsite}
                                onChange={(e) => setNewWebsite(e.target.value)}
                                placeholder="Enter you website..."
                            />
                        </td>
                        <td>
                            <Button intent="success" onClick={addUser}>
                                Add User
                            </Button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default App;

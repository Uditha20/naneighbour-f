import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/getUser');
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/deleteUser/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        alert('Failed to delete user: ' + err.message);
      }
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/updateUser/${currentUser._id}`, currentUser);
      setUsers(users.map(user => user._id === currentUser._id ? response.data : user));
      setShowModal(false);
      
      
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/getUser');
          setUsers(response.data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUsers();  
      
    } catch (err) {
      alert('Failed to update user: ' + err.message);
    }
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">User Management</h2>
      {error && <p className="text-danger">{error}</p>}
      
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
          
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>NIC</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
            
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.nic}</td>

              <td>{user.role}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && currentUser && (
        <div className="modal" tabIndex="-1" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={currentUser.name} 
                      onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control"
                      value={currentUser.email} 
                      onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={currentUser.phone} 
                      onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })} 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={currentUser.address} 
                      onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })} 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">NIC</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={currentUser.nic} 
                      onChange={(e) => setCurrentUser({ ...currentUser, nic: e.target.value })} 
                    />
                  </div>
                  {/* <div className="mb-3">
                    <label className="form-label">NIC Photo</label>
                    <input 
                      type="file" 
                      className="form-control"
                      onChange={(e) => setCurrentUser({ ...currentUser, nicPhoto: e.target.files[0] })} 
                    />
                  </div> */}
                  {/* <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select 
                      className="form-select"
                      value={currentUser.role} 
                      onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div> */}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateUser}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;

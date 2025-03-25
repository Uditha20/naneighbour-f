import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    nic: "",
    nicPhoto: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword, phone, address, nic, nicPhoto } = formData;

  const onChange = (e) => {
    if (e.target.name === "nicPhoto") {
      const file = e.target.files[0];
      if (file && file.size > 3 * 1024 * 1024) {
        setError("NIC photo size should not exceed 3MB");
        return;
      }
      setFormData({ ...formData, nicPhoto: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    if (!nicPhoto) {
      setError('NIC photo is required');
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);
    formDataToSend.append('phone', phone);
    formDataToSend.append('address', address);
    formDataToSend.append('nic', nic);
    formDataToSend.append('nicPhoto', nicPhoto);

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formDataToSend);
      setMessage(res.data.message);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        nic: '',
        nicPhoto: null
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Create an Account</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" value={email} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={phone} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" value={address} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="nic">NIC Number</label>
          <input type="text" id="nic" name="nic" value={nic} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="nicPhoto">Upload NIC Photo (Max 3MB)</label>
          <input type="file" id="nicPhoto" name="nicPhoto" onChange={onChange} accept="image/*" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={onChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
        </div>

        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;

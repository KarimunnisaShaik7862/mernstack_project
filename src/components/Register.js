import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register({ onClose }) { // Accept onClose prop
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
        phoneNumber: '',
        whatsappNumber: '',
        bloodGroup: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post('http://localhost:5000/api/users', formData);
            console.log(response.data);
            setSuccessMessage('User details submitted successfully');
            setFormData({
                name: '',
                email: '',
                dateOfBirth: '',
                phoneNumber: '',
                whatsappNumber: '',
                bloodGroup: ''
            });
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            setSuccessMessage('Failed to submit user details. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="Register">
            <button className="close-button" onClick={onClose}>×</button> {/* Use onClose prop to close the form */}
            <form className="user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="example@mail.com" 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\.com$" 
                        title="Please enter a valid email address that ends with .com"
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                        pattern="\d{10}" 
                        title="Please enter exactly 10 digits" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>WhatsApp Number:</label>
                    <input 
                        type="text" 
                        name="whatsappNumber" 
                        value={formData.whatsappNumber} 
                        onChange={handleChange} 
                        pattern="\d{10}" 
                        title="Please enter exactly 10 digits" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Blood Group:</label>
                    <select 
                        name="bloodGroup" 
                        value={formData.bloodGroup} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <button type="submit" disabled={submitting}>Submit</button>
                {submitting && <p>Submitting...</p>}
            </form>
            {successMessage && <p>{successMessage}</p>} 
        </div>
    );
}

export default Register;

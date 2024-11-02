// VolunteerPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import for useNavigate
import './VolunteerPage.css';

// Import images
import volunteerImage1 from './volunteer 1.jpg'; // Adjust the path according to your project structure
import volunteerImage2 from './volunteer 2.jpg'; // Adjust the path according to your project structure

const VolunteerPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: '',
        email: '',
        dob: '',
        duration: '',
        bloodDonor: '',
        bloodGroup: '',
        address: '',
        city: '',
    });

    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any validation or data processing you need here

        // Redirect to a new page after submission
        navigate('/thank-you'); // Replace with the actual URL where you want to navigate
    };

    return (
        <div className="volunteer-container">
            <div className="left-side">
                <img src={volunteerImage1} alt="Volunteer Quote" className="quote-image" />
                <h1>Join Us As a Volunteer</h1>
            </div>
            <div className="right-side">
                <div className="side-content">
                    <h2>A challenge may seem impossible when faced alone. But when forces join hands, that challenge seems like an opportunity to realize every dream.</h2>
                    <p>
                    Become a volunteer and join our mission to enhance the lives of those in our community. Your involvement allows us to provide nourishing meals to the homeless, offer essential supplies to families facing hardships, and promote education for children. By working together, we can inspire hope and drive meaningful change in the lives of many.</p>
                    <p>
                    Take action and make a difference—join us in our efforts today! Your contribution has the potential to transform lives, bringing support and care to those who need it most. Together, we can create a brighter future for our community.
                    </p>
                </div>
                <img src={volunteerImage2} alt="Volunteers" className="side-image" />
            </div>
            <div className="heading-container">
                <h2 className="register-heading">Register Your Account</h2>
            </div>
            <div className="form-container">
                <form className="volunteer-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone No</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter Your Phone No"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="duration">Volunteer Duration</label>
                                <select
                                    id="duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Duration</option>
                                    <option value="1 Month">1 Month</option>
                                    <option value="6 Months">6 Months</option>
                                    <option value="1 Year">1 Year</option>
                                    <option value="2 Years">2 Years</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="bloodDonor">Are you a Blood Donor?</label>
                                <select
                                    id="bloodDonor"
                                    name="bloodDonor"
                                    value={formData.bloodDonor}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bloodGroup">Blood Group</label>
                                <select
                                    id="bloodGroup"
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleInputChange}
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
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Enter Your Address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Enter Your City"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default VolunteerPage;

// Homelessdonate.js
import React, { useState } from 'react';
import './Wishvideo.css';
import volunteerImage1 from './wish video.jpg';
import volunteerImage2 from './Get a wish video.jpg';
import qrCodeImage from './qr code.jpg';

const Wishvideo = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    phoneNumber: '',
    parcelName: '',
    foodCount: '',
    totalAmount: '',
    birthdate: '',
    instagramID: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'foodCount') {
      const foodCount = parseInt(value, 10);
      const totalAmount = foodCount * 80;
      setFormData({
        ...formData,
        foodCount: value,
        totalAmount: totalAmount || '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="volunteer-page">
      <div className="left-side">
        <div className="image-stack">
          <img src={volunteerImage1} alt="Volunteer with homeless" className="stacked-image" />
          <img src={volunteerImage2} alt="Volunteer with stray dogs" className="stacked-image" />
        </div>
        <div className="side-content">
          <h2>Your Kindness Can Change a Life</h2>
          <p>With your donation, we can create a wish video that shares the stories of those in need, bringing warmth and hope to the homeless—one meal, one smile at a time</p>
        </div>
      </div>
      <div className="form-section">
        <div className="form-container">
          <form className="volunteer-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="donorName">Donor Name</label>
              <input
                type="text"
                id="donorName"
                name="donorName"
                placeholder="Enter Donor Name"
                value={formData.donorName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="donorEmail">Donor Email</label>
              <input
                type="email"
                id="donorEmail"
                name="donorEmail"
                placeholder="Enter Donor Email"
                value={formData.donorEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Birthdate</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="instagramID">Instagram ID (Optional)</label>
              <input
                type="text"
                id="instagramID"
                name="instagramID"
                placeholder="Enter Instagram ID"
                value={formData.instagramID}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="parcelName">Parcel Name</label>
              <input
                type="text"
                id="parcelName"
                name="parcelName"
                placeholder="Enter Parcel Name"
                value={formData.parcelName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group food-total-group">
              <div className="food-count-group">
                <label htmlFor="foodCount">Food Count</label>
                <input
                  type="number"
                  id="foodCount"
                  name="foodCount"
                  placeholder="Enter Food Count"
                  value={formData.foodCount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="total-amount-group">
                <label htmlFor="totalAmount">Total Amount</label>
                <input
                  type="number"
                  id="totalAmount"
                  name="totalAmount"
                  placeholder="Total Amount"
                  value={formData.totalAmount}
                  readOnly
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">Donate Now</button>
          </form>
        </div>
        <div className="upload-section">
          <div className="qr-code-container">
            <h3>Scan to Donate</h3>
            <img src={qrCodeImage} alt="QR Code" className="qr-code-image" />
          </div>
          <div className="upload-container">
            <label htmlFor="fileUpload">Upload File</label>
            <input
              type="file"
              id="fileUpload"
              name="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishvideo;

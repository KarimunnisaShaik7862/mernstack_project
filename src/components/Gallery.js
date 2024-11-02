import React, { useState, useEffect } from 'react';

const allowedEmails = [
    'karimunnisashaik7862@gmail.com',
    'manojlovely679@gmail.com',
    'vamsikiran198@gmail.com',
    '258gnanasekhar.v@gmail.com',
    'mounikamandangi99@gmail.com',
    'priyadarsinijaddu@gmail.com'
];

function Gallery() {
    const [email, setEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [photos, setPhotos] = useState([]);

    // Load photos from localStorage when the component mounts
    useEffect(() => {
        const allPhotos = allowedEmails.reduce((acc, email) => {
            const savedPhotos = JSON.parse(localStorage.getItem(email)) || [];
            return [...acc, ...savedPhotos];
        }, []);
        setPhotos(allPhotos);
    }, []);

    // Save photos to localStorage whenever the photos state changes
    useEffect(() => {
        if (email && isAuthenticated) {
            localStorage.setItem(email, JSON.stringify(photos.filter(photo => photo.uploadedBy === email)));
        }
    }, [photos, email, isAuthenticated]);

    const handleLogin = () => {
        if (allowedEmails.includes(email)) {
            setIsAuthenticated(true);
            setShowLogin(false); // Hide login form after successful login
        } else {
            alert('Access denied. You do not have permission to upload photos.');
        }
    };

    const handleUpload = (event) => {
        const files = event.target.files;
        const newPhotos = [];

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newPhotos.push({ src: e.target.result, uploadedBy: email });
                if (newPhotos.length === files.length) {
                    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px', backgroundColor: '#333', color: '#fff' }}>
                <div style={{ cursor: 'pointer', fontSize: '24px' }}>
                    <span onClick={() => setShowLogin(!showLogin)}>&#8230;</span>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo.src}
                            alt="" 
                            style={{ width: '300px', height: 'auto', margin: '10px' }} 
                        />
                    ))}
                </div>
                
                {!isAuthenticated && showLogin && (
                    <div style={{ textAlign: 'center' }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: '10px', marginBottom: '10px', width: '250px' }}
                        />
                        <br />
                        <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                            Login
                        </button>
                    </div>
                )}
                
                {isAuthenticated && (
                    <div style={{ textAlign: 'center' }}>
                        <input type="file" multiple onChange={handleUpload} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gallery;

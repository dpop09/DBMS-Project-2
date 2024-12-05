import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

function DrivewayPictures() {

    const [drivewayPictures, setDrivewayPictures] = useState([]);

    const { quoteId } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/davesmithdashboard');
    }

    const getDrivewayPictures = async () => {
        try {
            const response = await fetch('http://localhost:8081/get-driveway-pictures', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({ quote_id: quoteId })
            });
            const data = await response.json();
            setDrivewayPictures(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchDrivewayPictures = async () => {
            await getDrivewayPictures();
        }
        fetchDrivewayPictures();
    }, []);

    return (
        <>
            <div id="dp-div-container">
                <div id="dp-div-header">
                    <h1 id="dp-h1-title">Driveway Pictures of Quote {quoteId}</h1>
                    <button onClick={handleGoBack}>Go Back</button>
                </div>
                <div id="dp-div-gallery">
                    {drivewayPictures.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                            {drivewayPictures.map((picture) => (
                                <div key={picture.picture_id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                                    <img
                                        src={`${picture.picture_data}`}
                                        alt={`Driveway Picture ${picture.picture_id}`}
                                        style={{ width: '200px', height: 'auto' }}
                                    />
                                    <p>Picture ID: {picture.picture_id}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No pictures found for this quote.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default DrivewayPictures;
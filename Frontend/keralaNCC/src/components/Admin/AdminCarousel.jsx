import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, TextField, Box } from '@mui/material';
import './AdminCSS/AdminCarousel.css';

function AdminCarousel() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newImage, setNewImage] = useState({ image: '', caption: '' });

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:4000/carousel/images");
            const data = await response.json();
            if (data.status === "ok") {
                const sortedImages = data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setImages(sortedImages);
            } else {
                setError("Failed to load images");
            }
        } catch (error) {
            setError("Error fetching images. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleAddImage = async () => {
        const formData = new FormData();
        formData.append("caption", newImage.caption); // Add caption
        if (newImage.image) formData.append("image", newImage.image);
    
        try {
            const response = await fetch("http://localhost:4000/carousel/upload", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                fetchImages();
                setNewImage({ caption: '', image: '' });
            } else {
                const result = await response.json();
                setError(result.message);
            }
        } catch (error) {
            setError("Error adding image. Please try again.");
        }
    };
    

    const handleDeleteImage = async (index) => {
        const imageId = images[index]._id;

        try {
            const response = await fetch(`http://localhost:4000/carousel/image/${imageId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchImages();
            } else {
                const result = await response.json();
                setError(result.message);
            }
        } catch (error) {
            setError("Error deleting image. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setNewImage({ ...newImage, image: files[0] });
        } else {
            setNewImage({ ...newImage, [name]: value });
        }
    };

    return (
        <section className="carousel-container">
            <div className="carousel-heading">Carousel Images</div>
            {loading ? (
                <div className="carousel-loading">Loading images...</div>
            ) : error ? (
                <div className="carousel-error">{error}</div>
            ) : (
                <div className="carousel-cards-container">
                    <Card className="carousel-add-card">
                        <CardContent>
                            <div className="carousel-card-title">Add New Image</div>
                            <Box>
                                <TextField
                                    name="caption"
                                    label="Caption"
                                    value={newImage.caption}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    accept="image/*"
                                    style={{ marginBottom: "16px" }}
                                />
                                <Button onClick={handleAddImage} variant="contained">Add Image</Button>
                            </Box>
                        </CardContent>
                    </Card>

                    <div className="carousel-cards-grid">
                        {images.map((image, index) => (
                            <Card key={image._id} className="carousel-card">
                                <CardContent style={{ flexGrow: 1 }}>
                                    <img
                                        src={image.imageUrl}
                                        alt={image.caption}
                                        className="carousel-card-image"
                                    />
                                    <div className="carousel-card-caption">{image.caption}</div>
                                </CardContent>
                                <div className="carousel-card-footer">
                                    <Button
                                        onClick={() => handleDeleteImage(index)}
                                        className="carousel-btn carousel-btn-delete"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                
            )}
        </section>
    );
}

export default AdminCarousel;

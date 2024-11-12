import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';

function CustomCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/carousel/images"); // Adjust the URL as needed
        const data = await response.json();
        if (data.status === "ok") {
          setImages(data.data);
        } else {
          setError("Failed to load images");
        }
      } catch (error) {
        setError("Error fetching images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="customcarousel-container">
      {loading && <p>Loading images...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && images.length > 0 && (
        <Carousel data-bs-theme="dark">
          {images.map((image, index) => (
            <Carousel.Item key={index} className="customcarousel-item">
              <img className="d-block w-100" src={image.imageUrl} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default CustomCarousel;

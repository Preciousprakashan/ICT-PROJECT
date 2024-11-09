import React, { useEffect, useRef, useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true); // Trigger animation when in view
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`about-us-container ${isVisible ? "is-visible" : ""}`}
            ref={containerRef}
        >
            <div className="about-us-overlay"></div>
            <div className="about-us-content">
                <div className="about-us-image">
                    <img src="ncc2.jpg" alt="NCC" />
                </div>
                <div className="about-us-text">
                    <h1 className="about-us-heading">About Us</h1>
                    <p className="about-us-paragraph">
                        The National Cadet Corps (NCC) is a youth development movement with enormous potential for nation-building. 
                        The NCC provides opportunities to the youth of the country for their all-round development, promoting Duty, 
                        Discipline, Commitment, Dedication, and Moral Values to create able leaders and useful citizens.
                        <br />
                        The NCC provides exposure to the cadets in a wide range of activities., with a distinct emphasis on Social Services,
                         Discipline and Adventure Training. It has emerged as the biggest uniformed youth organization of the country symbolizing 
                         its motto Unity and Discipline.
                    </p>
                    <button className="about-us-button" role="button">Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

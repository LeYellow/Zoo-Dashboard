import React, { useState, useEffect } from 'react';

const ScrollTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        setIsVisible(scrollTop > 10); // Show button after scrolling 100px
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        isVisible && (
            <button 
                onClick={scrollToTop} 
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    padding: '10px 15px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
            >
                ↑ Top
            </button>
        )
    );
};

export default ScrollTopButton;

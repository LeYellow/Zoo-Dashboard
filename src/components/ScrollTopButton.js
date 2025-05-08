import React, { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import "./ScrollTopButton.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollTopButton () {
    const [backToTop, setBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY>100) {
                setBackToTop(true);
            } else {
                setBackToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
    }, [])
    
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div>
            {backToTop && (
                <Tooltip title="Back To Top" arrow placement="top" size="md" variant="soft">
                    <KeyboardArrowUpIcon className="scroll-top" onClick={scrollUp}
                    />
                </Tooltip>
            )}
        </div>
    );
};

export default ScrollTopButton;

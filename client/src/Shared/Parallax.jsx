/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';

const ParallaxSection = ({ backgroundImage, children }) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative h-[80vh] 3xl:h-[600px] overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    transform: `translateY(${offset * 0.5}px)`,
                }}
            />
            <div className="relative z-10 h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default ParallaxSection;
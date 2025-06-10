import React from 'react';
import './Card4.css';

export default function Card4() {
    return (
        <div className="card4">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 4"
                className="card4-image"
            />
            <h2 className="card4-title">Desert Dunes</h2>
            <p className="card4-desc">Sunlit sand dunes in a vast desert.</p>
            <div className="card4-rating">Rating: ★★★★☆</div>
            <div className="card4-price">$45.00</div>
        </div>
    );
}

import React from 'react';
import './Card1.css';

export default function Card1() {
    return (
        <div className="card1">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 1"
                className="card1-image"
            />
            <h2 className="card1-title">Sunset Vista</h2>
            <p className="card1-desc">A beautiful sunset over rolling hills.</p>
            <div className="card1-rating">Rating: ★★★★☆</div>
            <div className="card1-price">$39.99</div>
        </div>
    );
}

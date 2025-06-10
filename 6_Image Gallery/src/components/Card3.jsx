import React from 'react';
import './Card3.css';

export default function Card3() {
    return (
        <div className="card3">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 3"
                className="card3-image"
            />
            <h2 className="card3-title">Forest Trail</h2>
            <p className="card3-desc">Winding path through dense forest.</p>
            <div className="card3-rating">Rating: ★★★☆☆</div>
            <div className="card3-price">$24.99</div>
        </div>
    );
}

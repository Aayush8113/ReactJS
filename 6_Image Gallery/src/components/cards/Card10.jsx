import React from 'react';
import './Card10.css';

export default function Card10() {
    return (
        <div className="card10">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 10"
                className="card10-image"
            />
            <h2 className="card10-title">Snowy Cabin</h2>
            <p className="card10-desc">Cozy cabin surrounded by snow-topped pines.</p>
            <div className="card10-rating">Rating: ★★★★☆</div>
            <div className="card10-price">$65.00</div>
        </div>
    );
}

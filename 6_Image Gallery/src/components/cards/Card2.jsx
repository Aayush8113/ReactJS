import React from 'react';
import './Card2.css';

export default function Card2() {
    return (
        <div className="card2">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 2"
                className="card2-image"
            />
            <h2 className="card2-title">Mountain Peak</h2>
            <p className="card2-desc">Snow-capped mountain under a clear sky.</p>
            <div className="card2-rating">Rating: ★★★★★</div>
            <div className="card2-price">$59.99</div>
        </div>
    );
}

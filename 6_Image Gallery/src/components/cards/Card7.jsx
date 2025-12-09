import React from 'react';
import './Card7.css';

export default function Card7() {
    return (
        <div className="card7">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 7"
                className="card7-image"
            />
            <h2 className="card7-title">Autumn Leaves</h2>
            <p className="card7-desc">Leaves in fiery hues blanketing the ground.</p>
            <div className="card7-rating">Rating: ★★★☆☆</div>
            <div className="card7-price">$29.99</div>
        </div>
    );
}

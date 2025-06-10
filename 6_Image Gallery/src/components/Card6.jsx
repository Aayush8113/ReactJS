import React from 'react';
import './Card6.css';

export default function Card6() {
    return (
        <div className="card6">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 6"
                className="card6-image"
            />
            <h2 className="card6-title">City Lights</h2>
            <p className="card6-desc">Night skyline illuminated with city lights.</p>
            <div className="card6-rating">Rating: ★★★★☆</div>
            <div className="card6-price">$49.99</div>
        </div>
    );
}

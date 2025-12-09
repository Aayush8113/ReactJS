import React from 'react';
import './Card9.css';

export default function Card9() {
    return (
        <div className="card9">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 9"
                className="card9-image"
            />
            <h2 className="card9-title">Lavender Fields</h2>
            <p className="card9-desc">Rows of lavender stretching to the horizon.</p>
            <div className="card9-rating">Rating: ★★★★★</div>
            <div className="card9-price">$49.50</div>
        </div>
    );
}

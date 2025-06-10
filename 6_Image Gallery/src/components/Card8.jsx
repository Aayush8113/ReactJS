import React from 'react';
import './Card8.css';

export default function Card8() {
    return (
        <div className="card8">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 8"
                className="card8-image"
            />
            <h2 className="card8-title">River Bend</h2>
            <p className="card8-desc">Serene river winding through green valley.</p>
            <div className="card8-rating">Rating: ★★★★☆</div>
            <div className="card8-price">$34.75</div>
        </div>
    );
}

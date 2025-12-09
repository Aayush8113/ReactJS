import React from 'react';
import './Card5.css';

export default function Card5() {
    return (
        <div className="card5">
            <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                alt="Sample 5"
                className="card5-image"
            />
            <h2 className="card5-title">Ocean Waves</h2>
            <p className="card5-desc">Crashing waves on a rocky coastline.</p>
            <div className="card5-rating">Rating: ★★★★★</div>
            <div className="card5-price">$52.50</div>
        </div>
    );
}

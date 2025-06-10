import React from "react";
import "../App.css";


const users = [
    {
        id: "M001",
        name: "Gray Mountain View",
        price: "₹50",
        image: "https://picsum.photos/seed/alice/200/150",
    },
    {
        id: "M002",
        name: "Sea Side Mountain View",
        price: "₹100",
        image: "https://picsum.photos/seed/bob/200/150",
    },
    {
        id: "M003",
        name: "Mountain Road Side View",
        price: "₹300",
        image: "https://picsum.photos/seed/charlie/200/150",
    },
    {
        id: "M004",
        name: "Desert View",
        price: "₹500",
        image: "https://picsum.photos/seed/dana/200/150",
    },
];

function Card() {
    return (
        <div className="card-container">
            {users.map((user) => (
                <div className="card" key={user.id}>
                    <img src={user.image} alt={user.name} className="card-image" />
                    <div className="card-details">
                        <h2 className="card-name">{user.name}</h2>
                        <p className="card-id">ID: {user.id}</p>
                        <p className="card-price">Price: {user.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;


import React from "react";
import { Link } from "react-router-dom";
import { getPets } from "./apiManager";
import { useEffect, useState } from "react";

export const Pets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPets()
      .then((data) => {
        setPets(data);
      })
      .catch(() => {
        console.log("Failed to fetch pets");
      });
  }, []);

  return (
    <div>
      <h2>Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet.id}>
            
            <Link to={`/pets/${pet.id}`}>
              <strong>{pet.name}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

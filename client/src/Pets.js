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
            <strong>{pet.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};
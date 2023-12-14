


import React, { useState, useEffect } from "react";
import { getPets, addPet } from "./apiManager";
import { Link } from "react-router-dom";

export const Pets = () => {
  const [pets, setPets] = useState([]);
  const [newPetName, setNewPetName] = useState("");

  useEffect(() => {
    getPets()
      .then((data) => {
        setPets(data);
      })
      .catch(() => {
        console.log("Failed to fetch pets");
      });
  }, []);

  const handleAddPet = async () => {
    try {
      // Make API request to add a new pet
      await addPet({ name: newPetName });
      
      // Refresh the pet list after adding a new pet
      const updatedPets = await getPets();
      setPets(updatedPets);

      // Clear the input field after adding a new pet
      setNewPetName("");
    } catch (error) {
      console.error("Failed to add pet:", error);
    }
  };

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

      {/* Add a new pet section */}
      <div>
        <h3>Add a Pet</h3>
        <input
          type="text"
          placeholder="Pet Name"
          value={newPetName}
          onChange={(e) => setNewPetName(e.target.value)}
        />
        <button onClick={handleAddPet}>Add Pet</button>
      </div>
    </div>
  );
};

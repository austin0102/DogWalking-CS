

import React, { useEffect, useState } from "react";
import { getSinglePet } from "./apiManager";
import { useParams } from "react-router-dom";

export const Pet = () => {
  const [pet, setPet] = useState(null);
  const { id } = useParams(); // Use the useParams hook to get the id from the URL

  useEffect(() => {
    if (id) {
      getSinglePet(id)
        .then((data) => {
          setPet(data);
        })
        .catch(() => {
          console.log(`Failed to fetch pet with id ${id}`);
        });
    }
  }, [id]);

  return (
    <div>
      {pet ? (
        <>
          <h2>{pet.name}</h2>
          <p>{pet.name} is being walked by {pet.walker.name}</p>
          {/* Display other details of the pet */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

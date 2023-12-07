import { getWalkers } from "./apiManager";
import { useEffect, useState } from "react";

export const Walkers = () => {
  const [walkers, setWalkers] = useState([]);

  useEffect(() => {
    getWalkers()
      .then((data) => {
        setWalkers(data);
      })
      .catch(() => {
        console.log("Failed to fetch walkers");
      });
  }, []);

  return (
    <div>
      <h2>Walkers</h2>
      <ul>
        {walkers.map((walker) => (
          <li key={walker.id}>
            <strong>{walker.name}</strong> - {walker.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
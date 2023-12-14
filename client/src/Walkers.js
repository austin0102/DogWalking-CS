// import { getWalkers } from "./apiManager";
// import { useEffect, useState } from "react";

// export const Walkers = () => {
//   const [walkers, setWalkers] = useState([]);

//   useEffect(() => {
//     getWalkers()
//       .then((data) => {
//         setWalkers(data);
//       })
//       .catch(() => {
//         console.log("Failed to fetch walkers");
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Walkers</h2>
//       <ul>
//         {walkers.map((walker) => (
//           <li key={walker.id}>
//             <strong>{walker.name}</strong> - {walker.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// Walkers.jsx

import { getCities, getWalkers } from "./apiManager";
import { useEffect, useState } from "react";

export const Walkers = () => {
  const [walkers, setWalkers] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    // Fetch cities
    getCities()
      .then((data) => {
        setCities(data);
      })
      .catch(() => {
        console.log("Failed to fetch cities");
      });
  }, []); // Fetch cities only once when the component mounts

  useEffect(() => {
    // Fetch walkers based on the selected city
    getWalkers(selectedCity)
      .then((data) => {
        setWalkers(data);
      })
      .catch(() => {
        console.log("Failed to fetch walkers");
      });
  }, [selectedCity]); // Update walkers when selectedCity changes

  // Function to handle city selection
  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId || null); // Convert an empty string to null
  };

  return (
    <div>
      <h2>Walkers</h2>

      {/* Dropdown for selecting a city */}
      <select onChange={handleCityChange}>
        <option value="">All Cities</option>
        {/* Populate the dropdown with cities */}
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

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

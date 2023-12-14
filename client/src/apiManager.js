export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};
// apiManager.js

export const getWalkers = async (cityId) => {
  const url = cityId ? `/api/walkers?cityId=${cityId}` : '/api/walkers';

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch walkers");
  }

  return res.json();
};



export const getPets = async () => {
  const res = await fetch("/api/pets");
  if (!res.ok) {
    throw new Error("Failed to fetch pets");
  }
  return res.json();
};



export const getSinglePet = async (id) => {
  const res = await fetch(`/api/pets/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch pet");
  }
  return res.json();
};

export const addPet = (newPet) => {
  return fetch("/api/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPet),
  });
};


export const getCities = async () => {
  const res = await fetch("/api/cities");
  if (!res.ok) {
    throw new Error("Failed to fetch cities");
  }
  return res.json();
};
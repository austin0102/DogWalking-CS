export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};
export const getWalkers = async () => {
  const res = await fetch("/api/walkers");
  if (!res.ok) {
    throw new Error("Failed to fetch walkers");
  }
  return res.json();
};

export const getPets = async () => {
  const res = await fetch("/api/pets");
  if (!res.ok) {
    throw new Error("Failed to fetch walkers");
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

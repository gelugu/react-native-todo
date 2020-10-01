export const boardPlaceholders = () => {
  const PH = [
    "Begin a project...",
    "This could be something great...",
    "Here could be Your board...",
  ];

  return PH[Math.floor(Math.random() * PH.length)];
};

export const taskPlaceholders = () => {
  const PH = ["Plan something...", "Let's plan...", "Here could be Your task"];

  return PH[Math.floor(Math.random() * PH.length)];
};

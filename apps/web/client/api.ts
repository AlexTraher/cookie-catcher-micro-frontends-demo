export const getHighScore = async () => {
  const storage = localStorage.getItem("highScore");
  if (storage === null) {
    return null;
  }
  return +storage;
};

export const setHighScore = async (score: number) => {
  const currentValue = await getHighScore();
  if (!currentValue) {
    localStorage.setItem("highScore", `${score}`);
  } else {
    localStorage.setItem("highScore", `${score > currentValue ? score : currentValue}`);

  }
};
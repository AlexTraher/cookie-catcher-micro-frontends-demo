import type { Notification as NotificationType } from "../types";

export const getNotifications = async (): Promise<NotificationType[]> => {
  return [
    {
      id: "1",
      title: "You have a new message",
      body: "Your friend cookie monster has sent you a message."
    },
    {
      id: "2",
      title: "Your order has been placed",
      body: "Your order of \"cookies\" has been placed and will be with you by 3rd April."
    },
    {
      id: "3",
      title: "Your order has been placed",
      body: "Your order of \"how to eat less cookies\" has been placed."
    },
    {
      id: "4",
      title: "Your order has been placed",
      body: "Your order of \"A long title that should demonstrate that our layout works properly, but ultimately ends up being a really shitty joke\" has been placed."
    },
    {
      id: "5",
      title: "Your order has been placed",
      body: "Your order of \"cookies\" has been placed and will be with you by 3rd March."
    },
    {
      id: "6",
      title: "Your order has been placed",
      body: "Your order of \"cookies\" has been placed and will be with you by 2rd March."
    },
  ]
}

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

export const getLastScore = async () => {
  const storage = localStorage.getItem("lastScore");
  if (storage === null) {
    return null;
  }
  return +storage;
};

export const setLastScore = async (score: number) => {
  localStorage.setItem("lastScore", `${score}`);
};
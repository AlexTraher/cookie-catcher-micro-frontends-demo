import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "ui";
import { setHighScore } from "../client/api";
import ClientOnly from "../components/ClientOnly";
import CookieCatcher from "../components/CookieCatcher";
import Navbar from "../components/Navbar";
import Notifications from "../components/Notifications";
import styles from "../styles/index.module.css";

export default function Web() {
  const client = useQueryClient();
  const [speed, setSpeed] = useState(5);

  const highScoreMutation = useMutation(["highScore"], (score: number) => setHighScore(score), {
    onSuccess: () => {
      client.invalidateQueries(["highScore"])
    }
  });
  const onScoreUpdate = (score: number) => {
    highScoreMutation.mutate(score);
  }

  return (
    <>
      <Navbar handleSpeedChange={(speed) => setSpeed(speed)} />
      <div className={styles.contentWrapper}>
        <main className={styles.main}>
          <ClientOnly>
            <CookieCatcher onScoreUpdate={onScoreUpdate} speed={speed}/>
          </ClientOnly>
          
        </main>
        <aside className={styles.notificationContainer}>
          <Notifications />
        </aside>
      </div>
    </>
  );
}

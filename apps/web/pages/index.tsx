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
  // const [highScore, setHighScore] = useState(0);

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
      <Navbar/>
      <div className={styles.contentWrapper}>
        <main className={styles.main}>
          <ClientOnly>
            <CookieCatcher onScoreUpdate={onScoreUpdate}/>
          </ClientOnly>
          
        </main>
        <aside className={styles.notificationContainer}>
          <Notifications />
        </aside>
      </div>
    </>
  );
}

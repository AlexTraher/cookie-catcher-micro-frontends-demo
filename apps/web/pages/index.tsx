import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { setHighScore } from "../client/api";
import ClientOnly from "../components/ClientOnly";
import CookieCatcher from "../components/CookieCatcher";
import Navbar from "../components/Navbar";
import styles from "../styles/index.module.css";
import Loader from "@my-org/mfe-loader";

export default function Web() {
  const client = useQueryClient();
  const [speed, setSpeed] = useState(5);
  const [inProgress, setProgress] = useState(false);

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
      <Navbar handleSpeedChange={(speed) => setSpeed(speed)} disableSpeedToggle={inProgress} />
      <div className={styles.contentWrapper}>
        <main className={styles.main}>
          <ClientOnly>
            <CookieCatcher onScoreUpdate={onScoreUpdate} speed={speed} onGameStateChange={(p) => setProgress(p)} />
          </ClientOnly>
          
        </main>
        <aside className={styles.notificationContainer}>
          <Loader 
            app={async () => (await import("@my-org/notifications")).default}
            queryClient={client}
          />
        </aside>
      </div>
    </>
  );
}

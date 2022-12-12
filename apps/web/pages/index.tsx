import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { setHighScore } from "../client/api";
import ClientOnly from "../components/ClientOnly";

import Navbar from "../components/Navbar";
import styles from "../styles/index.module.css";
import Loader from "@my-org/mfe-loader";
import "systemjs";

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
          {/* <ClientOnly> */}
            <Loader
              appName="@my-org/cookie-catcher"
              // app={async () => (await import("@my-org/cookie-catcher")).default}
              app={() => System.import("@my-org/cookie-catcher")}
              onScoreUpdate={onScoreUpdate} speed={speed} onGameStateChange={(p: boolean) => setProgress(p)} 
              queryClient={client} 
              wrapStyle={{ height: '100%', width: '100%' }}
              />
          {/* </ClientOnly> */}
          
        </main>
        <aside className={styles.notificationContainer}>
            <Loader 
              appName="@my-org/notifications"
              // app={async () => (await import("@my-org/notifications")).default}
              app={() => System.import("@my-org/notifications")}
              queryClient={client}
              wrapStyle={{ height: '100%' }}
            />
        </aside>
      </div>
    </>
  );
}

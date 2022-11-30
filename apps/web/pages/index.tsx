import { Button } from "ui";
import ClientOnly from "../components/ClientOnly";
import CookieCatcher from "../components/CookieCatcher";
import Navbar from "../components/Navbar";
import Notifications from "../components/Notifications";
import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <>
      <Navbar />
      <div className={styles.contentWrapper}>
        <main className={styles.main}>
          <ClientOnly>
            <CookieCatcher />
          </ClientOnly>
          
        </main>
        <aside className={styles.notificationContainer}>
          <Notifications />
        </aside>
      </div>
    </>
  );
}

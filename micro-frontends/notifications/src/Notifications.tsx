import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { getNotifications } from "./api";
import styles from "./Notifications.module.css";
import type { Notification as NotificationType } from "./types";

const Notifications = () => {
  return (
    <section className={styles.notificationContainer}>
      <div className={styles.header}><h2 >Notifications</h2></div>
      <NotificationSet />
    </section> 
  )
}

const NotificationSet = () => {
  const { data: notifications, isLoading, isError, isSuccess } =  useQuery(["notifications"], () => getNotifications())
  // const isLoading = true;
  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || !isSuccess) {
    return <p>Error</p>
  }

  return (
    <div className={styles.notificationSection}>
      {notifications.map((notification) => <Notification {...notification} key={notification.id}/>)}
    </div>
  )
}


const Notification: FC<NotificationType> = ({ title, body, }) => {
  return (
    <div className={styles.notification}>
      <h3 className={styles.notificationHeader}>{title}</h3>
      <p>{body}</p>
    </div>
  )
}

export default Notifications;
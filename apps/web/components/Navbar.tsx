import { useQuery } from "@tanstack/react-query";
import { FC } from "react"
import { getHighScore } from "../client/api";
import styles from "../styles/Navbar.module.css";

const Navbar: FC = () => {
  const { data: highScore, isSuccess } = useQuery(["highScore"], () => getHighScore("1"));
 return (
  <header className={styles.header}>
    <h1>App</h1>
    {isSuccess ? 
      (<div className={styles.highScore}>
         <p>high score: {highScore}</p>
      </div>)
      : null
    }
  </header>
 )
}

export default Navbar
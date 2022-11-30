import { useQuery } from "@tanstack/react-query";
import { ChangeEventHandler, FC } from "react"
import { getHighScore } from "../client/api";
import styles from "../styles/Navbar.module.css";

interface Props {
  handleSpeedChange: (speed: number) => void
}

const Navbar: FC<Props> = ({ handleSpeedChange }) => {
  const { data: highScore, isSuccess } = useQuery(["highScore"], () => getHighScore());
  const onSpeedChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const speed = +e.target.value;
    handleSpeedChange(speed);
  }
 return (
  <header className={styles.header}>
    <h1>App</h1>
    <label>
      Select Your speed:
      <input type="range" min="1" max="10" onChange={onSpeedChange}></input>
    </label>
    {isSuccess ? 
      (<div className={styles.highScore}>
         <p>high score: {highScore ?? "-"}</p>
      </div>)
      : null}
  </header>
 )
}

export default Navbar
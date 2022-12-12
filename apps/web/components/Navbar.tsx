import { useQuery } from "@tanstack/react-query";
import { ChangeEventHandler, FC } from "react"
import { getHighScore, getLastScore } from "../client/api";
import styles from "../styles/Navbar.module.css";

interface Props {
  handleSpeedChange: (speed: number) => void;
  disableSpeedToggle: boolean;
}

const Navbar: FC<Props> = ({ handleSpeedChange, disableSpeedToggle }) => {
  const { data: highScore, isSuccess: highScoreSuccess } = useQuery(["highScore"], () => getHighScore());
  const { data: lastScore, isSuccess: lastScoreSuccess } = useQuery(["lastScore"], () => getLastScore())
  const onSpeedChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const speed = +e.target.value;
    handleSpeedChange(speed);
  }

  const isSuccess = highScoreSuccess && lastScoreSuccess;

 return (
  <header className={styles.header}>
    <h1>App</h1>
    <label className={styles.speed}>
      Select your speed
      <input type="range" min="1" max="10" disabled={disableSpeedToggle} onChange={onSpeedChange}></input>
    </label>
    {isSuccess ? <ScoreBoard highScore={highScore} lastScore={lastScore} />
      : null}
  </header>
 )
}

interface ScoreBoardProps {
  highScore?: number | null
  lastScore?: number | null
}

const ScoreBoard: FC<ScoreBoardProps> = ({ highScore, lastScore }) => {
  return (
    <div className={styles.scoreBoard}>
      <p className={styles.score}>high score: {highScore || "-"}</p>
      <p className={styles.score}>last score: {lastScore || "-"}</p>
    </div>
  )
  
}

export default Navbar
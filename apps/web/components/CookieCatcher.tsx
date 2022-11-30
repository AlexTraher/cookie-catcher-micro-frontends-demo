import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import styles from "../styles/CookieCatcher.module.css";
import Image from "next/image";
import Renderer from "../cookie-catcher/Renderer";
import { Direction, KeyCodes } from "../cookie-catcher/types";
import useCountdown from "../cookie-catcher/useCountdown";
interface Props {
  onScoreUpdate: (score: number) => void
}

const CookieCatcher: FC<Props> = ({ onScoreUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const [count, setCount] = useState(0);
  const [countdown, startCountdown] = useCountdown();
  const [inProgress, setInProgress] = useState(false);
  requestRef.current = requestAnimationFrame(Renderer.tick.bind(Renderer));

  // Teardown only effect
  useEffect(() => {
    return () => {
      requestRef.current && cancelAnimationFrame(requestRef.current)
    };
  }, []);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case KeyCodes.LEFT:
          Renderer.setDirection(Direction.LEFT);
          break;
        case KeyCodes.RIGHT:
          Renderer.setDirection(Direction.RIGHT);
          break;
        default: 
          Renderer.setDirection(Direction.NONE);

      }
    }

    const handleKeyUp = () => {
      Renderer.setDirection(Direction.NONE);
    }

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, []);

  useEffect(() => {
    if (countdown !== 0) {
      return;
    }
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    const context = canvas?.getContext('2d');
    
    if (!context || !canvas || !wrapper) {
      return;
    }

    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;

    if (Renderer.initialised) {
      return;
    }
    setInProgress(true);
    // TODO - support dynamic speeds
    Renderer.init(context, 20, canvas.width, canvas.height, 2, 
      (score) => { 
        setCount((count) => count + 1)
      },
      (score) => {
        setInProgress(false); 
        onScoreUpdate(score);
        requestRef.current && cancelAnimationFrame(requestRef.current);
      });

    requestRef.current = requestAnimationFrame(Renderer.tick.bind(Renderer));

    return () => { requestRef.current && cancelAnimationFrame(requestRef.current) };
  }, [countdown, onScoreUpdate]);

  const startGame = async () => {
    Renderer.reset();
    startCountdown(3);
  }

  return (
    <>
      <div id="canvasWrapper" className={styles.canvasWrapper} ref={wrapperRef}>
      {countdown && countdown > 0 ? <div className={styles.countdown} key={countdown}>{countdown}</div> : null}
      {!inProgress && !countdown ? <button className={styles.startButton} onClick={startGame}>Start</button> : null}
        <canvas ref={canvasRef} className={styles.canvas}/>
      </div>
    </>
  )
};

// const MiddleMan: FC<PropsWithChildren<{}>> = ({ children }) => {
//   return (
//     <div className=
//   )
// }

const CatchableCookie = () => {
  return <Image src="public/cookie.png" width={30} alt="cookie"/>
}

export default CookieCatcher;
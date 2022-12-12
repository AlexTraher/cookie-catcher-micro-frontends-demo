import { useState } from "react";


type UseGameState = (
  onGameStateChange: (inProgress: boolean) => void
) => [boolean, (progress: boolean) => void]

const useGameState: UseGameState = (onGameStateChange) => {
  const [inProgress, setInProgress] = useState(false);

  const setProgress = (progress: boolean) => {
    onGameStateChange(progress);
    setInProgress(progress);
  }

  return [inProgress, setProgress];
}

export default useGameState;
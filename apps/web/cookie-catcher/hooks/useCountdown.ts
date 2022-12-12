import { useEffect, useState } from "react";


const sleep = (timeout = 1000) => new Promise((resolve) => {
  setTimeout(resolve, 1000);
})


type UseCountdown = (step?: number) => [number | undefined, (initialCount: number) => void]

const useCountdown: UseCountdown = (step = -1) => {
  const [count, setCount] = useState<number>();

  const start = async (initialCount: number) => {
    setCount(initialCount);
  }

  useEffect(() => {
    
    (async () => {
      if (count === undefined || count === 0) {
        return 
      };
      await sleep();
      setCount(count - 1);
    })()


  }, [count, step])

  
  return [count, start];
  
}

export default useCountdown;
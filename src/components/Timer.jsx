import { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';

export const Timer = ({startGame,gameOver, onWin}) =>{
    const [seconds, setSeconds] = useState(0)
    const newTimer  = useRef()
    useEffect(()=>{
        if(startGame && !newTimer.current){
            newTimer.current = setInterval(()=>{
                setSeconds(prev => prev + 1)
            },1000)
        }

        if(!startGame || gameOver || onWin){
            if (newTimer.current) {
                clearInterval(newTimer.current);
                newTimer.current = null;
            }
        }
        
        return () => {
            console.log('clean up')
            if (newTimer.current) {
                clearInterval(newTimer.current);
            }
        }
    },[startGame, gameOver, onWin])

    return (

        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Timer / Seconds: {startGame ? seconds: 0}
        </Typography>
    
      )

}
    


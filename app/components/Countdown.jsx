/*Countdown */
"use client"
import React, { useState } from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Countdown = () => {
  const [timeUp, setTimeUp] = useState(false)
  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  // const endTime = stratTime + 30; // use UNIX timestamp in seconds
  const endTime = 1698501600; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  
  const timerProps = {
    isPlaying: true,
    size: 80,
    strokeWidth: 6
  };

  const renderTime = (dimension, time) => {
    if ((time === 0 && dimension === 'segundos') && (time === 0 && dimension === 'dias')) {
      setTimeUp(true)
    }

    return (
      <div className="time-wrapper text-xs font-sans">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  return(
    !timeUp ? (<>
    <h3 className='text-2xl self-center py-3'>Faltan</h3>
        <div className='flex justify-center item-center'>
            <CountdownCircleTimer
            {...timerProps}
            colors="#831843"
            duration={daysDuration}
            initialRemainingTime={remainingTime}
            >
            {({ elapsedTime, color }) => (
                <div style={{ color }}>
                {renderTime("dias", getTimeDays(daysDuration - elapsedTime))}
                </div>
            )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
            {...timerProps}
            colors="#9d174d"
            duration={daySeconds}
            initialRemainingTime={remainingTime % daySeconds}
            onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
            })}
            >
            {({ elapsedTime, color }) => (
                <div style={{ color }}>
                {renderTime("horas", getTimeHours(daySeconds - elapsedTime))}
                </div>
            )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
            {...timerProps}
            colors="#be185d"
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
            })}
            >
            {({ elapsedTime, color }) => (
                <div style={{ color }}>
                {renderTime("minutos", getTimeMinutes(hourSeconds - elapsedTime))}
                </div>
            )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
            {...timerProps}
            colors="#db2777"
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > 0
            })}
            >
            {({ elapsedTime, color }) => (
                <div style={{ color }}>
                {renderTime("segundos", getTimeSeconds(elapsedTime))}
                </div>
            )}
            </CountdownCircleTimer>
        </div>
    <h3 className='text-1xl text-center py-3'></h3></>): (
    <h3 className='text-3xl text-center py-3'>Llegó el dia!</h3>
  )
  )
  }

export default Countdown;
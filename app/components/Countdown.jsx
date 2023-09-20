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
    if ((time === 0 && dimension === 'secs') && (time === 0 && dimension === 'dias')) {
      setTimeUp(true)
    }

    return (
      <div className="time-wrapper text-s font-sans">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  return(
    !timeUp ? (<>
    <h2 className='text-2xl md:text-3xl self-center py-3 font-semibold'>Nos casamos!</h2>
    <p className='text-1xl md:text-2xl self-center py-3'>Faltan</p>
        <div className='flex justify-center item-center'>
            <CountdownCircleTimer
            {...timerProps}
            colors="#35624B"
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
            colors="#3E6F5A"
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
            colors="#4F8B72"
            duration={hourSeconds}
            initialRemainingTime={remainingTime % hourSeconds}
            onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
            })}
            >
            {({ elapsedTime, color }) => (
                <div style={{ color }}>
                {renderTime("mins", getTimeMinutes(hourSeconds - elapsedTime))}
                </div>
            )}
            </CountdownCircleTimer>
            <CountdownCircleTimer
            {...timerProps}
            colors="#87AB9D"
            duration={minuteSeconds}
            initialRemainingTime={remainingTime % minuteSeconds}
            onComplete={(totalElapsedTime) => ({
                shouldRepeat: remainingTime - totalElapsedTime > 0
            })}
            >
            {({ elapsedTime, color }) => (
                <div style={{ color }}>
                {renderTime("secs", getTimeSeconds(elapsedTime))}
                </div>
            )}
            </CountdownCircleTimer>
        </div>
    <h3 className='text-1xl text-center py-3'></h3></>): (
    <h3 className='text-3xl text-center py-3 font-semibold'>Llegó el dia!</h3>
  )
  )
  }

export default Countdown;
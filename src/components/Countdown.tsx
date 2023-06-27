import { View, Text } from 'react-native'
import React, { useState, useEffect, SetStateAction, useImperativeHandle } from 'react'
import { useSettings } from '../hooks/useSettings';

interface ICountdownProps {
    playing?: boolean
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>
    numOfPhases: number
    onFinish?: () => void
}

export interface ICountdownFunctions {
    resetTimer: () => void
}

const Countdown = React.forwardRef<ICountdownFunctions, ICountdownProps>(({ playing = false, setPlaying, numOfPhases, onFinish = () => null }, ref) => {
    const { settings } = useSettings();

    const [minutes, setMinutes] = useState(-1)
    const [seconds, setSeconds] = useState(-1)
    const [activePhase, setActivePhase] = useState(0)

    const phases = new Array(numOfPhases).fill(undefined).map((_, index) => {
        if (index % 2 === 0) {
            // workout phase
            return {
                phaseLabel: "workout",
                phaseTitle: "Aktiv",
                timerSecondsStart: parseInt(settings.workoutTimerSeconds)
            }
        }

        // break phase
        return {
            phaseLabel: "break",
            phaseTitle: "Pause",
            timerSecondsStart: parseInt(settings.workoutPauseSeconds)
        }
    })

    const currPhase = phases[activePhase]

    useImperativeHandle(ref, () => ({
        resetTimer: () => {
            resetTimer()
        },

    }))

    const resetTimer = () => {
        setActivePhase(0)
        initCounter(parseInt(settings.workoutTimerSeconds))
    }

    const formatNumber = (n: number) => {
        let formatted = "0" + n
        return formatted.slice(-2)
    }

    const initCounter = (from: number) => {
        // setup minutes and seconds
        const minutes = Math.floor(from / 60)
        const seconds = from % 60

        setMinutes(minutes)
        setSeconds(seconds)
    }

    const playNextPhase = () => {
        setActivePhase(oldPhase => oldPhase + 1)
    }

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;

        if (playing) {
            initCounter(currPhase.timerSecondsStart)

            interval = setInterval(() => {
                setSeconds(oldSeconds => {
                    if (oldSeconds === 0) {
                        return 59
                    }

                    return oldSeconds - 1
                })
            }, 1000)
        }

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [playing, activePhase])

    useEffect(() => {
        if (seconds === 59 && minutes !== 0) {
            setMinutes(oldMinutes => {
                if (playing) {
                    return oldMinutes - 1
                }

                return oldMinutes
            })
            setSeconds(59)
        }

        if (seconds === 0 && minutes === 0) {
            if (activePhase === numOfPhases - 1) {
                setPlaying(false)
                onFinish()
            } else {
                setTimeout(() => {
                    playNextPhase()
                }, 1000)
            }
        }
    }, [seconds, playing])

    useEffect(() => {
        initCounter(currPhase.timerSecondsStart)
    }, [settings])

    return (
        <View className='flex-1 flex-column justify-center items-center w-screen'>
            <View className="py-10">
                <Text className='text-slate-100 text-xl'>Phase {activePhase} / {numOfPhases}</Text>
            </View>
            <View className='flex-row'>
                <Text className='text-slate-100 text-7xl w-24 text-center'>{formatNumber(minutes)}</Text>
                <Text className='text-slate-100 text-7xl'>:</Text>
                <Text className='text-slate-100 text-7xl w-24 text-center'>{formatNumber(seconds)}</Text>
            </View>

            <View className=''>
                <Text className='text-slate-100'>{playing ? currPhase.phaseTitle : "Timer gestoppt"}</Text>
            </View>
        </View>
    )
})

export default Countdown
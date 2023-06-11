import { View, Text } from 'react-native'
import React, { useState, useEffect, SetStateAction } from 'react'

interface ICountdownProps {
    playing?: boolean
    from: number // in seconds
    pauseSeconds: number;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>
    phases: number
    activePhase: number
    onFinish?: () => void
}

const Countdown: React.FC<ICountdownProps> = ({ playing = false, from, setPlaying, phases, activePhase, onFinish = () => null }) => {
    const [minutes, setMinutes] = useState(-1)
    const [seconds, setSeconds] = useState(-1)

    const formatNumber = (n: number) => {
        let formatted = "0" + n
        return formatted.slice(-2)
    }

    const initCounter = () => {
        // setup minutes and seconds
        const minutes = Math.floor(from / 60)
        const seconds = from % 60

        setMinutes(minutes)
        setSeconds(seconds)
    }

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;

        if (playing) {
            initCounter()

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
    }, [playing])

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
            setPlaying(false)
            onFinish()
        }
    }, [seconds, playing])

    useEffect(() => {
        initCounter()
    }, [from])

    return (
        <View className='flex-1 flex-column justify-center items-center w-screen'>
            <View className="py-10">
                <Text className='text-slate-100 text-xl'>Phase {activePhase} / {phases}</Text>
            </View>
            <View className='flex-row'>
                <Text className='text-slate-100 text-7xl w-24 text-center'>{formatNumber(minutes)}</Text>
                <Text className='text-slate-100 text-7xl'>:</Text>
                <Text className='text-slate-100 text-7xl w-24 text-center'>{formatNumber(seconds)}</Text>
            </View>

            <View className=''>
                <Text className='text-slate-100'>{playing ? "Aktiv" : "Pause"}</Text>
            </View>
        </View>
    )
}

export default Countdown
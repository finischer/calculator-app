import { View, Text } from 'react-native'
import React, { useState, useEffect, SetStateAction } from 'react'

interface ICountdownProps {
    playing?: boolean
    from: number // in seconds
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>
    phase: string
}

const Countdown: React.FC<ICountdownProps> = ({ playing = false, from, setPlaying, phase }) => {
    const [minutes, setMinutes] = useState(-1)
    const [seconds, setSeconds] = useState(-1)

    const formatNumber = (n: number) => {
        let formatted = "0" + n
        return formatted.slice(-2)
    }

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;

        if (playing) {
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
        if (seconds === 0 && minutes !== 0) {
            setMinutes(oldMinutes => oldMinutes - 1)
            setSeconds(0)
        }

        if (seconds === 0 && minutes === 0) {
            setPlaying(false)
        }
    }, [seconds])

    useEffect(() => {
        // setup minutes and seconds
        const minutes = Math.floor(from / 60)
        const seconds = from % 60

        setMinutes(minutes)
        setSeconds(seconds)
    }, [])

    return (
        <View className='flex-1 flex-column justify-center items-center w-screen'>
            <View className='flex-row'>
                <Text className='text-slate-100 text-7xl w-24 text-center'>{formatNumber(minutes)}</Text>
                <Text className='text-slate-100 text-7xl'>:</Text>
                <Text className='text-slate-100 text-7xl w-24 text-center'>{formatNumber(seconds)}</Text>
            </View>

            <View className=''>
                <Text className='text-slate-100'>{phase}</Text>
            </View>
        </View>
    )
}

export default Countdown
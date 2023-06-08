import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'

interface ITimerProps {
    playing?: boolean
}

const Timer: React.FC<ITimerProps> = ({ playing = false }) => {
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    const formatNumber = (n: number) => {
        let formatted = "0" + n
        return formatted.slice(-2)
    }

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;

        if (playing) {
            interval = setInterval(() => {
                setSeconds(oldSeconds => oldSeconds + 1)
            }, 1000)
        }

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [playing])

    useEffect(() => {
        if (seconds % 60 === 0 && seconds !== 0) {
            setMinutes(oldMinutes => oldMinutes + 1)
            setSeconds(0)
        }
    }, [seconds])

    return (
        <View className='flex-row flex-1 w-screen justify-center items-center '>
            <Text className='text-slate-100 text-7xl w-24 text-center'>{formatNumber(minutes)}</Text>
            <Text className='text-slate-100 text-7xl'>:</Text>
            <Text className='text-slate-100 text-7xl w-24 text-center'>{formatNumber(seconds)}</Text>
        </View>
    )
}

export default Timer
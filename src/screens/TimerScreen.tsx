import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, Pressable, Animated, Easing, TouchableOpacity } from 'react-native';
import React, { useRef, useState, useEffect } from "react";
import LottieView from 'lottie-react-native';
import Countdown, { ICountdownFunctions } from '../components/Countdown';
import { Settings } from 'react-native-feather';
import SettingModal from '../components/SettingModal';
import { useSettings } from '../hooks/useSettings';

const TimerScreen = () => {
    const countdownRef = useRef<ICountdownFunctions | null>(null)
    const [isPlayed, setIsPlayed] = useState(false);
    const animation = useRef<LottieView>(null);
    const animationProgress = useRef(new Animated.Value(0))
    const [showSettings, setShowSettings] = useState(false)
    const { settings } = useSettings()

    const togglePlayButton = () => {
        if (!isPlayed) {
            startCounter()
        } else {
            stopCounter()
        }
    }

    const startCounter = () => {
        Animated.timing(animationProgress.current, {
            toValue: 0.5,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        setIsPlayed(true)
    }

    const stopCounter = () => {
        Animated.timing(animationProgress.current, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        setIsPlayed(false)
    }

    return (<>
        <SettingModal
            visible={showSettings}
            onRequestClose={() => setShowSettings(false)}
        />
        <SafeAreaView className="flex-1 justify-end items-center bg-slate-800">
            <StatusBar style="light" />
            <View className="p-5 relative">
                <View className="text-center justify-center items-center flex-row">
                    <Text className="text-slate-100 text-lg">Workout Timer</Text>
                    <View className='absolute right-5'>
                        <Settings
                            onPress={() => setShowSettings(true)}
                            color="#F1F5F9"
                            width={28}
                            height={28}
                        />
                    </View>
                </View>

                <View className="flex-1 items-center justify-center py-5 w-full">
                    <Countdown
                        ref={countdownRef}
                        playing={isPlayed}
                        setPlaying={setIsPlayed}
                        numOfPhases={parseInt(settings.numberPhases)}
                        onFinish={stopCounter}
                    />
                </View>

                {/* Buttons */}
                <View className='flex-1 items-center gap-10'>
                    <Pressable className=' bg-cyan-500 rounded-full justify-center items-center w-28 h-28' onPress={togglePlayButton}>
                        <LottieView
                            ref={animation}
                            progress={animationProgress.current}
                            source={require("../../assets/lotties/play-stop.json")}
                            style={{
                                width: 100,
                                height: 100,

                            }}
                        />
                    </Pressable>

                    {!isPlayed &&
                        <TouchableOpacity onPress={countdownRef.current?.resetTimer}>
                            <Text className="text-slate-100 text-lg">Timer zurücksetzen</Text>
                        </TouchableOpacity>
                    }
                </View>

            </View>
        </SafeAreaView>
    </>
    );
}

export default TimerScreen
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView } from 'react-native';
import React, { useRef, useState } from "react";
import Countdown, { ICountdownFunctions } from '../components/Countdown';
import { Settings } from 'react-native-feather';
import SettingModal from '../components/SettingModal';
import { useSettings } from '../hooks/useSettings';

const TimerScreen = () => {
    const countdownRef = useRef<ICountdownFunctions | null>(null)
    const [showSettings, setShowSettings] = useState(false)
    const { settings } = useSettings()

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
                        numOfPhases={parseInt(settings.numberPhases)}
                    />
                </View>
            </View>
        </SafeAreaView>
    </>
    );
}

export default TimerScreen
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, Pressable, Animated, Easing } from 'react-native';
import React, { useRef, useState } from "react";
import LottieView from 'lottie-react-native';
import Countdown from './src/components/Countdown';

export default function App() {
  const [isPlayed, setIsPlayed] = useState(false);
  const animation = useRef<LottieView>(null);
  const animationProgress = useRef(new Animated.Value(0))

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



  return (
    <SafeAreaView className="flex-1 justify-end items-center bg-slate-800">
      <StatusBar style="light" />
      <View className="p-5">
        <View className="text-center justify-center items-center">
          <Text className="text-slate-100 text-lg">Workout Timer</Text>
        </View>

        <View className="flex-1 items-center justify-center py-5 w-full">
          <Countdown
            from={5}
            playing={isPlayed}
            setPlaying={setIsPlayed}
            phase='Pause'
            onFinish={stopCounter}
          />
        </View>

        {/* Buttons */}
        <View className='flex-1 items-center '>
          <Pressable className=' bg-cyan-500 rounded-full justify-center items-center w-28 h-28' onPress={togglePlayButton}>
            <LottieView
              ref={animation}
              progress={animationProgress.current}
              source={require("./assets/lotties/play-stop.json")}
              style={{
                width: 100,
                height: 100,

              }}
            />
          </Pressable>

          {/* <View className=' border-cyan-500 border-2 rounded-full justify-center items-center w-28 h-28 '>
            <Text className='text-slate-100'>
              
            </Text>
          </View> */}

        </View>

      </View>
    </SafeAreaView>
  );
}

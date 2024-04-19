import { View, Text, TouchableOpacity, Pressable, Animated, Easing } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useSettings } from "../hooks/useSettings";
import LottieView from "lottie-react-native";

interface ICountdownProps {
  numOfPhases: number;
  onFinish?: () => void;
}

export interface ICountdownFunctions {
  resetTimer: () => void;
}

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const Countdown = React.forwardRef<ICountdownFunctions, ICountdownProps>(
  ({ numOfPhases, onFinish = () => null }, ref) => {
    const { settings } = useSettings();
    const animation = useRef<LottieView>(null);
    const animationProgress = useRef(new Animated.Value(0));

    const [timerState, setTimerState] = useState({
      minutes: -1,
      seconds: -1,
    });
    const [activePhase, setActivePhase] = useState(0);
    const [playing, setPlaying] = useState(false);

    const initSeconds = parseInt(settings.workoutTimerSeconds);

    const phases = new Array(numOfPhases).fill(undefined).map((_, index) => {
      if (index % 2 === 0) {
        // workout phase
        return {
          phaseLabel: "workout",
          phaseTitle: "Aktiv",
          timerSecondsStart: parseInt(settings.workoutTimerSeconds),
        };
      }

      // break phase
      return {
        phaseLabel: "break",
        phaseTitle: "Pause",
        timerSecondsStart: parseInt(settings.workoutPauseSeconds),
      };
    });

    const currPhase = phases[activePhase];

    const [seconds, setSeconds] = useState(currPhase.timerSecondsStart);

    const isTimeUp = activePhase === numOfPhases - 1 && (seconds === 0 || seconds - 1 === 0);

    useEffect(() => {
      // init counter
      updateCounter(currPhase.timerSecondsStart);
      setSeconds(currPhase.timerSecondsStart);
    }, [settings]);

    useEffect(() => {
      // handle counter update
      let interval: NodeJS.Timer | undefined = undefined;

      if (playing) {
        interval = setInterval(() => {
          setSeconds((oldSeconds) => {
            // handle if time is up
            if (isTimeUp) {
              stopCounter();
              clearInterval(interval);
            }

            if (oldSeconds === 0) {
              playNextPhase();
            }
            return oldSeconds - 1;
          });
        }, 1000);
      }

      return () => {
        clearInterval(interval);
      };
    }, [playing, activePhase, timerState]);

    useEffect(() => {
      // handle updates when phase changes
      updateCounter(currPhase.timerSecondsStart);
      setSeconds(currPhase.timerSecondsStart);
    }, [activePhase]);

    useEffect(() => {
      // handle updates when seconds changed
      updateCounter(seconds);
    }, [seconds]);

    const resetTimer = () => {
      setActivePhase(0);
      updateCounter(parseInt(settings.workoutTimerSeconds));
      setSeconds(parseInt(settings.workoutTimerSeconds));
    };

    const formatNumber = (n: number) => {
      let formatted = "0" + n;
      return formatted.slice(-2);
    };

    const updateCounter = (newSeconds: number) => {
      // setup minutes and seconds
      const minutes = Math.floor(newSeconds / 60);
      const seconds = newSeconds % 60;

      setTimerState({
        minutes,
        seconds,
      });
    };

    const playNextPhase = () => {
      setActivePhase((oldPhase) => oldPhase + 1);
    };

    const togglePlayButton = () => {
      if (!playing) {
        if (isTimeUp) {
          // handle when user clicks play button altough time is already up
          resetTimer();
        }

        startCounter();
      } else {
        stopCounter();
      }
    };

    const startCounter = () => {
      Animated.timing(animationProgress.current, {
        toValue: 0.5,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      setPlaying(true);
    };

    const stopCounter = () => {
      Animated.timing(animationProgress.current, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      setPlaying(false);
    };

    return (
      <View className="flex-1 flex-column justify-center items-center w-screen">
        <View className="py-10">
          <Text className="text-slate-100 text-xl">
            Phase {activePhase + 1} / {numOfPhases}
          </Text>
        </View>
        <View className="flex-row">
          <Text className="text-slate-100 text-7xl w-24 text-center">{formatNumber(timerState.minutes)}</Text>
          <Text className="text-slate-100 text-7xl">:</Text>
          <Text className="text-slate-100 text-7xl w-24 text-center">{formatNumber(timerState.seconds)}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-slate-100">{playing ? currPhase.phaseTitle : "Timer gestoppt"}</Text>
        </View>

        <View className="flex-1 items-center gap-10">
          <Pressable
            className=" bg-cyan-500 rounded-full justify-center items-center w-28 h-28"
            onPress={togglePlayButton}
          >
            <AnimatedLottieView
              ref={animation}
              progress={animationProgress.current}
              source={require("../../assets/lotties/play-stop.json")}
              style={{
                width: 100,
                height: 100,
              }}
            />
          </Pressable>

          {!playing && seconds !== initSeconds && (
            <TouchableOpacity onPress={resetTimer}>
              <Text className="text-slate-100 text-lg">Timer zurücksetzen</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export default Countdown;

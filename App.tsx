import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, TextInput } from 'react-native';
import RoundButton, { RoundButtonVariants } from './src/components/RoundButton';
import { useState } from "react";

const buttons = [
  ['C', '+/-', '%', '/',],
  ['7', '8', '9', "\u00d7",],
  ['4', '5', '6', '-',],
  ['1', '2', '3', '+',],
  ['0', '.', '=']
]

export default function App() {
  const [calculationInput, setCalculationInput] = useState<string>("")

  return (

    <SafeAreaView className="flex-1 justify-end items-center bg-slate-800">
      <StatusBar style="light" />
      <View className='flex-col py-3'>
        <View>
          <Text className='text-white'>
            {calculationInput}
          </Text>
        </View>

        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row">
            {row.map((button, btnIndex) => {
              let variant: RoundButtonVariants = rowIndex === 0 ? "secondary" : "normal"
              variant = btnIndex === row.length - 1 ? "accent" : variant // accent buttons = all right side buttons

              const bigButton = rowIndex === buttons.length - 1 && btnIndex === 0; // = button with number '0'
              return <RoundButton onPress={() => setCalculationInput(oldState => oldState.concat(button))} key={rowIndex.toString().concat(btnIndex.toString())} content={button} variant={variant} bigButton={bigButton} />
            })}
          </View>
        ))}

        {/* <View className="flex-row">
            <RoundButton content='C' variant='secondary' />
            <RoundButton content='+/-' variant='secondary' />
            <RoundButton content='%' variant='secondary' />
            <RoundButton content='/' variant='accent' />
          </View>
          <View className="flex-row">
            <RoundButton content='7' />
            <RoundButton content='8' />
            <RoundButton content='9' />
            <RoundButton content={"\u00d7"} variant='accent' />

          </View>
          <View className="flex-row">

            <RoundButton content='4' />
            <RoundButton content='5' />
            <RoundButton content='6' />
            <RoundButton content='-' variant='accent' />
          </View>

          <View className="flex-row">
            <RoundButton content='1' />
            <RoundButton content='2' />
            <RoundButton content='3' />
            <RoundButton content='+' variant='accent' />
          </View>

          <View className="flex-row">
            <RoundButton content='0' bigButton />
            <RoundButton content='.' />
            <RoundButton content='=' variant='accent' />

          </View> */}
      </View>
    </SafeAreaView>
  );
}

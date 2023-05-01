import { View, Text, Pressable } from 'react-native'
import React from 'react'

export type RoundButtonVariants = "normal" | "secondary" | "accent"

interface IRoundButton {
    content: string;
    width?: string;
    variant?: RoundButtonVariants
    bigButton?: boolean
    onPress: () => void
}


type VariantStyles = {
    [key in RoundButtonVariants]: string;
};

const variantStyles: VariantStyles = {
    normal: "slate-900",
    accent: "cyan-800",
    secondary: "slate-600"
}

const RoundButton: React.FC<IRoundButton> = ({ content, onPress, variant = "normal", bigButton = false }) => {
    if (bigButton) {
        return (
            <View className='flex-1'>
                <Pressable onPress={onPress} className={`h-20 bg-${variantStyles[variant]} m-1 justify-center items-center rounded-full self-stretch  active:opacity-70 `}>
                    <Text className='text-slate-300 font-light text-4xl absolute left-7'>{content}</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <Pressable onPress={onPress} className={`h-20 w-20 bg-${variantStyles[variant]} m-1 justify-center items-center rounded-full  active:opacity-70 `}>
            <Text className='text-slate-300 font-light text-4xl'>{content}</Text>
        </Pressable>
    )
}

export default RoundButton
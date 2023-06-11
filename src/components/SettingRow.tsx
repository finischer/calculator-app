import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ChevronRight } from 'react-native-feather';


export interface ISettingRow {
    title: string
    onClick: () => void
    value?: string
    topBorder?: boolean
    bottomBorder?: boolean
}

const SettingRow: React.FC<ISettingRow> = ({ title, onClick, value, topBorder = false, bottomBorder = false }) => {
    const [fingerOnRow, setFingerOnRow] = useState(false);
    const bgColor = fingerOnRow ? 'bg-slate-600' : 'bg-slate-900'
    const borderTopStyle = topBorder && 'rounded-t-xl'
    const borderBottomStyle = bottomBorder && 'rounded-b-xl'


    return (
        <Pressable
            onPressIn={() => setFingerOnRow(true)}
            onPressOut={() => setFingerOnRow(false)}
            onPress={onClick}
        >
            <View className={`pl-5 pr-3 py-4 ${borderTopStyle} ${borderBottomStyle} flex-row justify-between ${bgColor}`}>
                <Text className='text-slate-100 text-base font-normal'>{title}</Text>
                <View className='flex-row gap-2 '>
                    <Text className='text-slate-400 text-base font-normal'>{value || ""}</Text>
                    <ChevronRight
                        color="#475569"
                    />
                </View>
            </View>
        </Pressable>
    )
}

export default SettingRow
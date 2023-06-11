import { View, Text, Modal, ModalProps, Pressable, ActionSheetIOS, Alert } from 'react-native'
import React, { useRef } from 'react'
import { ISettingRow } from './SettingRow'
import RowSection from './RowSection'
import useSettings, { TSettings } from '../hooks/useSettings'
import { Picker } from '@react-native-picker/picker';


interface ISettingModal {
}

type TSettingModal = ISettingModal & ModalProps



const SettingModal: React.FC<TSettingModal> = (props) => {
    const { settings, updateSettings } = useSettings()

    const handleClick = (title: string, value: string | number, settingKey: keyof TSettings) => {
        Alert.prompt(
            title,
            "Wie viele Phasen beinhaltet dein Workout?",
            [
                {
                    text: "Speichern",
                    onPress: (value) => handleUpdateSetting(settingKey, value || ""),
                    isPreferred: true
                },
                {
                    text: "Zurück",
                    style: "cancel"

                }

            ],
            "plain-text",
            value.toString(),
            "number-pad"
        )
    }

    const rows: ISettingRow[] = [
        {
            title: "Workout Timer",
            onClick: () => null,
            value: `${settings.workoutTimerSeconds}s`
        },
        {
            title: "Pause",
            onClick: () => null,
            value: `${settings.workoutPauseSeconds}s`
        },
        {
            title: "Anzahl Phasen",
            onClick: function () {
                handleClick(
                    "Anzahl Phasen",
                    settings.numberPhases,
                    "numberPhases"
                )
            },
            value: settings.numberPhases.toString()
        }
    ]

    const handleUpdateSetting = (key: keyof TSettings, newValue: string) => {
        const newSettings: TSettings = {
            ...settings,
            [key]: newValue
        }

        updateSettings(newSettings)
    }

    return (
        <Modal
            {...props}
            animationType='slide'
            presentationStyle='formSheet'
        >
            <View className=' flex-1 bg-slate-800 p-5'>
                <View className=''>
                    <Text className='text-center text-slate-100 text-lg font-semibold'>Einstellungen</Text>
                </View>

                <View className='mt-10'>
                    <RowSection rows={rows} withMarginTop={false} />
                </View>
            </View>
        </Modal >
    )
}

export default SettingModal
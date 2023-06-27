import React from 'react'
import { Alert, Modal, ModalProps, Text, View } from 'react-native'
import { TSettings, useSettings } from '../hooks/useSettings'
import RowSection from './RowSection'
import { ISettingRow } from './SettingRow'


interface ISettingModal {
}

type TSettingModal = ISettingModal & ModalProps



const SettingModal: React.FC<TSettingModal> = (props) => {
    const { settings, updateSettings } = useSettings()

    const handleClick = (title: string, msg: string, value: string | number, settingKey: keyof TSettings) => {
        Alert.prompt(
            title,
            msg,
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
            onClick: function () {
                handleClick(
                    "Workout Timer",
                    "Wie viele Sekunden soll eine Übung gehen?",
                    settings.workoutTimerSeconds,
                    "workoutTimerSeconds"
                )
            },
            value: `${settings.workoutTimerSeconds}s`
        },
        {
            title: "Pause",
            onClick: function () {
                handleClick(
                    "Pause Timer",
                    "Wie viele Sekunden Pause möchtest du zwischen den Übungen haben?",
                    settings.workoutPauseSeconds,
                    "workoutPauseSeconds"
                )
            },
            value: `${settings.workoutPauseSeconds}s`
        },
        {
            title: "Anzahl Phasen",
            onClick: function () {
                handleClick(
                    "Anzahl Phasen",
                    "Wie viele Phasen beinhaltet dein Workout?",
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
import { Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type TSettings = {
    workoutTimerSeconds: number,
    workoutPauseSeconds: number,
    numberPhases: number
}

const DEFAULT_SETTINGS: TSettings = {
    numberPhases: 10,
    workoutTimerSeconds: 30,
    workoutPauseSeconds: 20
}

const showErrorAlert = () => {
    Alert.alert(
        "Ein Fehler ist aufgetreten",
        "Deine gespeicherten Einstellungen konnten nicht gefunden werden"
    )
}

const useSettings = () => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS)

    const initSettings = async () => {
        try {

            const localSettingsString = await AsyncStorage.getItem("settings")
            if (localSettingsString) {
                const settingsJson = JSON.parse(localSettingsString)
                console.log("LocalSettings: ", settingsJson)
                setSettings(settingsJson)
            }
        } catch (e) {
            showErrorAlert()
        }
    }

    const updateSettings = async (newSettings: TSettings) => {
        setSettings(newSettings)
        try {
            await AsyncStorage.setItem("settings", JSON.stringify(newSettings))
        } catch (e) {
            showErrorAlert()
        }
    }

    useEffect(() => {
        initSettings()
    }, [])

    return { settings, updateSettings }
}

export default useSettings
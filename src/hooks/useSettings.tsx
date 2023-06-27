import { Alert } from 'react-native'
import React, { useState, useEffect, createContext, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type TSettings = {
    workoutTimerSeconds: string,
    workoutPauseSeconds: string,
    numberPhases: string
}

export interface ISettingsContext {
    settings: TSettings;
    updateSettings: (newSettings: TSettings) => void
};

const DEFAULT_SETTINGS: TSettings = {
    numberPhases: "10",
    workoutTimerSeconds: "30",
    workoutPauseSeconds: "20"
}

const showErrorAlert = () => {
    Alert.alert(
        "Ein Fehler ist aufgetreten",
        "Deine gespeicherten Einstellungen konnten nicht gefunden werden"
    )
}

const SettingsContext = createContext<ISettingsContext | undefined>(undefined);

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS)

    const initSettings = async () => {
        try {
            const localSettingsString = await AsyncStorage.getItem("settings")
            if (localSettingsString) {
                const settingsJson = JSON.parse(localSettingsString)
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

    return (
        <SettingsContext.Provider
            value={{
                settings,
                updateSettings
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

const useSettings = () => {
    const context = useContext(SettingsContext);

    if (context === undefined) {
        throw Error("useSettings must be used within MetadataProvider");
    }
    return context;
};

export { useSettings, SettingsProvider }
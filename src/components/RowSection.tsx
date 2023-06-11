import { View, Text, FlatList } from 'react-native'
import React, { Fragment } from 'react'
import SettingRow, { ISettingRow } from './SettingRow'

interface IRowSection {
    rows: ISettingRow[]
    withMarginTop?: boolean
}

const RowSection: React.FC<IRowSection> = ({ rows, withMarginTop = true }) => {
    return (
        <View className={` bg-slate-900 rounded-xl ${withMarginTop && 'mt-10'} `}>
            {rows.map((row, idx) => {
                const isFirst = idx === 0;
                const isNotLast = idx !== rows.length - 1

                return (

                    <Fragment key={idx}>
                        <SettingRow {...row} topBorder={isFirst} bottomBorder={!isNotLast} />
                        {isNotLast &&
                            <View className='bg-slate-100 border border-b-0 border-y-slate-600 ml-5' />
                        }
                    </Fragment>
                )
            })}
        </View>
    )
}

export default RowSection
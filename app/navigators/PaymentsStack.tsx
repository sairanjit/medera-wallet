import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import SettingsMenu from '../components/buttons/SettingsMenu'
import { useConfiguration } from '../contexts/configuration'
import { useTheme } from '../contexts/theme'
import ListPayments from '../screens/ListPayments'
import { PaymentsStackParams, Screens } from '../types/navigators'

import { createDefaultStackOptions } from './defaultStackOptions'

const PaymentsStack: React.FC = () => {
  const Stack = createStackNavigator<PaymentsStackParams>()
  const theme = useTheme()
  const { credentialListHeaderRight: CredentialListHeaderRight } = useConfiguration()
  const defaultStackOptions = createDefaultStackOptions(theme)

  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen
        name={Screens.ListPayments}
        component={ListPayments}
        options={() => ({
          title: 'Payments',
          headerRight: () => <CredentialListHeaderRight />,
          headerLeft: () => <SettingsMenu />,
        })}
      />
    </Stack.Navigator>
  )
}

export default PaymentsStack

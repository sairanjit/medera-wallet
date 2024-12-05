import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useTheme } from '../contexts/theme'
import ProofChangeCredential from '../screens/ProofChangeCredential'
import ProofChangeCredentialW3C from '../screens/ProofChangeCredentialW3C'
import { ProofRequestsStackParams, Screens } from '../types/navigators'

import { createDefaultStackOptions } from './defaultStackOptions'

const ProofRequestStack: React.FC = () => {
  const Stack = createStackNavigator<ProofRequestsStackParams>()
  const theme = useTheme()
  const { t } = useTranslation()
  const defaultStackOptions = createDefaultStackOptions(theme)

  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen
        name={Screens.ProofChangeCredential}
        component={ProofChangeCredential}
        options={{ title: t('Screens.ProofChangeCredential') }}
      />
      <Stack.Screen
        name={Screens.ProofChangeCredentialW3C}
        component={ProofChangeCredentialW3C}
        options={{ title: t('Screens.ProofChangeCredentialW3C') }}
      />
    </Stack.Navigator>
  )
}

export default ProofRequestStack

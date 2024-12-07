import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

import { useNetwork } from '../../contexts/network'
import { useTheme } from '../../contexts/theme'
import { Screens, Stacks } from '../../types/navigators'

const ScanButton: React.FC = () => {
  const navigation = useNavigation()
  const { assertConnectedNetwork } = useNetwork()
  const { ColorPallet } = useTheme()
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginTop: 'auto',
    },
    iconContainer: {
      width: 70,
      height: 70,
      backgroundColor: ColorPallet.brand.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 70 / 2,
      marginRight: 10,
      marginBottom: 10,
    },
  })
  const navigateToConnect = () => {
    if (!assertConnectedNetwork()) {
      return
    }

    navigation.navigate(Stacks.ConnectStack, { screen: Screens.Scan })
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToConnect}>
        <View style={styles.iconContainer}>
          <Icon name={'scan1'} size={35} color={ColorPallet.brand.text} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ScanButton

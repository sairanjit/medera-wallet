/* eslint-disable no-console */
import { CommonActions } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native'

import LoadingModal from '../components/modals/LoadingModal'
import { ContactStackParams, Screens, Stacks } from '../types/navigators'
import { getBalance, sendTokens } from '../utils/hedera'

type SendPaymentProps = StackScreenProps<ContactStackParams, Screens.SendPayment>

const SendPaymentScreen: React.FC<SendPaymentProps> = ({ route, navigation }) => {
  const { accountId } = route.params || {}

  // Simulated current balance (would typically come from state management or API)
  const [currentBalance, setCurrentBalance] = useState('0.0 ℏ')

  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)
        const balance = await getBalance()
        setCurrentBalance(balance.hbars.toString())
        setLoading(false)
      } catch (err: any) {
        setLoading(false)
        console.log('Balance Error', err)
      }
    }
    init()
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      paddingHorizontal: 20,
    },
    balanceContainer: {
      alignItems: 'center',
      marginVertical: 20,
      padding: 15,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    balanceLabel: {
      fontSize: 16,
      color: '#888',
    },
    balanceAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    inputContainer: {
      marginTop: 20,
    },
    label: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 15,
      fontSize: 16,
    },
    sendButton: {
      backgroundColor: '#007bff',
      borderRadius: 10,
      padding: 15,
      alignItems: 'center',
    },
    sendButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  })

  // Validate amount input
  const validateAmount = (text: string) => {
    // Allow only numbers and decimal point
    const cleanedText = text.replace(/[^0-9.]/g, '')

    // Ensure only one decimal point
    const parts = cleanedText.split('.')
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1]
    }

    setAmount(cleanedText)
  }

  // Handle payment submission
  const handleSendPayment = () => {
    // Basic validation
    if (!accountId) {
      Alert.alert('Error', 'Please enter a valid Account ID')
      return
    }

    const paymentAmount = parseFloat(amount)
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount')
      return
    }

    // Simulate payment process
    Alert.alert('Confirm Payment', `Send ${paymentAmount.toFixed(2)} ℏ to Account ${accountId}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: async () => {
          try {
            setLoading(true)
            const response = await sendTokens(accountId, paymentAmount)
            console.log('response', response)
            setLoading(false)

            Alert.alert('Success', 'Payment sent successfully!')

            setTimeout(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: Stacks.TabStack }],
                }),
              )
            }, 2000)
          } catch (error) {
            console.log('error', error)
            setLoading(false)
            Alert.alert('Error', 'Payment Failed')
          }
        },
      },
    ])
  }

  if (loading) {
    return <LoadingModal />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>${currentBalance}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Recipient Account ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account ID"
          value={accountId}
          editable={false}
          keyboardType="default"
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          value={amount}
          onChangeText={validateAmount}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendPayment}>
          <Text style={styles.sendButtonText}>Send Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default SendPaymentScreen

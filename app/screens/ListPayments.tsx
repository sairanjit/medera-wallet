import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native'

import Button, { ButtonType } from '../components/buttons/Button'
import { useTheme } from '../contexts/theme'
import { TextTheme } from '../theme'

// Mock data for transactions and balance
const MOCK_BALANCE = 2.45678
const MOCK_TRANSACTIONS = [
  { id: '1', date: '2024-05-15', amount: -0.1, to: 'Netflix Subscription' },
  { id: '2', date: '2024-05-14', amount: 0.5, from: 'Earnings' },
  { id: '3', date: '2024-05-13', amount: -0.25, to: 'Amazon Purchase' },
  { id: '4', date: '2024-05-12', amount: 0.3, from: 'Work' },
]

const ListPayments = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [balance, setBalance] = useState(MOCK_BALANCE)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS)

  const { ColorPallet } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    balanceContainer: {
      alignItems: 'center',
      paddingVertical: 20,
      backgroundColor: ColorPallet.grayscale.white,
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.grayscale.lightGrey,
    },
    balanceAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    transactionsContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    payButtonContainer: {
      marginHorizontal: 50,
      justifyContent: 'center',
      paddingVertical: 10,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionText: {
      ...TextTheme.normal,
    },
    amountText: {
      ...TextTheme.normal,
    },
    incomingAmount: {
      color: ColorPallet.semantic.success,
    },
    outgoingAmount: {
      color: ColorPallet.semantic.error,
    },
  })

  const formatCurrency = value => {
    return value.toFixed(3) + ' HBAR'
  }

  const renderTransaction = transaction => {
    const isIncoming = transaction.amount > 0
    return (
      <View key={transaction.id} style={styles.transactionItem}>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionText}>
            {transaction.to ? `To: ${transaction.to}` : `From: ${transaction.from}`}
          </Text>
          <Text style={{ ...TextTheme.labelSubtitle }}>{transaction.date}</Text>
        </View>
        <Text style={[styles.amountText, isIncoming ? styles.incomingAmount : styles.outgoingAmount]}>
          {isIncoming ? '+' : '-'}
          {formatCurrency(Math.abs(transaction.amount))}
        </Text>
      </View>
    )
  }

  const handlePay = () => {}

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={{ ...TextTheme.label }}>Total Balance</Text>
        <Text style={{ ...TextTheme.headingThree }}>{formatCurrency(balance)}</Text>
      </View>

      {/* Pay Button */}
      <View style={styles.payButtonContainer}>
        <Button title={'PAY'} buttonType={ButtonType.Primary} onPress={handlePay} />
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <ScrollView>{transactions.map(renderTransaction)}</ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ListPayments

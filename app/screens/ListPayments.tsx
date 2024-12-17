/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native'

import Button, { ButtonType } from '../components/buttons/Button'
import LoadingModal from '../components/modals/LoadingModal'
import { useTheme } from '../contexts/theme'
import { TextTheme } from '../theme'
import { getAccountInfo, getBalance } from '../utils/hedera'

// Mock data for transactions and balance
const MOCK_BALANCE = '1 ℏ'
const MOCK_TRANSACTIONS = [
  { id: '1', date: '2024-05-15', amount: '-0.1 ℏ', to: 'Netflix Subscription' },
  { id: '2', date: '2024-05-14', amount: '0.5 ℏ', from: 'Earnings' },
  { id: '3', date: '2024-05-13', amount: '-0.25 ℏ', to: 'Amazon Purchase' },
  { id: '4', date: '2024-05-12', amount: '0.3 ℏ', from: 'Work' },
]

const ListPayments = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [balance, setBalance] = useState(MOCK_BALANCE)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS)
  const [loading, setLoading] = useState<boolean>(false)
  const [accountId, setAccountId] = useState('')

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

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)
        const response = await getAccountInfo()
        setAccountId(response.accountId.toString())
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('error', error)
      }

      try {
        setLoading(true)
        const balance = await getBalance()
        setBalance(balance.hbars.toString())
        setLoading(false)
      } catch (err: any) {
        setLoading(false)
        console.log('Balance Error', err)
      }
    }
    init()
  }, [])

  const formatCurrency = (value: string) => {
    return value
  }

  const renderTransaction = (transaction: {
    amount: string | string[]
    id: React.Key | null | undefined
    to: any
    from: any
    date:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined
  }) => {
    const isOutgoing = transaction.amount.includes('-')
    return (
      <View key={transaction.id} style={styles.transactionItem}>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionText}>
            {transaction.to ? `To: ${transaction.to}` : `From: ${transaction.from}`}
          </Text>
          <Text style={{ ...TextTheme.labelSubtitle }}>{transaction.date}</Text>
        </View>
        <Text style={[styles.amountText, !isOutgoing ? styles.incomingAmount : styles.outgoingAmount]}>
          {/* {isIncoming ? '+' : '-'} */}
          {formatCurrency(transaction.amount)}
        </Text>
      </View>
    )
  }

  const handlePay = () => {}

  if (loading) {
    return <LoadingModal />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Balance Section */}
      <View style={styles.row}>
        <View style={styles.balanceContainer}>
          <Text style={{ ...TextTheme.label }}>Account ID</Text>
          <Text style={{ ...TextTheme.headingThree }}>{accountId}</Text>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={{ ...TextTheme.label }}>Total Balance</Text>
          <Text style={{ ...TextTheme.headingThree }}>{formatCurrency(balance)}</Text>
        </View>
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

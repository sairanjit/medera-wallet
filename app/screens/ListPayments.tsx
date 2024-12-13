/* eslint-disable no-console */
import { Client, AccountId, AccountBalanceQuery, AccountInfoQuery, PrivateKey } from '@hashgraph/sdk'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native'

import Button, { ButtonType } from '../components/buttons/Button'
import { useTheme } from '../contexts/theme'
import { TextTheme } from '../theme'

// Mock data for transactions and balance
const MOCK_BALANCE = '1 ℏ'
const MOCK_TRANSACTIONS = [
  { id: '1', date: '2024-05-15', amount: '-0.1 ℏ', to: 'Netflix Subscription' },
  { id: '2', date: '2024-05-14', amount: '0.5 ℏ', from: 'Earnings' },
  { id: '3', date: '2024-05-13', amount: '-0.25 ℏ', to: 'Amazon Purchase' },
  { id: '4', date: '2024-05-12', amount: '0.3 ℏ', from: 'Work' },
]

const OPERATOR_ID = '0.0.5115185'
const OPERATOR_KEY = '302a300506032b6570032100bfd5934e0bc6efd2ed70b422882e7704d8829523cc61d6dfe55f71286e2cf090'

const ListPayments = () => {
  const operatorId = AccountId.fromString(OPERATOR_ID)
  const operatorKey = PrivateKey.fromString(OPERATOR_KEY)
  const client = Client.forTestnet().setOperator(operatorId, operatorKey)

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

  useEffect(() => {
    const init = async () => {
      // try {
      //   const response = await new TransferTransaction()
      //     .addHbarTransfer(operatorId, -1)
      //     .addHbarTransfer('0.0.3', 1)
      //     .execute(client)
      //   console.log('response', response)
      //   // setTransaction(response)
      // } catch (err: any) {
      //   console.log('err', err)
      //   // Alert.alert(err.toString())
      // }
      try {
        const info = await new AccountInfoQuery().setAccountId(operatorId).execute(client)
        console.log('info', info)
        // setInfo(info)
      } catch (err: any) {
        // Alert.alert(err.toString())
      }

      try {
        const balance = await new AccountBalanceQuery().setAccountId(operatorId).execute(client)
        console.log('balance', balance)
        setBalance(balance.hbars.toString())
      } catch (err: any) {
        console.log('B Error', err)
        // Alert.alert(err.toString())
      }

      // try {
      //   const mnemonic = await Mnemonic.generate12()

      //   setMnemonic(mnemonic)
      // } catch (err: any) {
      //   Alert.alert(err.toString())
      // }
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
    const isIncoming = transaction.amount.includes('-')
    return (
      <View key={transaction.id} style={styles.transactionItem}>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionText}>
            {transaction.to ? `To: ${transaction.to}` : `From: ${transaction.from}`}
          </Text>
          <Text style={{ ...TextTheme.labelSubtitle }}>{transaction.date}</Text>
        </View>
        <Text style={[styles.amountText, isIncoming ? styles.incomingAmount : styles.outgoingAmount]}>
          {/* {isIncoming ? '+' : '-'} */}
          {formatCurrency(transaction.amount)}
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

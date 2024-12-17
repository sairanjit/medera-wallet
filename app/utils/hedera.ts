import {
  AccountBalanceQuery,
  AccountId,
  AccountInfoQuery,
  Client,
  ContractCallQuery,
  ContractFunctionParameters,
  PrivateKey,
  TransferTransaction,
} from '@hashgraph/sdk'

export const OPERATOR_ID = '0.0.5115185'
export const OPERATOR_KEY = '0x42afb1f7b0f76a407c8568de833d929ef9048a4300871547673c8cbc2d946ed8'

const contractId = '0.0.5256922'

const operatorId = AccountId.fromString(OPERATOR_ID)
const operatorKey = PrivateKey.fromStringED25519(OPERATOR_KEY)
const client = Client.forTestnet().setOperator(operatorId, operatorKey)

export const getBalance = async () => {
  const balance = await new AccountBalanceQuery().setAccountId(operatorId).execute(client)
  return balance
}

export const getAccountInfo = async () => {
  const info = await new AccountInfoQuery().setAccountId(operatorId).execute(client)
  return info
}

export const checkIfDIDExistsInTrustRegistry = async (did: string) => {
  const query = new ContractCallQuery()
    .setContractId(contractId)
    .setGas(60000)
    .setFunction('isResourceExist', new ContractFunctionParameters().addString(did))
  const contractCallResult = await query.execute(client)
  const message = contractCallResult.getBool()
  return message
}

export const sendTokens = async (to: string, amount: number) => {
  const response = await new TransferTransaction()
    .addHbarTransfer(operatorId, -amount)
    .addHbarTransfer(to, amount)
    .execute(client)
  return response
}

export function transformToKeyValueArray(input: any) {
  if (!input || typeof input !== 'object') return []

  const result = []

  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      // If the value is an array, process each item in the array
      value.forEach(item => {
        const nestedArray = Object.entries(item).map(([nestedKey, nestedValue]) => ({
          key: nestedKey,
          value: nestedValue,
        }))
        result.push({
          key: key,
          value: nestedArray,
        })
      })
    } else {
      // If the value is not an array, push as key-value pair
      result.push({
        key: key,
        value: value,
      })
    }
  }

  return result
}

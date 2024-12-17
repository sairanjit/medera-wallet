import { useConnectionById } from '@adeya/ssi'
// eslint-disable-next-line import/no-extraneous-dependencies
import { AutoAcceptProof, DidExchangeState, OutOfBandDidCommService, utils } from '@credo-ts/core'
import { CommonActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
import Toast from 'react-native-toast-message'

import Button, { ButtonType } from '../components/buttons/Button'
import LoadingModal from '../components/modals/LoadingModal'
import { ToastType } from '../components/toast/BaseToast'
import { BifoldError } from '../types/error'
import { ContactStackParams, Screens, Stacks } from '../types/navigators'
import { useAppAgent } from '../utils/agent'
import { checkIfDIDExistsInTrustRegistry } from '../utils/hedera'
import {
  checkIfAlreadyConnected,
  connectFromInvitation,
  fetchUrlData,
  getJson,
  getUrl,
  isValidUrl,
  receiveMessageFromUrlRedirect,
} from '../utils/helpers'

type ConnectionInfoProps = StackScreenProps<ContactStackParams, Screens.ConnectionInfo>

const ConnectionInfo: React.FC<ConnectionInfoProps> = ({ route, navigation }) => {
  const { invitationURL } = route.params || {}

  const [loading, setLoading] = useState<boolean>(false)
  const [connectionRecordId, setConnectionRecordId] = useState<string | undefined>(undefined)
  const record = useConnectionById(connectionRecordId ?? '')

  const { agent } = useAppAgent()
  const { t } = useTranslation()

  const [contactDetails, setContactDetails] = useState<{
    label: string
    logo: string
    serviceEndpoint: string
    issuerDid: string
    isTrusted: boolean
    goal: string
  } | null>(null)

  useEffect(() => {
    if (!invitationURL) return

    const getContactDetails = async () => {
      const outOfBandInvitation = await agent.oob.parseInvitation(invitationURL)

      if (outOfBandInvitation) {
        let serviceEndpoint = ''
        const services = outOfBandInvitation.getServices()

        if (services[0] instanceof OutOfBandDidCommService) {
          const service = services[0]
          serviceEndpoint = service.serviceEndpoint
        } else if (typeof services[0] === 'string') {
          if (services[0]?.startsWith('did:peer')) {
            const peerDid = await agent.dids.resolve(services[0])

            serviceEndpoint = peerDid.didDocument?.getServicesByType('did-communication')[0]?.serviceEndpoint ?? 'N/A'
          }
        }

        // Check from trust registry
        const message = await checkIfDIDExistsInTrustRegistry(outOfBandInvitation?.goalCode ?? '')
        // eslint-disable-next-line no-console
        console.log('message:::::::::::::::::::::::', message)

        setContactDetails({
          label: outOfBandInvitation.label ?? 'Unknown Connection',
          logo: outOfBandInvitation.imageUrl ?? '',
          serviceEndpoint: serviceEndpoint ?? 'N/A',
          issuerDid: outOfBandInvitation?.goalCode ?? 'issuer did',
          isTrusted: message,
          goal: outOfBandInvitation?.goal ?? '',
        })
      }
    }

    getContactDetails()
  }, [invitationURL])

  useEffect(() => {
    if (!record) {
      return
    }

    const sendAsyncProof = async () => {
      if (record && record.state === DidExchangeState.Completed) {
        try {
          setLoading(true)
          await agent.proofs.proposeProof({
            connectionId: record.id,
            proofFormats: {
              presentationExchange: {
                presentationDefinition: {
                  id: utils.uuid(),
                  name: 'Prescription Proof',
                  purpose: 'To verify your prescription',
                  input_descriptors: [
                    {
                      id: 'prescription',
                      name: 'Prescription',
                      purpose: 'To verify your prescription',
                      schema: [
                        {
                          uri: 'https://ghkrishna.github.io/schemas/Prescription.json',
                        },
                      ],
                      constraints: {
                        fields: [
                          {
                            path: ['$.credentialSubject.prescription', '$.credentialSubject.patientDetails'],
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
            protocolVersion: 'v2',
            autoAcceptProof: AutoAcceptProof.Never,
          })
          setLoading(false)
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: Stacks.TabStack }],
            }),
          )
        } catch (error) {
          setLoading(false)
          // eslint-disable-next-line no-console
          console.log('Error while proposing proof', error)
        }
      }
    }
    sendAsyncProof()
  }, [record])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
      justifyContent: 'center',
      padding: 15,
    },
    detailsContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    logo: {
      width: 120,
      height: 120,
      alignSelf: 'center',
      marginBottom: 20,
      borderRadius: 60,
    },
    placeholderLogo: {
      width: 120,
      height: 120,
      backgroundColor: '#e1e1e1',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 20,
    },
    placeholderLogoText: {
      color: '#666',
      fontWeight: 'bold',
    },
    infoSection: {
      marginBottom: 20,
    },
    labelTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    detailRow: {
      flexDirection: 'row',
      marginVertical: 5,
      alignItems: 'center',
    },
    detailLabel: {
      fontWeight: 'bold',
      marginRight: 10,
      width: 120,
    },
    detailValue: {
      flex: 1,
    },
    trustedText: {
      color: 'green',
    },
    untrustedText: {
      color: 'orange',
    },
    buttonContainer: {
      marginTop: 'auto',
      margin: 20,
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      padding: 15,
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: 'center',
    },
    acceptButton: {
      backgroundColor: '#4CAF50',
    },
  })

  const handleAccept = async (): Promise<void> => {
    const value = invitationURL
    try {
      setLoading(true)

      const isAlreadyConnected = await checkIfAlreadyConnected(agent, value)

      if (isAlreadyConnected) {
        setLoading(false)

        Toast.show({
          type: ToastType.Warn,
          text1: t('Contacts.AlreadyConnected'),
        })
        navigation.goBack()
        return
      }

      const { connectionRecord, outOfBandRecord } = await connectFromInvitation(agent, value)
      setLoading(false)

      if (contactDetails?.goal === 'verify-prescription') {
        setConnectionRecordId(connectionRecord?.id)
      } else {
        navigation.getParent()?.navigate(Stacks.ConnectionStack, {
          screen: Screens.Connection,
          params: { connectionId: connectionRecord?.id, outOfBandId: outOfBandRecord.id },
        })
      }
    } catch (err: unknown) {
      try {
        // if scanned value is json -> pass into AFJ as is
        const json = getJson(value)
        if (json) {
          await agent?.receiveMessage(json)
          setLoading(false)
          navigation.getParent()?.navigate(Stacks.ConnectionStack, {
            screen: Screens.Connection,
            params: { threadId: json['@id'] },
          })
          return
        }

        const urlData = await fetchUrlData(value)
        const isValidURL = isValidUrl(urlData)

        if (isValidURL) {
          const isAlreadyConnected = await checkIfAlreadyConnected(agent, urlData)

          if (isAlreadyConnected) {
            setLoading(false)

            Toast.show({
              type: ToastType.Warn,
              text1: t('Contacts.AlreadyConnected'),
            })
            navigation.goBack()
            return
          }

          const { connectionRecord, outOfBandRecord } = await connectFromInvitation(agent, urlData)

          setLoading(false)
          navigation.getParent()?.navigate(Stacks.ConnectionStack, {
            screen: Screens.Connection,
            params: { connectionId: connectionRecord?.id, outOfBandId: outOfBandRecord.id },
          })
          return
        }
        // if scanned value is url -> receive message from it

        const url = getUrl(value)

        if (url) {
          const message = await receiveMessageFromUrlRedirect(value, agent)
          setLoading(false)
          if (contactDetails?.goal) {
            setRecord(message)
          } else {
            navigation.getParent()?.navigate(Stacks.ConnectionStack, {
              screen: Screens.Connection,
              params: { threadId: message['@id'] },
            })
          }
          return
        }

        setLoading(false)
      } catch (err: unknown) {
        setLoading(false)
        const error = new BifoldError(t('Error.Title1031'), t('Error.Message1031'), (err as Error).message, 1031)
        throw error
      }
    }
  }

  const handleDeny = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: Stacks.TabStack }],
      }),
    )
  }

  if (loading || !contactDetails) {
    return <LoadingModal />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          {/* Connection Logo */}
          {contactDetails.logo ? (
            <Image source={{ uri: contactDetails.logo }} style={styles.logo} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderLogo}>
              <Text style={styles.placeholderLogoText}>No Logo</Text>
            </View>
          )}

          {/* Connection Details */}
          <View style={styles.infoSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Label:</Text>
              <Text style={styles.detailValue}>{contactDetails.label}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Service Endpoint:</Text>
              <Text style={styles.detailValue} numberOfLines={2}>
                {contactDetails.serviceEndpoint}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Issuer DID:</Text>
              <Text style={styles.detailValue} numberOfLines={2}>
                {contactDetails.issuerDid}
              </Text>
            </View>

            {/* Trust Status */}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Trust Status:</Text>
              <Text style={[styles.detailValue, contactDetails.isTrusted ? styles.trustedText : styles.untrustedText]}>
                {contactDetails.isTrusted ? 'Trusted' : 'Not Trusted'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {connectionRecordId ? null : (
        <View style={styles.buttonContainer}>
          {contactDetails.isTrusted ? (
            <>
              <Button
                title={'ACCEPT'}
                buttonType={ButtonType.Primary}
                accessibilityLabel={'okay'}
                onPress={handleAccept}
              />
            </>
          ) : (
            <>
              <Button
                title={'ACCEPT ANYWAY'}
                buttonType={ButtonType.Primary}
                accessibilityLabel={'okay'}
                onPress={handleAccept}
              />
            </>
          )}

          <View style={{ height: 15 }} />

          <Button title={'DENY'} buttonType={ButtonType.Secondary} accessibilityLabel={'okay'} onPress={handleDeny} />
        </View>
      )}
    </SafeAreaView>
  )
}

export default ConnectionInfo

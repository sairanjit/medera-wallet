import type { BarCodeReadEvent } from 'react-native-camera'

import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import { check, Permission, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import Toast from 'react-native-toast-message'

import NewQRView from '../components/misc/NewQRView'
import QRScanner from '../components/misc/QRScanner'
import CameraDisclosureModal from '../components/modals/CameraDisclosureModal'
import LoadingModal from '../components/modals/LoadingModal'
import { ToastType } from '../components/toast/BaseToast'
import { useStore } from '../contexts/store'
import { QrCodeScanError } from '../types/error'
import { ConnectStackParams, Screens, Stacks } from '../types/navigators'
import { PermissionContract } from '../types/permissions'
import { useAppAgent } from '../utils/agent'

export type ScanProps = StackScreenProps<ConnectStackParams>

const Scan: React.FC<ScanProps> = ({ navigation, route }) => {
  const { agent } = useAppAgent()
  const { t } = useTranslation()
  const [store] = useStore()
  const [loading, setLoading] = useState<boolean>(true)
  const [showDisclosureModal, setShowDisclosureModal] = useState<boolean>(true)
  const [qrCodeScanError, setQrCodeScanError] = useState<QrCodeScanError | null>(null)
  let defaultToConnect = false
  if (route?.params && route.params['defaultToConnect']) {
    defaultToConnect = route.params['defaultToConnect']
  }

  const isRedirection = (url: string): boolean => {
    return !(url.includes('oob') || url.includes('c_i') || url.includes('d_m'))
  }

  const handleCodeScan = async (event: BarCodeReadEvent) => {
    setQrCodeScanError(null)
    try {
      const uri = event.data
      // await handleInvitation(uri)
      setLoading(true)
      if (isRedirection(uri)) {
        // const response = await fetch(uri)
        const response = await fetch(uri, {
          method: 'GET',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const message = await response.json()
        // const result = await response.json()
        const resp = await agent.oob.parseInvitation(message)
        if (resp) {
          navigation.getParent()?.navigate(Stacks.ContactStack, {
            screen: Screens.ConnectionInfo,
            params: { invitationURL: message },
          })
        }
      } else {
        const response = await agent.oob.parseInvitation(uri)
        if (response) {
          navigation.getParent()?.navigate(Stacks.ContactStack, {
            screen: Screens.ConnectionInfo,
            params: { invitationURL: uri },
          })
        }
      }

      const response = await agent.oob.parseInvitation(uri)
      if (response) {
        navigation.getParent()?.navigate(Stacks.ContactStack, {
          screen: Screens.ConnectionInfo,
          params: { invitationURL: uri },
        })
      }
    } catch (e: unknown) {
      setLoading(false)
      const error = new QrCodeScanError(t('Scan.InvalidQrCode'), event.data)
      setQrCodeScanError(error)
    } finally {
      setLoading(false)
    }
  }

  const permissionFlow = async (method: PermissionContract, permission: Permission): Promise<boolean> => {
    try {
      const permissionResult = await method(permission)
      if (permissionResult === RESULTS.GRANTED) {
        setShowDisclosureModal(false)
        return true
      }
    } catch (error: unknown) {
      Toast.show({
        type: ToastType.Error,
        text1: t('Global.Failure'),
        text2: (error as Error)?.message || t('Error.Unknown'),
        visibilityTime: 2000,
        position: 'bottom',
      })
    }

    return false
  }

  const requestCameraUse = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      return await permissionFlow(request, PERMISSIONS.ANDROID.CAMERA)
    } else if (Platform.OS === 'ios') {
      return await permissionFlow(request, PERMISSIONS.IOS.CAMERA)
    }

    return false
  }

  useEffect(() => {
    const asyncEffect = async () => {
      if (Platform.OS === 'android') {
        await permissionFlow(check, PERMISSIONS.ANDROID.CAMERA)
      } else if (Platform.OS === 'ios') {
        await permissionFlow(check, PERMISSIONS.IOS.CAMERA)
      }
      setLoading(false)
    }

    asyncEffect()
  }, [])

  if (loading) {
    return <LoadingModal />
  }

  if (showDisclosureModal) {
    return <CameraDisclosureModal requestCameraUse={requestCameraUse} />
  }

  if (store.preferences.useConnectionInviterCapability) {
    return (
      <NewQRView
        defaultToConnect={defaultToConnect}
        handleCodeScan={handleCodeScan}
        error={qrCodeScanError}
        enableCameraOnError={true}
      />
    )
  } else {
    return <QRScanner handleCodeScan={handleCodeScan} error={qrCodeScanError} enableCameraOnError={true} />
  }
}

export default Scan

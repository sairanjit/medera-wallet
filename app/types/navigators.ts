import { CredentialExchangeRecord, W3cCredentialRecord } from '@adeya/ssi'
import { NavigatorScreenParams } from '@react-navigation/core'

export enum Screens {
  AttemptLockout = 'Temporarily Locked',
  Splash = 'Splash',
  Onboarding = 'Onboarding',
  Terms = 'Terms',
  CreatePIN = 'Create a PIN',
  EnterPIN = 'Enter PIN',
  Home = 'Home',
  Scan = 'Scan',
  Credentials = 'Credentials',
  CredentialDetails = 'Credential Details',
  Notifications = 'Notifications',
  CredentialOffer = 'Credential Offer',
  ProofRequest = 'Proof Request',
  ProofRequestW3C = 'Proof Request W3C',
  ProofRequestDetails = 'Proof Request Details',
  ProofRequestUsageHistory = 'Proof Request Usage History',
  Settings = 'Settings',
  Language = 'Language',
  Tours = 'Tours',
  Contacts = 'Contacts',
  ContactDetails = 'Contact Details',
  WhatAreContacts = 'What Are Contacts',
  Chat = 'Chat',
  Connection = 'Connection',
  OnTheWay = 'On The Way',
  Declined = 'Declined',
  UseBiometry = 'Use Biometry',
  RecreatePIN = 'Change PIN',
  Developer = 'Developer',
  CustomNotification = 'Custom Notification',
  ProofRequests = 'Proof Requests',
  ProofRequesting = 'Proof Requesting',
  ProofDetails = 'Proof Details',
  ConnectionInvitation = 'Connection Invitation',
  NameWallet = 'Name Wallet',
  CredentialDetailsJSONLD = 'Credential Details JSONLD',
  ExportWallet = 'Passphrase',
  ExportWalletConfirmation = 'Seed Phrase',
  ImportWallet = 'Import Wallet',
  ImportWalletVerify = 'Verify Phrase',
  Success = 'Success',
  WalletOptions = 'Create Walllet',
  ImportSuccess = 'Import Success',
  CredentialDetailsW3C = 'Credential Details W3C',
  ProofChangeCredential = 'Choose a credential',
  ProofChangeCredentialW3C = 'Choose a W3C credential',
  DataRetention = 'Data Retention',
  Explore = 'Explore',
  ListPayments = 'List Payments',
  ConnectionInfo = 'Connection Info',
  SendPayment = 'Send Payment',
}

export enum Stacks {
  TabStack = 'Tab Stack',
  HomeStack = 'Home Stack',
  ConnectStack = 'Connect Stack',
  CredentialStack = 'Credentials Stack',
  SettingStack = 'Settings Stack',
  ContactStack = 'Contacts Stack',
  ProofRequestsStack = 'Proof Requests Stack',
  NotificationStack = 'Notifications Stack',
  ConnectionStack = 'Connection Stack',
}

export enum TabStacks {
  HomeStack = 'Tab Home Stack',
  ConnectStack = 'Tab Connect Stack',
  CredentialStack = 'Tab Credential Stack',
  PaymentsStack = 'Tab Payments Stack',
}

export type RootStackParams = {
  [Screens.Splash]: undefined
  [Stacks.TabStack]: NavigatorScreenParams<TabStackParams>
  [Stacks.ConnectStack]: NavigatorScreenParams<ConnectStackParams>
  [Stacks.SettingStack]: NavigatorScreenParams<SettingStackParams>
  [Stacks.ContactStack]: NavigatorScreenParams<ContactStackParams>
  [Stacks.ProofRequestsStack]: NavigatorScreenParams<ProofRequestsStackParams>
  [Stacks.NotificationStack]: NavigatorScreenParams<NotificationStackParams>
}

export type TabStackParams = {
  [TabStacks.HomeStack]: NavigatorScreenParams<HomeStackParams>
  [TabStacks.ConnectStack]: NavigatorScreenParams<ConnectStackParams>
  [TabStacks.CredentialStack]: NavigatorScreenParams<CredentialStackParams>
  [TabStacks.PaymentsStack]: NavigatorScreenParams<PaymentsStackParams>
}

export type AuthenticateStackParams = {
  [Screens.Onboarding]: undefined
  [Screens.Terms]: undefined
  [Screens.AttemptLockout]: undefined
  [Screens.CreatePIN]: { setAuthenticated: (status: boolean) => void } | undefined
  [Screens.EnterPIN]: { setAuthenticated: (status: boolean) => void } | undefined
  [Screens.UseBiometry]: undefined
  [Screens.NameWallet]: undefined
  [Screens.ImportWalletVerify]: undefined
}

export type OnboardingStackParams = {
  [Screens.Onboarding]: undefined
  [Screens.Developer]: undefined
}

export type ContactStackParams = {
  [Screens.ConnectionInvitation]: undefined
  [Screens.Contacts]: undefined
  [Screens.Chat]: { connectionId: string }
  [Screens.ContactDetails]: { connectionId: string }
  [Screens.WhatAreContacts]: undefined
  [Screens.CredentialDetails]: { credentialId: string }
  [Screens.CredentialDetailsW3C]: { credential: CredentialExchangeRecord }
  [Screens.CredentialOffer]: { credentialId: string }
  [Screens.ProofDetails]: { recordId: string; isHistory?: boolean }
  [Screens.ProofRequest]: { proofId: string }
  [Screens.ProofRequestW3C]: { proofId: string }
  [Screens.Home]: undefined
  [Screens.ConnectionInfo]: { invitationURL: string }
  [Screens.SendPayment]: { accountId: string }
}

export type ProofRequestsStackParams = {
  [Screens.ProofRequests]: { connectionId?: string }
  [Screens.ProofRequesting]: { templateId: string; predicateValues?: Record<string, Record<string, number>> }
  [Screens.ProofDetails]: { recordId: string; isHistory?: boolean; senderReview?: boolean }
  [Screens.ProofRequestDetails]: { templateId: string; connectionId?: string }
  [Screens.ProofRequestUsageHistory]: { templateId: string }
  [Screens.ProofChangeCredential]: {
    selectedCred: string
    altCredentials: string[]
    proofId: string
    onCredChange: (arg: string) => void
  }
  [Screens.ProofChangeCredentialW3C]: {
    selectedCred: string
    altCredentials: string[]
    proofId: string
    onCredChange: (arg: string) => void
  }
}

export type CredentialStackParams = {
  [Screens.Credentials]: undefined
  [Screens.CredentialDetails]: { credential: CredentialExchangeRecord }
  [Screens.CredentialDetailsW3C]: { credential: W3cCredentialRecord }
  [Screens.Scan]: undefined
}

export type PaymentsStackParams = {
  [Screens.ListPayments]: undefined
  [Screens.SendPayment]: { accountId: string }
}

export type HomeStackParams = {
  [Screens.Home]: undefined
  [Screens.Notifications]: undefined
}

export type ConnectStackParams = {
  [Screens.Scan]: undefined
}

export type SettingStackParams = {
  [Screens.Settings]: undefined
  [Screens.Language]: undefined
  [Screens.Tours]: undefined
  [Screens.UseBiometry]: undefined
  [Screens.CreatePIN]: undefined
  [Screens.RecreatePIN]: undefined
  [Screens.Terms]: undefined
  [Screens.Onboarding]: undefined
  [Screens.Developer]: undefined
  [Screens.ExportWallet]: undefined
  [Screens.ExportWalletConfirmation]: undefined
  [Screens.Success]: undefined
  [Screens.ImportWalletVerify]: undefined
  [Screens.WalletOptions]: undefined
  [Screens.ImportSuccess]: undefined
  [Screens.NameWallet]: undefined
  [Screens.DataRetention]: undefined
}

export type NotificationStackParams = {
  [Screens.CredentialDetails]: { credentialId: string }
  [Screens.CredentialOffer]: { credentialId: string }
  [Screens.ProofRequest]: { proofId: string }
  [Screens.ProofRequestW3C]: { proofId: string }
  [Screens.CustomNotification]: undefined
  [Screens.ProofDetails]: { recordId: string }
}

export type DeliveryStackParams = {
  [Screens.Connection]: { connectionId?: string; threadId?: string; outOfBandId?: string }
  [Screens.CredentialOffer]: { credentialId: string }
  [Screens.ProofRequest]: { proofId: string }
  [Screens.OnTheWay]: { credentialId: string }
  [Screens.Declined]: { credentialId: string }
  [Screens.Chat]: { connectionId: string }
  [Screens.ContactDetails]: { connectionId: string }
}

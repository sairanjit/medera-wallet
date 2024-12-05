import { CredentialExchangeRecord } from '@adeya/ssi'

import { Attribute, Field } from '../types/record'

export const buildFieldsFromAnonCredsCredential = (credential: CredentialExchangeRecord): Array<Field> => {
  return credential?.credentialAttributes?.map(attr => new Attribute(attr)) || []
}

/*
 *                      Copyright 2024 Salto Labs Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import _ from 'lodash'
import { ElemID } from './element_id'

export type SeverityLevel = 'Error' | 'Warning' | 'Info'

export type SaltoErrorType = 'config' | 'dependency' | 'unresolvedReferences'

export type SaltoError = {
  message: string
  severity: SeverityLevel
  type?: SaltoErrorType
}

export type SaltoElementError = SaltoError & {
  elemID: ElemID
}

export const isSaltoElementError = (error: SaltoError | SaltoElementError): error is SaltoElementError =>
  'elemID' in error && error.elemID !== undefined

export const isSaltoError = (error: unknown): error is SaltoError =>
  _.isObject(error) && 'message' in error && 'severity' in error

export const createSaltoElementErrorFromError = ({
  error,
  severity,
  elemID,
}: {
  error: Error
  severity: SeverityLevel
  elemID: ElemID
}): SaltoElementError => ({ message: error.message, severity, elemID })

export type ConvertError = (elemID: ElemID, error: Error) => SaltoElementError

export const defaultConvertError: ConvertError = (elemID, error) => {
  if (isSaltoError(error) && isSaltoElementError(error)) {
    return error
  }
  return createSaltoElementErrorFromError({ error, severity: 'Error', elemID })
}

export const createSaltoElementError = ({
  message,
  severity,
  elemID,
}: {
  message: string
  severity: SeverityLevel
  elemID: ElemID
}): SaltoElementError => ({ message, severity, elemID })

export class CredentialError extends Error {}

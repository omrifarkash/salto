/*
*                      Copyright 2022 Salto Labs Ltd.
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
import { ElemID } from './element_id'

export type SaltoErrorSeverity = 'Error' | 'Warning' | 'Info'

export type SaltoErrorSource = 'config'

export type PreDeployAction = {
    label: string
    subtext: string[]
}

export type PostDeployAction = PreDeployAction

export type DeployActions = {
    preAction?: PreDeployAction
    postAction?: PostDeployAction
}

export type SaltoError = {
    message: string
    severity: SaltoErrorSeverity
    source?: SaltoErrorSource
    // TODO naming?
    deployActions?: DeployActions
}

export type SaltoElementError = SaltoError & {
    elemID: ElemID
}

export const isSaltoElementError = (error: SaltoError | SaltoElementError):
    error is SaltoElementError => 'elemID' in error

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
import { ElemID, ObjectType, toChange } from '@salto-io/adapter-api'
import { createChangeValidator } from '../../../src/deployment/change_validators'
import { deployNotSupportedValidator } from '../../../src/deployment/change_validators/deploy_not_supported'

describe('change validator creator', () => {
  describe('deployNotSupportedValidator', () => {
    const validators = {
      deployNotSupported: deployNotSupportedValidator,
    }
    it('should not fail if there are no deploy changes', async () => {
      expect(await createChangeValidator({ validators })([])).toEqual([])
    })

    it('should fail each change individually', async () => {
      expect(
        await createChangeValidator({ validators })([
          toChange({ after: new ObjectType({ elemID: new ElemID('myAdapter', 'obj') }) }),
          toChange({ before: new ObjectType({ elemID: new ElemID('myAdapter', 'obj2') }) }),
        ]),
      ).toEqual([
        {
          elemID: new ElemID('myAdapter', 'obj'),
          severity: 'Error',
          message: 'Salto does not support myAdapter deployments.',
          detailedMessage:
            'Salto does not support myAdapter deployments. Please see https://help.salto.io/en/articles/6927118-supported-business-applications for more details.',
        },
        {
          elemID: new ElemID('myAdapter', 'obj2'),
          severity: 'Error',
          message: 'Salto does not support myAdapter deployments.',
          detailedMessage:
            'Salto does not support myAdapter deployments. Please see https://help.salto.io/en/articles/6927118-supported-business-applications for more details.',
        },
      ])
    })
  })
})

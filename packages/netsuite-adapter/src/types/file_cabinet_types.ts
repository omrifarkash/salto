/*
*                      Copyright 2021 Salto Labs Ltd.
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
/* eslint-disable camelcase */
import { BuiltinTypes, CORE_ANNOTATIONS, createRestriction, ElemID, ObjectType } from '@salto-io/adapter-api'
import { createRefToElmWithValue } from '@salto-io/adapter-utils'
import * as constants from '../constants'
import { fieldTypes } from './field_types'

const pathRegex = '^/.+'

const fileElemID = new ElemID(constants.NETSUITE, 'file')
export const file = new ObjectType({
  elemID: fileElemID,
  annotations: {
  },
  fields: {
    path: {
      refType: createRefToElmWithValue(BuiltinTypes.SERVICE_ID),
      annotations: {
        [CORE_ANNOTATIONS.REQUIRED]: true,
        [CORE_ANNOTATIONS.RESTRICTION]: createRestriction({
          regex: pathRegex,
        }),
      },
    },
    content: {
      refType: createRefToElmWithValue(fieldTypes.fileContent),
      annotations: {
      },
    },
    availablewithoutlogin: {
      refType: createRefToElmWithValue(BuiltinTypes.BOOLEAN),
      annotations: {
      },
    },
    bundleable: {
      refType: createRefToElmWithValue(BuiltinTypes.BOOLEAN),
      annotations: {
      },
    },
    description: {
      refType: createRefToElmWithValue(BuiltinTypes.STRING),
      annotations: {
      },
    },
    generateurltimestamp: {
      refType: createRefToElmWithValue(BuiltinTypes.BOOLEAN),
      annotations: {
      },
    },
    hideinbundle: {
      refType: createRefToElmWithValue(BuiltinTypes.BOOLEAN),
      annotations: {
      },
    },
    isinactive: {
      refType: createRefToElmWithValue(BuiltinTypes.BOOLEAN),
      annotations: {
      },
    },
    internalId: {
      refType: BuiltinTypes.STRING,
      annotations: {
        [CORE_ANNOTATIONS.HIDDEN_VALUE]: true,
      },
    },
  },
  path: [constants.NETSUITE, constants.TYPES_PATH, fileElemID.name],
})


const folderElemID = new ElemID(constants.NETSUITE, 'folder')
export const folder = new ObjectType({
  elemID: folderElemID,
  annotations: {
  },
  fields: {
    path: {
      refType: createRefToElmWithValue(BuiltinTypes.SERVICE_ID),
      annotations: {
        [CORE_ANNOTATIONS.REQUIRED]: true,
        [CORE_ANNOTATIONS.RESTRICTION]: createRestriction({
          regex: pathRegex,
        }),
      },
    },
    bundleable: {
      refType: createRefToElmWithValue(BuiltinTypes.BOOLEAN),
      annotations: {
      },
    },
    description: {
      refType: createRefToElmWithValue(BuiltinTypes.STRING),
      annotations: {
      },
    },
    isinactive: {
      refType: createRefToElmWithValue(BuiltinTypes.BOOLEAN),
      annotations: {
      },
    },
    isprivate: {
      refType: createRefToElmWithValue(BuiltinTypes.BOOLEAN),
      annotations: {
      },
    },
    internalId: {
      refType: BuiltinTypes.STRING,
      annotations: {
        [CORE_ANNOTATIONS.HIDDEN_VALUE]: true,
      },
    },
  },
  path: [constants.NETSUITE, constants.TYPES_PATH, folderElemID.name],
})

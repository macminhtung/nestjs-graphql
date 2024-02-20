import { DEFAULT_ROLES, DEFAULT_SCOPES } from 'common/constants';

const { ADMIN, USER } = DEFAULT_ROLES;
const {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USER,

  CREATE_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  GET_ROLE,
} = DEFAULT_SCOPES;

export const DEFAULT_ROLE_SCOPES = [
  // #===============#
  // # ==> ADMIN <== #
  // #===============#
  // USER
  { roleId: ADMIN.id, scopeId: CREATE_USER.id },
  { roleId: ADMIN.id, scopeId: UPDATE_USER.id },
  { roleId: ADMIN.id, scopeId: DELETE_USER.id },
  { roleId: ADMIN.id, scopeId: GET_USER.id },

  // ROLE
  { roleId: ADMIN.id, scopeId: CREATE_ROLE.id },
  { roleId: ADMIN.id, scopeId: UPDATE_ROLE.id },
  { roleId: ADMIN.id, scopeId: DELETE_ROLE.id },
  { roleId: ADMIN.id, scopeId: GET_ROLE.id },

  // #==============#
  // # ==> USER <== #
  // #==============#
  // USER
  { roleId: USER.id, scopeId: GET_USER.id },

  // ROLE
  { roleId: USER.id, scopeId: GET_ROLE.id },
];

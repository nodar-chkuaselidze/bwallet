/*
 * Constants for bwallet
 * Includes actions and plugin-wide constant values
 *
 */

const { HARDWARE_WALLET_TIMEOUT } = require('./blockchain');

// supported input values for some actions
const SUPPORTED_ADDRESS_TYPES = ['receive', 'change', 'nested'];
const SUPPORTED_WALLET_TYPES = ['standard', 'multisig', undefined, 'all'];

const HARDENED_INDEX = 0x80000000;

import {
  PLUGINS,
  PLUGIN_NAMESPACE,
  REDUCE_INTERFACE_NAMESPACE,
  REDUCE_NODE_NAMESPACE,
  REDUCE_WALLETS_NAMESPACE,
  REDUCE_APP_NAMESPACE,
  APP_NAMESPACES,
  WALLETS_NAMESPACES,
  INTERFACE_NAMESPACES,
} from './store';

import {
  SET_WALLETS,
  SET_WALLET_ACCOUNTS,
  SET_WALLET_INFO,
  SET_WALLET_ACCOUNT_INFO,
  SET_WALLET_ACCOUNT_BALANCE,
  SET_MULTISIG_PROPOSAL_MTX,
  SET_MULTISIG_WALLET_PROPOSALS,
  SET_MULTISIG_WALLETS,
  SET_MULTISIG_WALLET_INFO,
  SET_MULTISIG_WALLET_ACCOUNTS,
  SET_WALLET_HISTORY,
  SET_MULTISIG_WALLET_ACCOUNT_INFO,
  SEND_TX_STATUS_SUCCESS,
  SEND_TX_STATUS_FAILURE,
  SET_TEMPORARY_SECRETS,
  CLEAR_TEMPORARY_SECRETS,
} from './wallet';

import {
  USER_SELECT_XPUB,
  USER_SELECT_WALLET,
  USER_SELECT_MULTISIG_PROPOSAL,
  USER_SELECT_ACCOUNT,
  USER_SELECT_MULTISIG_WALLET,
  UPDATE_TEXT_FIELD,
  SELECT_TAB,
  ADD_SIDE_NAV,
  REMOVE_SIDE_NAV,

  // headers for lists
  OVERVIEW_LIST_HEADERS,
  OVERVIEW_MP_LIST_HEADERS,
  WALLET_INFO_PENDING_MULTISIG_LIST_HEADERS,

  // list of supported hardware types
  HARDWARE_TYPES,

  // path builder
  BASE_PATH,
  pathBuilder,
} from './bwallet';

export {
  // general
  PLUGIN_NAMESPACE,
  PLUGINS,
  REDUCE_INTERFACE_NAMESPACE,
  REDUCE_NODE_NAMESPACE,
  REDUCE_WALLETS_NAMESPACE,
  REDUCE_APP_NAMESPACE,
  WALLETS_NAMESPACES,
  INTERFACE_NAMESPACES,
  APP_NAMESPACES,
  // utility related
  HARDENED_INDEX,
  // application state
  USER_SELECT_XPUB,
  USER_SELECT_MULTISIG_PROPOSAL,
  USER_SELECT_ACCOUNT,
  USER_SELECT_MULTISIG_WALLET,
  // interface
  UPDATE_TEXT_FIELD,
  SELECT_TAB,
  ADD_SIDE_NAV,
  REMOVE_SIDE_NAV,
  // config
  HARDWARE_WALLET_TIMEOUT,
  SUPPORTED_ADDRESS_TYPES,
  SUPPORTED_WALLET_TYPES,
  HARDWARE_TYPES,
  // ui list headers
  OVERVIEW_LIST_HEADERS,
  OVERVIEW_MP_LIST_HEADERS,
  WALLET_INFO_PENDING_MULTISIG_LIST_HEADERS,
  // wallet
  SET_WALLETS,
  SET_WALLET_ACCOUNTS,
  SET_MULTISIG_WALLETS,
  USER_SELECT_WALLET,
  SET_WALLET_INFO,
  SET_WALLET_ACCOUNT_INFO,
  SET_WALLET_ACCOUNT_BALANCE,
  SET_MULTISIG_PROPOSAL_MTX,
  SET_MULTISIG_WALLET_PROPOSALS,
  SET_MULTISIG_WALLET_INFO,
  SET_MULTISIG_WALLET_ACCOUNTS,
  SET_WALLET_HISTORY,
  SET_MULTISIG_WALLET_ACCOUNT_INFO,
  SEND_TX_STATUS_SUCCESS,
  SEND_TX_STATUS_FAILURE,
  SET_TEMPORARY_SECRETS,
  CLEAR_TEMPORARY_SECRETS,
  // path related
  BASE_PATH,
  pathBuilder,
};

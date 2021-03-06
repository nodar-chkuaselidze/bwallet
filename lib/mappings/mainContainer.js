import { helpers } from '@bpanel/bpanel-utils';

import {
  selectWalletInfo,
  selectWallets,
  selectMultisigWalletInfo,
} from './selectors';

import {
  getWalletInfo,
  addSideNav,
  removeSideNav,
  getWallets,
  getWalletsInfo,
} from '../actions';

// TODO: turn bwallet into constant here
function sideMeta(info, type) {
  let icon;
  if (type === 'standard') icon = 'user';
  else icon = 'users';
  return Object.values(info).map(wallet => {
    // handle @bpanel/simple-wallet collision
    if (!wallet) {
      return {};
    }
    return {
      name: wallet.id,
      displayName: wallet.id,
      pathName: `/bwallet/wallets/${type}/${wallet.id}`,
      id: helpers.getHash(wallet, 'SHA256'),
      parent: require('../..').metadata.name,
      order: 3,
      sidebar: true,
      icon,
    };
  });
}

function mapStateToProps(state, otherProps) {
  const wallets = selectWallets(state);
  const walletInfo = selectWalletInfo(state);
  const multisigInfo = selectMultisigWalletInfo(state);

  // TODO: need to filter out ones that have already been added
  // create selector for nav, get the set difference
  const walletsNavMeta = [
    ...sideMeta(walletInfo, 'standard'),
    ...sideMeta(multisigInfo, 'multisig'),
  ];

  return {
    wallets,
    walletsNavMeta,
    ...otherProps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWallets: type => dispatch(getWallets(type)),
    addSideNav: metadata => dispatch(addSideNav(metadata)),
    removeSideNav: metadata => dispatch(removeSideNav(metadata)),
    getWalletInfo: walletId => dispatch(getWalletInfo(walletId)),
    getWalletsInfo: () => dispatch(getWalletsInfo()),
  };
}

export default {
  mapStateToProps,
  mapDispatchToProps,
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ViewButton from './ViewButton';
import BoxGrid from './BoxGrid';
import {
  Link,
  Header,
  utils,
  Input,
  Dropdown,
  Button,
} from '@bpanel/bpanel-ui';
const { connectTheme } = utils;
import Label from './Label';

const style = theme => ({
  border: { border: theme.themeVariables.border1 },
});

class CreateAccount extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      accountId: '',
      accountNumber: 0,
      selectedHardware: '',
      passphrase: '',
      xpub: '',
    };

    // TODO: use global constant
    this.hardwareOptions = ['ledger'];
  }

  static get propTypes() {
    return {
      theme: PropTypes.object,
      walletType: PropTypes.string,
      isWatchOnly: PropTypes.bool,
    };
  }

  update(key, value) {
    this.setState({ [key]: value });
  }

  renderTopBar() {
    return (
      <BoxGrid>
        <Header type="h2">Add Account</Header>
      </BoxGrid>
    );
  }

  renderSelect() {
    return (
      <BoxGrid className="d-inline-flex">
        <ViewButton
          header={'xpub'}
          text={'Enter an xpub to import'}
          onClick={() => this.update('view', 'xpub')}
        />
        <ViewButton
          header={'Hardware'}
          text={'Import an account from hardware.'}
          onClick={() => this.update('view', 'hardware')}
        />
      </BoxGrid>
    );
  }

  renderxpub() {
    const { passphrase, xpub, accountId } = this.state;
    return (
      <BoxGrid childrenClass="p-2" className="d-inline-flex flex-column">
        <Label className="d-flex align-items-start" text="Account Name">
          <Input
            name="accountName"
            className="col"
            placeholder="Account Name"
            onChange={e => this.update('accountId', e.target.value)}
            value={accountId}
          />
        </Label>

        <Label className="d-flex align-items-start" text="Wallet Passphrase">
          <Input
            name="passphrase"
            className="col"
            placeholder="Wallet Passphrase"
            onChange={e => this.input('passphrase', e.target.value)}
            value={passphrase}
          />
        </Label>
        <Label className="d-flex align-items-start" text="xpub">
          <Input
            name="xpub"
            className="col"
            placeholder="xpub"
            onChange={e => this.input('xpub', e.target.value)}
            value={xpub}
          />
        </Label>
      </BoxGrid>
    );
  }

  renderHardware() {
    const {
      accountId,
      passphrase,
      accountIndex,
      selectedHardware,
    } = this.state;
    return (
      <BoxGrid className="d-inline-flex flex-column">
        <Label className="d-flex align-items-start" text="Account Name">
          <Input
            name="accountName"
            className="col"
            placeholder="Account Name"
            onChange={e => this.update('accountId', e.target.value)}
            value={accountId}
          />
        </Label>

        <Label className="d-flex align-items-start" text="Wallet Passphrase">
          <Input
            name="passphrase"
            className="col"
            placeholder="Wallet Passphrase"
            onChange={e => this.update('passphrase', e.target.value)}
            value={passphrase}
          />
        </Label>

        <Label className="d-flex align-items-start" text="Hardware Type">
          <Dropdown
            options={this.hardwareOptions}
            onChange={({ value }) => this.update('selectedHardware', value)}
            value={selectedHardware}
          />
        </Label>

        <Label className="d-flex align-items-start" text="Account Number">
          <Input
            type="number"
            name="accountId"
            className="col"
            placeholder="Account"
            value={accountIndex}
            onChange={e => this.update('accountIndex', e.target.value)}
          />
        </Label>
      </BoxGrid>
    );
  }

  renderFooter() {
    const { view } = this.state;
    const { isWatchOnly } = this.props;

    // render when view is selected
    if (view || !isWatchOnly)
      return (
        <div className="d-inline-flex flex-row p-2">
          {/* no other options for standard wallets, dont render back button */}
          {isWatchOnly && (
            <Link
              className="p-2"
              dummy
              onClick={() => this.update('view', null)}
            >
              Back
            </Link>
          )}
          <Button className="p-2" onClick={() => this.create()}>
            Create
          </Button>
        </div>
      );
  }

  renderStandard() {
    const { accountId, passphrase } = this.state;
    return (
      <BoxGrid className="d-inline-flex flex-column">
        <Label className="d-flex align-items-start" text="Account Name">
          <Input
            name="accountName"
            className="col"
            placeholder="Account Name"
            onChange={e => this.update('accountId', e.target.value)}
            value={accountId}
          />
        </Label>

        <Label className="d-flex align-items-start" text="Wallet Passphrase">
          <Input
            name="passphrase"
            className="col"
            placeholder="Wallet Passphrase"
            onChange={e => this.input('passphrase', e.target.value)}
            value={passphrase}
          />
        </Label>
      </BoxGrid>
    );
  }

  // create account
  async create() {
    const {
      view,
      accountId,
      passphrase,
      accountIndex,
      xpub,
      selectedHardware,
    } = this.state;
    const {
      getxpubCreateWatchOnly,
      createAccount,
      selectedWallet,
      isWatchOnly,
    } = this.props;

    if (!isWatchOnly) {
      // bcoin will derive key
      await createAccount(
        selectedWallet,
        accountId,
        {
          passphrase,
        },
        true
      );
    } else if (view === 'xpub') {
      // create watch only account
      // with manually typed in xpub
      await createAccount(
        selectedWallet,
        accountId,
        {
          passphrase,
          watchOnly: true,
          accountKey: xpub,
        },
        true
      );
    } else if (view === 'hardare') {
      // get xpub from hardware and then create account
      getxpubCreateWatchOnly(selectedWallet, accountId, {
        account: accountIndex,
        hardwareType: selectedHardware,
      });
    }
  }

  renderMain() {
    const { view } = this.state;
    const { isWatchOnly } = this.props;

    // non watch only wallets only get
    // standard view
    if (!isWatchOnly) return this.renderStandard();

    // watch only views below
    // there are no selections yet
    if (!view) return this.renderSelect();

    // button selects set view
    if (view === 'xpub') return this.renderxpub();

    if (view === 'hardware') return this.renderHardware();
  }

  /*
   * watch only:
   *   selection screen - watch only, xpub
   * standard
   *   standard create screen
   */
  render() {
    const { theme } = this.props;
    return (
      <div style={style(theme).border}>
        {this.renderTopBar()}
        {this.renderMain()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default connectTheme(CreateAccount);

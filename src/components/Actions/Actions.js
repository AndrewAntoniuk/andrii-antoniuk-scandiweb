import React from 'react';
import { ReactComponent as CartIcon } from '../../images/cart.svg';
import getSymbolFromCurrency from 'currency-symbol-map';
import './Actions.css';
import { CurrencySwitch } from '../CurrencySwitch/CurrencySwitch';

export class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: false,
      timer: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.cancelLeave = this.cancelLeave.bind(this);
  }
  handleClick() {
    this.setState((prevState) => ({ isShowing: !prevState.isShowing }));
  }
  handleLeave() {
    this.setState({
      timer: setTimeout(
        function () {
          this.setState({ isShowing: false });
        }.bind(this),
        3000
      ),
    });
  }

  cancelLeave() {
    clearTimeout(this.state.timer);
  }

  render() {
    return (
      <div className="dd-wrapper">
        <div id="currency" onClick={this.handleClick}>
          <span>{getSymbolFromCurrency(this.props.activeCurrency)}</span>
          <div
            id="arrow"
            className={this.state.isShowing ? 'reverse' : ''}
          ></div>
        </div>
        <CurrencySwitch
          curChange={this.props.curChange}
          mounted={this.state.isShowing}
          handleLeave={this.handleLeave}
          cancelLeave={this.cancelLeave}
          currencies={this.props.currencies}
        />
        <CartIcon />
      </div>
    );
  }
}

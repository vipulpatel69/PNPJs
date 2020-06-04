import * as React from 'react';
import styles from './PnPJs.module.scss';
import { IPnPJsProps } from './IPnPJsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import DisplayOrders from './DisplayOrders';
import DisplayProducts from './DisplayProducts';

export default class PnPJs extends React.Component<IPnPJsProps, {}> {
  public render(): React.ReactElement<IPnPJsProps> {
    return (
      <span>
        <h1>PnP JS Examples</h1>
        { /* <DisplayOrders /> */ }
         <DisplayProducts context={this.props.context} /> 
      </span>
    );
  }
}

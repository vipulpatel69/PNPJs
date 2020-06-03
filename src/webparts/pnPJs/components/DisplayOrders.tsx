import * as React from 'react';
import { sp } from './PnPPreset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { PnPDataService } from '../../../Services/PnPDataService';
import { PrimaryButton } from 'office-ui-fabric-react';

export interface IDisplayOrdersProps{

}

export interface IDisplayOrdersState{
    allOrders: any[];
}

const viewFields: IViewField[] = [
    {
        name: 'OrderedProduct.Title',
        displayName: 'Ordered Product',
        sorting: true,
        maxWidth: 100
    },
    {
        name: 'UserName.Title',
        displayName: 'UserName',
        sorting: true,
        maxWidth: 100
    },
    {
        name: 'DateOfPurchase',
        displayName: "Date Of Purchase",
        sorting: true,
        maxWidth: 100
    },
    {
        name: 'OrderedQuantity',
        displayName: "Ordered Quantity",
        sorting: true,
        maxWidth: 100
    },
    {
        name: 'Status',
        displayName: "Status",
        sorting: true,
        maxWidth: 80
    }
];


export default class DisplayOrders extends React.Component<IDisplayOrdersProps, IDisplayOrdersState> {

    private serviceProvider;

    constructor(props: IDisplayOrdersState, state: IDisplayOrdersState) {
        super(props);
        this.serviceProvider = new PnPDataService();
        this.addItems = this.addItems.bind(this);        

        this.state = {
            allOrders: []
        };
    }

    public render(): React.ReactElement<IDisplayOrdersProps> {
        return (
            <React.Fragment>
                <h2>All Orders</h2>
                <PrimaryButton text="Place Orders" onClick={this.addItems} style={{ marginBottom: 5}} />
                <ListView
                    items={this.state.allOrders}
                    viewFields={viewFields}
                    iconFieldName="Packages"
                    compact={true}
                    showFilter={true}
                    filterPlaceHolder="Search..."
                    selectionMode={SelectionMode.multiple}
                    selection={this._getSelection}
                />
            </React.Fragment>
        );
    }

    public componentWillMount() {        
        this.getOrders();
    }

    public getOrders() {
        this.serviceProvider.getOrders().then(
            (items: any): void => {                
                this.setState({
                    allOrders: items
                });
            }
        );        
    }

    private _getSelection(items: any[]) {
        console.log('Selected items : ', items);
    }

    public addItems(){        
        this.serviceProvider.addOrders().then(
            (iar: any) => {
            this.getOrders();
        });
    }



}

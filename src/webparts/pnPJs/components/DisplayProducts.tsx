import * as React from 'react';
import { sp } from './PnPPreset';
import { PnPDataService } from '../../../Services/PnPDataService';
import { IconButton } from 'office-ui-fabric-react/lib/components/Button/IconButton/IconButton';
import { Panel } from 'office-ui-fabric-react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import EditProduct from './EditProduct';

export interface IDisplayProductsProps {
    context: WebPartContext;
}

export interface IDisplayProductsState {
    items: any[];
    isPanelOpen: boolean;
    selectedItem: any;
}

export default class DisplayProducts extends React.Component<IDisplayProductsProps, IDisplayProductsState> {
    private serviceProvider;

    constructor(props: IDisplayProductsProps, state: IDisplayProductsState){
        super(props);
        this.serviceProvider = new PnPDataService();

        this.state = {
            items: [],
            isPanelOpen: false,
            selectedItem: []
        };
    }

    public render(): React.ReactElement<IDisplayProductsProps> {
        return (
            <div>
                <h1>All Products</h1>
                <table>
                    <tr>
                        <th>Edit</th>
                        <th>Title</th>
                        <th>Product</th>
                        <th>Quantities</th>
                    </tr>
                    {this.state.items.length ? this.state.items.map((item) => {
                        return (<tr>
                            <td><IconButton iconProps={{ iconName:'Edit'}} onClick={() => this.onEditClick(item)} /></td>
                            <td  style={{ padding: 10 }}>{item.Title}</td>
                            <td  style={{ padding: 10 }}>{item.Title}</td>
                            <td  style={{ padding: 10 }}>{item.Quantities}</td>
                        </tr>);
                    }) : null}
                </table>
                <Panel
                    headerText="Edit Product"
                    isOpen={this.state.isPanelOpen}
                    onDismiss={this.onDismiss}
                    closeButtonAriaLabel="Close">
                    <EditProduct Item={this.state.selectedItem} context={this.props.context} updateParent={this.onDismiss} />
                </Panel>
                
            </div>
        );
    }

    public componentWillMount() {
        this.getAllProducts();
    }

    public getAllProducts() {
        this.serviceProvider.getProducts().then(
            (items: any) => {
                this.setState({
                    items: items
                });
            });
    }

    public onEditClick = (item) => {
        this.setState({
            isPanelOpen: true,
            selectedItem: item
        });
        console.log('selected item : ', item);
    }

    public onDismiss = () => {
        this.setState({
            isPanelOpen: false,
            selectedItem: []
        }, () => {
            this.getAllProducts();
        });
    }

}
import * as React from 'react';
import { sp } from './PnPPreset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { TaxonomyPicker, IPickerTerms, IPickerTerm } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { TextField, ActionButton } from 'office-ui-fabric-react';


export interface IEditProductProps {
    Item: any;
    context: WebPartContext;
    updateParent: Function;
}

export interface IEditProductState {
    title: string;
    quantity: number;
    term: IPickerTerm;
}

export default class EditProduct extends React.Component<IEditProductProps, IEditProductState> {

    constructor(props: IEditProductProps, state: IEditProductState){
        super(props);

        this.state = {
            term: null,
            title: this.props.Item.Title,
            quantity: this.props.Item.Quantities
        };

    }

    public render(): React.ReactElement<IEditProductProps> {
        return (
            <React.Fragment>
                <TextField label="Title" value={this.state.title} onChange={(ev, value) => this.setState({ title: value })} />
                <TextField label="Quantity" type="number" value={this.state.quantity.toString()} onChange={(ev, value) => this.setState({ quantity: parseInt(value) })}  />
                {this.state.term ? 
                    <TaxonomyPicker allowMultipleSelections={false}
                        termsetNameOrID="Products"
                        panelTitle="Select Products"
                        label="Products"
                        context={this.props.context}
                        onChange={this.onTaxPickerChange}
                        initialValues={[this.state.term]}
                        isTermSetSelectable={false} /> 
                    : null}
                <ActionButton iconProps={{ iconName: 'save'}} onClick={() => this.saveItem()}> Save </ActionButton>
                <ActionButton iconProps={{ iconName: 'Delete'}} onClick={() => this.deleteItem()}> Delete </ActionButton>
            </React.Fragment>
        );
    }

    public componentWillMount() {
        this.getTerm();
    }

    private getTerm() {
        sp.web.lists.getByTitle("TaxonomyHiddenList").items.
        select('ID', 'Title', 'IdForTermSet', 'IdForTerm').
        filter('ID eq ' + this.props.Item.Products.Label).get().then((items: any) => {
            let term: IPickerTerm = {
                name: items[0].Title,
                key: items[0].IdForTerm,
                path: items[0].Title,
                termSet: items[0].IdForTermSet
            };
            this.setState({
                term: term
            });
        });
    }

    private onTaxPickerChange = (terms: IPickerTerms) => {
        this.setState({
            term: terms.length ? terms[0] : null
        });
    }

    private deleteItem = () => {
        let list = sp.web.lists.getByTitle("Product");
        list.items.getById(this.props.Item.Id).delete().then(deletedItem => {
            this.props.updateParent();
            console.log(deletedItem);
        });
    }

    private saveItem = () => {
        sp.web.lists.getByTitle("Product").items.getById(this.props.Item.Id).update({
            Title: this.state.title,
            Products: {
                __metadata: { "type": "SP.Taxonomy.TaxonomyFieldValue" },
                Label: this.state.term.name.toString(),
                TermGuid: this.state.term.key.toString(),
                WssId: -1
            },
            Quantities : this.state.quantity.toString()
        }).then(i => {
            console.log(i);
            this.props.updateParent();
        });
    }
}
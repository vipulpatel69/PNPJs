import { sp } from '../webparts/pnPJs/components/PnPPreset';

export class PnPDataService {
    public constructor(){

    }

    public async getOrders() {        
        var response = await sp.web.lists.getByTitle("Order").items
            .select("*", "UserName/Title", "OrderedProduct/Title")
            .expand("UserName", "OrderedProduct")
            .top(50)
            .get();
            
        return response;                
    }

    public async addOrders() {
        var response = await sp.web.lists.getByTitle("Order").items
            .add({
                Title: "Title",
                UserNameId: 1,
                OrderedProductId: 3,
                DateOfPurchase: new Date(),
                Status: "Ordered",
                OrderedQuantity: 8
            });

        return response;
    }

    public async getProducts() {
        var response = await  sp.web.lists.getByTitle("Product").items
        .top(10)
        .get();

        return response;
    }

}
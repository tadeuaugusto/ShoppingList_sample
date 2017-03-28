import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Ingrediente } from '../models/Ingrediente';

@Injectable()
export class ShoppingListService {

    private ingredientes: Ingrediente[] = [];
    
    addItem(nome: string, qtde: number) {
        this.ingredientes.push(new Ingrediente(nome, qtde));
        console.log(this.ingredientes);
    }
    
    addItems(items: Ingrediente[]) {
        this.ingredientes.push(...items);
    }
    
    getItems() {
        return this.ingredientes.slice();
    }
    
    removeItem(index: number) {
        this.ingredientes.splice(index, 1);
    }
    
    
    
    
  
}

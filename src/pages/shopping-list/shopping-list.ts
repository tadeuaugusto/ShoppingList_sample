import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingListService } from '../../providers/shopping-list-service';
import { Ingrediente } from '../../models/ingrediente';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

    listItems: Ingrediente[];
    
    
    ionViewWillEnter() {
        this.loadItems();
    }
    
    loadItems() {
        this.listItems = this.shoppingListService.getItems();
    }
    
    constructor(private shoppingListService: ShoppingListService) {}
    
    onAddItem(form: NgForm) {
        console.log(form);
        this.shoppingListService.addItem(form.value.nome, form.value.qtde);
        form.reset();
        this.loadItems();
    }
    
    onCheckItem(index: number) {
        this.shoppingListService.removeItem(index);
        this.loadItems();
    }
}

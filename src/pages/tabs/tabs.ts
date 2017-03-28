import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipesPage } from '../recipes/recipes';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

    shoppingPage = ShoppingListPage;
    recipesPage = RecipesPage;

}

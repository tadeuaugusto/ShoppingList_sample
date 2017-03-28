import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../../pages/edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../providers/recipes-service';
import { RecipePage } from '../../pages/recipe/recipe';

/*
  Generated class for the Recipes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

    // array para ser retornado no onLoadRecipe()
    recipes: Recipe[];
    
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesService: RecipesService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }
  
  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
  
  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }
  
  ionViewWillEnter() {
    this.loadItems();
  }
  
  loadItems() {
    this.recipes = this.recipesService.getRecipes();
  }

}

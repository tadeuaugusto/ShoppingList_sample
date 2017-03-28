import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Recipe } from '../models/recipe';
import { Ingrediente } from '../models/Ingrediente';

/*
  Generated class for the RecipesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RecipesService {

    private recipes: Recipe[] = [];
  
    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingrediente[]) {
        this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    }
    
    
    getRecipes() {
        return this.recipes.slice();
    }
    
    updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingrediente[]) {
        this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
    }
    
    
    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }
    

}

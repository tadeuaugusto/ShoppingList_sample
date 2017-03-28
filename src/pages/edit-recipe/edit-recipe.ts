import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../providers/recipes-service';
import { Recipe } from '../../models/recipe';

/*
  Generated class for the EditRecipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['Facil', 'Medio', 'Dificil'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetController: ActionSheetController, private alertCtrl: AlertController, private toastCtrl: ToastController, private recipeService: RecipesService) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    
    if (this.mode == 'Edit') {
        this.recipe = this.navParams.get('recipe');
        this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }
  
  // FormGroup/FormControl
  private initializeForm() {
  
    let title = null;
    let description = null;
    let difficulty = 'Medio';
    let ingredients = [];
    
    if (this.mode == 'Edit') {
        title = this.recipe.title;
        description = this.recipe.description;
        difficulty = this.recipe.difficulty;
        for (let ingredient of this.recipe.ingredients) {
            ingredients.push(new FormControl(ingredient.nome, Validators.required));
        }
    }
  
    this.recipeForm = new FormGroup({
        'title': new FormControl(title, Validators.required),
        'description': new FormControl(description, Validators.required),
        'difficulty': new FormControl(difficulty, Validators.required),
        'ingredients': new FormArray(ingredients)
    });
  }
  
  // ActionSheet
  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
        title: 'Alterar Receita?',
        buttons: [
            {
                text: 'Adicionar Ingrediente',
                handler: () => {
                    this.createNewIngredientAlert().present();
                }
            },
            {
                text: 'Zerar Ingredientes',
                role: 'destructive',
                handler: () => {
                    const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
                    const len = formArray.length;
                    if (len > 0) {
                        for (let i = len -1; i >=0; i--) {
                            formArray.removeAt(i);
                        }
                        
                        const toast = this.toastCtrl.create({
                            message: 'Todos os ingredientes serao apagados!',
                            duration: 1000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                }
            },
            {
                text: 'Cancelar',
                role: 'cancel'
            }
        ]
    });
    actionSheet.present();
  }
  
  
  // Alert
  private createNewIngredientAlert() {
    return this.alertCtrl.create({
        title: 'Adicionar Ingrediente',
        inputs: [
            {
                name: 'nome',
                placeholder: 'Nome'
            }
        ],
        buttons: [
            {
                text: 'Cancelar',
                role: 'cancel'
            },
            {
                text: 'Adicionar',
                handler: data => {
                    if (data.nome.trim == '' || data.nome == null) {
                        const toast = this.toastCtrl.create({
                            message: 'Digite um valor valido',
                            duration: 1500,
                            position: 'bottom'
                        });
                        toast.present();
                        return;
                    }
                    (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.nome, Validators.required));
                }
            }
        ]
    })
  }
  
  
  
  onSubmit() {
    console.log(this.recipeForm);
    
    
    const value = this.recipeForm.value;
    
    let ingredients = [];
    if (value.ingredients.length > 0) {
        ingredients = value.ingredients.map(name => {
            return {nome: name, qtde: 1};
        });
    }
    
    if (this.mode == 'Edit') {
        this.recipeService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
        this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    
    
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

}

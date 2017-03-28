import { Ingrediente } from '../models/Ingrediente';

export class Recipe {
    constructor(
        public title: string,
        public description: string,
        public difficulty: string,
        public ingredients: Ingrediente[]
    ) {}
}
export interface Ingredient {
  name: string;
  desc: string;
  img: string;
  measure: string;
}
export interface Recipe {
  _id: string;
  title: string;
  category: string;
  owner: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  time: string;
  ingredients: Ingredient[];
  createdAt: string;
  updatedAt: string;
  calories: string;
}

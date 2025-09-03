import {fakerPL} from "@faker-js/faker";
import CategoryService from "./category-service";

export type CategoryData = {
  id ?: number;
  name?: string;
  parentCategory?: string;
};
class CategoryFactory{
  createCategory(){
    return this.createNewCategory({});
  }
  createNewCategory(data:CategoryData):CategoryData{
    return {
      name:data.name || fakerPL.book.genre(),
    };
  }

  addNewRandomCategory ( ){
    let body = this.createCategory();
    cy.log("Category: "+JSON.stringify(body))
    return this._newCategory(body);
  }
  addNewCategory(name:string){
    let body={name: name};
    return this._newCategory(body);

  }
  private _newCategory(body){
    return CategoryService.create(JSON.stringify(body)).then(resp => {
      expect(resp.status).to.eq(201);
      return resp.body;
    })
  }
}
export default new CategoryFactory();
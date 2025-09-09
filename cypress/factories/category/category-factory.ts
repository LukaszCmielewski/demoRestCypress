
import {faker} from "@faker-js/faker/locale/en";
import CategoryService from "./category-service";

export type CategoryData = {
  id ?: number;
  name?: string;
  parentCategory?: CategoryData;
};
class CategoryFactory{
  createCategory(){
    return this.createNewCategory({});
  }
  createNewCategory(data:CategoryData):CategoryData{
    return {
      name:data.name || faker.book.genre(),
      parentCategory:data.parentCategory || null
    };
  }

  addNewRandomCategory ( ){
    let body = this.createCategory();
    cy.log("Category: "+JSON.stringify(body))
    return this.newCategory(body);
  }
  addNewCategory(name:string){
    let body={name: name};
    return this.newCategory(body);

  }
  newCategory(body){
    return CategoryService.create(JSON.stringify(body)).then(resp => {
      expect(resp.status).to.eq(201);
      return resp.body;
    })
  }
}
export default new CategoryFactory();
import CategoryFactory from "../../factories/category/category-factory";
import categoryService from "../../factories/category/category-service";
import CategoryService from "../../factories/category/category-service";

describe("Category Tests", () => {
  let ids: number[];
  let mainCategory;
  beforeEach("SetUp", () => {
    ids = [];
    mainCategory = CategoryFactory.createCategory()
    cy.log("MAIN: "+JSON.stringify(mainCategory))
    CategoryFactory.addNewCategory(mainCategory.name).then(body => {
      expect(body).to.have.property("id");
      ids.unshift(body.id);
      cy.log("Category ID: " + ids[ids.length - 1])
    })
  })
  afterEach("CleanUp", () => {
    for (let id of ids) {
      CategoryService.delete(id).then(resp => {
        expect(resp.status).to.eq(204);
      })
      cy.log("deleted Category ID= " + id);
    }
    cy.log("CleanUp")
  })
  describe("Main Category Tests", () => {
    it("should get single Category", () => {
      CategoryService.getById(ids[0]).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.id).to.eq(ids[0]);
      });
    });
    it("should delete a Category", () => {
      let id = ids.shift();
      CategoryService.delete(id).then((resp) => {
        expect(resp.status).to.eq(204);
      });
    });
    it("Create New Category", () => {
      CategoryService.create(JSON.stringify({name: "Testowa" + Date.now()})).then(resp => {
        expect(resp.status).to.eq(201);
        expect(resp.body).to.have.property("id");
        ids.unshift(resp.body.id);
        cy.log("Create New Category ID: " + ids[0])
      })
    });
    it("Get Categories", () => {
      CategoryFactory.addNewRandomCategory().then(body => {
        expect(body).to.have.property("id");
        ids.unshift(body.id);
        cy.log("Category ID2: " + ids[0])
      })
      CategoryFactory.addNewRandomCategory().then(body => {
        expect(body).to.have.property("id");
        ids.unshift(body.id);
        cy.log("Category ID3: " + ids[0])
      })
      CategoryService.get().then(resp => {
        expect(resp.status).to.eq(200);
        cy.log(JSON.stringify(resp.body));
        expect(resp.body).to.be.an("array");
        expect(resp.body).to.have.length(3);
      })
    });
    it("Update Category", () => {
      let nName=mainCategory.name+"_UPDATED";
      mainCategory.name=nName;
      CategoryService.put(ids[0], mainCategory).then(resp=>{
        expect(resp.status).to.eq(200);
        cy.log("Member: " + JSON.stringify(resp.body, null, 2));
        expect(resp.body.id).to.eq(ids[0]);
        expect(resp.body.name).to.eq(nName);
      })
    });
  });
  describe("Sub Category Tests",()=>{
    let subcategory;
    let parentID;
    beforeEach("setUp subCategory", ()=>{
      parentID=ids[0];
      subcategory= CategoryFactory.createCategory()
      CategoryFactory.addNewCategory(subcategory.name).then(body => {
        expect(body).to.have.property("id");
        ids.unshift(body.id);
        cy.log("Category ID: " + ids[0])
      })
    })
    it("New category with parent category", ()=>{
      let subBody={
        name:mainCategory.name+" sub",
        parentCategory:{
          id:parentID,
          name:mainCategory.name,
        }
      }
      cy.log("SUB: "+JSON.stringify(subBody))
      categoryService.create(JSON.stringify(subBody)).then(resp=>{
        expect(resp.status).to.eq(201);
        expect(resp.body).to.have.property("id");
        expect(resp.body).to.have.property("parentCategory");
        expect(resp.body.parentCategory).to.have.property("id");
        expect(resp.body.parentCategory.id).to.eq(ids[ids.length-1])
        ids.unshift(resp.body.id);
      })
    });
    it("add parentCategory to existing category",()=>{
      let subBody={
        id: ids[0],
        name:subcategory.name,
        parentCategory:{
          id:parentID,
          name:mainCategory.name,
          parentCategory:null
        }
      }
      cy.log("subID: "+ids[0])
      cy.log("SUB: "+JSON.stringify(subBody))
      categoryService.put(ids[0], JSON.stringify(subBody)).then(resp=>{
        expect(resp.status).to.eq(200);
        expect(resp.body).to.have.property("id");
        expect(resp.body).to.have.property("parentCategory");
        expect(resp.body.parentCategory).to.have.property("id");
        expect(resp.body.parentCategory.id).to.eq(ids[ids.length-1])
      })
    });
    it("try to delete a parent category while leaving a child category", ()=>{
      let subBody={
        id: ids[0],
        name:subcategory.name,
        parentCategory:{
          id:parentID,
          name:mainCategory.name,
          parentCategory:null
        }
      }
      cy.log("subID: "+ids[0])
      cy.log("SUB: "+JSON.stringify(subBody))
      categoryService.put(ids[0], JSON.stringify(subBody)).then(resp=>{
        expect(resp.status).to.eq(200);
      })
      CategoryService.delete(parentID).then(resp=>{
        expect(resp.status).to.eq(500);
      })
    });
  });
})
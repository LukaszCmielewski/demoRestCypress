
import {faker} from "@faker-js/faker/locale/en";
import RestPath from "../../fixtures/rest-path";
import {deleteAll} from "../../support/api-utils";
import BookService from "../../factories/book/book-service";
import BookFactory from "../../factories/book/book-factory";


describe("Book test", ()=>{
  let ids: number[];
  let book;
  beforeEach('Setup', () => {
    ids = [];
    book = BookFactory.createNewBook({});
    cy.log(JSON.stringify(book));
    BookService.create(JSON.stringify(book)).then(resp => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");
      ids.unshift(resp.body.id);
      cy.log("id: " + ids[ids.length - 1]);
    })
  })
  afterEach('clean', () => {
    BookService.cleanAll();
    cy.log("CleanUp")
  })
  it("create book", ()=>{
    let newbook = BookFactory.createNewBook({});
    BookService.create(JSON.stringify(newbook)).then(resp => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");
      ids.unshift(resp.body.id);
      cy.log("id: " + ids[ids.length - 1]);
    })
  })
  it("Get Books", () => {
    BookService.get().then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(JSON.stringify(resp.body));
      expect(resp.body).to.be.an("array");
    })
  })
  it("Should get single Book", ()=>{
    BookService.getById(ids[0]).then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(JSON.stringify(resp.body));
      expect(resp.body.id).to.eq(ids[0]);
    });
  })
  it("Try to get single Book", ()=>{
    BookService.getById(999999).then((resp) => {
      expect(resp.status).to.eq(404);
      cy.log(JSON.stringify(resp.body));
    });
  })
  it("Delete Book", ()=>{
    BookService.delete(ids[0]).then((resp) => {
      expect(resp.status).to.eq(204);
    });
  })
})
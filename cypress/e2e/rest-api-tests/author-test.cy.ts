import {faker} from "@faker-js/faker/locale/en";
import AuthorFactory, {AuthorData} from "../../factories/author/author-factory";
import AuthorService from "../../factories/author/author-service";

describe("Author test", () => {
  let ids: number[];
  let author;
  beforeEach('Setup', () => {
    ids = [];
    author = AuthorFactory.createNewAuthor({});
    AuthorService.create(author).then(resp => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");
      ids.unshift(resp.body.id);
      cy.log("id: " + ids[ids.length - 1]);
    })
  })
  afterEach('clean', () => {
    for (const id of ids) {
      AuthorService.delete(id).then(resp => {
        expect(resp.status).to.eq(204);
      })
      cy.log("deleted id= " + id);
    }
    cy.log("CleanUp")
  })
  it("Get Author", () => {
    AuthorService.get().then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(JSON.stringify(resp.body));
      expect(resp.body).to.be.an("array");
    })
  })
  it("Should get single Author", ()=>{
    AuthorService.getById(ids[0]).then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(JSON.stringify(resp.body));
      expect(resp.body.id).to.eq(ids[0]);
    });
  })
  it("Try to get single Author", ()=>{
    AuthorService.getById(999999).then((resp) => {
      expect(resp.status).to.eq(404);
      cy.log(JSON.stringify(resp.body));
    });
  })
  it("create Author",()=>{
    let newAuthor:AuthorData={
      firstName: faker.person.firstName(),
      lastName:faker.person.lastName(),
      biography: faker.person.bio()
    }
    AuthorService.create(JSON.stringify(newAuthor)).then(resp => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");
      ids.unshift(resp.body.id);
      cy.log("id: " + ids[0]);
    })
  })
  it("update Author", ()=>{
    author.biography=author.biography+" UPDATTED"
    author.firstName=author.firstName.toUpperCase()
    author.lastName=author.lastName.toUpperCase()

    AuthorService.put(ids[0], JSON.stringify(author)).then(resp => {
      expect(resp.status).to.eq(200);
      cy.log("updatedAuthor: "+ JSON.stringify(author));
      expect(resp.body.biography).to.eq(author.biography);
      expect(resp.body.firstName).to.eq(author.firstName);
      expect(resp.body.lastName).to.eq(author.lastName);
    })
  })

})
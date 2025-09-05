import AuthorService from "factories/author/author-service";
import PublisherFactory, {PublisherData} from "../../factories/publisher/publisher-factory";
import PublisherService from "../../factories/publisher/publisher-service";
import {faker} from "@faker-js/faker/locale/en";

describe("Publisher Tests",()=>{
  let ids: number[];
  let publisher;
  beforeEach('Setup', () => {
    ids = [];
    publisher = PublisherFactory.createNewPublisher({});
    PublisherService.create(publisher).then(resp => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");
      ids.unshift(resp.body.id);
      cy.log("id: " + ids[ids.length - 1]);
    })
  });
  afterEach('clean', () => {
    for (const id of ids) {
      PublisherService.delete(id).then(resp => {
        expect(resp.status).to.eq(204);
      })
      cy.log("deleted id= " + id);
    }
    cy.log("CleanUp")
  });
  it("Get Publisher", () => {
    PublisherService.get().then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(JSON.stringify(resp.body));
      expect(resp.body).to.be.an("array");
    })
  });
  it("Should get single Publisher", ()=>{
    PublisherService.getById(ids[0]).then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(JSON.stringify(resp.body));
      expect(resp.body.id).to.eq(ids[0]);
    });
  })
  it("Try to get single Publisher", ()=>{
    PublisherService.getById(999999).then((resp) => {
      expect(resp.status).to.eq(404);
      cy.log(JSON.stringify(resp.body));
    });
  });
  it("Create Publisher",()=>{
    let newPublisher:PublisherData={
      name:faker.company.name(),
      address: faker.location.secondaryAddress(),
      contactInfo: "kontakt@" + faker.internet.domainName(),
    }
    PublisherService.create(JSON.stringify(newPublisher)).then(resp => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");
      ids.unshift(resp.body.id);
      cy.log("id: " + ids[0]);
      expect(resp.body.name).to.eq(newPublisher.name)
      expect(resp.body.address).to.eq(newPublisher.address)
      expect(resp.body.contactInfo).to.eq(newPublisher.contactInfo)
    })
  });
  it("update Author", ()=>{
    publisher.name=publisher.name+" UPDATTED"
    publisher.address=publisher.address.toUpperCase()
    publisher.contactInfo=publisher.contactInfo.toUpperCase()

    PublisherService.put(ids[0], JSON.stringify(publisher)).then(resp => {
      expect(resp.status).to.eq(200);
      cy.log("updatedAuthor: "+ JSON.stringify(publisher));
      expect(resp.body.name).to.eq(publisher.name)
      expect(resp.body.address).to.eq(publisher.address)
      expect(resp.body.contactInfo).to.eq(publisher.contactInfo)
    })
  });
})
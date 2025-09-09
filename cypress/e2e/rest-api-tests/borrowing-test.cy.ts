import BorrowingFactory from "../../factories/borrowing/borrowing-factory";
import BorrowingServices from "../../factories/borrowing/borrowing-services";
import RestPath from "../../fixtures/rest-path";
import {deleteAll} from "../../support/api-utils";

describe("Borrowing test", () => {
  let ids: number[];

  let borrow;
  beforeEach('Setup', () => {
    ids = [];
    borrow = BorrowingFactory.createNewBorrowing({});
    BorrowingServices.create(JSON.stringify(borrow)).then(resp => {
      expect(resp.status).to.eq(200);
      expect(resp.body).to.have.property("id");
      ids.unshift(resp.body.id);
      cy.log("id: " + ids[ids.length - 1]);
    })
  })
  afterEach('clean', () => {
    deleteAll(RestPath.member);
    cy.log("CleanUp")
  })
  it('Get members', () => {
    BorrowingServices.get().then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(JSON.stringify(resp.body));
      expect(resp.body).to.be.an("array");
    })
  })
  it("should get single Member", () => {
    BorrowingServices.getById(ids[0]).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.id).to.eq(ids[0]);
    });
  });
})
import RestPath from "../../fixtures/rest-path";
import restPath from "../../fixtures/rest-path";
import {deleteAll} from "../../support/api-utils";

class BorrowingServices{
  path = restPath.borrowing;

  public get() {
    return cy.request("GET", this.path);
  }

  public create(body: string) {
    cy.log(this.path + "/borrow")
    return cy.request({
      method: "POST",
      url: this.path + "/borrow",
      body: body,
      headers: {'Content-Type': 'application/json'}
    });
  }

  public getById(id: number) {
    return cy.request({method:"GET", url:this.path + `/${id}`, failOnStatusCode: false});
  }

  public delete(id: number) {
    return cy.request({method:"DELETE", url:this.path + `/${id}`, failOnStatusCode: false});
  }

  public refund(id: number,) {
    cy.log("PATH: " + this.path + '/return/${id}')
    return cy.request({
      method: "PUT",
      url: this.path + '/return/${id}',
      headers: {'Content-Type': 'application/json'},
      failOnStatusCode: false
    });
  }
  public put(id: number, newbody: string) {
    cy.log("PATH: " + this.path + `/${id}`)
    return cy.request({
      method: "PUT",
      url: this.path + `/${id}`,
      body: newbody,
      headers: {'Content-Type': 'application/json'},
      failOnStatusCode: false
    });
  }

  public cleanAll() {
    deleteAll(RestPath.borrowing)
    deleteAll(RestPath.book);
    deleteAll(RestPath.category);
    deleteAll(RestPath.publisher);
    deleteAll(RestPath.author);
  }
}
export default new BorrowingServices();
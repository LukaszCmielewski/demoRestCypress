import restPath from "../fixtures/rest-path";

class BorrowingServices{
  path = restPath.publisher;

  public get() {
    return cy.request("GET", this.path);
  }

  public create(body: string) {
    return cy.request("POST", this.path, body);
  }

  public getById(id: number) {
    return cy.request("GET", this.path + `/${id}`);
  }

  public delete(id: number) {
    return cy.request("DELETE", this.path + `/${id}`);
  }

  public put(id: number, newbody: string) {
    return cy.request("GET", this.path + `/${id}`, newbody);
  }
}
export default new BorrowingServices();
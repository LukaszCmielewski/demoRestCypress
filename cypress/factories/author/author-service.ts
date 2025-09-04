import restPath from "../../fixtures/rest-path";

class AuthorService{
  path = restPath.author;

  public get() {
    return cy.request("GET", this.path);
  }

  public create(body: string) {
    return cy.request({method:"POST", url:this.path, body:body, headers:{'Content-Type': 'application/json'}});
  }

  public getById(id: number) {
    return cy.request({method:"GET", url:this.path + `/${id}`, failOnStatusCode: false});
  }

  public delete(id: number) {
    return cy.request("DELETE", this.path + `/${id}`);
  }

  public put(id: number, newbody: string) {
    return cy.request({method: "PUT", url:this.path + `/${id}`, body:newbody, headers:{'Content-Type': 'application/json'}});
  }
}
export default new AuthorService();
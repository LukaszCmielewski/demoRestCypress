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
    return cy.request({method:"DELETE", url:this.path + `/${id}`, failOnStatusCode: false});
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
}
export default new AuthorService();
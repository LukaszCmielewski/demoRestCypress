import restPath from "../../fixtures/rest-path";

class CategoryService{
  path = restPath.category;

  public get() {
    return cy.request("GET", this.path);
  }

  public create(body: string) {
    return cy.request({method:"POST", url:this.path, body:body, headers:{'Content-Type': 'application/json'}});
  }

  public getById(id: number) {
    return cy.request("GET", this.path + `/${id}`);
  }

  public delete(id: number) {
    return cy.request("DELETE", this.path + `/${id}`);
  }

  public put(id: number, newbody: string) {
    cy.log("PATH: "+ this.path+ `/${id}`)
    return cy.request({method:"PUT", url:this.path+ `/${id}`, body:newbody, headers:{'Content-Type': 'application/json'}, failOnStatusCode: false});
  }
}
export default new CategoryService()
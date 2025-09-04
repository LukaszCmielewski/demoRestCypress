import restPath from "../../fixtures/rest-path";
import MemberFactory from "./member-factory";


export type MemberData = {
  id ?: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
};

class MemberService {
  // @ts-ignore
  path = restPath.member;

  public getMembers() {
    return cy.request("GET", this.path);
  }

  public createMember(body) {
    return cy.request({method:"POST", url:this.path, body:body, headers:{'Content-Type': 'application/json'}});
  }

  public getMember(id: number) {
    return cy.request({method:"GET", url:this.path + `/${id}`, failOnStatusCode: false});
  }

  public deleteMember(id) {
    return cy.request({method:"DELETE", url:this.path + `/${id}`, failOnStatusCode: false});
  }

  public putMember(id, newbody) {
    cy.log("PATH: " + this.path + `/${id}`)
    return cy.request({
      method: "PUT",
      url: this.path + `/${id}`,
      body: newbody,
      headers: {'Content-Type': 'application/json'},
      failOnStatusCode: false
    });
  }
  public createNewMember(data: MemberData): Cypress.Chainable<number> {
    const member = MemberFactory.createNewMember(data);
    cy.log("New:\n" + JSON.stringify(member, null, 2));

    return cy.request("POST", this.path, member).then((resp) => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");

      const id = resp.body.id;
      cy.log("Created member ID: " + id);
      return id;
    });
  }
}

export default new MemberService()


import MemberFactory from "./member-factory";
import restPath from "../../fixtures/rest-path";


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
    return cy.request("POST", this.path, body);
  }

  public getMember(id: number) {
    return cy.request("GET", this.path + `/${id}`);
  }

  public deleteMember(id) {
    return cy.request("DELETE", this.path + `/${id}`);
  }

  public putMember(id, newbody) {
    return cy.request("PUT", this.path + `/${id}`, newbody);
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


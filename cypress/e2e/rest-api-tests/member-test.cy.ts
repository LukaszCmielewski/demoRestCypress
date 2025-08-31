import {fakerPL} from "@faker-js/faker";
import {faker} from "@faker-js/faker/locale/pl";
import MemberFactory from "../../factories/member-factory";
import MemberService from "../../services/member-service";

describe('Member Test', () => {
  let id;
  beforeEach('Setup', () => {
    const member = MemberFactory.createMember();
    MemberService.createMember(member).then(resp => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");
      id = resp.body.id;
      cy.log("id: " + id);
    })
  })

  it('Get members', () => {
    MemberService.getMembers().then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(JSON.stringify(resp.body));
      expect(resp.body).to.be.an("array");
    })
  })
  it('Create new User', () => {
    const member = MemberFactory.createMember();
    MemberService.createMember(member).then(resp => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");
      expect(resp.body.firstName).to.eq(member.firstName);
    })
  })
  it("should fetch single user", () => {
    MemberService.getMember(id).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.id).to.eq(id);
    });
  });

  it("should delete a user", () => {
    MemberService.deleteMember(id).then((resp) => {
      expect(resp.status).to.eq(204);
    });
  });
})
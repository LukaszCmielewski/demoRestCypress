import RestPath from "../../fixtures/rest-path";
import {deleteAll} from "../../support/api-utils";
import MemberFactory from "../../factories/member/member-factory";
import MemberService from "../../factories/member/member-service";

describe('Member Test', () => {
  let ids: number[];
  let member;
  beforeEach('Setup', () => {
    ids = [];
    member = MemberFactory.createMember();
    MemberService.createMember(member).then(resp => {
      expect(resp.status).to.eq(201);
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
    MemberService.getMembers().then((resp) => {
      expect(resp.status).to.eq(200);
      cy.log(JSON.stringify(resp.body));
      expect(resp.body).to.be.an("array");
    })
  })
  it('Create new Member', () => {
    const member = MemberFactory.createMember();
    MemberService.createMember(member).then(resp => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property("id");
      expect(resp.body.firstName).to.eq(member.firstName);
      ids.unshift(resp.body.id)
    })
  })
  it("should get single Member", () => {
    MemberService.getMember(ids[0]).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.id).to.eq(ids[0]);
    });
  });
  it('update Member', () => {
    MemberService.getMember(ids[0]).then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.body.id).to.eq(ids[0]);
    });
    let lName = member.lastName + '_UPDATED'
    member.lastName = lName
    cy.log("Updated :" + JSON.stringify(member, null, 2))
    MemberService.putMember(ids[0], member).then((response) => {
      expect(response.status).to.eq(200);
      cy.log("Member: " + JSON.stringify(response.body, null, 2));
      expect(response.body.id).to.eq(ids[0]);
      expect(response.body.lastName).to.eq(lName);
    })
  })
  it("should delete a Member", () => {
    let id = ids.shift();
    MemberService.deleteMember(id).then((resp) => {
      expect(resp.status).to.eq(204);
    });
  });
})
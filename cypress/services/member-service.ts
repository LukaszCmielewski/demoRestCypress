import restPath  from "../fixtures/rest-path";


class MemberService {
  // @ts-ignore
  path=restPath.member;

  public getMembers(){
    return  cy.request("GET",this.path);
  }
  public createMember(body){
    return cy.request("POST", this.path, body);
  }
  public getMember(id: number) {
    return cy.request("GET", this.path+`/${id}`);
  }
  public deleteMember(id) {
    return cy.request("DELETE",  this.path+`/${id}`);
  }
  public putMember(id, newbody){
    return cy.request("GET", this.path+`/${id}`, newbody);
  }

}
export default new MemberService()


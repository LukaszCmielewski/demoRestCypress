export function getIds(path:string): Cypress.Chainable<number[]> {
  return cy.request({method:"GET", url: path}).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');

    const ids = response.body.map((category: { id: number; name: string }) => category.id);
    return ids;
  });
}

export function deleteAll(path:string){
  const ids=getIds(path);
  ids.then(items=>{
    while (items.length>0){
      const id=items.pop()
      cy.log("Delete "+path+ " : "+ id)
      cy.request("DELETE", path + `/${id}`).then(resp => {
        expect(resp.status).to.eq(204);
      })
    }
  })
}

import {fakerPL} from "@faker-js/faker";
import {faker} from "@faker-js/faker/locale/pl";
import {MemberData} from "./member-service";


class MemberFactory {
  validUser: () => ({
    firstName: "Adam",
    lastName: "Nowak",
    address: "ul. Krzywa 18",
    phone: "+48987654321",
    email: "validuser@example.org"

  })

  createMember() {
    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();
    let address = faker.location.streetAddress({useFullAddress: true});
    let phone = fakerPL.phone.number();
    let email = firstName.toLowerCase() + '.' + lastName.toLowerCase() + "@test.example.org";
    let member = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
      email: email
    }
    return member;
  }

  newMember(
    firstName: string,
    lastName: string,
    address: string,
    phone: string,
    email: string
  ) {
    let member = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
      email: email
    }
    cy.log(JSON.stringify(member, null, 2));
    return member;
  }


  createNewMember(data: MemberData): MemberData {
    return {

      firstName: data.firstName || faker.person.firstName(),
      lastName: data.lastName || faker.person.lastName(),
      address: data.address || faker.location.streetAddress({useFullAddress: true}),
      phone: data.phone || fakerPL.phone.number(),
      email: data.email || `test+${Date.now()}@example.com`,
    };
  }
}

export default new MemberFactory()
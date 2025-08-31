import {fakerPL} from "@faker-js/faker";
import {faker} from "@faker-js/faker/locale/pl";

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
      email: email,
    }
    return member;
  }

}

export default new MemberFactory()
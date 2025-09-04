import {faker} from "@faker-js/faker/locale/en";

export type AuthorData={
  id?:number;
  firstName?:string;
  lastName?:string;
  biography?:string;
}

class AuthorFactory{
  createNewAuthor(data:AuthorData):AuthorData{
    return {
      firstName: data.firstName || faker.person.firstName(),
      lastName: data.lastName || faker.person.lastName(),
      biography: data.biography || faker.person.bio()
    };
  }

}
export default new AuthorFactory();
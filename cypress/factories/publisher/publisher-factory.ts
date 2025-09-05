import {faker} from "@faker-js/faker/locale/en";

export type PublisherData={
  id?: number;
  name?: string;
  address?: string;
  contactInfo?: string;
}
class PublisherFactory {
  createNewPublisher(data:PublisherData):PublisherData{
    return {
      name: data.name|| faker.company.name(),
      address: data.address||faker.location.secondaryAddress(),
      contactInfo: data.contactInfo|| "kontakt@" + faker.internet.domainName(),
    }
  }
}

export default new PublisherFactory();
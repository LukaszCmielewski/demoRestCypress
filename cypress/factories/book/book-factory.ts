import {da} from "@faker-js/faker";
import {faker} from "@faker-js/faker/locale/en";
import AuthorFactory, {AuthorData} from "../author/author-factory";
import CategoryFactory, {CategoryData} from "../category/category-factory";
import PublisherFactory, {PublisherData} from "../publisher/publisher-factory";

export type BookData = {
  id?: number;
  title?: string;
  isbn?: string;
  publicationYear?: number;
  edition?: string;
  summary?: string;
  coverImageUrl?: string;
  language?: string;
  publisher?: PublisherData;
  authors?: AuthorData[];
  categories?: CategoryData[];
  available?: boolean
}

class BookFactory {
  createNewBook(data: BookData): BookData {
    return {
      title           : data.title           || faker.book.title(),
      isbn            : data.isbn            || this.generateRandomISBN13(),
      publicationYear : data.publicationYear || this.generatePublicationYear(),
      edition         : data.edition         || this.generateBookEdition(),
      summary         : data.summary         || faker.lorem.paragraph(),
      coverImageUrl   : data.coverImageUrl   || faker.image.url(),
      language        : data.language        || this.generatePublicationLanguage(),
      publisher       : data.publisher       || PublisherFactory.createNewPublisher({}),
      authors         : data.authors         || this.generateAuthors(),
      categories      : data.categories      || this.generateCategories(),
      available       : data.available       || true
    }
  }

  generateAuthors(): AuthorData[] {
    let authors = [];
    for (let i = 0; i < 15; i++) {
      authors.unshift(AuthorFactory.createNewAuthor({}));
    }
    return faker.helpers.arrayElements(authors, { min: 1, max: 2 });
  }
  generateCategories(): CategoryData[] {
    let categories = [];
    for (let i = 0; i < 15; i++) {
      categories.unshift((CategoryFactory.createCategory()));
    }
    return faker.helpers.arrayElements(categories, { min: 1, max: 1 });
  }
  generatePublicationLanguage(): string {
    const languages = [
      'PL',
      'EN',
      'DE',
      'FR'
    ];
    return faker.helpers.arrayElement(languages);
  }
  generateBookEdition(minEdition = 1, maxEdition = 10): string {
    const editionNumber = faker.number.int({ min: minEdition, max: maxEdition });
    return `${editionNumber}. Edition`;
  }
  generatePublicationYear(minYear = 1900, maxYear = new Date().getFullYear()): number {
    return faker.number.int({ min: minYear, max: maxYear });
  }
  generateRandomISBN13(): string {
    // ISBN-13 zaczyna się od 978 lub 979
    const prefix = '978';

    // Losowe 9 cyfr po prefiksie
    let core = '';
    for (let i = 0; i < 9; i++) {
      core += Math.floor(Math.random() * 10).toString();
    }

    const partialISBN = prefix + core;
    const checkDigit = this.calculateISBN13CheckDigit(partialISBN);
    return partialISBN + checkDigit;
  }

  calculateISBN13CheckDigit(isbn12: string): string {
    let sum = 0;
    for (let i = 0; i < isbn12.length; i++) {
      const digit = parseInt(isbn12[i], 10);
      sum += (i % 2 === 0) ? digit : digit * 3;
    }
    const remainder = sum % 10;
    const checkDigit = (10 - remainder) % 10;
    return checkDigit.toString();
  }
}

export default new BookFactory();
import MemberFactory, {MemberData} from "../member/member-factory";
import BookFactory, {BookData} from "../book/book-factory";


export  type BorrowingData = {
  id?: number;
  book?: BookData,
  member?: MemberData;
  borrowDate?: string;
  dueDate?: string;
  returnDate?: string;
  returned?: boolean
}


class BorrowingFactory {
  createNewBorrowing(data:BorrowingData):BorrowingData{
    return {
      book:data.book||this.generateBook(),
      member:data.member||this.generateMember(),
      borrowDate:data.borrowDate|| this.getCurrentDate(),
      dueDate:data.dueDate|| this.getCurrentDate(25),
      returnDate:data.returnDate||null,
      returned:data.returned|| false
    }
  }
  getCurrentDate(daysOffset=0): string {
    const now = new Date();
    now.setDate(now.getDate() + daysOffset);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // miesiące są od 0 do 11
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  generateBook():BookData{
    return BookFactory.createNewBook({});
  }
  generateMember():MemberData{
    return MemberFactory.createNewMember({});
  }
}

export default new BorrowingFactory()
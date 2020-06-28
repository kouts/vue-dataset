import { fieldSorter } from '@/helpers';

function isoDateToDate (isoDate) {
  const isoDateParts = isoDate.split('-').map(o => Number(o));
  const res = new Date(new Date(isoDateParts[0], isoDateParts[1] - 1, isoDateParts[2]));
  return res;
};

const data = [
  {
    index: 0,
    value: { balance: 39317, birthdate: '1980-03-09', name: 'Gawain Bumpsty', firstName: 'Gawain', lastName: 'Bumpsty', company: 'Quaxo', email: 'gcumpsty0@discuz.net', phone: '985-353-3917', address: '4669 Northland Circle', favoriteAnimal: 'Deer, roe' }
  },
  {
    index: 1,
    value: { balance: 64949, birthdate: '2004-02-11', name: 'Mile Fulloway', firstName: 'Mile', lastName: 'Fulloway', company: 'Flashspan', email: 'mfulloway2@whitehouse.gov', phone: '225-853-2332', address: '683 Lakeland Crossing', favoriteAnimal: 'Starling, cape' }
  },
  {
    index: 2,
    value: { balance: 3855, birthdate: '1974-05-14', name: 'Bob Kubiak', firstName: 'Bob', lastName: 'Kubiak', company: 'Youspan', email: 'gkubiak3@tripadvisor.com', phone: '235-467-8727', address: '157 Fisk Center', favoriteAnimal: 'Fairy penguin' }
  },
  {
    index: 3,
    value: { balance: 21192, birthdate: '1972-09-29', name: 'Gawain Arraway', firstName: 'Gawain', lastName: 'Arraway', company: 'Shuffledrive', email: 'eharraway1@wordpress.com', phone: '217-861-5367', address: '1 Meadow Valley Circle', favoriteAnimal: 'African clawless otter' }
  }
];

let sortData = [];

beforeEach(() => {
  sortData = JSON.parse(JSON.stringify(data));
});

describe('fieldSorter', () => {
  it('sorts the given array by the firstName column - asc', () => {
    sortData.sort(fieldSorter(['firstName']));
    expect(sortData[0].value.firstName).toBe('Bob');
    expect(sortData[3].value.firstName).toBe('Mile');
  });
  it('sorts the given array by the firstName column - desc', () => {
    sortData.sort(fieldSorter(['-firstName']));
    expect(sortData[0].value.firstName).toBe('Mile');
    expect(sortData[3].value.firstName).toBe('Bob');
  });
  it('sorts the given array by the birthdate column - asc', () => {
    sortData = sortData.map(o => {
      o.value.birthdate = isoDateToDate(o.value.birthdate);
      return o;
    });
    sortData.sort(fieldSorter(['birthdate']));
    expect(sortData[0].value.birthdate.getFullYear()).toBe(1972);
    expect(sortData[3].value.birthdate.getFullYear()).toBe(2004);
  });
  it('sorts the given array by the birthdate column - desc', () => {
    sortData = sortData.map(o => {
      o.value.birthdate = isoDateToDate(o.value.birthdate);
      return o;
    });
    sortData.sort(fieldSorter(['-birthdate']));
    expect(sortData[0].value.birthdate.getFullYear()).toBe(2004);
    expect(sortData[3].value.birthdate.getFullYear()).toBe(1972);
  });
  it('sorts the given array by the balance column - asc', () => {
    sortData.sort(fieldSorter(['balance']));
    expect(sortData[0].value.balance).toBe(3855);
    expect(sortData[3].value.balance).toBe(64949);
  });
  it('sorts the given array by the balance column - desc', () => {
    sortData.sort(fieldSorter(['-balance']));
    expect(sortData[0].value.balance).toBe(64949);
    expect(sortData[3].value.balance).toBe(3855);
  });
  it('sorts the given array by first name asc and last name asc', () => {
    sortData.sort(fieldSorter(['firstName', 'lastName']));
    expect(sortData[1].value.lastName).toBe('Arraway');
    expect(sortData[2].value.lastName).toBe('Bumpsty');
  });
  it('sorts the given array by first name asc and last name desc', () => {
    sortData.sort(fieldSorter(['firstName', '-lastName']));
    expect(sortData[1].value.lastName).toBe('Bumpsty');
    expect(sortData[2].value.lastName).toBe('Arraway');
  });
});

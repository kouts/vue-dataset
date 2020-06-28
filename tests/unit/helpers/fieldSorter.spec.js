import { fieldSorter } from '@/helpers';

const data = [
  {
    index: 0,
    value: { balance: 39317, birthdate: '1980-03-09', name: 'Gawain Bumpsty', firstName: 'Gawain', lastName: 'Bumpsty', company: 'Quaxo', email: 'gcumpsty0@discuz.net', phone: '985-353-3917', address: '4669 Northland Circle', favoriteAnimal: 'Deer, roe' }
  },
  {
    index: 1,
    value: { balance: 34949, birthdate: '2004-02-11', name: 'Mile Fulloway', firstName: 'Mile', lastName: 'Fulloway', company: 'Flashspan', email: 'mfulloway2@whitehouse.gov', phone: '225-853-2332', address: '683 Lakeland Crossing', favoriteAnimal: 'Starling, cape' }
  },
  {
    index: 2,
    value: { balance: 3855, birthdate: '1974-05-14', name: 'Bob Kubiak', firstName: 'Bob', lastName: 'Kubiak', company: 'Youspan', email: 'gkubiak3@tripadvisor.com', phone: '235-467-8727', address: '157 Fisk Center', favoriteAnimal: 'Fairy penguin' }
  },
  {
    index: 3,
    value: { balance: 31192, birthdate: '1972-09-29', name: 'Gawain Arraway', firstName: 'Gawain', lastName: 'Arraway', company: 'Shuffledrive', email: 'eharraway1@wordpress.com', phone: '217-861-5367', address: '1 Meadow Valley Circle', favoriteAnimal: 'African clawless otter' }
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
  });
  it('sorts the given array by the firstName column - desc', () => {
    data.sort(fieldSorter(['-firstName']));
    expect(data[3].value.firstName).toBe('Bob');
  });
});

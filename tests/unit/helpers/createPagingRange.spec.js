import { createPagingRange } from '@/helpers';

describe('createPagingRange', () => {
  it('should return the correct range for 3 pages when current page is 1', () => {
    // createPagingRange(nrOfPages, currentPage);
    const res = createPagingRange(3, 1);
    expect(res).toStrictEqual([1, 2, 3]);
  });
  it('should return the correct range for 10 pages when current page is 9', () => {
    const res = createPagingRange(10, 9);
    expect(res).toStrictEqual([1, '...', 7, 8, 9, 10]);
  });
  it('should return the correct range for 20 pages when current page is 3', () => {
    const res = createPagingRange(20, 3);
    expect(res).toStrictEqual([1, 2, 3, 4, 5, '...', 20]);
  });  
  it('should return the correct range for 10 pages when current page is 10', () => {
    const res = createPagingRange(10, 10);
    expect(res).toStrictEqual([1, '...', 8, 9, 10]);
  });
  it('should return the correct range for 100 pages when current page is 5', () => {
    const res = createPagingRange(100, 5);
    expect(res).toStrictEqual([1, 2, 3, 4, 5, 6, 7, '...', 100]);
  });
  it('should return the correct range for 100 pages when current page is 1', () => {
    const res = createPagingRange(100, 1);
    expect(res).toStrictEqual([1, 2, 3, '...', 100]);
  });
  it('should return the correct range for 100 pages when current page is 8', () => {
    const res = createPagingRange(100, 8);
    expect(res).toStrictEqual([1, '...', 6, 7, 8, 9, 10, '...', 100]);
  });
  it('should return the correct range for 100 pages when current page is 96', () => {
    const res = createPagingRange(100, 96);
    expect(res).toStrictEqual([1, '...', 94, 95, 96, 97, 98, 99, 100]);
  });
});

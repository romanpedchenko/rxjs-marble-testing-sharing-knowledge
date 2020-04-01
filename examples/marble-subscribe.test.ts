import { TestScheduler } from 'rxjs/testing';
import { concat, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';

describe('Marble testing in RxJS', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('Marble concat testing', () => {
    testScheduler.run(({ cold, expectObservable }: RunHelpers) => {
      const first$: Observable<any> = cold('-a--b---c-|');
      const second$: Observable<any> = cold('-d--f---j-|');
      const expectResult = '-a--b---c--d--f---j-|';

      const result$ = first$.pipe(concat(second$));
      expectObservable(result$).toBe(expectResult);
    });
  });

  const filteredAndMapped = (source$: Observable<any>) => {
    return source$.pipe(
      filter((n) => n % 2 === 0),
      map((n) => n * 10),
    );
  };

  it('should filter out odd numbers and multiply by ten', () => {
    testScheduler.run(({ cold, expectObservable }: RunHelpers) => {
      const values = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 10,
      };
      const source$ = cold('a-b-c-d-e-f-g-h-i-j', values);
      const expectedMarble = '--a---b---c---d---e';
      const expectedValues = { a: 20, b: 40, c: 60, d: 80, e: 100 };
      const result$ = filteredAndMapped(source$);
      expectObservable(result$).toBe(expectedMarble, expectedValues);
    });
  });
});

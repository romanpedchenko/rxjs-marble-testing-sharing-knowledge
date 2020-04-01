import { TestScheduler } from 'rxjs/testing';
import { map } from 'rxjs/operators';
import {RunHelpers} from "rxjs/internal/testing/TestScheduler";

describe('Marble testing in RxJS', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('Should convert ASCII diagrams into observables', () => {
    testScheduler.run(({ cold, expectObservable }: RunHelpers) => {
      const source$ = cold('-a-b--c', {a: 1, b: 2, c: 3}); // {a: 1, b: 2, c: 3}
      const final$ = source$.pipe(map((v) => v * 10));
      const expected = '-a-b--c';

      expectObservable(final$).toBe(expected, {a: 10, b: 20, c: 30}); //{a: 10, b: 20, c: 30}
    });
  });
});

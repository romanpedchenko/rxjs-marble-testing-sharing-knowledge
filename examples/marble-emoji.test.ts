import { TestScheduler } from 'rxjs/testing';
import { delayWhen, pluck, take } from 'rxjs/operators';
import { interval, Observable, timer } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';

interface Emoji {
  emoji: string;
  time: number;
}

describe('Marble testing in RxJS', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  const delayMethod = (source$: Observable<any>) => {
    return source$.pipe(
      delayWhen(({ time }: Emoji) => timer(time)),
      pluck('emoji'),
    );
  };

  it('Emoji test', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = {
        a: {
          emoji: '😁',
          time: 0,
        },
        b: {
          emoji: '😂',
          time: 5,
        },
        c: {
          emoji: '😃',
          time: 1000,
        },
      };
      const source$ = cold('a-b-c', values);
      const expectMarble =
        'a------b------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------c';
      const expectValues = {
        a: '😁',
        b: '😂',
        c: '😃',
      };
      const final$ = delayMethod(source$);
      expectObservable(final$).toBe(expectMarble, expectValues);
    });
  });

  it('time travelling', () => {
    testScheduler.run(({ expectObservable }: RunHelpers) => {
      const expectedMarble = '1s a 999ms b 999ms (c|)';
      const expectedValue = { a: 0, b: 1, c: 2 };
      const source$ = interval(1000).pipe(take(3));

      expectObservable(source$).toBe(expectedMarble, expectedValue);
    });
  });
});

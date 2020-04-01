import { from, timer } from 'rxjs';
import { delayWhen, pluck, toArray } from 'rxjs/operators';

interface Emoji {
  emoji: string;
  time: number;
}

const emojies: Emoji[] = [
  {
    emoji: '😁',
    time: 0,
  },
  {
    emoji: '😂',
    time: 10000,
  },
  {
    emoji: '😃',
    time: 5,
  },
  {
    emoji: '😅',
    time: 100,
  },
  {
    emoji: '😋',
    time: 100,
  },
];

describe('Subscribe & Assert Pattern in RxJS 2', () => {
  it('long test', (done) => {
    const emoji$ = from(emojies).pipe(
      delayWhen(({ time }: Emoji) => timer(time)),
      pluck('emoji'),
    );

    const expected = ['😁', '😃', '😅', '😋', '😂'];
    emoji$.pipe(toArray()).subscribe((result) => {
      expect(result).toMatchObject(expected);
      done();
    });
  }, 15000);
});

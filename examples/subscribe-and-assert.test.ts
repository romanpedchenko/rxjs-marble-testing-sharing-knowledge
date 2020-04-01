import { of, timer } from 'rxjs';
import { delay, map, mapTo, toArray } from 'rxjs/operators';

describe('Subscribe & Assert Pattern in RxJS', () => {
  it('Should compare each emitted value | false positive', (done) => {
    const source$ = of(1, 2, 3);
    const final$ = source$.pipe(map((v) => v * 10));

    const expected = [10, 20, 30];
    let index = 0;

    final$.subscribe((val) => {
      expect(val).toBe(expected[index++]);
      done();
    });
  });

  it('Should compare each emitted value | second way', () => {
    const source$ = of(1, 2, 3);
    const final$ = source$.pipe(map((v) => v * 10));

    const expected = [10, 20, 30];
    const actual: number[] = [];

    final$.subscribe((val) => {
      actual.push(val);
    });

    expect(actual).toEqual(expected);
  });

  it('Should compare each emitted value', (done) => {
    const source$ = of(1, 2, 3);
    const final$ = source$.pipe(map((v) => v * 10));

    const expected = [10, 20, 30];
    let index = 0;

    final$.subscribe({
      next: (val) => {
        expect(val).toBe(expected[index++]);
      },
      complete: done,
    });
  });

  it('Wait async value', (done) => {
    const complete = done;
    const source$ = timer(100);
    const final$ = source$.pipe(mapTo(10));

    final$.subscribe({
      next: (val) => {
        expect(val).toBe(10);
      },
      complete,
    });
  });

  it('Wait async value | false positive',  () => {
    const source$ = timer(100);
    const final$ = source$.pipe(mapTo(10));

    const res = final$.toPromise();

    return expect(res).resolves.toBe(10); // Error
  });

  it('Should compare emitted values on completion with toArray', (done) => {
    const source$ = of(1, 2, 3);
    const final$ = source$.pipe(map((v) => v * 10));
    const expected = [10, 20, 30];

    final$.pipe(toArray()).subscribe({
      next: (val) => {
        expect(val).toEqual(expected);
      },
      complete: done,
    });
  });

  it('Should compare emitted values', async () => {
    const source$ = of(1, 2, 3);
    const final$ = source$.pipe(
      map((v) => v * 10),
      delay(100), // <-----
    );
    const expected = [10, 20, 30];

    const res = final$.pipe(toArray()).toPromise();

    return expect(await res).toEqual(expected);
  });
});

### Marble testing syntax

* `-` represents a frame of virtual time passing
* `[a-z][0-9]` an alphanumeric character represents a value which is emitted by the Observable.
* `#` Signifies an error
* `()` used to group events in the same frame. This can be used to group values, errors, and completion.
* `|`  This sign illustrates the completion of an observable.
* `^` this sign illustrates the subscription point and will only be used when we are dealing with hot observables.

### Examples

* ----: equivalent to NEVER. An observable that never emits
* -a--b--c| : an Observable that emits a on the first frame, b on the fourth and c on the seventh. After emitting c the observable completes.
* --ab--# : An Observable that emits a on frame two, b on frame three and an error on frame six.
* -a^(bc)--|: A hot Observable that emits a before the subscription.


### Sources

1. [Marble testing with RxJS testing utils](https://medium.com/@kevinkreuzer/marble-testing-with-rxjs-testing-utils-3ae36ac3346a)
2. [Marble testing Observable Introduction](https://medium.com/@bencabanes/marble-testing-observable-introduction-1f5ad39231c)
3. [Testing asynchronous RxJs operators](https://medium.com/angular-in-depth/testing-asynchronous-rxjs-operators-5495784f249e)
4. [Portal education Dev.Pro](https://sites.google.com/dev-pro.net/trainingportal/educational-materials/tech/js/rxjs-testing-stop-being-afraid-it-is-easy-with-anton-korniichuk)
5. [How to test Observables](https://medium.com/angular-in-depth/how-to-test-observables-a00038c7faad)

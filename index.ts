// Import stylesheets //cloned from https://www.learnrxjs.io/operators/combination/combinelatest.html
import './style.css';

import { timer, combineLatest } from 'rxjs';
import { mapTo } from 'rxjs/operators'
import { SerializableSubscription } from 'rxjs-serializable-subscription';

//timerOne emits first value at 1s, then once every 4s
//using this timer to simulate user clicking
const timerOne = timer(1000, 1000);

let timerOneTickCounter = 1;
let _subscriptions = new SerializableSubscription();

timerOne.subscribe((r) => {
  ++timerOneTickCounter;
  _subscriptions.add(timer(1100).pipe(mapTo({ result: timerOneTickCounter })).subscribe((result) => 
    {
      console.log('Obs$1 Reponse: ', result);
    }
  ));
  //if this method happens to return at 1100ms, but is called again, we are cancelling the previous call and waiting on the new one, except in this example we are constantly cancelling :)
  //swtich to < 1000 (time of timer) and watch it does fire
  _subscriptions.serialize(timer(2500).pipe(mapTo({ result: timerOneTickCounter })).subscribe((result) => 
    {
      console.log('change time to < 1000 too see it does fire!', result);
    }));
})

//ngOnDestroy() 
//this._subscriptions.unsubscribe() //unsubs from all

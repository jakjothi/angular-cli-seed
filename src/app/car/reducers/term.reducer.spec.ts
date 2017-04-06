import { expect } from 'chai';
import {TestBed, inject} from '@angular/core/testing';
import {StoreModule, Store, Action} from '@ngrx/store';
import {CarState} from '../domain/car';
import {term} from './term.reducer';
import {WidgitModule} from '../../widgit/widgit.module';
import {CarAction, ActionFactory} from '../actions/cars';

describe('search reducer', () => {

  let store: Store<CarState>;

  let subscribedTerm: string;

  const termPayload = 'I am looking for you';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WidgitModule, StoreModule.provideStore({term})],
    });
  });

  beforeEach(inject([Store], (_store: Store<CarState>) => {
    store = _store;
  }));

  beforeEach(() => {
    store.select(state => state.term).subscribe(term => subscribedTerm = term);
  });

  describe(CarAction.SEARCH, () => {

    it('will return a search term that is the same as the payload when the state is empty', sinon.test(() => {
      store.dispatch(ActionFactory.search(termPayload));
      expect(subscribedTerm).to.equal(termPayload);
    }));

    it('will return term and remove and existing term when state is not empty', sinon.test(() => {
      store.dispatch(ActionFactory.search('I do not want this'));

      store.dispatch(ActionFactory.search(termPayload));

      expect(subscribedTerm).to.equal(termPayload);
    }));

  });

  describe('Some random string', () => {

    it('will not do anything to the state', sinon.test(() => {
      store.dispatch(ActionFactory.search(termPayload));

      const action: Action = {
        type: 'some random string',
        payload: 'I do not want this'
      };
      store.dispatch(action);
      expect(subscribedTerm).to.equal(termPayload);
    }));

  });


});
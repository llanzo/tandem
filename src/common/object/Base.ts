import { create } from 'common/utils/class/index';
import IDispatcher from 'common/dispatchers/idispatcher';
import IEvent from 'common/events/IEvent';
import assign from 'common/utils/object/assign';

/**
 */

class ObservableObject {

  private _observers:any;

  constructor(properties) {
    if (properties != void 0) {
      assign(this, properties);
    }
  }

  static create(properties) {
    return new ObservableObject(properties);
  }

  private _dispatch(event:IEvent) {

  }
}

export default ObservableObject;

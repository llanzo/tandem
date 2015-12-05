import { create, extend } from 'utils-class';

class BaseObject {
  constructor(properties) {
    this.setProperties(properties);
  }
  setProperties(properties) {
    Object.assign(this, properties);
  }
}

BaseObject.create = create;
BaseObject.extend = extend;

export default BaseObject;

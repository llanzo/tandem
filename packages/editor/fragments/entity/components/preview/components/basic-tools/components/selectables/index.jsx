import './index.scss';

import cx from 'classnames';
import React from 'react';
import { SetFocusMessage } from 'editor/message-types';

class SelectableComponent extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  onMouseDown(event) {
    this.props.app.notifier.notify(SetFocusMessage.create([this.props.entity], event.shiftKey));
    event.stopPropagation();
  }

  render() {

    var entity = this.props.entity;
    if (!entity.preview) return null;
    var bounds = entity.preview.getBoundingRect(true);

    var classNames = cx({
      'm-selectable' : true
    });

    var style = {
      background : 'transparent',
      position   : 'absolute',
      width      : bounds.width,
      height     : bounds.height,
      left       : bounds.left + 1,
      top        : bounds.top + 1
    };

    return <div style={style}
      className={classNames}
      onMouseDown={this.onMouseDown.bind(this)} />;
  }
}

class SelectablesComponent extends React.Component {
  render() {
    var currentLayerFocus = this.props.app.rootEntity;

    return <div>
      {
        currentLayerFocus.children.map((entity) => {
          return <SelectableComponent {...this.props} entity={entity} key={entity.id} />
        })
      }
    </div>;
  }
}

export default SelectablesComponent;

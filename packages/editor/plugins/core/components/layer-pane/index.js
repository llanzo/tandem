import {
  ApplicationPlugin,
  AppPaneComponentPlugin,
  EntityPaneComponentPlugin
} from 'editor/plugin/types';

import LayersPaneComponent from './layers';

export default ApplicationPlugin.create({
  id: 'basicPaneComponents',
  factory: {
    create({ app }) {
      app.plugins.push(AppPaneComponentPlugin.create({
        id             : 'layersPane',
        label          : 'Layers',
        componentClass : LayersPaneComponent
      }));
    }
  }
});
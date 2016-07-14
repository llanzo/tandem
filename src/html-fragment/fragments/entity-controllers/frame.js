import { FactoryFragment } from 'common/fragments';
import { create } from 'common/utils/class';
import NodeSection from 'common/section/node';
import FragmentSection from 'common/section/fragment';

class RegisteredEntityController {
  constructor(properties) {
    Object.assign(this, properties);
  }

  async execute(options) {
    for (var childExpression of this.frame.expression.childNodes) {
      this.entity.appendChild(await childExpression.execute(options));
    }
  }

  static create = create;
}


export default class FrameEntityController {
  constructor(properties) {
    Object.assign(this, properties);
  }

  setAttribute(key, value) {
    this.attributes[key] = value;
  }

  execute(options) {

    var iframe = document.createElement('iframe');
    Object.assign(iframe.style, {
      border: 0,
      backgroundColor: 'white'
    });

    options.fragmentDictionary.register(
      FactoryFragment.create({
        ns: `entity/controllers/${this.attributes.id}`,
        factory: {
          create: this.createElementController.bind(this)
        }
      })
    );

    iframe.addEventListener('load', async () => {
      var bodySection = NodeSection.create(iframe.contentWindow.document.body);
      for (var childExpression of this.expression.childNodes) {
        await this.entity.appendChild(await childExpression.execute({
          ...options,
          section: bodySection
        }))
      }
    });
    this.section.appendChild(iframe);
  }

  createElementController(properties) {
    return RegisteredEntityController.create({
      ...properties,
      frame: this
    });
  }

  static create = create;
}

export const fragment = FactoryFragment.create({
  ns: 'entity/controllers/frame',
  factory: FrameEntityController
});

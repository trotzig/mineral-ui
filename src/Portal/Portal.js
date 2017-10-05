import { Children, Component } from 'react';
import {
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer
} from 'react-dom';

type Props = {
  children: React$Node,
  renderCallback: () => {}
};

export default class Portal extends Component {
  props: Props;

  node: ?HTMLElement;

  componentDidMount() {
    this.createPortal();
    this.renderIntoPortal();
  }

  componentDidUpdate() {
    this.renderIntoPortal();
  }

  componentWillUnmount() {
    this.closePortal();
  }

  render() {
    return null;
  }

  renderIntoPortal() {
    const { children, renderCallback } = this.props;
    const content = Children.only(children);

    this.content = unstable_renderSubtreeIntoContainer(
      this,
      content,
      this.node,
      renderCallback
    );
  }

  createPortal() {
    this.node = global.document.createElement('div');
    global.document.body.appendChild(this.node);
  }

  closePortal() {
    unmountComponentAtNode(this.node);
    if (
      global.document.body.contains &&
      global.document.body.contains(this.node)
    ) {
      global.document.body.removeChild(this.node);
    }
  }
}

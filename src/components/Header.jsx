import React, {Component, PropTypes} from 'react';
import ui from 'redux-ui';
import {AnchorButton, Intent, Popover, PopoverInteractionKind, Position, Tag} from '@blueprintjs/core';
import {APP_TITLE} from '../utils';

@ui()
class Header extends Component {
  constructor(props) {
    super(props);

    this.onInteractionHandle = this.onInteractionHandle.bind(this);
  }

  onInteractionHandle(nextPopoverState) {
    this.props.updateUI({displayPopover: nextPopoverState});
  }

  render() {
    const {eventsAmount, popoverContent, ui: {displayPopover}} = this.props;
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">{APP_TITLE}</div>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <Popover
            content={popoverContent}
            interactionKind={PopoverInteractionKind.CLICK}
            onInteraction={this.onInteractionHandle}
            popoverClassName="pt-popover-content-sizing"
            useSmartArrowPositioning={true}
            position={Position.BOTTOM_RIGHT}
            isOpen={displayPopover}
          >
            <AnchorButton iconName="notifications" />
          </Popover>
          {eventsAmount > 0 && !displayPopover && <Tag className="pt-round" intent={Intent.DANGER}>{eventsAmount}</Tag>}
        </div>
      </nav>
    );
  }
}
Header.propTypes = {
  ui: PropTypes.object,
  updateUI: PropTypes.func,
  eventsAmount: PropTypes.number,
  popoverContent: PropTypes.element,
  displayPopover: PropTypes.bool
};

export default Header;

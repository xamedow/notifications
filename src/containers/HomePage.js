import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ui from 'redux-ui';
import R from 'ramda';
import Header from '../components/Header.jsx';
import PopoverEvent from '../components/PopoverEvent';
import * as actions from '../actions/homePageActions';
import {getFakePhrase, getNextEventId, takeLastFive} from '../utils';
import '@blueprintjs/core/dist/blueprint.css';


@ui({
  key: 'events_ui',
  state: {
    displayPopover: false
  }
})
class HomePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.onAddEventClick = this.onAddEventClick.bind(this);
    this.onTogglePopoverClick = this.onTogglePopoverClick.bind(this);
  }

  componentWillMount() {
    this.lastFiveJSX = R.compose(R.map(event => <PopoverEvent key={event.id} event={event} />), takeLastFive);
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const payload = {
        id: getNextEventId(this.props.events),
        title: getFakePhrase(),
        unread: true,
        datetime: Date.now()
      };
      this.props.actions.addEvent(payload);
    }, 20000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onAddEventClick() {
    const {value: title} = this.refs.eventName;
    if (!title) return;

    this.props.actions.addEvent({
      id: getNextEventId(this.props.events),
      title,
      unread: true,
      datetime: Date.now()
    });
  }

  onTogglePopoverClick(e) {
    const {ui, updateUI} = this.props;
    updateUI({displayPopover: !ui.displayPopover});
    e.preventDefault();
  }

  renderPopoverContent() {
    return (
      <div>
        {this.lastFiveJSX(this.props.events)}
        <a href="#" onClick={this.onTogglePopoverClick}>посмотреть все&hellip;</a>
      </div>
    );
  }

  render() {
    const {ui, events, actions: {clearEvents, markAllAsRead}} = this.props;
    const eventsAmount = events && events.length;

    return (
      <div>
        <Header
          eventsAmount={eventsAmount}
          popoverContent={this.renderPopoverContent(this.props.events)}
          displayPopover={ui.displayPopover}
        />
        <div className="pt-control-group  pt-fill">
          <input type="text" ref="eventName" className="pt-input" placeholder="Введите название события&hellip;" />
          <button type="button" className="pt-button" onClick={this.onAddEventClick}>Отправить</button>
        </div>
        <div className="pt-button-group pt-vertical">
          <button type="button" className="pt-button" onClick={markAllAsRead} disabled={!eventsAmount}>Пометить все
            события прочитанными
          </button>
          <button type="button" className="pt-button" onClick={clearEvents} disabled={!eventsAmount}>Удалить все
            события
          </button>
          <button type="button" className="pt-button" onClick={this.onTogglePopoverClick} disabled={!eventsAmount}>
            Показать попап нотификаций (toggle btn)
          </button>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  events: PropTypes.array,
  ui: PropTypes.object,
  updateUI: PropTypes.func
};

function mapStateToProps(state) {
  const {events} = state;
  return {
    events
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

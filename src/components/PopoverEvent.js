import React, {PropTypes} from 'react';
import moment from 'moment';


const PopoverEvent = ({event}) => {
  const {title, datetime} = event;
  const m = moment(datetime || Date.now());
  return (
    <div>
      <h5>{title}</h5>
      {m.fromNow()}
    </div>
  );
};

PopoverEvent.propTypes = {
  event: PropTypes.object.isRequired
};

export default PopoverEvent;

import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loader, Dimmer } from 'semantic-ui-react';
import * as fieldActions from '../dux/fields';
import * as mailActions from '../dux/mail';
import * as notificationActions from '../dux/notification';
import '../css/styles.scss';
import 'react-day-picker/dist/style.css';
import '../css/DayPicker.scss';
import ErrorBoundary from './ErrorBoundary';
import Notification from './Notification';
import Form from './Form';
import DatePicker from './DatePicker';
import { getCalendarEvents, formatDates } from '../utils';

const App = ({ hideNotification, notification, fetchFields, fields, sendingEmail, sendMail }) => {
  const [disabled, setDisabledDays] = useState({});
  const [availableFrom16, setAvailableFrom16] = useState({});
  const [availableUntil12, setAvailableUntil12] = useState({});
  const [loading, setLoading] = useState(true);
  const showCalendarOnly = window.location.href.includes('calendar');

  useEffect(() => {
    fetchFields();
    let disabledDaysData;
    let from16Data;
    let until12Data;
    getCalendarEvents({})
      .then((response) => {
        const { disabledDays, from16, until12 } = formatDates(response.data.items);
        disabledDaysData = disabledDays;
        from16Data = from16;
        until12Data = until12;
      })
      .then(() => {
        getCalendarEvents({ wainolaCalendar: true }).then((response) => {
          const { disabledDays, from16, until12 } = formatDates(response.data.items);
          setDisabledDays({ wainola: disabledDays, villa: disabledDaysData });
          setAvailableFrom16({ wainola: from16, villa: from16Data });
          setAvailableUntil12({ wainola: until12, villa: until12Data });
          setLoading(false);
        });
      });
  }, []);

  const customerType = () => {
    const url = window.location.href;
    let type = undefined;
    if (url.includes('company')) {
      type = 'company';
    } else if (url.includes('private')) {
      type = 'private';
    }
    return type;
  };

  return (
    <ErrorBoundary>
      {!!fields.length && (
        <div>
          <Dimmer active={sendingEmail} inverted>
            <Loader inverted>Viestiäsi lähetetään ...</Loader>
          </Dimmer>
          {showCalendarOnly ? (
            <DatePicker
              disabledDays={disabled.villa}
              availableFrom16={availableFrom16.villa}
              availableUntil12={availableUntil12.villa}
              compact
              loading={loading}
              calendarOnly
            />
          ) : (
            <Form
              customerType={customerType()}
              fields={fields}
              disabledDays={disabled}
              availableFrom16={availableFrom16}
              availableUntil12={availableUntil12}
              sendMail={sendMail}
            />
          )}
        </div>
      )}
      {!!Object.getOwnPropertyNames(notification).length && (
        <Notification notification={notification} hideNotification={hideNotification} />
      )}
    </ErrorBoundary>
  );
};

export default connect(
  (state) => ({
    fields: state.fields.fields,
    notification: state.notification.notification,
    sendingEmail: state.mail.sendingEmail,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        ...fieldActions,
        ...mailActions,
        ...notificationActions,
      },
      dispatch
    )
)(App);

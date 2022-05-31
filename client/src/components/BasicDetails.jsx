import React from 'react';
import { Form as SemanticForm, Popup, Header, Icon, Button } from 'semantic-ui-react';
import 'moment/locale/fi';
import DatePicker from './DatePicker';
import CompanyForm from './CompanyForm';
import PrivatePersonForm from './PrivatePersonForm';
import { useObjectMapper } from '../helper/useObjectMapper';

const BasicDetails = ({
  formData,
  dateToStr,
  handleOnChange,
  handleDayClick,
  popupOpen,
  toggleDatePicker,
  getObjectInList,
  disabledDays,
  availableFrom16,
  availableUntil12,
  showInfo,
  handleOnRadioChange,
  handleCottageChange,
  activePeriod,
  notVilla,
}) => {
  const { translation } = useObjectMapper();

  const timeOptions = () => {
    const options = new Array(17).fill(null).map((val, i) => {
      const time = 8 + i;
      return {
        key: `${time}`,
        value: `${time}`,
        text: `${time}:00`,
      };
    });
    return options;
  };

  const { from, to } = formData;

  const renderDatePicker = (className, compact) => (
    <DatePicker
      className={className}
      from={from}
      compact={compact}
      to={to}
      handleDayClick={handleDayClick}
      until12Info={formData.until12Info}
      from16Info={formData.from16Info}
      disabledDays={disabledDays}
      availableFrom16={availableFrom16}
      availableUntil12={availableUntil12}
      alwaysAvailable={!formData.locationObj?.useCalendar}
    />
  );
  const isPrivate = formData.type === 'private';
  const isCompany = formData.type === 'company';
  const dateValue = dateToStr(from, to);
  return (
    <>
      {isPrivate && (
        <Button
          compact
          size="small"
          basic
          style={{ marginTop: 16 }}
          onClick={() =>
            (window.location.href =
              'https://nuuksiontaika.johku.com/fi_FI/vuokraa-mokki-sauna-nuotiopaikka/mokki-nuuksio')
          }
        >
          {translation('buyAccommodationButton')}
        </Button>
      )}
      <Header as="h3" dividing style={{ marginTop: 16 }}>
        {translation('basicDetails')}
      </Header>
      <SemanticForm.Group widths="equal">
        <SemanticForm.Input
          required
          label={translation('name')}
          id="name"
          onChange={handleOnChange}
        />
        <SemanticForm.Input
          required
          label={translation('email')}
          id="email"
          onChange={handleOnChange}
        />
      </SemanticForm.Group>
      <SemanticForm.Group widths="equal">
        <SemanticForm.Input
          label={translation('phone')}
          id="phone"
          type="telsett"
          onChange={handleOnChange}
        />
        <SemanticForm.Input label={translation('address')} id="address" onChange={handleOnChange} />
      </SemanticForm.Group>
      {isPrivate && (
        <PrivatePersonForm
          handleOnChange={handleOnChange}
          handleOnRadioChange={handleOnRadioChange}
          values={formData}
          handleCottageChange={handleCottageChange}
          activePeriod={activePeriod}
        />
      )}
      {isCompany && (
        <CompanyForm
          handleOnChange={handleOnChange}
          values={formData}
        />
      )}
      {formData.locationObj?.title && (
        <>
          <SemanticForm.Group>
            <Popup
              flowing
              on="click"
              position="left center"
              open={popupOpen}
              onClose={toggleDatePicker}
              onOpen={toggleDatePicker}
              header={
                <div className="left-aligned">
                  <Icon link name="close" onClick={toggleDatePicker} size="large" />
                </div>
              }
              trigger={
                <SemanticForm.Input
                  required
                  width={5}
                  label={translation('dates')}
                  icon="calendar outline"
                  id="dates"
                  value={dateValue}
                />
              }
              content={
                <>
                  {renderDatePicker('hide-mobile')}
                  {renderDatePicker('hide-fullscreen', true)}
                </>
              }
            />

            <SemanticForm.Select
              label={translation('arrivalTime')}
              width={4}
              compact
              required
              style={{
                pointerEvents: isCompany || notVilla ? 'auto' : 'none',
              }}
              placeholder="hh:mm"
              options={timeOptions()}
              value={formData.arrivalTime}
              id="arrivalTime"
              onChange={handleOnChange}
            />
            <SemanticForm.Select
              label={translation('departTime')}
              width={4}
              compact
              required
              placeholder="hh:mm"
              options={timeOptions()}
              value={formData.departTime}
              id="departTime"
              onChange={handleOnChange}
            />
            <SemanticForm.Input
              type="number"
              label={translation('personAmount')}
              width={3}
              min="1"
              required
              id="personAmount"
              value={formData.personAmount}
              onChange={handleOnChange}
            />
          </SemanticForm.Group>
          <SemanticForm.Input
            label={translation('budget')}
            width={8}
            id="budget"
            value={formData.budget}
            onChange={handleOnChange}
          />
        </>
      )}
    </>
  );
};

export default BasicDetails;

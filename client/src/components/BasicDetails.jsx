import React from 'react';
import {
  Form as SemanticForm,
  Popup,
  Header,
  Icon,
  Button,
  TextArea,
  Grid,
} from 'semantic-ui-react';
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
  handleOnRadioChange,
  handleCottageChange,
  activePeriod,
  setShowPrivateForm,
  showPrivateForm,
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

  const calendarType =
    showPrivateForm || formData.locationObj?.useWainolaCalendar ? 'wainola' : 'villa';

  const renderDatePicker = (className, compact) => (
    <DatePicker
      className={className}
      from={from}
      compact={compact}
      to={to}
      handleDayClick={handleDayClick}
      disabledDays={disabledDays[calendarType]}
      availableFrom16={availableFrom16[calendarType]}
      availableUntil12={availableUntil12[calendarType]}
      alwaysAvailable={
        isCompany &&
        !formData.locationObj?.useVillaCalendar &&
        !formData.locationObj?.useWainolaCalendar
      }
    />
  );
  const isCompany = formData.type === 'company';
  const isPrivate = formData.type === 'private';

  const dateValue = dateToStr(from, to);
  return (
    <>
      {isPrivate && (
        <Grid columns={4} centered stackable>
          <Grid.Column>
            <Button compact basic>
              <a
                href="https://nuuksiontaika.johku.com/fi_FI/vuokraa-mokki-sauna-nuotiopaikka/mokki-nuuksio"
                target="_blank"
                className="button-link"
              >
                {translation('villaParatiisiSelectionTitle')}
              </a>
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button compact basic active={showPrivateForm} onClick={() => setShowPrivateForm(true)}>
              {translation('wainolaSelectionTitle')}
            </Button>
          </Grid.Column>
        </Grid>
      )}
      {showPrivateForm && (
        <Header as="h3" dividing style={{ marginTop: 16 }}>
          {translation('wainolaTitle')}
        </Header>
      )}
      {isCompany && <CompanyForm handleOnChange={handleOnChange} values={formData} />}
      {(showPrivateForm || isCompany) && (
        <>
          {(formData.locationObj?.title || showPrivateForm) && (
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
                placeholder="hh:mm"
                options={timeOptions()}
                value={formData.departTime}
                id="departTime"
                onChange={handleOnChange}
              />
            </SemanticForm.Group>
          )}
          <SemanticForm.Group>
            <SemanticForm.Input
              type="number"
              label={translation('personAmount')}
              width={3}
              min="1"
              id="personAmount"
              value={formData.personAmount}
              onChange={handleOnChange}
            />
            <SemanticForm.Input
              label={translation('budget')}
              width={8}
              id="budget"
              value={formData.budget}
              onChange={handleOnChange}
            />
          </SemanticForm.Group>
        </>
      )}
      {showPrivateForm && (
        <PrivatePersonForm
          handleOnChange={handleOnChange}
          handleOnRadioChange={handleOnRadioChange}
          values={formData}
          handleCottageChange={handleCottageChange}
          activePeriod={activePeriod}
        />
      )}
      {(showPrivateForm || isCompany) && (
        <>
          <Header as="h3" dividing>
            {translation('moreInformationTitle')}
          </Header>
          <TextArea
            rows={2}
            value={formData.moreInformation}
            id="moreInformation"
            onChange={handleOnChange}
          />
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
            <SemanticForm.Input
              label={translation('address')}
              id="address"
              onChange={handleOnChange}
            />
          </SemanticForm.Group>
          <SemanticForm.Input
            width={8}
            label={translation('companyName')}
            id="companyName"
            onChange={handleOnChange}
          />
        </>
      )}
    </>
  );
};

export default BasicDetails;

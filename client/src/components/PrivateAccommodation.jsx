import 'moment/locale/fi';
import React from 'react';
import { Form, Grid, Input, Label, Message } from 'semantic-ui-react';
import { villaAcommodationTypes } from './Form';

const padded = {
  marginBottom: 8,
};

const showPrice = false;

const PrivateAccommodation = ({
  privatePersonAcommodationPrice,
  numOfNights,
  formData,
  handleOnChange,
  getObjectInList,
  activePeriod,
  showWeekendPrices,
}) => {
  const { objectValue } = useObjectMapper();

  const { onlyWeekend, alsoWeekend } = showWeekendPrices();
  const extraPersons = getObjectInList('extraPersons', 'cottage')[activePeriod];
  const facilitiesStr = '2 huonetta (2+4 hlöä)';
  const facilities = { summer: facilitiesStr, winter: facilitiesStr };
  const acommodationPrices = objectValue('acommodationPrices');
  const { cottagesAmount } = formData;
  const cottageInfo = () => {
    const choices = extraPersons.choices;
    return `${choices.length} huonetta, yht. 9 hlöä (${choices.join('+')} hlöä)`;
  };

  const handleOnCottageAmountChange = (e, minus) => {
    let cAmount = cottagesAmount;
    const maxAmount = extraPersons.choices.length;
    if (minus && cAmount) {
      cAmount -= 1;
    }
    if (!minus && cAmount < maxAmount) {
      cAmount += 1;
    }
    handleOnChange(e, { id: 'cottagesAmount', value: cAmount });
  };

  const PriceRow = (label, days, id, price, extraInfo, perNight) => (
    <Grid.Row>
      <Grid.Column width={13}>
        <Form.Checkbox label={`${days}: ${label}`} id={id} checked={formData[id]} onChange={handleOnChange} />
        <i>{extraInfo}</i>
      </Grid.Column>
      <Grid.Column width={2}>{/* {price} € {perNight && ' / vrk'} */}</Grid.Column>
    </Grid.Row>
  );

  const { villaPrice, cottagesPrices, acTitle, villaFirstNight, villaNextNights, cottageFirstNight, cottageNextNights } =
    privatePersonAcommodationPrice();

  return (
    <>
      {formData.locationType === 'villaParatiisi' && formData.from && (
        <Grid className="extra-persons private-acommodation">
          {((onlyWeekend && numOfNights === 1) || alsoWeekend) &&
            PriceRow(
              facilitiesStr,
              villaAcommodationTypes.villaParatiisiWeekend,
              'villaParatiisiWeekend',
              acommodationPrices.weekend['1'],
              `Sisältäen lisähuoneet pihamökeissä: ${cottageInfo()}`
            )}
          {((onlyWeekend && numOfNights > 1) || alsoWeekend) &&
            PriceRow(
              facilitiesStr,
              villaAcommodationTypes.villaParatiisiFullWeekend,
              'villaParatiisiFullWeekend',
              acommodationPrices.weekend['2'],
              `Sisältäen lisähuoneet pihamökeissä: ${cottageInfo()}`
            )}
          <Grid.Row style={{ marginTop: 20 }}></Grid.Row>
          {!onlyWeekend &&
            PriceRow(
              facilities[activePeriod],
              villaAcommodationTypes.villaParatiisi,
              'villaParatiisi',
              acommodationPrices[activePeriod]['1'],
              false,
              true
            )}
          {!onlyWeekend && (
            <Grid.Row>
              <Grid.Column width={14} style={{ maxWidth: '390px' }}>
                <b>Lisähuoneet pihamökeissä</b>
                <br />
                {cottageInfo()}
                <div className="cottage-selector">
                  <Input
                    labelPosition="right"
                    max={extraPersons.choices.length}
                    value={`${cottagesAmount} huonetta`}
                    placeholder="0 huonetta"
                    readOnly
                  >
                    <Label as="a" onClick={(e) => handleOnCottageAmountChange(e, true)}>
                      -
                    </Label>
                    <input />
                    <Label as="a" onClick={(e) => handleOnCottageAmountChange(e, false)}>
                      +
                    </Label>
                  </Input>
                </div>
              </Grid.Column>
              {/* <Grid.Column width={2}>{extraPersons['1']} € / huone</Grid.Column> */}
            </Grid.Row>
          )}
          {formData.villaParatiisi && showPrice && (
            <>
              <Grid.Row>
                <Grid.Column width={14}>
                  <b>{acTitle}</b>
                </Grid.Column>
                {/* <Grid.Column width={2}>{villaPrice + cottagesPrices} €</Grid.Column> */}
              </Grid.Row>
              {numOfNights > 1 || cottagesAmount ? (
                <>
                  <Grid.Row>
                    <div className="pricing-header">Huvila</div>
                  </Grid.Row>
                  <Grid.Row>
                    {villaFirstNight}
                    <br />
                    {villaNextNights}
                  </Grid.Row>
                  {cottagesAmount ? (
                    <>
                      <Grid.Row>
                        <div className="pricing-header">Lisähuoneet</div>
                      </Grid.Row>
                      <Grid.Row>
                        {cottageFirstNight}
                        <br />
                        {cottageNextNights}
                      </Grid.Row>
                    </>
                  ) : null}
                </>
              ) : null}
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default PrivateAccommodation;

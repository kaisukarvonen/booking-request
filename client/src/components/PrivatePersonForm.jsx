import React from 'react';
import { Header, Form, Button } from 'semantic-ui-react';
import LocationSelection from './LocationSelection';
import { useObjectMapper } from '../helper/useObjectMapper';

const PrivatePersonForm = ({ values, handleOnChange, handleOnRadioChange }) => {
  const { translation } = useObjectMapper();

  return (
    <div>
      <Header as="h4">{translation('visitTypeTitle')}</Header>
      <Form.Radio
        label={translation('birthday')}
        value="birthday"
        checked={values.visitType === 'birthday'}
        onChange={(e, data) => handleOnRadioChange(e, data, 'visitType')}
      />
      <Form.Radio
        label={translation('bachelor')}
        value="bachelor"
        checked={values.visitType === 'bachelor'}
        onChange={(e, data) => handleOnRadioChange(e, data, 'visitType')}
      />
      <Form.Radio
        label={translation('party')}
        value="party"
        checked={values.visitType === 'party'}
        onChange={(e, data) => handleOnRadioChange(e, data, 'visitType')}
      />
      <Form.Input
        width={8}
        label={translation('visitTypeString')}
        id="visitTypeString"
        value={values.visitTypeString}
        onChange={handleOnChange}
      />
      <LocationSelection
        handleOnChange={handleOnChange}
        values={values}
        visitType="privateAccommodations"
      />
    </div>
  );
};
export default PrivatePersonForm;

import React from 'react';
import { Form } from 'semantic-ui-react';
import { useObjectMapper } from '../helper/useObjectMapper';
import LocationSelection from './LocationSelection';

const CompanyForm = ({ values, handleOnChange }) => {
  const { translation } = useObjectMapper();

  return (
    <>
      <Form.Input
        width={8}
        label={translation('companyName')}
        id="companyName"
        value={values.companyName}
        onChange={handleOnChange}
      />
      <LocationSelection
        handleOnChange={handleOnChange}
        values={values}
        visitType="companyAccommodations"
      />
    </>
  );
};

export default CompanyForm;

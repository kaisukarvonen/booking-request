import React, { Fragment, useState } from 'react';
import { Header, Form, Icon, Accordion, Checkbox } from 'semantic-ui-react';
import { useObjectMapper } from '../helper/useObjectMapper';

const LocationSelection = ({ values, handleOnChange, visitType }) => {
  const [accordions, setAccordions] = useState([]);
  const { translation, objectValue } = useObjectMapper();

  const handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const indexInArray = accordions.findIndex((i) => i === index);
    const newArray = [...accordions];
    if (indexInArray !== -1) {
      newArray.splice(indexInArray, 1);
    } else {
      newArray.push(index);
    }
    setAccordions(newArray);
  };

  const onLocationSelectionChange = ({ optionValue, locationOption }, checked) => {
    const { options, ...locationObj } = locationOption;
    handleOnChange(undefined, {
      id: 'locationObj',
      value: checked ? { option: optionValue, ...locationObj } : undefined,
    });
  };

  return (
    <Fragment>
      <Header as="h3" dividing>
        {translation('accommodationTitle')}
      </Header>

      {objectValue(visitType)?.options?.map((locationOption, index) => (
        <Fragment key={locationOption.title}>
          {locationOption.options?.length ? (
            <Accordion key={locationOption.title}>
              <Accordion.Title
                active={accordions.includes(index)}
                index={index}
                onClick={handleAccordionClick}
              >
                <Header as="h4">
                  <Icon name="dropdown" />
                  {locationOption.title}
                </Header>
              </Accordion.Title>
              <Accordion.Content active={accordions.includes(index)}>
                {locationOption.options.map((optionValue, i) => (
                  <div key={optionValue}>
                    <Checkbox
                      label={optionValue}
                      id={`${locationOption.title}-${optionValue}`}
                      checked={
                        values.locationObj?.option === optionValue &&
                        values.locationObj?.title === locationOption.title
                      }
                      onChange={(e, data) =>
                        onLocationSelectionChange({ optionValue, locationOption }, data.checked)
                      }
                    />
                  </div>
                ))}
              </Accordion.Content>
            </Accordion>
          ) : (
            <div className="location-selection">
              <Checkbox
                label={locationOption.title}
                id={locationOption.title}
                checked={values.locationObj?.title === locationOption.title}
                onChange={(e, data) => onLocationSelectionChange({ locationOption }, data.checked)}
              />
            </div>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default LocationSelection;

import React, { useState } from 'react';
import { Header, Form, Icon, Grid, Accordion, Checkbox } from 'semantic-ui-react';
import { useObjectMapper } from '../helper/useObjectMapper';
import CustomAccordion from './CustomAccordion';

const Extras = ({ values, getObject, showInfo, handleOnChange }) => {
  const { translation } = useObjectMapper();

  const [accordions, setAccordions] = useState(Array.from(Array(10).keys()));

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

  const onActivitiesChange = (key, checked) => {
    const newArray = [...values.activities];
    if (!checked) {
      newArray.splice(newArray.indexOf(key), 1);
    } else {
      newArray.push(key);
    }
    handleOnChange(undefined, { id: 'activities', value: newArray });
  };

  return (
    <>
      <Header as="h3" dividing>
        {translation('servicesTitle')}
      </Header>

      {values.type === 'company' && (
        <CustomAccordion
          values={values}
          accordions={accordions}
          handleOnChange={handleOnChange}
          handleAccordionClick={handleAccordionClick}
          showInfo={showInfo}
          getObject={getObject}
          title="meetingEquipment"
          index={1}
        />
      )}

      <CustomAccordion
        values={values}
        accordions={accordions}
        handleOnChange={handleOnChange}
        handleAccordionClick={handleAccordionClick}
        showInfo={showInfo}
        getObject={getObject}
        title="foodOptions"
        index={2}
        extraInfo={translation('allergiesTitle')}
      />

      <Accordion>
        <Accordion.Title active={accordions.includes(3)} index={3} onClick={handleAccordionClick}>
          <Header as="h4">
            <Icon name="dropdown" />
            {translation('activities')}
          </Header>
        </Accordion.Title>
        <Accordion.Content active={accordions.includes(3)}>
          <Grid stackable>
            {getObject('activities').options.map((activitySet, i) => (
              <Grid.Column key={`activities-${i}`} width={4}>
                {[activitySet.title, ...activitySet.options].map((activity, innerIndex) => (
                  <Grid.Row key={`activities-${i}-${innerIndex}`}>
                    <Form.Field inline>
                      {!innerIndex ? (
                        <label className="activity">{activity}</label>
                      ) : (
                        <Checkbox
                          label={activity}
                          id={`activities-${i}-${innerIndex}`}
                          checked={values.activities.includes(activity)}
                          onChange={(e, data) => onActivitiesChange(activity, data.checked)}
                        />
                      )}
                    </Form.Field>
                  </Grid.Row>
                ))}
              </Grid.Column>
            ))}
          </Grid>
        </Accordion.Content>
      </Accordion>

      <CustomAccordion
        values={values}
        accordions={accordions}
        handleOnChange={handleOnChange}
        handleAccordionClick={handleAccordionClick}
        showInfo={showInfo}
        getObject={getObject}
        title="rentalEquipment"
        index={4}
      />
      <CustomAccordion
        values={values}
        accordions={accordions}
        handleOnChange={handleOnChange}
        handleAccordionClick={handleAccordionClick}
        showInfo={showInfo}
        getObject={getObject}
        title="extraServices"
        index={5}
      />
    </>
  );
};

export default Extras;

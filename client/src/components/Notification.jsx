import React, { useState } from 'react';
import { Modal, Icon, Transition } from 'semantic-ui-react';

const Notification = ({ hideNotification, notification }) => {
  const [visible, setVisibility] = useState(true);

  const errorMsg = 'Viestiäsi ei valitettavasti voitu lähettää, yritä myöhemmin uudelleen';
  return (
    <Transition visible={visible} unmountOnHide transitionOnMount onHide={hideNotification}>
      <Modal dimmer="inverted" size="small" open>
        <Modal.Content>
          <Icon link name="close" style={{ float: 'right' }} onClick={() => setVisibility(false)} />
          <p style={{ fontSize: '16px', textAlign: 'center' }}>
            {notification.success ? (
              <>
                <span>Kiitos, kun otit yhteyttä!</span>
                <br />
                <span>
                  Malta vielä tovi. Pyrimme aina vastaamaan vuorokauden sisällä maanantaista
                  perjantaihin. Saat sähköpostiin kopion laittamastasi tarjouspyynnöstä.
                </span>
                <br />
                <br />
                <span>Terveisin, Nuuksion Taika Tiimi</span>
              </>
            ) : (
              <>
                <Icon name="exclamation triangle" /> {errorMsg}
              </>
            )}
          </p>
        </Modal.Content>
      </Modal>
    </Transition>
  );
};

export default Notification;

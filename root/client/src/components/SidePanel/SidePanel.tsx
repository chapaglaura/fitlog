import { useState } from 'react';
import { Close, DoubleArrow } from '../Icons/Icons';
import styles from './SidePanel.module.scss';
import vars from '../../utils/_variables.module.scss';

export const SidePanel = () => {
  const [showPanel, setShowPanel] = useState(false);

  const handleTriggerClick = () => {
    setShowPanel((prevShowPanel) => !prevShowPanel);
  };

  return (
    <div className={`${styles.container} ${showPanel ? styles.show : ''}`}>
      <div>
        <button className={styles.close} onClick={handleTriggerClick}>
          <Close fill={vars.secondaryColor} size={24} />
        </button>
      </div>
      <button
        className={`${styles.trigger} ${showPanel ? styles['panel-open'] : ''}`}
        onClick={handleTriggerClick}
      >
        <DoubleArrow fill={vars.secondaryColor} size={24} />
      </button>
    </div>
  );
};

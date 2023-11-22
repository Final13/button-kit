import React, { MouseEventHandler } from 'react';

import styles from './DynamicButton.module.css';

const DynamicButton = ({
  buttonColor,
  loading,
  onClick,
  buttonText,
} : {
  buttonColor?: 'error' | 'success' | 'common' | undefined,
  loading?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined,
  buttonText?: string,
}) => {

  const buttonColorClass = buttonColor ? styles[buttonColor] : styles.common;
  const isLoading = loading || buttonColor === 'success' || buttonColor === 'error';

  return (
    <button
      className={`${styles.button} ${buttonColorClass} ${isLoading ? styles.loading : ''}`}
      onClick={onClick}
      type='submit'
      disabled={loading || buttonColor === 'success' || buttonColor === 'error'}
    >
      {buttonText? buttonText : (loading ? 'Loading...' : 'Submit')}
    </button>
  );
};

export default DynamicButton;

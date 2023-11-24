import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';

import styles from './DynamicButton.module.css';

import type { MouseEventHandler } from 'react';

interface buttonProps {
  variant?: 'error' | 'success' | 'common' | undefined;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  buttonText?: string;
  fullWidth?: boolean;
  size?: string;
  children?: React.ReactNode;
  type?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  rest?: object;
}

const DynamicButton: React.FC<buttonProps> = ({
  variant,
  loading,
  onClick,
  buttonText,
  fullWidth,
  size,
  children,
  type = 'button',
  iconLeft,
  iconRight,
  ...rest
}) => {
  const [innerVariant, setVariant] = useState<string>('common');
  const [innerText, setText] = useState<string | undefined>(undefined);
  const [innerLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setVariant(variant as string);
  }, [variant]);
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      event.preventDefault();
      try {
        setLoading(true);
        await onClick?.(event);
        setVariant('success');
        setText('Success');
        setTimeout(() => {
          setVariant('common');
          setText(undefined);
        }, 1000);
      } catch (error) {
        console.error(error);
        setVariant('error');
        setText('Error');
        setTimeout(() => {
          setVariant('common');
          setText(undefined);
        }, 1000);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles.success]: variant === 'success' || innerVariant === 'success',
          [styles.error]: variant === 'error' || innerVariant === 'error',
          [styles.common]: variant === 'common' || innerVariant === 'common',
          [styles.loading]: loading || innerLoading,
        },
        !['success', 'error'].includes(variant as string) &&
          !['success', 'error'].includes(innerVariant as string) &&
          styles.common,
        fullWidth && styles.width100,
        ['small', 'medium', 'large'].includes(size as string)
          ? styles[size as string]
          : styles.medium,
      )}
      onClick={handleClick}
      type={type as 'submit' | 'button' | 'reset'}
      disabled={loading || innerLoading}
      {...rest}
    >
      {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      <div>{children || innerText || (loading || innerLoading ? 'Loading...' : 'Submit')}</div>
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
};

export default DynamicButton;

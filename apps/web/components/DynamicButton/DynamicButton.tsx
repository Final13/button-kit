import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';

import styles from './DynamicButton.module.css';

import type { MouseEventHandler } from 'react';

interface buttonProps {
  variant?: 'error' | 'success' | 'common';
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  rest?: object;
}

const DynamicButton: React.FC<buttonProps> = ({
  variant,
  loading,
  onClick,
  fullWidth,
  size,
  children,
  type = 'button',
  iconLeft,
  iconRight,
  ...rest
}) => {
  const [innerVariant, setVariant] = useState<buttonProps['variant']>('common');
  const [innerText, setText] = useState<string | undefined>(undefined);
  const [innerLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setVariant(variant as buttonProps['variant']);
  }, [variant]);
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      event.preventDefault();
      try {
        setLoading(true);
        setText('Loading...');
        const res = await onClick?.(event);
        if ((res as unknown as { status?: number })?.status === 500) {
          setVariant('error');
          setText('Error');
        } else {
          setVariant('success');
          setText('Success');
        }
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
        !['success', 'error'].includes((variant as buttonProps['variant']) || '') &&
          !['success', 'error'].includes((innerVariant as buttonProps['variant']) || '') &&
          styles.common,
        fullWidth && styles.width100,
        ['small', 'medium', 'large'].includes((size as buttonProps['size']) || '')
          ? styles[(size as buttonProps['size']) || '']
          : styles.medium,
      )}
      onClick={handleClick}
      type={type as buttonProps['type']}
      disabled={loading || innerLoading}
      {...rest}
    >
      {innerText && <div className={styles.overlay}>{innerText}</div>}
      {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      <div className={innerText && styles.transparent}>{children || 'Submit'}</div>
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  );
};

export default DynamicButton;

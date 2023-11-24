import React, { useState } from 'react';
import clsx from 'clsx';

import DynamicButton from '@/components/DynamicButton';

import styles from './CustomForm.module.css';

import { apiUrl } from '@/config/config';

const CustomForm = () => {
  const [response, setResponse] = useState<{
    status?: number | undefined;
    error?: { message?: string };
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [variant, setVariant] = useState<string>('common');
  const [text, setText] = useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/api/getData`, {
        method: 'POST',
        body: inputValue,
      });

      const data = await response?.json();
      setResponse(data);

      setVariant(response?.status === 200 ? 'success' : 'error');
      setText(response?.status === 200 ? 'Success' : 'Error');
      setTimeout(() => {
        setVariant('common');
        setText(undefined);
      }, 1000);
    } catch (error) {
      console.error(error);
      setResponse({ status: 500, error: { message: 'Internal Server Error' } });
      setTimeout(() => {
        setVariant('common');
        setText(undefined);
      }, 1000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form}>
      <input
        type="text"
        className={clsx(styles.input, {
          [styles.loading]: loading,
          [styles.success]: response?.status === 200,
          [styles.error]: response?.status === 500,
          [styles.common]: ![500, 200].includes(response?.status as number),
        })}
        placeholder="Enter text"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <DynamicButton
        variant={variant as 'error' | 'common' | 'success' | undefined}
        loading={loading}
        fullWidth
        onClick={handleSubmit}
        type="submit"
        size="medium"
      >
        {text}
      </DynamicButton>
      <DynamicButton
        fullWidth
        size="medium"
        onClick={async () => {
          await new Promise((resolve, reject) => {
            const isSuccess = Math.random() < 0.5;
            if (isSuccess) {
              setTimeout(resolve, 1000);
            } else {
              setTimeout(reject, 1000);
            }
          });
          console.log('Ok');
        }}
      />
      {response?.error?.message ? (
        <div className={styles.errorMsg}>{response.error.message}</div>
      ) : (
        ''
      )}
    </form>
  );
};

export default CustomForm;

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
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  async function handleSubmit(
    // eslint-disable-next-line max-len
    event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/api/getData`, {
        method: 'POST',
        body: inputValue,
      });

      const data = await response?.json();
      setResponse(data);
      return response;
    } catch (error) {
      console.error(error);
      setResponse({ status: 500, error: { message: 'Internal Server Error' } });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      <DynamicButton type="submit" size="medium">
        Submit with form onSubmit
      </DynamicButton>
      <DynamicButton onClick={handleSubmit} size="medium">
        Submit by onClick
      </DynamicButton>
      <DynamicButton
        size="medium"
        onClick={async () => {
          await new Promise((resolve, reject) => {
            const isSuccess = Math.random() < 0.5;
            if (isSuccess) {
              setTimeout(() => resolve({ status: 200 }), 1000);
            } else {
              setTimeout(() => reject({ status: 500 }), 1000);
            }
          });
          console.log('Ok');
        }}
      >
        Action
      </DynamicButton>
      <DynamicButton size="medium">Simple button</DynamicButton>
      <DynamicButton size="medium" variant="success">
        Simple success button
      </DynamicButton>
      <DynamicButton size="medium" variant="error">
        Simple error button
      </DynamicButton>
      {response?.error?.message ? (
        <div className={styles.errorMsg}>{response.error.message}</div>
      ) : (
        ''
      )}
    </form>
  );
};

export default CustomForm;

import { FormEvent, useEffect, useState } from 'react';

import { apiUrl } from '@/config/config';
import DynamicButton from '@/components/DynamicButton';
import getColor from '@/utils/getColor';
import styles from './CustomForm.module.css'

const CustomForm = () => {
  const [serverResponse, setServerResponse] = useState<{ status?: number | undefined; error?: { message?: string } }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [color, setColor] = useState<string>(getColor(0, true));
  const [text, setText] = useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/api/getData`, {
        method: 'POST',
        body: inputValue,
      })

      const data = await response?.json();
      setServerResponse(data);

      setColor(getColor(response?.status, true));
      setText(response?.status === 200 ? 'Success' : 'Error');
      setTimeout(() => {
        setColor(getColor(0, true));
        setText(undefined);
      }, 1000);
    } catch (error) {
      console.error(error);
      setServerResponse({status: 500, error: { message: 'Internal Server Error' }});
    } finally {
      setLoading(false);
    }
  }
  let inputClasses = `${styles.input}`;
  if (loading) inputClasses += ` ${styles.loading}`;
  if (serverResponse?.status === 200) inputClasses += ` ${styles.success}`;
  if (serverResponse?.status === 500) inputClasses += ` ${styles.error}`;
  if (serverResponse?.status !== 500 && serverResponse?.status !== 200) inputClasses += ` ${styles.common}`;
  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <input
        type="text"
        className={inputClasses}
        placeholder="Enter text"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <DynamicButton
        buttonColor={color as 'error' | 'common' | 'success' | undefined}
        loading={loading}
        buttonText={text}
      />
      {serverResponse?.error?.message && (
        <div className={styles.errorMessage}>{serverResponse.error.message}</div>
      )}
    </form>
  )
}

export default CustomForm;

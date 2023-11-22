import { useState } from 'react';

import { apiUrl } from '@/config/config';
import DynamicButton from '@/components/DynamicButton';

const getColor = (status: number) => {
  if (status === 200) {
    return 'green';
  } else if (status >= 400) {
    return 'red';
  } else {
    return '#ccc';
  }
};

const CustomForm = () => {
  const [serverResponse, setServerResponse] = useState<any>(null);

  async function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/getData`, {
        method: 'POST',
      })

      const data = await response.json();
      setServerResponse(data);
    } catch (error) {
      console.error(error);
      setServerResponse({status: 500, error: {message: 'Internal Server Error'}});
    }
  }
  return (
    <form
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 50,
        position: 'relative',
        borderRadius: '12px !important'
      }}
    >
      <input
        type="text"
        style={{
          padding: '10px',
          marginRight: '10px',
          borderRadius: '5px',
          border: `2px solid ${getColor(serverResponse?.status)}`,
          fontSize: '16px',
        }}
        placeholder="Enter text"
      />
      <DynamicButton serverResponse={serverResponse} onSubmit={handleSubmit} />
      {serverResponse?.error?.message && (
        <div style={{ position: 'absolute', bottom: 20, left: 'auto', color: 'red'}}>{serverResponse.error.message}</div>
      )}
    </form>
  )
}

export default CustomForm;

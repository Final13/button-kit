import React, { useState, useEffect } from 'react';

const DynamicButton = ({ serverResponse, onSubmit }: { serverResponse: { status: number}, onSubmit: Function }) => {
  const [loading, setLoading] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({});
console.log({serverResponse})
  useEffect(() => {
    if (serverResponse?.status === 200) {
      setButtonStyle({ backgroundColor: 'green' });
    } else if (serverResponse?.status >= 400) {
      setButtonStyle({ backgroundColor: 'red' });
    } else {
      setButtonStyle({});
    }
  }, [serverResponse]);

  const handleClick = async (event: any) => {
    try {
      setLoading(true);
      await onSubmit(event);
    } catch (error) {
      console.error('Form submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      style={{
        ...buttonStyle,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #007BFF',
        background: '#007BFF',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100px',
      }}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Submit'}
    </button>
  );
};

export default DynamicButton;

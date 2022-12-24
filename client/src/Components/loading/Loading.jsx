import React from 'react';

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        zIndex: 100,
        width: '100%',
        height: '100vh',
        top: 0,
        right: 0,
        background:
          'linear-gradient(100deg, rgb(0 0 0 / 93%), rgb(0 0 0 / 82%))',
        position: 'fixed',
        color: 'white',
      }}
    >
      <div
        className="spinner-border mx-auto"
        role="status"
        style={{ width: '100px', height: '100px' }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;

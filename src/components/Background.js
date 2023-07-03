import React from 'react';
import backgroundImage from '../assets/img/bg.jpg';

function Background() {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '15vh',
  };

  return (
    <div style={styles} >
      <h1 style={{color:'white'}}>Logo</h1>
    
    </div>
  );
}

export default Background;
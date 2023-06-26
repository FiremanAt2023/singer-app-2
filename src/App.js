import React from 'react';
import Background from './component/Background';
import Navbar from './page';

export default function MyApp() {
  return (
    <div style={{height:'100vh'}}>
      <Background />
      <Navbar />
    </div>
  );
}
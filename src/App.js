import React from 'react';
import Background from './components/Background';
import Navbar from './page';

export default function MyApp() {
  return (
    <div style={{height:'100vh'}}>
      <Background />
      <Navbar />
    </div>
  );
}
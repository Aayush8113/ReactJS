import React from 'react';
import Card1 from './components/Card1.jsx';
import Card3 from './components/Card3.jsx';
import Card2 from './components/Card2.jsx';
import Card4 from './components/Card4.jsx';
import Card5 from './components/Card5.jsx';
import Card6 from './components/Card6.jsx';
import Card7 from './components/Card7.jsx';
import Card8 from './components/Card8.jsx';
import Card9 from './components/Card9.jsx';
import Card10 from './components/Card10.jsx';

function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
      <Card8 />
      <Card9 />
      <Card10 />
    </div>
  );
}

export default App;

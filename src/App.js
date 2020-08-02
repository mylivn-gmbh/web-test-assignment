import React from 'react';
import HomePage from './components/HomePage';
import RSSFeedProvider from './providers/RSSFeedProvider';
import RSSNotification from './components/RSSNotification';

function App() {
  return (
    <RSSFeedProvider>
      <HomePage />
      <RSSNotification />
    </RSSFeedProvider>
  );
}

export default App;

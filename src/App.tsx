import React from 'react';

// Components
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Footer />
    </div>
  );
}

export default App;

import { useContext } from 'react';
import './App.css';

import MyContext from './context/MyContext';
import Weather from './components/Weather';
import DropDowns from './components/DropDowns';

const App = () => {
  const context = useContext(MyContext);
  const { citySelect } = context;

  return (
    <main>
      <DropDowns />
      {citySelect && <Weather />}
    </main>
  );
};

export default App;

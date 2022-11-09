import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header/>
      <main>
        <div className='container'>
          <Outlet/>
        </div>
      </main>
      <footer className="footer">
        <div className='container'>
          <p>Coperight © 2022</p>
        </div>
      </footer>
    </>
  );
}

export default App;

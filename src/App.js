import logo from './assets/logo.png';
import feature from './assets/feature.jpg'
import './App.css';
import Button from './components/button';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="" alt="logo" />
        <img src={feature} className="" alt="logo" />

        <Button className="primary">View Menu</Button>
        <Button className="secondary">Book Seating</Button>
        <Button className="primary">About Us</Button>

      </header>
    </div>
  );
}

export default App;

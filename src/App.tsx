import DropDownImages from "./features/welcome/DropDownImages "
import itImage from './assets/images/it.png';
import './App.css'

function App() {
 
  return (
    <div
       style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1, 
        backgroundImage: `url(${itImage})`  }}>
        <DropDownImages/>
    </div>
  )
}

export default App

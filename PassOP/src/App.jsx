
import './App.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Middle from '../components/Middle'
function App() {
  

  return (
    <>
    
      <div className='main'>
        <div className="container">
          <Navbar/>
          <Middle/>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default App

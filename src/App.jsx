
import Header from './Header.jsx'
import Card from './Card.jsx'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Create from './CreateRequest.jsx'
import Landingpage from './landingpage.jsx'
import Login from './Login.jsx'
import Signup1 from './Signup1.jsx'

import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <>
  <Router>

             <Switch> 
              <Route exact path='/'>
                   <Landingpage/>
              </Route>

               <Route exact path="/CreateRequest">
                   <Header />
                   <Create/>
               </Route>

              <Route exact path="/Card">
                  <Header />
                  <Card/>
           
              </Route>
              
              <Route exact path='/Login'>
                  <Login/>
              </Route>

              <Route exact path='/Signup1'>
                  <Signup1/>
                  <ToastContainer/>
              </Route>

            


            </Switch>
  </Router>
    </>
  )
}

export default App

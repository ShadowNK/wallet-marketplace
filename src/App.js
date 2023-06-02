import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Category from './pages/Category'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
import Contact from './pages/Contact'
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Market from "./pages/Market";
import Transaction from "./pages/Transaction";
import Reconocimiento from "./pages/Reconocimiento";
import CreateTransaction from "./pages/CreateTransaction";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/market' element={<Market />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/home' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
          <Route path='/transaction' element={<CreateTransaction />}/>
          <Route
            path='/transaction/:id'
            element={<Transaction />}
          />
          <Route
            path='/recognition/:id'
            element={<Reconocimiento />}
          />
          <Route path='/contact/:landlordId' element={<Contact />} />
        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  )
}

export default App

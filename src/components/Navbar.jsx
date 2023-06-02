import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon } from '../assets/svg/market.svg'
import { ReactComponent as ExploreIcon } from '../assets/svg/wallet.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'
import {useAuthStatus} from "../hooks/useAuthStatus";

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStatus()

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }

  if (user.loggedIn) {
    return (
        <footer className='navbar'>
          <nav className='navbarNav'>
            <ul className='navbarListItems'>
              <li className='navbarListItem' onClick={() => navigate('/wallet')}>
                <ExploreIcon
                    fill={pathMatchRoute('/wallet') ? '#2c2c2c' : '#8f8f8f'}
                    width='36px'
                    height='36px'
                />
                <p
                    className={
                      pathMatchRoute('/wallet')
                          ? 'navbarListItemNameActive'
                          : 'navbarListItemName'
                    }
                >
                  Billetera
                </p>
              </li>
              <li className='navbarListItem' onClick={() => navigate('/market')}>
                <OfferIcon
                    fill={pathMatchRoute('/market') ? '#2c2c2c' : '#8f8f8f'}
                    width='36px'
                    height='36px'
                />
                <p
                    className={
                      pathMatchRoute('/market')
                          ? 'navbarListItemNameActive'
                          : 'navbarListItemName'
                    }
                >
                  Market
                </p>
              </li>
              <li className='navbarListItem' onClick={() => navigate('/profile')}>
                <PersonOutlineIcon
                    fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
                    width='36px'
                    height='36px'
                />
                <p
                    className={
                      pathMatchRoute('/profile')
                          ? 'navbarListItemNameActive'
                          : 'navbarListItemName'
                    }
                >
                  Perfil
                </p>
              </li>
            </ul>
          </nav>
        </footer>
    )
  } else {
    return (<footer />)
  }
}

export default Navbar

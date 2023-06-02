import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import {
  getFirestore, doc, getDoc,
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const auth = getAuth()
  const [formData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [balance, setBalance] = useState(null)

  const { name, email } = formData

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserListings = async () => {
      const database = getFirestore();
      const docRefUser = doc(database, "users", auth.currentUser.uid);
      const docSnapUser = await getDoc(docRefUser);

      if (docSnapUser.exists()) {
        setFirebaseUser(docSnapUser.data())
      }
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

  useEffect(() => {
    const fetchUserWallet = async () => {
      const database = getFirestore();
      const docRefWallet = doc(database, "wallets", firebaseUser.walletId);
      const docSnapWallet = await getDoc(docRefWallet);

      if (docSnapWallet.exists()) {
        setBalance(docSnapWallet.data().balance)
      }
    }

    fetchUserWallet()
  }, [firebaseUser])



  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>Mi perfil</p>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Informacion Personal</p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={'profileName'}
              value={name}
            />
            <input
              type='email'
              id='email'
              className={'profileEmail'}
              value={email}
            />
          </form>
        </div>

        <div>
          <h3>Saldo billetera principal</h3>
          <p>KC {balance}</p>
        </div>

        <div>
          <button type='button' className='logOut' onClick={onLogout}>
            Cerrar Sessión
          </button>
        </div>

      </main>

    </div>
  )
}

export default Profile

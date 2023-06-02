import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp, addDoc, collection} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        const initialWallet = {balance: 0};
        const docRefWallet = await addDoc(collection(db, 'wallets'), initialWallet);
        const docRefFoundWallet = await addDoc(collection(db, 'wallets'), initialWallet);
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
          walletId: docRefWallet.id,
          foundWalletId: docRefFoundWallet.id
        })
      }
      navigate('/wallet')
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }

  return (
    <div className='socialLogin'>
      <p>Iniciar sesion con</p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt='google' />
      </button>
    </div>
  )
}

export default OAuth

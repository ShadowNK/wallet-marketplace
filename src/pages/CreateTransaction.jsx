import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function CreateTransaction() {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fromWalletId: "",
    toWalletId: "",
    amount: 0,
    date: "",
    status: "Pendiente",
    reason: ""
  })

  const {
    toWalletId,
    amount,
    reason
  } = formData

  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate('/sign-in')
        }
      })
    }

    return () => {
      isMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const formDataCopy = {
      ...formData,
      date: serverTimestamp(),
    }

    formDataCopy.fromWalletId = "user.walletId"
    formDataCopy.toWalletId = "mail.walletId"
    formDataCopy.amount = amount
    formDataCopy.reason = reason
    formDataCopy.status= "Aprobada"

    const docRef = await addDoc(collection(db, 'transactions'), formDataCopy)
    setLoading(false)
    toast.success('Transacción exitosa')
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  const onMutate = (e) => {
    let boolean = null

    if (e.target.value === 'true') {
      boolean = true
    }
    if (e.target.value === 'false') {
      boolean = false
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Nueva transaccion</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label className='formLabel'>Para:</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={toWalletId}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />

          <label className='formLabel'>Valor:</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={amount}
              onChange={onMutate}
              min='0'
              max='10000'
              required
            />
          </div>

          <label className='formLabel'>Motivo:</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={reason}
            onChange={onMutate}
            required
          />

          <button type='submit' className='primaryButton createListingButton'>
            Transferir
          </button>
        </form>
      </main>
    </div>
  )
}

export default CreateTransaction

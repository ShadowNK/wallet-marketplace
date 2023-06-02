import { useState, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
  const [landlord, setLandlord] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  const onAcceptOrder = () => {
    navigate('/market')
  }

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLandlord(docSnap.data())
      } else {
        toast.error('Could not get landlord data')
      }
    }

    getLandlord()
  }, [params.landlordId])

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Pedido realizado correctamente</p>
      </header>

      {landlord !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'>Una vez confirmado el stock de su pedido podra retirarlo.</p>
          </div>
          <button type='button' className='primaryButton' onClick={onAcceptOrder}>
            Listo
          </button>
        </main>
      )}
    </div>
  )
}

export default Contact

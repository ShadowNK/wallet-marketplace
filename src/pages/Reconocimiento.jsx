import { useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'

function Reconocimiento() {

  const params = useParams()
  const navigate = useNavigate()

  const onAcceptOrder = () => {
    navigate('/wallet')
  }

  useEffect(() => {
    const getLandlord = async () => {
    }

    getLandlord()
  }, [params.landlordId])

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Reconocimiento numero 12</p>
      </header>
        <main>
          <div className='contactLandlord' >
            <div className='landlordName'>Mensaje: Gracias por tu buen desempeño</div>
          </div>
          <div className='contactLandlord' >
            <div className='landlordName'>Motivo: Gracias por tu ayuda</div>
          </div>
          <div className='contactLandlord' >
            <div className='landlordName'>Fecha: 02-06-2023</div>
          </div>
          <button type='button' className='primaryButton' onClick={onAcceptOrder}>
            Listo
          </button>
        </main>
    </div>
  )
}

export default Reconocimiento

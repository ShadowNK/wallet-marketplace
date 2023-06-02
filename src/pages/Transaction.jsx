import { useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'

function Contact() {

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
        <p className='pageHeader'>Transacción numero 32</p>
      </header>
        <main>
          <div className='contactLandlord' >
            <div className='landlordName'>Emisor: Usuario1</div>
          </div>
          <div className='contactLandlord' >
            <div className='landlordName'>Receptor: Usuario2</div>
          </div>
          <div className='contactLandlord' >
            <div className='landlordName'>Motivo: Gracias por tu ayuda</div>
          </div>
          <div className='contactLandlord' >
            <div className='landlordName'>Valor: KC 30</div>
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

export default Contact

import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/swiper-bundle.css'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return <Spinner />
  }

  return (
    <main>
      <Helmet>
        <title>{listing.name}</title>
      </Helmet>
      <div className='listingDetails'>
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className='categoryListingImg'
        />
        <p className='listingName'>
          {listing.name} - KC
          {" "+listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>Producto con el logo de kushki</p>

        <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Comprar
         </Link>
      </div>
    </main>
  )
}

export default Listing

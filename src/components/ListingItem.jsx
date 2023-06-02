import { Link } from 'react-router-dom'

function ListingItem({ listing, id }) {
  return (
    <li className='categoryListing'>
      <Link
        to={`/category/${listing.type}/${id}`}
        className='categoryListingLink'
      >
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className='categoryListingImg'
        />
        <div className='categoryListingDetails'>
          <p className='categoryListingName'>{listing.name}</p>
          <p>Producto con el logo de kushki</p>

          <p className='categoryListingPrice'>
            KC
            {" "+listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default ListingItem

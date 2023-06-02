import OAuth from '../components/OAuth'

function Home() {

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Bienvenido a KushkiRewards</p>
        </header>

        <OAuth />
      </div>
    </>
  )
}

export default Home

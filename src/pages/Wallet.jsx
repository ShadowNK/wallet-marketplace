import {useNavigate} from 'react-router-dom'
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";

function Wallet() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [balance, setBalance] = useState(null)
  const [founds, setFounds] = useState(null)

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

  useEffect(() => {
    const fetchFoundsWallet = async () => {
      const database = getFirestore();
      const docRefWallet = doc(database, "wallets", firebaseUser.foundWalletId);
      const docSnapWallet = await getDoc(docRefWallet);

      if (docSnapWallet.exists()) {
        setFounds(docSnapWallet.data().balance)
      }
    }

    fetchFoundsWallet()
  }, [firebaseUser])

  const onCreateTransaction = () => {
    navigate('/transaction')
  }
  const onCreateRecognition = () => {
    navigate('/recognition')
  }
  const onGoTransaction = (id) => {
    navigate(`/transaction/${id}`)
  }
  const onGoRecognition = (id) => {
    navigate(`/recognition/${id}`)
  }
  const transacciones = [
    { id: 0, from: 'Usuario1', to: 'Usuario2', date: '2023-05-01', value: 100 },
    { id: 1, from: 'Usuario2', to: 'Usuario3', date: '2023-05-02', value: 50 },
    { id: 2, from: 'Usuario3', to: 'Usuario1', date: '2023-05-03', value: 75 },
  ];
  const reconocimientos = [
    { id: 0, from: 'Usuario1', reason: 'Motivo1', date: '2023-05-01' },
    { id: 1, from: 'Usuario2', reason: 'Motivo2', date: '2023-05-02' },
    { id: 2, from: 'Usuario3', reason: 'Motivo3', date: '2023-05-03' },
  ];
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Billetera</p>
      </header>

      <main>
        <p className='exploreCategoryHeading'>Transacciones</p>
        <div className='exploreCategories'>
            <div className='profileCard'>
              <div>
                <p>Billetera personal</p>
                <p>KC {balance}</p>
              </div>
                <div>
                    <button type='button' className='logOut' onClick={onCreateTransaction}>
                        Nueva transaccion
                    </button>
                </div>
            </div>
            <div className='profileCard'>
              <div>
                <p>Billetera de fondos</p>
                <p>KC {founds}</p>
              </div>
                <div>
                    <button type='button' className='logOut' onClick={onCreateRecognition}>
                        Nuevo reconocimiento
                    </button>
                </div>
            </div>

        </div>
        <h1>Historial de transacciones</h1>
        <table className='table'>
          <thead>
            <tr>
              <th className='th'>Emisor</th>
              <th className='th'>Receptor</th>
              <th className='th'>Fecha</th>
              <th className='th'>Valor</th>
            </tr>
          </thead>
          <tbody>
          {transacciones.map(item => {
            return (
              <tr key={item.id} onClick={() => onGoTransaction(item.id)}>
                <td>{ item.from }</td>
                <td>{ item.to }</td>
                <td>{ item.value }</td>
                <td>{ item.date }</td>
              </tr>
            );
          })}
          </tbody>
        </table>
        <h1>Historial de recompensas</h1>
        <table className='table'>
          <thead>
            <tr>
              <th className='th'>Emisor</th>
              <th className='th'>Motivo</th>
              <th className='th'>Fecha</th>
            </tr>
          </thead>
          <tbody>
          {reconocimientos.map(item => {
            return (
              <tr key={item.id} onClick={() => onGoRecognition(item.id)}>
                <td>{ item.from }</td>
                <td>{ item.reason }</td>
                <td>{ item.date }</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default Wallet

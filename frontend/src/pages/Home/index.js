import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import TableSuppliers from "../../compontents/TableSuppliers";
import Title from "../../assets/Title";
import logoutIcon from '../../assets/iconLogout.svg'
import './styles.css';

function Home() {
  const [inputDemand, setInputDemand] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [demandSuppliers, setDemandSuppliers] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  function goTo(path) {
    navigate(path);
  }

  useEffect(() => {
    getSuppliers();
  }, [])

  useEffect(() => {
    if (!search) return;
    setDemandSuppliers(suppliers.filter(supplier => supplier.limite_minimo_kwh >= searchValue));
  }, [search, searchValue])

  async function getSuppliers() {
    try {
      const response = await fetch('http://localhost:3333/fornecedores', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.log(error);
    }
  }

  function searchSuppliers(event) {
    event.preventDefault();
    setSearch(true);
    setSearchValue(inputDemand);
    console.log(inputDemand)
  }

  return (
    <>
      <header>
        <h1>Clarke Energia Marketplace</h1>
        <img
          className="logout-button"
          onClick={() => logout(() => goTo('/'))}
          src={logoutIcon}
          alt="logout button" />
      </header>

      <div className="home">
        <form onSubmit={searchSuppliers} className="input-container">
          <label htmlFor="demand-value"><Title>Informe sua demanda:</Title></label>
          <input
            type="number"
            name="demand-value"
            value={inputDemand}
            onChange={(e) => setInputDemand(e.target.value)}
          />
          <button>Pesquisar</button>
        </form>
        <div className="table-suppliers">
          <TableSuppliers title={"disponíveis"} suppliers={suppliers} />
        </div>
        <div className="table-suppliers">
          <TableSuppliers title={"compatíveis com a demanda"} suppliers={demandSuppliers} />
        </div>
      </div>
    </>


  )
}

export default Home;
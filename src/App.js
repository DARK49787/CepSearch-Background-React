import React, { useState } from 'react';
import './App.css';
import backgroundVideo from './assents/64813510851151small.mp4';

function App() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const buscarCep = async () => {
    if (cep.length !== 8 || isNaN(cep)) {
      setErro(true);
      setDados(null);
      return;
    }

    setCarregando(true);
    setErro(false);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setDados(null);
        setErro(true);
      } else {
        setDados(data);
      }
    } catch (error) {
      setErro(true);
      setDados(null);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="app-container">
      <video className="background-video" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Seu navegador não suporta vídeo.
      </video>

      <div className="content">
        <h1>Buscador de CEP</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder="Digite o CEP (somente números)"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button onClick={buscarCep}>Buscar</button>
        </div>
        {erro && !carregando && <p className="error">Cep errado, ou invalido</p>}
        {dados && !carregando && (
          <div className="result">
            <p><strong>Rua:</strong> {dados.logradouro}</p>
            <p><strong>Bairro:</strong> {dados.bairro}</p>
            <p><strong>Cidade:</strong> {dados.localidade}</p>
            <p><strong>Estado:</strong> {dados.uf}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

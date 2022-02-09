CREATE DATABASE clarke_marketplace;

CREATE TABLE IF NOT EXISTS usuarios (
  ID SERIAL PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fornecedores (
  ID SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  logo TEXT NOT NULL,
  estado_origem VARCHAR(30) NOT NULL,
  custo_kwh INTEGER NOT NULL,
  limite_minimo_kwh INTEGER NOT NULL,
  total_clientes INTEGER NOT NULL,
  avaliacao_media_clientes INTEGER NOT NULL
);
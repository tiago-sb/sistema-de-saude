from pydantic import BaseModel
from typing import Optional


class PostoDeSaudeCadastro(BaseModel):
    usuario_id: int
    cnpj: str
    bairro: str
    cidade: str
    estado: str
    cep: str
    pais: str



class CadastrarVacina(BaseModel):
    usuario_id: int
    nome_vacina: str
    data_aplicacao: str
    dose: str
    unidade_saude: str


class CriarCampanha(BaseModel):
    titulo: str
    descricao: str
    data_inicio: str
    data_fim: str
    owner_id: int
    publico_alvo: Optional[str] = None

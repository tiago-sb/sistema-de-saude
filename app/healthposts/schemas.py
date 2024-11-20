from pydantic import BaseModel


class PostoDeSaudeCadastro(BaseModel):
    usuario_id: int
    cnpj: str
    bairro: str
    cidade: str
    estado: str
    cep: str
    pais: str

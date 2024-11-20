from pydantic import BaseModel


class PacienteCadastro(BaseModel):
    usuario_id: int
    cpf: str
    numero_cartao_sus: str
    data_nascimento: str
    tipo_sanguineo: str
    altura: float
    peso: float

from pydantic import BaseModel


class CriarNotificacao(BaseModel):
    usuario_id: int
    titulo: str
    mensagem: str

from pydantic import BaseModel


class UsuarioGeralCadastro(BaseModel):
    nome_completo: str
    email: str
    senha: str
    telefone: str
    tipo_usuario: str


class Login(BaseModel):
    email: str
    senha: str
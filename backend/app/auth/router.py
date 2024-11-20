from fastapi import APIRouter, HTTPException, status
from app.database import get_db_connection
from bcrypt import hashpw, gensalt, checkpw
from app.auth.schemas import UsuarioGeralCadastro


router = APIRouter(tags=["auth"])


@router.post("/usuarios", status_code=status.HTTP_200_OK)
async def criar_usuario(body: UsuarioGeralCadastro):
    if body.tipo_usuario.capitalize() not in ["Paciente", "PostoDeSaude"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Tipo de usuário inválido"
        )

    conn = get_db_connection()
    cursor = conn.cursor()

    # Hash da senha
    senha_hash = hashpw(body.senha.encode("utf-8"), gensalt()).decode("utf-8")

    try:
        cursor.execute(
            """
            INSERT INTO usuarios (nome_completo, email, senha_hash, telefone, tipo_usuario)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                body.nome_completo,
                body.email,
                senha_hash,
                body.telefone,
                body.tipo_usuario.capitalize(),
            ),
        )
        user_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao criar usuário: {str(e)}") from e
    finally:
        cursor.close()
        conn.close()

    return {"id": user_id, "message": "Usuário criado com sucesso"}


@router.post("/login")
def login(email: str, senha: str):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT id, senha_hash FROM usuarios WHERE email = %s;
            """,
            (email,),
        )
        usuario = cursor.fetchone()

        if not usuario:
            raise HTTPException(status_code=400, detail="Credenciais inválidas")

        senha_hash = usuario["senha_hash"]

        # Verificar senha
        if not checkpw(senha.encode("utf-8"), senha_hash.encode("utf-8")):
            raise HTTPException(status_code=400, detail="Credenciais inválidas")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao realizar login: {str(e)}") from e
    finally:
        cursor.close()
        conn.close()

    return {"message": "Login bem-sucedido"}

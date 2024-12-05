from fastapi import APIRouter, HTTPException, status
from app.database import get_db_connection
from bcrypt import hashpw, gensalt, checkpw
from app.auth.schemas import UsuarioGeralAtualizacao, UsuarioGeralCadastro, Login


router = APIRouter(tags=["auth"])


@router.post("/usuarios", status_code=status.HTTP_200_OK)
async def criar_usuario(body: UsuarioGeralCadastro):
    if body.tipo_usuario not in ["Paciente", "PostoDeSaude"]:
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
            INSERT INTO usuarios (nome_completo, email, senha_hash, telefone, tipo_usuario, url_profile)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                body.nome_completo,
                body.email,
                senha_hash,
                body.telefone,
                body.tipo_usuario,
                body.url_profile,
            ),
        )
        user_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao criar usuário: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": user_id, "message": "Usuário criado com sucesso"}


@router.post("/login")
def login(body: Login):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT * FROM usuarios WHERE email = %s;
            """,
            (body.email,),
        )
        usuario = cursor.fetchone()

        if not usuario:
            raise HTTPException(status_code=400, detail="Credenciais inválidas")

        senha_hash = usuario["senha_hash"]

        # Verificar senha
        if not checkpw(body.senha.encode("utf-8"), senha_hash.encode("utf-8")):
            raise HTTPException(status_code=400, detail="Credenciais inválidas")

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao realizar login: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    dados = {
        "id": usuario["id"],
        "email": body.email,
        "nome_completo": usuario["nome_completo"],
        "telefone": usuario["telefone"],
        "tipo_usuario": usuario["tipo_usuario"],
    }

    return dados


# obter os dados do usuário somado ao tipo de usuário (Paciente ou PostoDeSaude) e retornar o usuário com as informações do tipo de usuário
@router.get("/usuarios/{user_id}")
def obter_usuario(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT u.id, u.nome_completo, u.email, u.telefone, u.tipo_usuario, u.url_profile,
                   p.id AS paciente_id, p.cpf, p.numero_cartao_sus, p.data_nascimento, p.tipo_sanguineo, p.altura, p.peso,
                   ps.id AS posto_id, ps.cnpj, ps.bairro, ps.cidade, ps.estado, ps.cep, ps.pais
            FROM usuarios u
            LEFT JOIN pacientes p ON u.id = p.usuario_id
            LEFT JOIN postos_de_saude ps ON u.id = ps.usuario_id
            WHERE u.id = %s;
            """,
            (user_id,),
        )
        usuario = cursor.fetchone()

        if not usuario:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

        if usuario["tipo_usuario"] == "Paciente":
            usuario = {
                "id": usuario["id"],
                "nome_completo": usuario["nome_completo"],
                "email": usuario["email"],
                "telefone": usuario["telefone"],
                "tipo_usuario": usuario["tipo_usuario"],
                "url_profile": usuario["url_profile"],
                "paciente": {
                    "id": usuario["paciente_id"],
                    "cpf": usuario["cpf"],
                    "numero_cartao_sus": usuario["numero_cartao_sus"],
                    "data_nascimento": usuario["data_nascimento"],
                    "tipo_sanguineo": usuario["tipo_sanguineo"],
                    "altura": usuario["altura"],
                    "peso": usuario["peso"],
                },
            }
        elif usuario["tipo_usuario"] == "PostoDeSaude":
            usuario = {
                "id": usuario["id"],
                "nome_completo": usuario["nome_completo"],
                "email": usuario["email"],
                "telefone": usuario["telefone"],
                "tipo_usuario": usuario["tipo_usuario"],
                "url_profile": usuario["url_profile"],
                "posto_de_saude": {
                    "id": usuario["posto_id"],
                    "cnpj": usuario["cnpj"],
                    "bairro": usuario["bairro"],
                    "cidade": usuario["cidade"],
                    "estado": usuario["estado"],
                    "cep": usuario["cep"],
                    "pais": usuario["pais"],
                },
            }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao obter usuário: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return usuario


@router.put("/usuarios/{user_id}")
def atualizar_usuario(user_id: int, body: UsuarioGeralAtualizacao):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            UPDATE usuarios
            SET nome_completo = %s, email = %s, telefone = %s, url_profile = %s
            WHERE id = %s;
            """,
            (body.nome_completo, body.email, body.telefone, body.url_profile, user_id),
        )
        conn.commit()

    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao atualizar usuário: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"message": "Usuário atualizado com sucesso"}

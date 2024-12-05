from fastapi import APIRouter, HTTPException

from app.database import get_db_connection
from app.healthposts.schemas import PostoDeSaudeCadastro, CadastrarVacina, CriarCampanha

router = APIRouter(tags=["postos-de-saude"])


@router.post("/postos-de-saude")
def criar_posto_de_saude(body: PostoDeSaudeCadastro):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO postos_de_saude (usuario_id, cnpj, bairro, cidade, estado, cep, pais)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                body.usuario_id,
                body.cnpj,
                body.bairro,
                body.cidade,
                body.estado,
                body.cep,
                body.pais,
            ),
        )
        posto_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao criar posto de saúde: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": posto_id, "message": "Posto de saúde criado com sucesso"}


@router.get("/postos-de-saude")
def listar_postos_de_saude():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM postos_de_saude;")
        postos = cursor.fetchall()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao listar postos de saúde: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return postos


@router.get("/listar-pacientes")
def listar_pacientes():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM pacientes;")
        pacientes = cursor.fetchall()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao listar pacientes: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return pacientes


@router.post("/historico-vacinas")
def cadastrar_vacina(body: CadastrarVacina):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO historico_vacinas (usuario_id, nome_vacina, data_aplicacao, dose, unidade_saude)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                body.usuario_id,
                body.nome_vacina,
                body.data_aplicacao,
                body.dose,
                body.unidade_saude,
            ),
        )
        vacina_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao cadastrar vacina: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": vacina_id, "message": "Vacina cadastrada com sucesso"}


@router.get("/historico-vacinas/{usuario_id}")
def listar_historico_vacinas(usuario_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT id, nome_vacina, data_aplicacao, dose, unidade_saude
            FROM historico_vacinas
            WHERE usuario_id = %s
            ORDER BY data_aplicacao DESC;
            """,
            (usuario_id,),
        )
        vacinas = cursor.fetchall()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao listar vacinas: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"usuario_id": usuario_id, "historico_vacinas": vacinas}


@router.get("/historico-vacinas/estatisticas/{usuario_id}")
def obter_estatisticas(usuario_id: int):
    """
    Retorna as estatísticas de vacinas para o usuário especificado.
    Inclui:
      - Total de vacinas
      - Quantidade de vacinas aplicadas por mês no ano atual
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Total de vacinas
        cursor.execute(
            """
            SELECT COUNT(*) AS total
            FROM historico_vacinas
            WHERE usuario_id = %s;
            """,
            (usuario_id,),
        )
        total_vacinas = cursor.fetchone()["total"]

        # Vacinas aplicadas por mês no ano atual
        cursor.execute(
            """
            SELECT EXTRACT(MONTH FROM data_aplicacao) AS mes, COUNT(*) AS quantidade
            FROM historico_vacinas
            WHERE usuario_id = %s AND EXTRACT(YEAR FROM data_aplicacao) = EXTRACT(YEAR FROM CURRENT_DATE)
            GROUP BY mes
            ORDER BY mes;
            """,
            (usuario_id,),
        )
        vacinas_por_mes = cursor.fetchall()

        # Estrutura o resultado para facilitar o uso no frontend
        estatisticas = {
            "total_vacinas": total_vacinas,
            "vacinas_por_mes": {
                int(row["mes"]): row["quantidade"] for row in vacinas_por_mes
            },
        }

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao obter estatísticas: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    # Garante que todos os meses estejam presentes no resultado
    meses_completos = {
        mes: estatisticas["vacinas_por_mes"].get(mes, 0) for mes in range(1, 13)
    }
    estatisticas["vacinas_por_mes"] = meses_completos

    return estatisticas


@router.post("/campanhas")
def criar_campanha(body: CriarCampanha):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO campanhas (titulo, descricao, data_inicio, data_fim, publico_alvo, owner_id)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id;
            """,
            (
                body.titulo,
                body.descricao,
                body.data_inicio,
                body.data_fim,
                body.publico_alvo,
                body.owner_id,
            ),
        )
        campanha_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao criar campanha: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": campanha_id, "message": "Campanha criada com sucesso"}


@router.get("/campanhas")
def listar_campanhas():
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT id, titulo, descricao, data_inicio, data_fim, publico_alvo
            FROM campanhas
            ORDER BY data_inicio ASC;
            """
        )
        campanhas = cursor.fetchall()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao listar campanhas: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"campanhas": campanhas}


@router.get("/campanhas/busca")
def buscar_campanhas(
    titulo: str = None,
    descricao: str = None,
    data_inicio: str = None,
    data_fim: str = None,
):
    """
    Busca campanhas com filtros opcionais.
    """
    conn = get_db_connection()
    cursor = conn.cursor()

    # Construir a query dinâmica
    query = """
        SELECT id, titulo, descricao, data_inicio, data_fim
        FROM campanhas
        WHERE TRUE
    """
    params = []

    if titulo:
        query += " AND titulo ILIKE %s"
        params.append(f"%{titulo}%")

    if descricao:
        query += " AND descricao ILIKE %s"
        params.append(f"%{descricao}%")

    if data_inicio:
        query += " AND data_inicio >= %s"
        params.append(data_inicio)

    if data_fim:
        query += " AND data_fim <= %s"
        params.append(data_fim)

    query += " ORDER BY data_inicio DESC"

    try:
        cursor.execute(query, params)
        campanhas = cursor.fetchall()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao buscar campanhas: {str(e)}"
        )
    finally:
        cursor.close()
        conn.close()

    return {"campanhas": campanhas}


@router.get("/campanhas/{usuario_id}")
def listar_campanhas_usuario(usuario_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT id, titulo, descricao, data_inicio, data_fim, publico_alvo
            FROM campanhas
            WHERE owner_id = %s
            ORDER BY data_inicio ASC;
            """,
            (usuario_id,),
        )
        campanhas = cursor.fetchall()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao listar campanhas: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"campanhas": campanhas}


@router.delete("/campanhas/{campanha_id}")
def excluir_campanha(campanha_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            DELETE FROM campanhas
            WHERE id = %s
            RETURNING id;
            """,
            (campanha_id,),
        )
        campanha_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao excluir campanha: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": campanha_id, "message": "Campanha excluída com sucesso"}


@router.delete("/historico-vacinas/{vacina_id}")
def excluir_vacina(vacina_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            DELETE FROM historico_vacinas
            WHERE id = %s
            RETURNING id;
            """,
            (vacina_id,),
        )
        vacina_id = cursor.fetchone()["id"]
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=500, detail=f"Erro ao excluir vacina: {str(e)}"
        ) from e
    finally:
        cursor.close()
        conn.close()

    return {"id": vacina_id, "message": "Vacina excluída com sucesso"}

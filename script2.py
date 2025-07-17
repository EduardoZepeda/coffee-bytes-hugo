import frontmatter
from pathlib import Path
import re
import os
import unicodedata

urls_404 = [
    "patrones-de-deployment-o-despliegue-utiles",
    "tutorial-de-comandos-basicos-de-docker",
    "por-que-deberias-usar-django-framework",
    "que-es-docker-y-para-que-sirve",
    "full-text-search-y-busquedas-con-django-y-postgres",
    "go-testing-basico-y-coverage",
    "go-channels-entendiendo-los-deadlocks-o-puntos-muertos",
    "como-escribir-un-archivo-de-dockerfile-desde-cero",
    "apis-de-alto-rendimiento-usando-grpc-y-protobuffers",
    "el-auge-y-la-caida-de-la-burbuja-de-ai",
    "caracteristicas-basicas-de-una-api-rest",
    "como-crear-una-api-graphql-en-django-rapidamente-usando-graphene",
    "buenas-practicas-y-diseno-de-una-api-rest",
    "unittest-python-valen-la-pena-los-tests-en-python",
    "digital-ocean-analisis-y-mi-experiencia-como-usuario",
    "no-te-obsesiones-con-el-rendimiento-de-tu-aplicacion-web",
    "sitemap-dinamico-con-django",
    "explicacion-del-patron-de-diseno-worker-pool",
    "limita-la-ejecucion-de-funciones-en-js-con-debounce-y-throttle",
    "desestructuracion-de-objetos-anidados-en-javascript",
    "desestructuracion-de-listas-en-javascript",
    "resena-de-django-for-professionals",
    "como-personalizar-el-modelo-user-en-django",
    "django-y-htmx-web-apps-modernas-sin-escribir-js",
    "cache-en-django-rest-framework-con-memcached",
    "django-annotate-y-aggregate-explicados",
    "como-escalar-django-para-manejar-millones-de-vistas",
    "arregla-querys-lentas-en-django-al-usar-annotate-y-subqueries",
    "django-channels-consumers-scope-y-eventos",
    "que-tipos-o-types-usar-para-componentes-react-con-children",
    "django-admin-panel-y-su-personalizacion",
    "login-con-django-rest-framework-drf",
    "el-mejor-libro-de-django-resena-de-two-scoops-of-django",
    "como-usar-django-framework-de-manera-asincrona-usando-celery",
    "cookiecutter-django-para-configurar-y-hacer-deploy-en-django",
    "linux/linux-basic-commands-grep-ls-cd-cat-cp-rm-scp",
    "la-guia-definitiva-de-django",
    "pipenv-el-administrador-de-entornos-virtuales-que-no-conoces",
    "python-virtualenv-tutorial-basico-en-linux",
    "pages/go-programming-language-tutorial",
    "programar-un-blog-o-usar-wordpress",
    "de-software/pages/go-programming-language-tutorial",
    "go-introduccion-a-las-goroutines-y-concurrencia",
    "go-uso-de-channels-o-canales-para-comunicar-goroutinas",
    "examen-de-certificacion-azure-az-900-mi-experiencia",
    "go-maps-o-diccionarios",
    "go-funciones-argumentos-y-el-paquete-fmt",
    "no-uses-github-para-evaluar-a-los-desarrolladores",
    "go-importacion-de-paquetes-y-manejo-de-modulos",
    "go-slices-y-arrays",
    "throttling-en-nginx",
    "ocr-con-tesseract-python-y-pytesseract",
    "mi-analisis-de-captchas-anti-bots-ventajas-y-desventajas",
    "no-uses-jwt-para-gestionar-sesiones-traduccion",
    "top-5-problemas-de-algoritmos-favoritos-en-codewars",
    "por-que-usar-reactfc-podria-ser-una-mala-practica",
    "go-structs-herencia-polimorfismo-y-encapsulacion",
    "testeo-con-tox-en-python-tutorial-desde-cero",
    "tutorial-de-migraciones-en-go-con-migrate",
    "integracion-del-orm-de-python-tortoise-con-fastapi",
    "django-rest-framework-y-jwt-para-autenticar-usuarios",
    "como-mejorar-django-framework",
    "javascript-vs-python-cual-es-el-mejor-lenguaje-de-programacion",
    "aprende-python-desde-cero-con-este-libro-gratuito",
    "que-hace-la-aplicacion-contenttype-en-django",
    "aprender-django-con-django-by-example-mi-resena",
    "el-mejor-libro-para-aprender-javascript-moderno",
    "react-usecallback-usememo-y-memo-diferencias-y-usos",
    "5-librerias-geniales-de-react-que-debes-conocer",
    "desestructuracion-de-variables-en-javascript",
    "react-memo-usememo-y-usecallback-para-evitar-renderizaciones-en-react",
    "desestructuracion-con-valores-por-defecto-en-javascript",
    "aprender-python-desde-cero-resena-de-beginning-python",
    "hello-world-como-aprendi-a-programar",
]

post_category_relation = {}


def remove_accents(input_str):
    nfkd_form = unicodedata.normalize("NFKD", input_str)
    return "".join([c for c in nfkd_form if not unicodedata.combining(c)])


def slugify(text):
    """Convert text to a slug (lowercase, replace spaces with hyphens, remove special chars)"""
    text = text.lower().strip().replace("?", "")
    text = remove_accents(text)
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    text = re.sub(r"^-+|-+$", "", text)
    return text


def create_slug_for_md_files():
    for md_file in Path("content/posts/").rglob("*.md"):
        if not md_file.name.endswith("_index.md") and not md_file.name.endswith(
            "en.md"
        ):
            try:
                with open(md_file, "r", encoding="utf-8") as f:
                    content = f.read()
                    post = frontmatter.loads(content)
                    first_category = post.metadata["categories"][0]
                    title = post.metadata.get("title", "")
                    url = post.metadata.get("url", "")
                    slug = post.metadata.get("slug", "")
                    modified_url = ""
                    if slug:
                        del post.metadata["slug"]
                    if url:
                        modified_url = post.metadata["url"].replace("/", "")
                        del post.metadata["url"]
                    else:
                        modified_url = slugify(title)
                    if title and first_category:
                        post.metadata["slug"] = (
                            f"/{slugify(first_category)}/{slugify(modified_url)}/"
                        )
                        print(f"/{slugify(first_category)}/{slugify(modified_url)}/")
                with open(md_file, "w", encoding="utf-8") as f:
                    f.write(frontmatter.dumps(post))
            except FileNotFoundError:
                continue


if __name__ == "__main__":
    create_slug_for_md_files()

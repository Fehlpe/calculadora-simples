# Dockerfile para servir a calculadora estática
# Imagem base leve com nginx
FROM nginx:alpine

LABEL maintainer="Felipe"

# Copia todos os arquivos do projeto para o diretório padrão do nginx
# O conteúdo de /usr/share/nginx/html substituirá o index.html padrão
COPY . /usr/share/nginx/html/

EXPOSE 80

# Comando padrão do nginx na imagem já roda em foreground
# ENTRYPOINT e CMD não precisam ser definidos explicitamente

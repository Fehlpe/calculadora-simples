# calculadora-simples

Projeto: uma calculadora web simples (HTML, CSS, JavaScript).

## Objetivo desta adição
Adicionei um `Dockerfile` para executar a aplicação estática dentro de um container Nginx. Este README descreve como construir e executar a imagem localmente (com comandos para PowerShell no Windows).

## Pré-requisitos
- Docker instalado e em execução (Windows Desktop / Docker Engine).
- (Opcional) Conta no Docker Hub se quiser enviar a imagem.

## Instruções — PowerShell (Windows)
Abra um terminal PowerShell na pasta do projeto (`C:\Users\Felipe\Desktop\calculadora\calculadora-simples`).

1) Construir a imagem Docker:

docker build -t calculadora-simples:latest .

2) Executar o container e mapear a porta 80 do container para a porta 8080 da sua máquina:

docker run --rm -p 8080:80 calculadora-simples:latest

3) Abrir no navegador:

http://localhost:8080

4) Parar o container:

- Se executou em foreground, Ctrl+C no terminal.
- Se executou em background, localize o container com `docker ps` e pare com `docker stop <CONTAINER_ID>`.

## Enviar para um registro (opcional)
1) Faça login no Docker Hub (caso queira enviar):

docker login

2) Marque a imagem e envie (exemplo usando `SEU_USUARIO`):

docker tag calculadora-simples:latest SEU_USUARIO/calculadora-simples:latest

docker push SEU_USUARIO/calculadora-simples:latest

## Commit e push das mudanças (exemplo PowerShell)

cd 'C:\Users\Felipe\Desktop\calculadora\calculadora-simples'; git add Dockerfile README.md; git commit -m "Add Dockerfile and README with Docker instructions"; git push origin main


## Observações
- O `Dockerfile` usa a imagem oficial `nginx:alpine` e copia os arquivos do projeto para `/usr/share/nginx/html`.
- Caso queira um servidor de desenvolvimento (hot reload), é possível usar uma imagem Node.js com um servidor como `http-server`, mas para publicação a imagem Nginx é mais adequada para recursos estáticos.

---
Feito automaticamente para o ajuste de Dockerização do projeto.

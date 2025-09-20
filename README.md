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

## Testes unitários
Instale dependências e execute os testes com Node.js:

```powershell
# na pasta do projeto
npm ci
npm test
```

Foram adicionados 5 testes unitários em `tests/calc.test.js` cobrindo soma, subtração, multiplicação, divisão e divisão por zero.

## GitHub Actions — CI e alertas
Adicionado workflow em `.github/workflows/ci.yml` que executa os testes em eventos `pull_request` e `push` na branch `main`.

O workflow também possui um job `notify-on-failure` que envia um e-mail quando a pipeline falha usando `dawidd6/action-send-mail`. Para que o envio funcione, configure os seguintes Secrets no repositório GitHub (Settings → Secrets → Actions):

- `SMTP_HOST` — servidor SMTP (ex: `smtp.gmail.com` ou seu provedor)
- `SMTP_PORT` — porta (ex: `587`)
- `SMTP_USER` — usuário SMTP
- `SMTP_PASS` — senha ou app password
- `ALERT_EMAIL_TO` — e-mail destino das notificações
- `ALERT_EMAIL_FROM` — e-mail remetente

Depois de configurar os secrets, abra uma Pull Request para ver o workflow rodar e, em caso de falha, você receberá um e-mail de alerta.

## Screenshots solicitadas
- Screenshot do arquivo de workflow: abra `.github/workflows/ci.yml` no GitHub ou VSCode e capture a tela.
- Screenshot de alertas recebidos: após configurar secrets e forçar uma falha nos testes (por exemplo, alterar temporariamente um teste), abra sua caixa de entrada para mostrar o e-mail.
- Screenshot dos testes no código: capture `tests/calc.test.js`.
- Screenshot do workflow rodando dentro de uma PR: crie uma PR e capture a aba 'Checks' ou 'Actions' com a execução.

## Commit e push
```powershell
git add package.json package-lock.json src tests .github README.md
git commit -m "Add Jest tests and CI workflow with email alerts"
git push origin develop/criacao-projeto
```

## Observações
- O `Dockerfile` usa a imagem oficial `nginx:alpine` e copia os arquivos do projeto para `/usr/share/nginx/html`.
- Caso queira um servidor de desenvolvimento (hot reload), é possível usar uma imagem Node.js com um servidor como `http-server`, mas para publicação a imagem Nginx é mais adequada para recursos estáticos.

---
Feito automaticamente para o ajuste de Dockerização do projeto.

### Construimos las imagenes
docker build -t caso1dev .
docker build -t caso1-mysql -f Dockerfile-mysql .

### creamos red
docker network create caso1-red

## ejecutamos los contenedores
docker run -d --name mysql-container --network caso1-red caso1-mysql
docker run -d -p 3000:3000 --name node-app --network caso1-red caso1dev

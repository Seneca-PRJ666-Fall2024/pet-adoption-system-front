SET DOCKER_USER=vplatonov1
SET VERSION=0.12
docker build -t %DOCKER_USER%/pet-adoption-system-front:%VERSION% .
docker push %DOCKER_USER%/pet-adoption-system-front:%VERSION%
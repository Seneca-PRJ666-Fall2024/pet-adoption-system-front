export DOCKER_USER=vplatonov1
export VERSION=0.10
docker build -t $DOCKER_USER/pet-adoption-system-back:$VERSION .
docker push $DOCKER_USER/pet-adoption-system-back:$VERSION
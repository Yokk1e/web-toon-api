# start devtools
echo starting docker-compose 
cd ./devtools/db/
docker-compose up -d
cd ../redis
docker-compose up -d
cd ../..


# start app
echo start app web toon api
yarn
yarn start:dev

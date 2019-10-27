docker-compose up -d
cd oobwordpress
lando start
cd ..
yarn install
yarn upgrade
npx babel-upgrade --write
yarn start

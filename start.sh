docker-compose up -d
cd oobwordpress
lando start
cd ..
yarn install
npx babel-upgrade --write
yarn upgrade
yarn start

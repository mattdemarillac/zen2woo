lando start
cd oobwordpress
lando start
./init.sh
cd ..
yarn install
npx babel-upgrade --write
yarn upgrade
yarn start

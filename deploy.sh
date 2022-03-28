DEPLOY_CONNECT=root@139.59.241.255

echo "Downloading packages ...."
npm install

echo "Compiling"
npm run build

echo "Removing server html"
ssh ${DEPLOY_CONNECT} 'rm -r /var/www/foodlive.tech/html'

echo "Mkdir folder"
ssh ${DEPLOY_CONNECT} 'mkdir /var/www/foodlive.tech/html'

echo "Copying..."
scp -r -o StrictHostKeyChecking=no ./build/* ${DEPLOY_CONNECT}:/var/www/foodlive.tech/html
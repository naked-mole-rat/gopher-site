const { URL } = require('url');
const net = require('net');
const gopherSubMenu = require('gopher-protocol').gopherSubMenu;

module.exports = async uri => {

  const urlObj = new URL(uri);
  const client = new net.Socket();
  let resourceType;
  let path;

  if (urlObj.pathname==='/') {
    // root
    resourceType = '1';
    path = '';
  } else {
    resourceType = urlObj.pathname.substring(1, 1);
    path = urlObj.pathname.substring(2);
  }

  const port = urlObj.port || 70;

  console.log('host:', urlObj.host);
  console.log('port:', port);


  client.connect(urlObj.port || 70, urlObj.host, () => {

    console.log('path:', path);
    client.write(path + "\r\n");

  });

  let resp = '';

  client.on('data', data => {

    resp+=data;

  });

  return new Promise( (res, rej) => {

    client.on('error', err => {

      rej(err);

    });

    client.on('close', () => {

      switch(resourceType) {
        case '1':
          res([resourceType, parseMenu(resp)]);
          break;
        case 0:
          res([resourceType, resp]);
          break;
      }

    });
  });

};

const parseMenu = input => {

  return gopherSubMenu.parse(input);

};

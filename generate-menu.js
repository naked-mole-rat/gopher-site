module.exports = (uri, items) => {

  const header = `
<!DOCTYPE html>
<html>

<head>
  <title>naked-mole-rat</title>
  <link rel="stylesheet" type="text/css" href="/style.css" /> 
</head>

<body>

  <h1>${uri}</h1>
  <ul>
`;

  const footer = `
  </ul>
</body>
</html>
`;

  return header +
    items.map( item => renderItem(uri, item) ).join("\n") +
    footer;

};

function renderItem(uri, item) {

  let result = '<li>';

  switch(item.type) {

    case '0' :
    case '1' :
      result+='<a href="/' + uri + '/' + item.type + item.displayText + '">' + item.displayText + '</a>'; 
      break;
    case 'i' :
      result+=item.displayText;
      break;
    default:
      result+='Unknown type:' + item.type;
      break;

  }

  result += '</li>';
  return result;

}

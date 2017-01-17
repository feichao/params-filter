/******************* test object *******************/
var paramsObj = new $PF.Params({
  name: $PF.DT.STRING,
  age: $PF.DT.NUMBER,
  favs: $PF.DT.ARRAY,
  others: new $PF.Params({
    address: $PF.DT.STRING,
    phone: $PF.DT.NUMBER
  })
});

var data = paramsObj.filter({
  name: 'frank',
  age: '28',
  favs: ['movie', 'music', 'book'],
  spec: 'web',
  others: {
    address: 'Kezhu Road 192',
    phone: '13310010010'
  }
});

console.log(data);


/******************* test array *******************/
var paramsObj = new $PF.Params({
  name: $PF.DT.STRING,
  age: $PF.DT.NUMBER,
  favs: $PF.DT.ARRAY,
  others: new $PF.Params({
    address: $PF.DT.STRING,
    phone: $PF.DT.NUMBER
  })
});

var data = paramsObj.filter([{
  name: 'frank',
  age: '28',
  favs: ['movie', 'music', 'book'],
  spec: 'web',
  others: {
    address: 'Kezhu Road 192',
    phone: '13310010010'
  }
}, {
  name: 'peggy',
  age: 28,
  favs: ['movie_m', 'music_m', 'book_b'],
  spec: 'design',
  others: {
    address: 'Kezhu Road 192',
    phone: '13310010011'
  }
}]);

console.log(data);

/******************* test base type *******************/
var paramsArray1 = new $PF.Params([$PF.DT.NUMBER, $PF.DT.STRING]);

var data = paramsArray1.filter([12312313, '1231231']);

console.log(data);

/******************* test others *******************/
var paramsObj = new $PF.Params([{
  name: $PF.DT.STRING,
  age: $PF.DT.NUMBER,
  favs: $PF.DT.ARRAY,
  others: new $PF.Params({
    address: $PF.DT.STRING,
    phone: $PF.DT.NUMBER
  })
}, {
  name: $PF.DT.STRING,
  age: $PF.DT.NUMBER,
  others: new $PF.Params({
    address: $PF.DT.STRING
  })
}, $PF.DT.NUMBER]);

var data = paramsObj.filter([{
  name: 'frank',
  age: '28',
  favs: ['movie', 'music', 'book'],
  spec: 'web',
  others: {
    address: 'Kezhu Road 192',
    phone: '13310010010'
  }
}, {
  name: 'peggy',
  age: 28,
  favs: ['movie_m', 'music_m', 'book_b'],
  spec: 'design',
  others: {
    address: 'Kezhu Road 192',
    phone: '13310010011'
  }
}, '2']);

console.log(data);
## 这是个很好玩的东西

作为一个前端，我很头疼后台传给我的数据，因为除了文档，在代码里面我几乎无法确定后台会传给我什么数据，时间久了，也不知道前端逻辑到底在乎哪些数据。我需要在前端定义一种数据集，这个数据集可以过滤掉前端不感兴趣的数据，也可以告诉我前端在乎什么数据。

所以就有了 ParamsFilter。

怎么玩呢？

ParamsFilter 会在全局环境中定义 $PF，用于生成数据集及过滤数据。$PF 下有两个属性 Params 用于定义一个数据集，DT 定义了几种内置的数据类型。用法如下：
```
// 定义数据集，可以传入一个 Object 或者 Array
var paramsObj = new $PF.Params(...);

// 过滤数据
paramsObj.filter(...your-data-set...);

// 内置数据类型
ParamsUtil.DATA_TYPE = {
    INT: 'int',
    NUMBER: 'number',
    STRING: 'string',
    BOOLEAN: 'boolean',
    ARRAY: 'array',
    OBJECT: 'object'
};
```

Angular 1.x如何使用？
```
angular.module('your app', ['pFilter'])
    .controller('your controller', function(PFilter) {
        // 定义数据集
        var paramsObj = PFilter.create({...});

        // 过滤数据
        paramsObj.filter(paramsObj, data);
    });
```

例1：
```
// 定义一个 Object 数据集
var paramsObj = new $PF.Params({
  name: $PF.DT.STRING,
  age: $PF.DT.NUMBER,
  favs: $PF.DT.ARRAY,
  others: new $PF.Params({ // 嵌套数据集
    address: $PF.DT.STRING,
    phone: $PF.DT.NUMBER
  })
});

// 过滤 Object
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

// 结果
{ 
    name: 'frank',
    age: 28,
    favs: [ 'movie', 'music', 'book' ],
    others: { 
        address: 'Kezhu Road 192', 
        phone: 13310010010 
    }
}
  
 
 // 过滤 Array
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
  age: 26,
  favs: ['movie_m', 'music_m', 'book_b'],
  spec: 'design',
  others: {
    address: 'Kezhu Road 192',
    phone: '13310010011'
  }
}]);

// 结果
[{ 
    name: 'frank',
    age: 28,
    favs: [ 'movie', 'music', 'book' ],
    others: {          
        address: 'Kezhu Road 192', 
        phone: 13310010010 
    }
 }, { 
    name: 'peggy',
    age: 26,
    favs: ['movie_m', 'music_m', 'book_b'],
    others: { 
        address: 'Kezhu Road 192', 
        phone: 13310010011 
    }
}]
```

例2：
```
// 定义一个 Array 数据集
var paramsArray1 = new $PF.Params([$PF.DT.NUMBER, $PF.DT.STRING, $PF.DT.BOOLEAN]);

// 过滤数据
var data = paramsArray1.filter(['23', '1', 0]);

// 结果
[ 23, '1', false ]
```

例3：
```
// 定义一个复杂 Array 数据集
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

// 过滤数据
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
  age: 26,
  favs: ['movie_m', 'music_m', 'book_b'],
  spec: 'design',
  others: {
    address: 'Kezhu Road 192',
    phone: '13310010011'
  }
}, '2']);

// 结果
[ { 
    name: 'frank',
    age: 28,
    favs: [ 'movie', 'music', 'book' ],
    others: { 
        address: 'Kezhu Road 192', 
        phone: 13310010010 
    } 
}, { 
    name: 'peggy', 
    age: 26, 
    others: { 
        address: 'Kezhu Road 192' 
    } 
}, 2 ]
```

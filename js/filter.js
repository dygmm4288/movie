const arr = [
  { title: 'kim', age: 20 },
  { title: 'kim ji', age: 25 },
  { title: 'lee', age: 30 },
  { title: 'lee jin', age: 26 },
];

console.log(
  arr.filter(function (value, index, referenceArr) {
    //return value.title.includes('kim');
    // 중요한건 filter의 콜백함수에서 참,거짓을 반환해야한다
    // 콜백함수의 결과값이 참인 것만 따로 뺀다
    return index % 2 === 0;
  }),
);

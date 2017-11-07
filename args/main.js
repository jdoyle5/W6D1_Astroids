const sum = function(...args){
  let acc = 0;
  args.forEach((ele)=>{
    acc += ele;
  });
  return acc;
};


Function.prototype.myBind = function(obj, ...args) {

  // const that = this;
  // const inner = function(...args2) {
  //   console.log(this);
  //   this.apply(obj, args.concat(args2));
  // };
  // return function(...args3){
  //   inner.apply(that, args3);
  // };

  return (...args2) => {
    this.apply(obj, args.concat(args2));
  };
};

const curriedSum = function curriedSum(num){
  const numsArr = [];
  const targetLength = num;
  const retFunc = (newNum) => {
    numsArr.push(newNum);
    if (numsArr.length < targetLength) {
      return retFunc;
    }
    return numsArr.reduce((acc, el) => el + acc);
  };
  return retFunc;
};

Function.prototype.curry = function(numArgs) {
  const argsArr = [];
  const targetLength = numArgs;

  const retFunc = (newArg) => {
    argsArr.push(newArg);
    if (argsArr.length < targetLength) {
      return retFunc;
    }
    return this(...argsArr);
  };
  return retFunc;
};

Function.prototype.curryTwo = function(numArgs) {
  const argsArr = [];
  const targetLength = numArgs;

  const retFunc = (newArg) => {
    argsArr.push(newArg);
    if (argsArr.length < targetLength) {
      return retFunc;
    }
    return this.apply(this, argsArr);
  };
  return retFunc;
};











//

function buildName(firstName?:string,...restOfName:string[]):string{
    return firstName+' '+restOfName
}

let result1= buildName('bob')
let result2=buildName('bob','adams','sr')
let result3=buildName('bob','adams')
console.log(result1);
console.log(result2);
console.log(result3);
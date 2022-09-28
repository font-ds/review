function identity<T>(arg:T):T{
    return arg
}

interface GnericIdentityFn<T>{
    (arg:T):T
}

let myIndentity:GnericIdentityFn<number>=identity

let output=identity<string>('myString')

let output2=identity('myString')

let output3=identity<(number|string|boolean)[]>([1,'2',1,true])

let output4=myIndentity(1)
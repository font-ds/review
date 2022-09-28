class Animal {
    name: string
    constructor(name: string) {
        this.name = name
    }
    move(distance: number = 0) {
        console.log(`${this.name} move ${distance}`);

    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distance: number = 5) {
        console.log('Slithering...');
        super.move(distance)
    }
}

class House extends Animal {
    constructor(name: string) {
        super(name)
    }
    move(distance: number = 45) {
        console.log('Gallopong...');
        super.move(distance)

    }
}

let sam = new Snake('Sammy')
let tom: Animal = new House('Tommy')

sam.move()
tom.move(90)
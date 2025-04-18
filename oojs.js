// Alaposztály
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        const p = document.createElement("p");
        p.textContent = `${this.name} hangot ad.`;
        document.body.appendChild(p);
    }
}

// Leszármazott osztály
class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() {
        const p = document.createElement("p");
        p.textContent = `${this.name} (kutya, ${this.breed}) ugat: Vau!`;
        document.body.appendChild(p);
    }
}

function addAnimal() {
    const a = new Animal("Tigris");
    a.speak();
}

function addDog() {
    const d = new Dog("Bodri", "Puli");
    d.speak();
}

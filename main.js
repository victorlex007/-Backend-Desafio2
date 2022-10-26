const fs = require("fs");

class Contenedor {
  #array;
  #file;
  constructor(ruta) {
    this.#array = [];
    this.#file = ruta;
  }
  async save(title, price, url) {
    const obj = {
      title: title,
      price: price,
      thumbnail: url,
    };
    try {
      if (this.#array.length === 0) {
        obj.id = 1;
        this.#array.push(obj);
      } else {
        obj.id = this.#array[this.#array.length - 1].id + 1;
        this.#array.push(obj);
      }
      await fs.promises.writeFile(
        this.#file,
        JSON.stringify(this.#array, null, "\t")
      );
    } catch (error) {
      console.log(error);
    }
    return obj.id;
  }

  async getById(id) {
    try {
      const result = await fs.promises.readFile(this.#file, "utf-8");
      const array = JSON.parse(result);
      if (array.length > 0) {
        const IdBuscado = array.find((element) => element.id === id);
        if (!IdBuscado) {
          throw new Error(`elemento con ID ${id} no encontrado`);
        } else {
          return IdBuscado;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  getAll() {
    try {
      const array = JSON.parse(result);
      console.log("El archivo contiene:");
      console.log(array);
    } catch (error) {
      console.log(error);
    }
  }

  deleteById(id) {
    try {
      const array = JSON.parse(result);
      if (array.find((element) => element.id === id)) {
        const arr = array.filter((element) => element.id !== id);
        console.log("Objeto eliminado. Nuevo array:");
        console.log(arr);
      } else {
        console.log("No existe el ID buscado");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    try {
      console.log("Borrando todo");
      await fs.promises.writeFile(this.#file, []);
    } catch (error) {
      console.error(error);
    }
  }
}
async function test() {
  const element = new Container("./productos.txt");
  try {
    await element.save("remera blanca", 1000, "www.b");
    await element.save("remera negra", 1100, "www.n");
    await element.save("remera azul", 1200, "www.a");

    const elem = await element.getById(2);
    console.log(elem);
    await element.deleteById(3);
    const elems = await element.getAll();
    console.log(elems);
  } catch (error) {
    console.log(error);
  }
}

test();

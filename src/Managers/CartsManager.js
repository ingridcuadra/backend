import fs from 'fs';
import __dirname from '../utils.js';

export default class CartsManager {
    constructor() {
        this.path = `${__dirname}/files/carts.json`;
        this.init();
    }
    init = async() => {
        if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]));
    }
};
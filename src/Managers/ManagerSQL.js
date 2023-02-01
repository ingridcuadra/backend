import knex from 'knex';

class ManagerSQL {
    constructor(config, table) {
        this.knex = knex(config)
        this.table = table
    }
    getAll = async() => {
        return this.knex.select('*').from(this.table);
    }
    getById = async(id) => {
        return this.knex.select('*').from(this.table).where("id", id);
    }
    save = async(product) => {
        return this.knex.insert(product).into(this.table);
    }
    update = async(productToUpdate, id) => {
        return this.knex.from(this.table).where("id", id).update(productToUpdate);
    }
    deleteById = async(id) => {
        return this.knex.from(this.table).where("id", id).delete();
    }
}

export default ManagerSQL;
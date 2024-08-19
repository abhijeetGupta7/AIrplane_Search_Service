class CrudRepository {
    constructor(model) {
        this.model=model;
    }

    async create(data) {
        const response =await this.model.create(data);
        return response;
    }

    async destroy(data) {   // data is the column id
        const response = await this.model.destroy({
            where: {
                id:data
            }
        });
        return response;    
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;   
    }

    async get(data) {    
        const response=await this.model.findByPk(data);
        return response;   
    }

    async update(id,data) {   // data ->  { col:val, col:val, ..... }  
        const response= await this.model.update(data,
            { 
                where : {
                    id:id
                }
            }
        )
    }
}

module.exports=CrudRepository;
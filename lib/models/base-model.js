class BaseModel{
    constructor(schema){
        this.schema= schema;
    }
    async readAllRecords(_id){
        try{
            const record_id= _id ? {_id} : {};
            return await this.schema.find(record_id);
        } catch (err){
            Promise.reject(err);
        }
    }
    async readOneRecord(record){
        try{
            return await this.schema.find(record);
        } catch(err){
            Promise.reject(err);
        }
    }
    async createRecord(record){
        try{
            const new_record= new this.schema(record);
            return await new_record.save(new_record);
        } catch(err){
            Promise.reject(err);
        }
    }
    async updateRecord(_id, record){
        try{
            return await this.schema.findByIdAndUpdate(_id, record, {new: true});
        } catch(err){
            Promise.reject(err);
        }
    }
    async deleteRecord(_id){
        try{
            return await this.schema,findByIdAndDelete(_id);
        } catch(err){
            Promise.reject(err);
        }
    }
}
module.exports = BaseModel;
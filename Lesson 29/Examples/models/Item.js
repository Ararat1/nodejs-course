import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
    sku: {
        type: Number,
        required: true,
        index: { unique: true }
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        index: false
    }
}, { timestamps: true });

const ItemModel = model("items", ItemSchema);

// Methods

const getAll = async () => ItemModel.find().sort({ created_at: -1 });

const getOne = async (_id) => ItemModel.findById(_id);

const create = async (data) => new ItemModel(data).save();

const updateItem = async (_id, data) => {
    let item = await getOne(_id);

    Object.keys(data).forEach((key) => item[key] = data[key]);

    return item.save();
};

const remove = async (query) => await ItemModel.deleteOne(query).n

export { getAll, getOne, create, updateItem, remove }
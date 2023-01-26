import mongoose from 'mongoose';

export const isObjectIdValid = (id) => {

    const ObjectId = mongoose.Types.ObjectId;
    if (ObjectId.isValid(id)) {
        return String(new ObjectId(id)) === id ? true : false;
    }
    return false

}

import { Item } from '../models/Item.js';

export const itemRepository = {
  create: (payload) => Item.create(payload),
  findAllByOwner: (ownerId) => Item.find({ ownerId }).sort({ createdAt: -1 }),
  findByIdAndOwner: (id, ownerId) => Item.findOne({ _id: id, ownerId }),
  updateByIdAndOwner: (id, ownerId, payload) =>
    Item.findOneAndUpdate({ _id: id, ownerId }, payload, { new: true, runValidators: true }),
  deleteByIdAndOwner: (id, ownerId) => Item.findOneAndDelete({ _id: id, ownerId })
};

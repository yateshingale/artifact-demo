export const itemUseCases = {
  createItem: (payload, deps) => deps.itemRepository.create(payload),
  listItems: (ownerId, deps) => deps.itemRepository.findAllByOwner(ownerId),
  getItem: async (id, ownerId, deps) => {
    const item = await deps.itemRepository.findByIdAndOwner(id, ownerId);
    if (!item) {
      const err = new Error('Item not found');
      err.statusCode = 404;
      throw err;
    }
    return item;
  },
  updateItem: async (id, ownerId, payload, deps) => {
    const item = await deps.itemRepository.updateByIdAndOwner(id, ownerId, payload);
    if (!item) {
      const err = new Error('Item not found');
      err.statusCode = 404;
      throw err;
    }
    return item;
  },
  deleteItem: async (id, ownerId, deps) => {
    const item = await deps.itemRepository.deleteByIdAndOwner(id, ownerId);
    if (!item) {
      const err = new Error('Item not found');
      err.statusCode = 404;
      throw err;
    }
    return item;
  }
};

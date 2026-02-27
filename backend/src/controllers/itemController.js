import { itemUseCases } from '../usecases/item/itemUseCases.js';
import { itemRepository } from '../repositories/itemRepository.js';

const deps = { itemRepository };

export async function createItem(req, res, next) {
  try {
    const item = await itemUseCases.createItem({ ...req.body, ownerId: req.user.sub }, deps);
    res.status(201).json(item);
  } catch (e) {
    next(e);
  }
}

export async function listItems(req, res, next) {
  try {
    const items = await itemUseCases.listItems(req.user.sub, deps);
    res.status(200).json(items);
  } catch (e) {
    next(e);
  }
}

export async function getItem(req, res, next) {
  try {
    const item = await itemUseCases.getItem(req.params.id, req.user.sub, deps);
    res.status(200).json(item);
  } catch (e) {
    next(e);
  }
}

export async function updateItem(req, res, next) {
  try {
    const item = await itemUseCases.updateItem(req.params.id, req.user.sub, req.body, deps);
    res.status(200).json(item);
  } catch (e) {
    next(e);
  }
}

export async function deleteItem(req, res, next) {
  try {
    await itemUseCases.deleteItem(req.params.id, req.user.sub, deps);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

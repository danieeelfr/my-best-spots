import knex from '../database/connection';
import {Request, Response} from 'express';


class ItemsController {
    async index (req: Request, res: Response)  {
        const items = await knex('items').select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                name: item.name,
                image_url: item.image,
            }
        });

        return res.json(serializedItems);
    }
}

export default ItemsController;
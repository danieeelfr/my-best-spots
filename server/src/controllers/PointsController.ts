import knex from '../database/connection';
import {Request, Response} from 'express';

class PointsController {

    async index(req: Request, res: Response) {
        const { city, country, items } = req.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        
        const points = await knex('points')
            .join('point_items', 'point_id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('country', String(country))
            .distinct()
            .select('points.*');

        return res.json(points);
        // const points = await knex('points').where('city', city, 'or', 'country', country, 'or', 'items', 'in', items)
    }

    async create (req: Request, res: Response) {
        const {
            name,
            description,
            sharedby,
            city,
            country,
            latitude,
            longitude,
            image,
            items
        } = req.body;

        const transaction = await knex.transaction();

        const point = {
            name,
            description,
            sharedby,
            city,
            country,
            latitude,
            longitude,
            image
        };
    
        const insertedIds = await transaction('points').insert(point);
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id: point_id,
            }
        });
    
        await transaction('point_items').insert(pointItems);
    
        await transaction.commit();

        return res.json({
            id: point_id,
            ...point,
        });
    }

    async show (req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return res.status(400).json({message: 'Point not found!'});
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id);

        return res.json({point, items});
    }
};

export default PointsController;
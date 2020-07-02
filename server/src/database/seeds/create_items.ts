import Knex from "knex"

export async function seed(knex: Knex) {
    await knex('items').insert([
        { name: 'Bodyboard', description: 'Bodyboard places', image: 'https://drive.google.com/file/d/1y8XbBgAlqi9JwyV2d7MGXAvG8SElqbNN/view?usp=sharing' },
        { name: 'Kitesurf', description: 'Kitesurf places', image: 'https://drive.google.com/file/d/1qf0OVk6Fycpq9HK21Fen4SWK97dlRZFE/view?usp=sharing' },
        { name: 'Standup Paddle', description: 'Stand up paddle places', image: 'https://drive.google.com/file/d/1OunXcQGDq3dev_KIOiUSDWIyMJ9CTAWh/view?usp=sharing' },
        { name: 'Surf', description: 'Surf places', image: 'https://drive.google.com/file/d/1yb9w2jFvca2ZbmU0qwFHH37aU_pgF7DW/view?usp=sharing' },
    ])
}
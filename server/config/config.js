// put bookshelf schemas here
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8'
    }
});

const db = require('bookshelf')(knex);

db.knex.schema.hasTable('user').then((exists) => {
    if (!exists) {
        db.knex.schema.createTable('user', (user) => {
            user.increments('id').primary();

            /**
             * Users will log in with either Google or Facebook, not both. Record the provider
             * and the provider id
             */
            user.string('oauth_provider', 20).notNullable();
            user.integer('provider_id').notNullable();
            
            user.string('display_name', 100).notNullable();
            user.string('img_url', 250);
            user.string('contact_number', 15);
            user.string('email', 100);
            user.string('bio', 280);
            user.integer('age');
            user.date('created_at');
            user.date('updated_at');
        }).then( table => {
            console.log('Created new "user" table', table);
        });
    }
});

db.knex.schema.hasTable('event').then( exists => {
    if (!exists) {
        db.knex.schema.createTable('event', event => {
            event.increments('id').primary();
            event.integer('creator_id').references('user.id');
            event.integer('wait_list_id').references('wait_list.id')
            event.string('title').notNullable();
            event.string('description').notNullable();
            event.date('date_time', 100).notNullable();
            event.string('.img_url', 250);
            event.string('location');
            event.integer('skill_level');
            event.string('habitat', 60);
            event.date('created_at');
            event.date('updated_at');
        }).then( table => {
            console.log('Created new "event" table', table);
        });
    }
});

db.knex.schema.hasTable('wait_list').then( exists => {
    if (!exists) {
        db.knex.schema.createTable('wait_list', waitList => {
            waitList.increments('id').primary();
            waitList.integer('event_it').references('event.id');
            waitList.integer('user_id').references('user.id');
            waitList.string('flag', 60).notNullable();
        }).then( tables => {
            console.log('Created new "wait_list" table', table);
        })
    }
});

db.knex.schema.hasTable('user_rating').then( exists => {
    if (!exists) {
        db.knex.createTable('user_rating', userRating => {
            userRating.increments('id').primary();
            userRating.integer('rater_id').references('user.id');
            userRating.integer('ratee_id').references('user.id');
            userRating.integer('rating');
        }).then( table => {
            console.log('Created new "user_rating" table', table);
        });
    }
});

db.knex.hasTable('skill_rating').then( exists => {
    if (!exists) {
        db.knex.createTable('skill_rating', skillRating => {
            skillRating.increments('id').primary();
            skillRating.integer('user_id').references('user.id');
            skillRating.integer('tag_id').references('tag.id');
            skillRating.integer('rating');
        }).then( table => {
            console.log('Created new "skill_rating" table', table);
        });
    }
});

db.knex.hasTable('tag').then( exists => {
    if (!exists) {
        db.knex.createTable('tag', tag => {
            tag.increments('id').primary();
            tag.string('tag', 60).notNullable();
            tag.string('category', 60).notNullable();
        }).then( table => {
            console.log('Created new "tag" table', table);
        });
    }
});

db.knex.hasTable('event_tag').then( exists => {
    if (!exists) {
        db.knex.createTable('event_tag', eventTag => {
            eventTag.increments('id').primary();
            eventTag.integer('event_id').references('event.id');
            eventTag.integer('tag_id').references('eventTag.id');
        }).then( table => {
            console.log('Created new "event_tag" table', table);
        });
    }
});

module.exports = db; 

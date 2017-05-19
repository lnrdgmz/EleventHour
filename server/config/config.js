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
            user.integer('google_id').notNullable();
            user.integer('facebook_id').notNullable();
            user.string('display_name', 100).notNullable();
            user.string('.img_url', 250);
            user.integer('contact_number');
            user.string('email', 100);
            user.string('bio',280);
            user.integer('age');
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
            event.string('title').notNullable();
            event.string('description').notNullable();
            event.date('date_time', 100).notNullable();
            event.string('.img_url', 250);
            event.string('location');
            event.integer('skill_level');
            event.string('habitat', 60);
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
            skillRating.integer('tag_id').references('eventTag.id');
            skillRating.integer('rating');
        }).then( table => {
            console.log('Created new "skill_rating" table', table);
        });
    }
});

db.knex.hasTable('event_tag').then( exists => {
    if (!exists) {
        db.knex.createTable('event_tag', eventTag => {
            eventTag.increments('id').primary();
            eventTag.string('tag', 60).notNullable();
            eventTag.string('category', 60).notNullable();
        }).then( table => {
            console.log('Created new "event_tag" table', table);
        });
    }
});

db.knex.hasTable('tag_event_join').then( exists => {
    if (!exists) {
        db.knex.createTable('tag_event_join', tagEventsJoin => {
            tagEventsJoin.increments('id').primary();
            tagEventsJoin.integer('event_id').references('event.id');
            tagEventsJoin.integer('tag_id').references('eventTag.id');
        }).then( table => {
            console.log('Created new "tag_event_join" table', table);
        });
    }
});

module.exports = db; 

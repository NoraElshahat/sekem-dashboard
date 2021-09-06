const express = require('express');
const AdminBro = require('admin-bro');
const mongooseAdminBro = require('@admin-bro/mongoose');
const expressAdminBro = require('@admin-bro/express');

var app = express();
const connection = require('./config/db.config');
connection.once('open', () => console.log('Database connected Successfully'));
connection.on('error', () => console.log('Error'));

const Carrers = require('../sekem-development-foundation-backend/src/models/careers');
const MediaCenter = require('../sekem-development-foundation-backend/src/models/media-center');
const News = require('../sekem-development-foundation-backend/src/models/news');
const Programs = require('../sekem-development-foundation-backend/src/models/programs');
const Projects = require('../sekem-development-foundation-backend/src/models/projects');
const Publication = require('../sekem-development-foundation-backend/src/models/publication');
const Sectors = require('../sekem-development-foundation-backend/src/models/sectors');

AdminBro.registerAdapter(mongooseAdminBro);

const AdminBroOptions = {
  Database: [connection],
  resources: [
    Carrers,
    MediaCenter,
    News,
    Programs,
    Projects,
    Publication,
    Sectors,
  ],
};

const adminBro = new AdminBro({ AdminBroOptions });
const router = expressAdminBro.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);

app.listen(5000, () => console.log('Listening to Port 5000'));

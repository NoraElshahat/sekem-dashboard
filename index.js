const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const mongoose = require('mongoose');
AdminBro.registerAdapter(AdminBroMongoose);

const express = require('express');
const app = express();

// career table
const Careers = mongoose.model('Careers', {
  type: {
    type: Array,
  },
  name: { type: String },
  email: { type: String },
  subject: { type: String },
  message: { type: String },
});
// media center
const MediaCenter = mongoose.model('MediaCenter', {
  title: {
    type: String,
  },
  img: {
    type: String,
  },
  href: {
    type: String,
  },
});

// news table
const News = mongoose.model('News', {
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  details: {
    type: String,
    required: [true, 'Desciption is required'],
  },

  date: {
    type: String,
  },
  img: {
    type: String,
  },
});

// programs table
const Programs = mongoose.model('Programs', {
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  details: {
    type: Array,
  },
});
// projects table
const Projects = mongoose.model('Projects', {
  title: {
    type: String,
    required: [true, 'title title required'],
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  objective: {
    type: String,
  },
  trainingDetails: {
    type: String,
  },
  sustainability: {
    type: String,
  },
  pictures: [
    {
      type: String,
    },
  ],
});
// publications table
const Publications = mongoose.model('Publications', {
  img: { type: String },
  title: { type: String },
  link: { type: String },
});

// sectors table
const Sectors = mongoose.model('Sectors', {
  title: {
    type: String,
    required: [true, 'sector title required'],
  },
  img: {
    type: String,
  },
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Programs',
    },
  ],
});

const run = async () => {
  const mongooseDb = await mongoose.connect('mongodb://127.0.0.1:27017/sdf', {
    useNewUrlParser: true,
  });

  // Passing resources by giving entire database
  const adminBro = new AdminBro({
    databases: [mongooseDb],
    resources: [
      Careers,
      MediaCenter,
      News,
      Programs,
      Projects,
      Publications,
      Sectors,
    ],
  });

  const router = AdminBroExpress.buildRouter(adminBro);
  app.use(adminBro.options.rootPath, router);
};

run();

app.listen(8080, () => console.log('Dashboard is under localhost:8080/admin'));

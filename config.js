const Config = require('markdown-it-chain');
const taskLists = require('markdown-it-task-lists');
const containers = require('./containers');
const overWriteFenceRule = require('./fence');
const config = new Config();

config.options.html(true).end().plugin('todo').use(taskLists).end().plugin('containers').use(containers).end();

const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;

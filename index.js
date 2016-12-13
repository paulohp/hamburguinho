const TelegramBot = require('node-telegram-bot-api');
const token = '325253423:AAGiDit8irOeI7irUu37CbJmGOb0DPvneyM';
const Datastore = require('@google-cloud/datastore');
const projectId = 'tough-future-146915'; 
const uuidV4 = require('uuid/v4');

const datastore = Datastore({
  projectId: projectId
});

var bot = new TelegramBot(token, { polling: true });

bot.on('message', function (msg) {
  const chatId = msg.chat.id;
  const kind = 'Message';
  const name = uuidV4();
  const messageKey = datastore.key([kind, name]);
  const message = {
    key: messageKey,
    data: {
      message: msg.text,
      id: msg.from.id,
      name: `${msg.from.first_name} ${msg.from.last_name}`
    }
  };

  datastore.save(message);
});

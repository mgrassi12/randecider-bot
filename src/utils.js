import morgan from 'morgan';
import tracer from 'tracer';

const messages = ['I think you should go with ', 'Give this one a shot: ', 'I have decided on ', 'I have selected ', 'I have chosen '];

export const log = (() => {
  const logger = tracer.colorConsole();
  logger.requestLogger = morgan('dev');
  return logger;
})();

export const generateRandomNumber = (length => Math.floor((Math.random() * length) + 0));

export const randomlySelectAnOption = ((options) => {
  let text = 'You did not give me enough options to make a decision. Please give me at least two, separated with a semi colon. For example, type "/decide burgers; sushi; tacos".';
  options.forEach(function trimWhitespace(element, index) {
    this[index] = element.trim();
  }, options);
  if (options.length > 1) {
    const selectedOptions = options[generateRandomNumber(options.length)];
    text = `${messages[generateRandomNumber(messages.length)]}"${selectedOptions}".`;
  }
  return text;
});

export const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

export const delay = time => new Promise((resolve) => {
  setTimeout(() => { resolve(); }, time);
});

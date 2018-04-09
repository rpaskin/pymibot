# PymiBot - Dispute facts with your friends!

This is the PUC-Rio Team's repo for a Global Editors/ Globo Lab Hackathon in Sao Paulo, April 2018 project.

This is a starter Telegram Bot that gest data from a back-end with a REST API. The back-end feeds the system with a curated list of "hot" or controversial news items that could be truthful or not (and that have been fact-checked already).

![Journalist Icon](https://raw.githubusercontent.com/rpaskin/pymibot/master/icon-02.png "PymiBot Icon")

*Image credit: Aldric Rodríguez https://thenounproject.com/aldricroib2*

## Features

- Connection to Telegram (Read more at https://core.telegram.org/bots)
- Fetching of data from back-end
- Humor

## Requirements

- Node.js
- npm
- Node packages: dotenv, request, telegraf

An .env file, with the Telegram Token, like so

    BOT_TOKEN=<token goes here>

## How to Use

To use this project, follow these steps:

1. Clone the project and cd to the directory
2. Get a Bot key from The Botfather (https://telegram.me/botfather)
3. Add the key to a .env file (see above)
4. Run `npm install`
4. Run index.js on a server (e.g. `node index.js` or `nodemon`)


## TO DO

1. A more complete dialog flow
2. More interactivity
3. Payments through Telegram (See https://core.telegram.org/bots/payments)
4. Analog interactions through other chat platforms
5. More...?

We'd love to have contributors! Please contact us or fork the project and submit improvements!

## Credits

- Global Editors Network Lab: https://www.globaleditorsnetwork.org/programmes/editors-lab/globo-editors-lab/ (especially Évangéline de Bourgoing)
- Globo Lab and its gracious and welcoming hosts
- The Team: Beatriz Magalhães/ Raul Pimentel/ Ronnie Paskin

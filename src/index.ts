import "reflect-metadata";
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import routes from './routes';
import db from './db';

const server = express();
server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());
server.use(routes);

server.listen({ port: 3000 }, () => console.log('Web Server is running on port 3000...\n'));

db.eventManager.on(db.Events.Connected, () => console.log('Successfully connected to Database.'));
db.eventManager.on(db.Events.Disconnected, () => console.log('Disconnected from DB.'));

function handleError(err?:Error | NodeJS.Signals | void) {
    if(err) {
        console.error(err);

        if(err instanceof Error) {
            console.error(err.stack);    
        }
    }
    
    db.disconnect({ force: true });
    process.exit(0);
}

process.on('uncaughtException', handleError);
process.on('SIGINT', handleError);
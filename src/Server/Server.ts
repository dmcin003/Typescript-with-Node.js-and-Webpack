import {createServer,IncomingMessage,ServerResponse} from 'http';
import { Authorizer } from '../Authorization/Authorizer';
import { LoginHandler } from './LoginHandler';
import {Utils} from './Utils';

const port = 3010;


export class Server{

  private authorizer:Authorizer = new Authorizer();

  public createServer(){
    createServer((req:IncomingMessage,res:ServerResponse)=>{
      console.log('got request from: ' + req.url);
      const basePath = Utils.getUrlBasePath(req.url);
      switch(basePath){
        case 'login':
          new LoginHandler(req,res,this.authorizer).handleRequest();
          break;
        default:
          break;
      }
      res.end();
    }).listen(port);
    console.log(`Server running on port ${port}`);

  }
}


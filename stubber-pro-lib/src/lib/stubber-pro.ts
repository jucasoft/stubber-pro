import * as express from 'express';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import { Db, DbItem } from './models/db';
import { DbItemController } from './api/item/db-item-controller';
import {
  StubberProOptions,
  StubberProRouteOptions,
} from './models/stubber-pro-options';
import { MyRequest } from './models/my-request';
import { hasOwnProperty } from './utility';
import { responseInterceptor } from './response-interceptor';
import { BaseRoute } from './models/route-base';
import {open,existsSync, readFileSync, writeFileSync} from "fs";

export function stubberPro(
  devServer: any,
  opt: StubberProOptions,
  appStaticFileLocation: string
): void {
  let db: Db = {};

  const onProxyReq = (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ) => {
    const key = getKey(opt, req);
    if (hasOwnProperty(db, key) && db[key].active) {
      // blocco la chiamata al BE
      // req.abort();
      // aggiungo alla risposta gli headers
      db[key].headers.forEach((item: { key: string; value: string }) => {
        res.setHeader(item.key, item.value);
      });
      // res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(db[key].data);
      res.end();
      // return res.end(db[key].data.toString());
    } else {
      next();
    }
  };

  const onProxyRes = (routeOpt: StubberProRouteOptions) =>
    responseInterceptor(
      routeOpt,
      (responseBuffer: Buffer, req: IncomingMessage, res: ServerResponse) => {
        const key = getKey(opt, req);
        // console.log("stubberPro.onProxyRes()");
        // console.log("responseBuffer: ", responseBuffer);
        // console.log("responseBuffer.toString(): ", responseBuffer.toString());
        if (!hasOwnProperty(db, key)) {
          const headers: { key: string; value: string }[] = copyHeaders(res);
          db[key] = {
            data: responseBuffer,
            headers,
            key,
            createdAt: new Date().getTime(),
            active: opt.activeDefaultValue,
          };
        }
      }
    );

  function copyHeaders(
    originalResponse: any
  ): { key: string; value: string }[] {
    const result: { key: string; value: string }[] = [];
    const headers = originalResponse.getHeaders();
    let keys = Object.keys(headers);
    // ignore chunked, brotli, gzip, deflate headers
    // keys = keys.filter((key) => !['content-encoding', 'transfer-encoding'].includes(key));
    keys = keys.filter((key) => ![''].includes(key));
    keys.forEach((key) => {
      let value = headers[key];
      if (key === 'set-cookie') {
        // remove cookie domain
        value = Array.isArray(value) ? value : [value];
        value = value.map((x: string) => x.replace(/Domain=[^;]+?/i, ''));
      }
      result.push({ key, value });
    });
    return result;
  }

  // devServer.app.use(express.json())
  const dump = express.Router();
  dump.post(`/dump`,     (req: MyRequest<DbItem>, response: Response) => {
    try {
      writeFileSync(`stubber-pro-dump.spd`, JSON.stringify(db));
      response.send(JSON.stringify({hasError:false, data:{}, message:''}));
    } catch (e) {
      console.error(`Error writing stubber-pro-dump.spd.`);
    }
  });
  dump.post(`/restore`,     (req: MyRequest<DbItem>, response: Response) => {
    open(`stubber-pro-dump.spd`, 'r', (err:any, fd:any) => {

      if (err) {
        if (err.code === 'ENOENT') {
          console.error('stubber-pro-dump.spd does not exist');
          return;
        }
      }

      try {
        const file = readFileSync(`stubber-pro-dump.spd`)
        const fileToString = file.toString()
        const dbTemp = JSON.parse(fileToString);
        const dbKeys = Object.keys(dbTemp)
        dbKeys.forEach(key => {
          db[key] = dbTemp[key]
        })
        const keys = Object.keys(db);
        response.send(
          keys.map((key: string) => ({ ...db[key], key , data:null}))
        );
      } catch (e) {
        console.error(`Error reading stubber-pro-dump.spd.`);
      }
    });
  });
  dump.get(`${opt.appUri}/options`, (_: any, response: any) => {
    response.send(opt);
  });
  devServer.app.use(`${opt.apiUri}/utils`, express.json());
  devServer.app.use(`${opt.apiUri}/utils`, dump);


  const itemController = new DbItemController(db);
  const router = new BaseRoute<DbItem>(itemController).getRouter();
  devServer.app.use(`${opt.apiUri}/item`, express.json());
  devServer.app.use(`${opt.apiUri}/item`, router);

  // web administrative page, angular static files.
  devServer.app.use(opt.appUri, express.static(appStaticFileLocation));

  for (const conf of opt.routes) {
    devServer.app.use(conf.routePath, onProxyReq);
    // devServer.app.use(conf.routePath, onProxyRes(conf.pathFilter))
    devServer.app.use(conf.routePath, onProxyRes(conf));
  }
}

function getKey(opt: StubberProOptions, req: any): string {
  return opt.getKey ? opt.getKey(opt, req) : getPath(opt, req);
}

function getPath(opt: StubberProOptions, req: any): string {
  return path.join(req.originalUrl, `${req.method}`);
}

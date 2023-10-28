import type * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as zlib from 'zlib';
import {Buffer} from "node:buffer";
import {StubberProRouteOptions} from "./models/stubber-pro-options";
import {matchPathFilter} from "./path-filter";

type Interceptor = (
  buffer: Buffer,
  req: IncomingMessage,
  res: ServerResponse
) => void;

export function responseInterceptor(opt: StubberProRouteOptions, interceptor: Interceptor) {
  return async function proxyResResponseInterceptor(
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void
  ): Promise<void> {


    const matched: boolean = matchPathFilter(opt.pathFilter, req.url, req)

    if (matched) {
      next()
      return
    }

    const write = res.write.bind(res)
    const writeHead = res.writeHead.bind(res)
    const end = res.end.bind(res)
    const body: any[] = [];

    (res as any).write = (...args: any[]) => {
      body.push(args[0])
      write(...args)
    }

    (res as any).writeHead = (...args: any[]) => {
      writeHead(...args)
    }

    (res as any).end = (...args: any[]) => {
      const result = Buffer.concat(body)
      interceptor(result, req, res)
      end(...args)
    }

    next()
  };
}

/**
 * Streaming decompression of proxy response
 * source: https://github.com/apache/superset/blob/9773aba522e957ed9423045ca153219638a85d2f/superset-frontend/webpack.proxy-config.js#L116
 */
export function decompress<TReq extends http.IncomingMessage = http.IncomingMessage>(
  proxyRes: TReq,
  contentEncoding?: string,
): TReq | zlib.Gunzip | zlib.Inflate | zlib.BrotliDecompress {
  let _proxyRes: TReq | zlib.Gunzip | zlib.Inflate | zlib.BrotliDecompress = proxyRes;
  let decompress;

  switch (contentEncoding) {
    case 'gzip':
      decompress = zlib.createGunzip();
      break;
    case 'br':
      decompress = zlib.createBrotliDecompress();
      break;
    case 'deflate':
      decompress = zlib.createInflate();
      break;
    default:
      break;
  }

  if (decompress) {
    // console.log(`decompress proxy response with 'content-encoding': %s`, contentEncoding);
    _proxyRes.pipe(decompress);
    _proxyRes = decompress;
  }

  return _proxyRes;
}

/**
 * Copy original headers
 * https://github.com/apache/superset/blob/9773aba522e957ed9423045ca153219638a85d2f/superset-frontend/webpack.proxy-config.js#L78
 */
function copyHeaders(originalResponse: any, response: any): void {
  // console.log('copy original response headers');

  response.statusCode = originalResponse.statusCode;
  response.statusMessage = originalResponse.statusMessage;

  if (response.setHeader) {
    let keys = Object.keys(originalResponse.headers);

    // ignore chunked, brotli, gzip, deflate headers
    keys = keys.filter((key) => !['content-encoding', 'transfer-encoding'].includes(key));

    keys.forEach((key) => {
      let value = originalResponse.headers[key];

      if (key === 'set-cookie') {
        // remove cookie domain
        value = Array.isArray(value) ? value : [value];
        value = value.map((x: string) => x.replace(/Domain=[^;]+?/i, ''));
      }

      response.setHeader(key, value);
    });
  } else {
    response.headers = originalResponse.headers;
  }
}

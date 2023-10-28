import { Request } from 'express'

export interface MyRequest<ReqBody=never, ResBody=never> extends Request<never, ResBody, ReqBody>{
    body:ReqBody;
}

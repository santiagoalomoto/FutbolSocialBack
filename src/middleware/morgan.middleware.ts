// src/middleware/morgan.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morganImport from 'morgan';

const morgan = morganImport.default || morganImport;

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): void {
    morgan('dev')(req, res, next); // ✅ esto evita el error "morgan is not a function"
  }
}


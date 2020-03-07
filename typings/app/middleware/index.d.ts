// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPublicProxy = require('../../../app/middleware/publicProxy');

declare module 'egg' {
  interface IMiddleware {
    publicProxy: typeof ExportPublicProxy;
  }
}

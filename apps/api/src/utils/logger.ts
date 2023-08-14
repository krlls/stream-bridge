/*eslint-disable no-console*/
import moment from 'moment'
import clc from 'cli-color'
import { RouterContext } from 'koa-router'
import { isEmpty } from 'lodash'

import { serverConfig } from '../config'
import { EStreamingType } from '../types/common'

enum ELogType {
  WARN = 'WARN',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

enum ELogger {
  API = 'API',
  STREAMING = 'STREAMING CLIENT',
}

abstract class Logger {
  protected static logInfo(name: string, ...args: any) {
    return this.log(ELogType.INFO, clc.green(name), ...args)
  }

  protected static logWarn(name: string, ...args: any) {
    return this.log(ELogType.WARN, clc.green(name), ...args)
  }

  protected static logError(name: string, ...args: any) {
    return this.log(ELogType.ERROR, clc.green(name), ...args)
  }

  private static log(type: ELogType, name: string, ...args: any) {
    if (serverConfig.silent) {
      return
    }

    const color = {
      [ELogType.WARN]: clc.yellow,
      [ELogType.ERROR]: clc.red,
      [ELogType.INFO]: clc.blue,
    }[type]

    return console.log(`[${moment().format('YY-MM-DD hh:mm:ss:SS')}] ${color(type)} [${name}]`, ...args)
  }
}

export class ApiLogger extends Logger {
  static info(ctx: RouterContext, ...args: any) {
    return this.logInfo(ELogger.API, ctx.req.method, ctx.request.url, ...args)
  }

  static warn(ctx: RouterContext, ...args: any) {
    return this.logWarn(ELogger.API, ctx.req.method, ctx.request.url, ...args)
  }

  static error(ctx: RouterContext, ...args: any) {
    return this.logError(ELogger.API, ctx.req.method, ctx.request.url, ...args)
  }
}

export class StreamingLogger extends Logger {
  constructor(private name: EStreamingType) {
    super()
  }
  info(...args: any) {
    return StreamingLogger.logInfo(this.name, ...args)
  }

  warn(...args: any) {
    return StreamingLogger.logWarn(this.name, ...args)
  }

  error(...args: any) {
    return StreamingLogger.logError(this.name, ...args)
  }
}

export class ImportLogger extends Logger {
  static info(...args: any) {
    return StreamingLogger.logInfo('IMPORT', ...args)
  }

  static warn(...args: any) {
    return StreamingLogger.logWarn('IMPORT', ...args)
  }

  static error(...args: any) {
    return StreamingLogger.logError('IMPORT', ...args)
  }
}

export const showNotEmpty = <A, B>(a: A, b: B) => (!isEmpty(a) ? a : !isEmpty(b) ? b : '')

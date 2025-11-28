// Enhanced logging for hub APIs
export class Logger {
  private static log(level: string, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      service: 'hub-api',
      ...meta
    };
    
    console.log(JSON.stringify(logEntry));
  }

  static info(message: string, meta?: any) {
    this.log('INFO', message, meta);
  }

  static error(message: string, meta?: any) {
    this.log('ERROR', message, meta);
  }

  static warn(message: string, meta?: any) {
    this.log('WARN', message, meta);
  }

  static debug(message: string, meta?: any) {
    if (process.env.NODE_ENV === 'development') {
      this.log('DEBUG', message, meta);
    }
  }
}

export function logApiRequest(req: Request, startTime: number) {
  const duration = Date.now() - startTime;
  Logger.info('API Request', {
    method: req.method,
    url: req.url,
    duration,
    userAgent: req.headers.get('user-agent'),
  });
}
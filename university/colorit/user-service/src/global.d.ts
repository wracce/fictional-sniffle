declare namespace Express {
  interface Request {
    user?: {
      userId: string;
      email?: string;
    };
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: number;
    MONGO_URI?: string;
    JWT_SECRET?: string;
  }
}

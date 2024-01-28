export interface DocumentOptions {
  ignoreGlobalPrefix?: boolean;
  deepScanRoutes?: boolean;
  operationIdFactory?: (controllerKey: string, methodKey: string) => string;
}

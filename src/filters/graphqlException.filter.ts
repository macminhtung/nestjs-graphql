import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

export const formatLoggerMessage = (stack: any, message: string) => {
  const errorLines: string[] = stack?.split('\n')?.slice(1, 4);
  return `${message}\n${errorLines?.reduce(
    (prevV: string, curV: string, idx: number) =>
      prevV + `- ${curV?.trim()}${idx < errorLines.length - 1 ? '\n' : ''}`,
    '',
  )}\n`;
};

@Catch()
export class GraphqlExceptionsFilter implements GqlExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: { status: number; message: string; stack: any }) {
    // Format logger message
    const {
      status = HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      stack,
    } = exception;

    const loggerMessage = formatLoggerMessage(stack, message);

    // Display error message
    if (status >= 500) this.logger.error(loggerMessage);
    else this.logger.warn(loggerMessage);

    return exception;
  }
}

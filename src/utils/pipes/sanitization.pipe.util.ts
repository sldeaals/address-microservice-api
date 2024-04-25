import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizationPipe implements PipeTransform {
  transform(value: string | number | object, metadata: ArgumentMetadata) {
    if (
      metadata.type !== 'query' &&
      metadata.type !== 'param' &&
      metadata.type !== 'body'
    ) {
      return value;
    }

    if (value === undefined) {
      return value;
    }

    if (typeof value === 'object') {
      const sanitizedObject = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const propValue = value[key];
          sanitizedObject[key] =
            typeof propValue === 'string'
              ? this.sanitizeString(propValue)
              : propValue;
        }
      }
      return sanitizedObject;
    }

    if (typeof value === 'string') {
      const sanitizedValue = sanitizeHtml(value);
      return sanitizedValue;
    }

    throw new BadRequestException('Invalid input data');
  }

  private sanitizeString(value: string): string {
    return sanitizeHtml(value);
  }
}

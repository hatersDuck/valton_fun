import { SetMetadata } from '@nestjs/common';

export const CustomType = (value: string) => SetMetadata('custom:type', value);
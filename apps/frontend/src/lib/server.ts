import { treaty } from '@elysiajs/eden';
import type { App } from '@bi_farmacia/backend/src';

export const server = treaty<App>('localhost:3000');

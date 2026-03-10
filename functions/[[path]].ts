import { createRequestHandler } from '@remix-run/node';
import * as build from '../build/server';

export const onRequest = createRequestHandler(build);

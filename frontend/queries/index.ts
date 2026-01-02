import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { form } from './form';
import { session } from './session';

export const queries = mergeQueryKeys(form, session);

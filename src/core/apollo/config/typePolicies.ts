import { TypePolicies } from '@apollo/client';
import { QUERY } from 'features/fetchChatMessages/graphql/query';
import { DeepPartial } from 'utility-types';

import { createChatMessages } from '$entities';
import {
  MessageAddedOutput,
  MessageDto,
  MessagesInput,
  MessagesOutput,
} from '$shared';

const MESSAGE_TYPE_NAME = 'MessageDto';

const MESSAGES_TYPE_NAME = 'MessagesOutput';

export type GraphQlInput<T> = {
  input: T;
};

export const customTypePolicies: TypePolicies[] = [
  {
    [MESSAGES_TYPE_NAME]: {
      merge: true,
    },

    // Subscription: {
    //   fields: {
    //     messageAdded: {
    //       merge: (
    //         _existing: MessagesOutput,
    //         incoming: MessageAddedOutput,
    //         options,
    //       ) => {
    //         const { toReference, cache, mergeObjects } = options;

    //         const newMessageRef = incoming.data;
    //         // TODO retrieve from cache MessageDto somehow

    //         const cachedMessages = cache.read<MessagesOutput>({
    //           query: QUERY,
    //           optimistic: true,
    //           variables: {
    //             input: {
    //               chatId: 17,
    //             },
    //           } satisfies { input: MessagesInput },
    //         });

    //         const fakeMessage: DeepPartial<MessageDto> = {
    //           id: 200,
    //           chat: {
    //             id: 17,
    //           },
    //           sender: {
    //             id: 5,
    //             username: 'test',
    //           },
    //           text: 'test',
    //         };

    //         const m = cache.modify<MessagesOutput>({
    //           id: `${MESSAGES_TYPE_NAME}:2`,
    //           fields: {
    //             data: [],
    //           },
    //         });

    //         console.log('m', m);
    //       },
    //     },
    //   },
    // },
  },
];

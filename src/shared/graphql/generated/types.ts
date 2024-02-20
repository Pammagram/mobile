export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AddMembersInput = {
  chatId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};

export type AddMembersOutput = {
  __typename?: 'AddMembersOutput';
  data: Scalars['Boolean']['output'];
};

export type AddMessageInput = {
  chatId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export type AddMessageOutput = {
  __typename?: 'AddMessageOutput';
  data: MessageDto;
};

export type ChatDto = {
  __typename?: 'ChatDto';
  id: Scalars['Int']['output'];
  members: Array<UserDto>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ChatInput = {
  id: Scalars['Int']['input'];
};

export type ChatOutput = {
  __typename?: 'ChatOutput';
  data: ChatDto;
};

export enum ChatType {
  Group = 'GROUP',
  Private = 'PRIVATE'
}

export type ChatsInput = {
  chatIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ChatsOutput = {
  __typename?: 'ChatsOutput';
  data: Array<ChatDto>;
};

export type CreateChatInput = {
  memberIds: Array<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type: ChatType;
};

export type CreateChatOutput = {
  __typename?: 'CreateChatOutput';
  data: ChatDto;
};

export type CreateUserInput = {
  phoneNumber: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  data: UserDto;
};

export type EditChatInput = {
  chatId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type EditChatOutput = {
  __typename?: 'EditChatOutput';
  data: ChatDto;
};

export type LogoutOutput = {
  __typename?: 'LogoutOutput';
  data: Scalars['Boolean']['output'];
};

export type MessageAddedOutput = {
  __typename?: 'MessageAddedOutput';
  data: MessageDto;
};

export type MessageDto = {
  __typename?: 'MessageDto';
  chat: ChatDto;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  sender: UserDto;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MessagesInput = {
  chatId: Scalars['Int']['input'];
};

export type MessagesOutput = {
  __typename?: 'MessagesOutput';
  chatId: Scalars['Int']['output'];
  data: Array<MessageDto>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMembers: AddMembersOutput;
  addMessage: AddMessageOutput;
  createChat: CreateChatOutput;
  createUser: CreateUserOutput;
  editChat: EditChatOutput;
  logout: LogoutOutput;
  removeChat: RemoveChatOutput;
  removeMember: RemoveMemberOutput;
  sendSms: SendSmsOutput;
  updateMe: UpdateUserOutput;
  verifySms: VerifySmsOutput;
};


export type MutationAddMembersArgs = {
  input: AddMembersInput;
};


export type MutationAddMessageArgs = {
  input: AddMessageInput;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationEditChatArgs = {
  input: EditChatInput;
};


export type MutationRemoveChatArgs = {
  input: RemoveChatInput;
};


export type MutationRemoveMemberArgs = {
  input: RemoveMemberInput;
};


export type MutationSendSmsArgs = {
  input: SendSmsInput;
};


export type MutationUpdateMeArgs = {
  input: UpdateUserInput;
};


export type MutationVerifySmsArgs = {
  input: VerifySmsInput;
};

export type Query = {
  __typename?: 'Query';
  chat: ChatOutput;
  chats: ChatsOutput;
  dummy: Scalars['String']['output'];
  me?: Maybe<UserDto>;
  messages: MessagesOutput;
  users: Array<UserDto>;
};


export type QueryChatArgs = {
  input: ChatInput;
};


export type QueryChatsArgs = {
  input: ChatsInput;
};


export type QueryMessagesArgs = {
  input: MessagesInput;
};

export type RemoveChatInput = {
  chatId: Scalars['Int']['input'];
};

export type RemoveChatOutput = {
  __typename?: 'RemoveChatOutput';
  data: Scalars['Boolean']['output'];
};

export type RemoveMemberInput = {
  chatId: Scalars['Int']['input'];
  memberId: Scalars['Int']['input'];
};

export type RemoveMemberOutput = {
  __typename?: 'RemoveMemberOutput';
  data: Scalars['Boolean']['output'];
};

export type SendSmsInput = {
  phoneNumber: Scalars['String']['input'];
};

export type SendSmsOutput = {
  __typename?: 'SendSmsOutput';
  data: Scalars['Boolean']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: MessageAddedOutput;
};

export type UpdateUserInput = {
  lastActiveInMs?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserOutput = {
  __typename?: 'UpdateUserOutput';
  data: UserDto;
};

export type UserDto = {
  __typename?: 'UserDto';
  id: Scalars['Int']['output'];
  lastActiveInMs: Scalars['DateTime']['output'];
  phoneNumber: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type VerifySmsInput = {
  code: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VerifySmsOutput = {
  __typename?: 'VerifySmsOutput';
  data: UserDto;
};

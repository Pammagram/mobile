export type Maybe<T> = T | null;

export type InputMaybe<T> = Maybe<T>;

export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};

export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };

export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  Boolean: { input: boolean; output: boolean };
  DateTime: { input: string; output: string };
  Float: { input: number; output: number };
  ID: { input: string; output: string };
  Int: { input: number; output: number };
  String: { input: string; output: string };
};

export type AddMembersInput = {
  chatId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};

export type AddMembersOutput = {
  data: Scalars['Boolean']['output'];
  __typename?: 'AddMembersOutput';
};

export type AddMessageInput = {
  chatId: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export type AddMessageOutput = {
  data: MessageDto;
  __typename?: 'AddMessageOutput';
};

export type ChatCreatedOutput = {
  data: ChatDto;
  __typename?: 'ChatCreatedOutput';
};

export type ChatDto = {
  id: Scalars['Int']['output'];
  members: Array<UserDto>;
  title: Scalars['String']['output'];
  type: ChatType;
  __typename?: 'ChatDto';
};

export type ChatInput = {
  id: Scalars['Int']['input'];
};

export type ChatOutput = {
  __typename?: 'ChatOutput';
  data?: Maybe<ChatDto>;
};

export type ChatRemovedOutput = {
  data: ChatDto;
  __typename?: 'ChatRemovedOutput';
};

export enum ChatType {
  Group = 'GROUP',
  Private = 'PRIVATE',
}

export type ChatsInput = {
  chatIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ChatsOutput = {
  data: Array<ChatDto>;
  __typename?: 'ChatsOutput';
};

export type CreateChatInput = {
  memberIds: Array<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type: ChatType;
};

export type CreateChatOutput = {
  data: ChatDto;
  __typename?: 'CreateChatOutput';
};

export type CreateUserInput = {
  phoneNumber: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserOutput = {
  data: UserDto;
  __typename?: 'CreateUserOutput';
};

export type EditChatInput = {
  chatId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type EditChatOutput = {
  data: ChatDto;
  __typename?: 'EditChatOutput';
};

export type LogoutOutput = {
  data: Scalars['Boolean']['output'];
  __typename?: 'LogoutOutput';
};

export type MeOutput = {
  __typename?: 'MeOutput';
  data?: Maybe<UserDto>;
};

export type MessageAddedOutput = {
  data: MessageDto;
  __typename?: 'MessageAddedOutput';
};

export type MessageDto = {
  chat: ChatDto;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  sender: UserDto;
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  __typename?: 'MessageDto';
};

export type MessagesInput = {
  chatId: Scalars['Int']['input'];
};

export type MessagesOutput = {
  chatId: Scalars['Int']['output'];
  data: Array<MessageDto>;
  __typename?: 'MessagesOutput';
};

export type Mutation = {
  addMembers: AddMembersOutput;
  addMessage: AddMessageOutput;
  createChat: CreateChatOutput;
  createUser: CreateUserOutput;
  editChat: EditChatOutput;
  logout: LogoutOutput;
  removeChat: RemoveChatOutput;
  __typename?: 'Mutation';
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
  chat: ChatOutput;
  chats: ChatsOutput;
  dummy: Scalars['String']['output'];
  messages: MessagesOutput;
  myChats: ChatsOutput;
  users: UsersOutput;
  __typename?: 'Query';
  me?: Maybe<MeOutput>;
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

export type QueryMyChatsArgs = {
  input: ChatsInput;
};

export type RemoveChatInput = {
  chatId: Scalars['Int']['input'];
};

export type RemoveChatOutput = {
  data: ChatDto;
  __typename?: 'RemoveChatOutput';
};

export type RemoveMemberInput = {
  chatId: Scalars['Int']['input'];
  memberId: Scalars['Int']['input'];
};

export type RemoveMemberOutput = {
  data: Scalars['Boolean']['output'];
  __typename?: 'RemoveMemberOutput';
};

export type SendSmsInput = {
  phoneNumber: Scalars['String']['input'];
};

export type SendSmsOutput = {
  data: Scalars['Boolean']['output'];
  __typename?: 'SendSmsOutput';
};

export type Subscription = {
  chatCreated: ChatCreatedOutput;
  chatRemoved: ChatRemovedOutput;
  messageAdded: MessageAddedOutput;
  __typename?: 'Subscription';
};

export type UpdateUserInput = {
  lastActiveInMs?: InputMaybe<Scalars['DateTime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserOutput = {
  data: UserDto;
  __typename?: 'UpdateUserOutput';
};

export type UserDto = {
  id: Scalars['Int']['output'];
  lastActiveInMs: Scalars['DateTime']['output'];
  phoneNumber: Scalars['String']['output'];
  __typename?: 'UserDto';
  username?: Maybe<Scalars['String']['output']>;
};

export type UsersOutput = {
  data: Array<UserDto>;
  __typename?: 'UsersOutput';
};

export type VerifySmsInput = {
  code: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VerifySmsOutput = {
  data: UserDto;
  __typename?: 'VerifySmsOutput';
};

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
  DateTime: { input: any; output: any; }
};

export type CreateUserInput = {
  phoneNumber: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  data: UserDto;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: CreateUserOutput;
  resendSms: Scalars['Boolean']['output'];
  sendSms: Scalars['Boolean']['output'];
  verifySms: VerifySmsOutput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationVerifySmsArgs = {
  input: VerifySmsInput;
};

export type Query = {
  __typename?: 'Query';
  dummy: Scalars['String']['output'];
  me: UserDto;
  users: Array<UserDto>;
};

export type SessionDto = {
  __typename?: 'SessionDto';
  active: Scalars['Boolean']['output'];
  ip: Scalars['String']['output'];
  lastVisitInMs: Scalars['Int']['output'];
  sessionId: Scalars['String']['output'];
  user: Array<UserDto>;
  userAgent: Scalars['String']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  id: Scalars['Int']['output'];
  lastActiveInMs: Scalars['DateTime']['output'];
  phoneNumber: Scalars['String']['output'];
  sessions?: Maybe<Array<SessionDto>>;
  username: Scalars['String']['output'];
};

export type VerifySmsInput = {
  code: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VerifySmsOutput = {
  __typename?: 'VerifySmsOutput';
  sessionId: Scalars['String']['output'];
};

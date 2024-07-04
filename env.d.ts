declare global {
  namespace NodeJS {
    interface ProcessEnv {
      //* API
      EXPO_PUBLIC_API_URL: string;

      // eslint-disable-next-line @typescript-eslint/naming-convention -- convention on project
      NODE_ENV: 'development' | 'production';
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

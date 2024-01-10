## GraphQL types generation
To automatically generate types for GraphQL resolvers, you don't need to do anything - the corresponding command is automatically run when the application starts.

If you need to generate types manually, use the following command:
```
npm run codegen
```

**Note:** You need to have a running server at the address specified in `API_URL` for the package to work correctly.
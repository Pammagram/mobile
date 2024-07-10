class RootRouteBuilder {
  chat(chatId: number | string) {
    return `chat/${chatId}`;
  }
}

export const RouteBuilder = new RootRouteBuilder();

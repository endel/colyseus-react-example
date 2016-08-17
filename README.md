# colyseus-react-example

A simple chat client and server to demonstrate how straightforward is to
integrate [Colyseus](https://github.com/gamestdio/colyseus) room states with ReactJS.

- **[Online demo](https://colyseus-react-example.herokuapp.com/#default)**
- [View client source](js/main.js)
- [View server source](server/chat_room.js)

The [ChatRoom](server/chat_room.js) room handler is able to handle different
instances by passing the [room name in the URL hash](js/main.js#L18).

Examples: [#colyseus](https://colyseus-react-example.herokuapp.com/#node),
[#react](https://colyseus-react-example.herokuapp.com/#react),
[#node](https://colyseus-react-example.herokuapp.com/#node).

## Running locally:

```
git clone https://github.com/endel/colyseus-react-example.git
cd colyseus-react-example
npm install
npm start
```

Front-end project structure based on [react-starter-project](https://github.com/rauschma/react-starter-project)

## Related projects

- [Colyseus Server](https://github.com/gamestdio/colyseus)
- [Colyseus JavaScript Client](https://github.com/gamestdio/colyseus.js)

## License

MIT

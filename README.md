<h1 align="center">How virtual scroll works</h1>

This project is used to describe how virtual scroll works.

- Q: Why we use virtual scroll, instead of normal infinite scroll?

  A: Reduce DOM nodes memory usage significantly.

To be notice, there is no sliver bullet. You'd better use virtual scroll if there are thousands of nodes that need to be rendered. Otherwise, normal infinite scroll would be better solution.

## Core

The key is how to calculate visible elements and simulate scrolling virtually.

## License

MIT © [Bowen Liu](https://set.sh)

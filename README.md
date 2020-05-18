# koa-state-helper

State middleware for koa

## Installation

```
npm install koa-state-helper
```

## Example

```
// app.js

const Koa = require('koa');
const helper = require('koa-helper');

const app = new Koa();

app.use(helper());

app.listen(3000);

// controller.js

export async function Home(ctx) {
    const isMobile = ctx.state.isMobile(ctx);
    await ctx.render('home/home.njk', {
        isMobile
    });
}

```

## Extension

```
// app.js

const Koa = require('koa');
const helper = require('koa-helper');

const app = new Koa();

app.use(helper({
    isMobile: (ctx) => { // ...do something },
    isOtherVertify: (ctx) => { // ...do something }
}));

app.listen(3000);
```
## Options

```
/**
 * @param [object] options
 * [Function or Boolean(false)] options[key]:
 * - [Function] isMobile: default is valid
 * - [Function] isWechat: default is valid
 * - [Function] isDevEnv: default is valid
 * - [Function] header: default is valid
 * all of the above are built-in methods, you can pass in false to invalid or pass in new method to rewrite
 */
```

* DefaultOptions‘s value is `Function`，developer can pass in new method to rewrite，
If you pass in a value(eg. `""`、`null` or `undefined`) parsed by `Boolean` method as false, it will be considered that you don’t want to use it and 
it will not appear in the state
* Allows you to extend the state, value must be `Funciton`, 
whether return value depends on your application scenario
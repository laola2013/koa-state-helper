#koa-helper

state middleware for koa

## Installation

```
npm install koa-helper --save
```

## Example

```
// app.js

const Koa = require('koa');
const app = new Koa();
const helper = require('koa-helper');

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


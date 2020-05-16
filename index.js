// Note! The production environment uses nginx, and there will be cases where the user-agent is empty
const isMobile = (ctx) => {
    const ua = ctx.request.header['user-agent'] || '';
    const mobileEx = /Mobile|webOS/i;
    return mobileEx.test(ua);
};

// Note! The production environment uses nginx, and there will be cases where the user-agent is empty
const isWechat = (ctx) => {
    let ua = ctx.request.header['user-agent'] || '';
    ua = ua.toLowerCase();
    return ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === "micromessenger";
};

const defaultOptions = {
    isMobile,
    isWechat,
    isDevEnv: (ctx) => process.env.NODE_ENV === 'development',
    header: (ctx) => ctx.request.header
}

/**
 * @param [object] options
 * [Function or Boolean(false)] options[key]:
 * - [Function] isMobile: default is valid
 * - [Function] isWechat: default is valid
 * - [Function] isDevEnv: default is valid
 * - [Function] header: default is valid
 * all of the above are built-in methods, you can pass in false to invalid or pass in new method to rewrite
 */

const helper = (options) => {
    const _options = Object.assign(defaultOptions, options || {});
    return async (ctx, next) => {
        for (const key in _options) {
            if (_options[key]) {
                if (typeof _options[key] !== 'function') throw new TypeError('_options[key] must be a function!');
                else ctx.state[key] = _options[key];
            }
        }
        await next();
    }
};

module.exports = helper;

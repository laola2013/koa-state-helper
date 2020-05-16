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

/**
 * @param [object] options
 * [Boolean or Function] options[key]:
 * default is Function，development can pass in new rewrites
 * Boolen must be false value that means not to use
 */

const defaultOptions = {
    isMobile,
    isWechat,
    isDevEnv: (ctx) => process.env.NODE_ENV === 'development',
    header: (ctx) => ctx.request.header
}

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

const fs = require('fs');
const _ = require("underscore");

exports.list = async (ctx, next) => {
    let data = fs.readFileSync(__dirname+'/../tempDB.json', 'utf8');
   
    ctx.body = _.where(
            JSON.parse(data),
            {setName:ctx.request.query.provider}
        )[0]
        .sets
    ;

    await next();
};

exports.read = async (ctx, next) => {
    let data = fs.readFileSync(__dirname+'/../tempDB.json', 'utf8');
   
    ctx.body = _.where(
            JSON.parse(data),
            {setName:ctx.request.query.provider}
        )[0]
        .sets
        .filter(s => s.name === ctx.request.query.id
    )[0];

    await next();
};

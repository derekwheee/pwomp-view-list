const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const Handlebars = require('handlebars');
const eutil = require('exemplar-util');

function helper(options) {
    if (!('path' in options.hash)) return '';

    const views = eutil.getViewsSync(options.hash.path);
    const templates = views.map((view) => {
        const content = fs.readFileSync(view, 'utf-8');
        return eutil.parseView({
            template : content,
        });
    });
    const output = templates.map((template) => {
        return `
            <div class="${options.hash.className || ''}">
                ${options.fn(template.data)}
            </div>
        `;
    });

    return new Handlebars.SafeString(output.join(''));
}

module.exports = helper;
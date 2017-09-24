const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const Handlebars = require('handlebars');
const eutil = require('exemplar-util');

function helper(options) {
    if (!('path' in options.hash)) return '';

    const filenames = eutil.getViewsSync(options.hash.path);
    const views = filenames.map((filename) => {
        return eutil.fileToViewObjectSync(filename);
    });
    const output = views.map((view) => {
        view.data.url = eutil.getViewUrl(view);
        return `
            <div class="${options.hash.className || ''}">
                ${options.fn(view.data)}
            </div>
        `;
    });

    return new Handlebars.SafeString(output.join(''));
}

module.exports = helper;
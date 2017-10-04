const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const Handlebars = require('handlebars');
const eutil = require('pwomp-util');

function helper(options) {
    if (!('path' in options.hash)) return '';

    const filenames = eutil.getViewsSync(options.hash.path);
    let views = filenames.map((filename) => {
        return eutil.fileToViewObjectSync(filename);
    });

    if (options.hash.sortBy) {
        views = views.sort((a, b) => {
            let left;
            let right;

            if (options.hash.sortBy === 'date') {
                left = new Date(b.data.date);
                right = new Date(a.data.date);
            } else {
                left = a.data[options.hash.sortBy];
                right = b.data[options.hash.sortBy];
            }
    
            if (left < right) return -1;
            if (left > right) return 1;
            return 0;
        });
    }

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
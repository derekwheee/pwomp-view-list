const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const Handlebars = require('handlebars');

function getViews(filepath) {
    filepath = path.resolve(filepath);
    return glob.sync(`${filepath}/*.hbs`);
}

function parseView(view) {
    view.data = parseMetadata(view.template.match(/^---[\s\S]*---/));
    view.template = view.template.replace(/^---[\s\S]*---/, '').trim();

    return view;
}

function parseMetadata(content) {
    if (!content) return {};

    const meta = content[0].replace(/---/g, '').trim();
    const matches = meta.match(/.*\s?:\s?.*\s?/g);
    const data = {};
    
    matches.forEach((match) => {
        const parts = match.split(':', 2);
        data[parts[0].trim()] = parts[1].trim();
    });

    return data;
}

function helper(options) {
    if (!('path' in options.hash)) return '';

    const views = getViews(options.hash.path);
    const templates = views.map((view) => {
        const content = fs.readFileSync(view, 'utf-8');
        return parseView({
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
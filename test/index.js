require('./common/bootstrap');

const Handlebars = require('handlebars');
const test = require('ava');
const helper = require('../index');

test('render', t => {

    Handlebars.registerHelper('view-list', helper);

    const source = '{{#view-list path="assets/views/listings" className="test"}}{{title}} {{subtitle}}{{/view-list}}';
    const template = Handlebars.compile(source)();

    t.true(template.includes('<div class="test">'));
    t.true(template.includes('Test 1 This is sorted 2'));
    t.true(template.includes('Test 2'));

});

test('no class', t => {
    
    Handlebars.registerHelper('view-list', helper);

    const source = '{{#view-list path="assets/views/listings"}}{{title}} {{subtitle}}{{/view-list}}';
    const template = Handlebars.compile(source)();

    t.true(template.includes('<div class="">'));

});

test('no views', t => {
    
    Handlebars.registerHelper('view-list', helper);

    const source = '{{#view-list path="assets"}}{{title}} {{subtitle}}{{/view-list}}';
    const template = Handlebars.compile(source)();

    t.is(template, '');

});

test('missing path', t => {
    
    Handlebars.registerHelper('view-list', helper);

    const source = '{{#view-list}}{{title}} {{subtitle}}{{/view-list}}';
    const template = Handlebars.compile(source)();

    t.is(template, '');

});

test('view url', t => {
    
    Handlebars.registerHelper('view-list', helper);

    const source = '{{#view-list path="assets/views/listings"}}{{url}}{{/view-list}}';
    const template = Handlebars.compile(source)();

    t.true(template.includes('/listings/1'));
    t.true(template.includes('/listings/2'));

});

test('sort', t => {
    
    Handlebars.registerHelper('view-list', helper);

    const source = '{{#view-list path="assets/views/listings" sortBy="subtitle"}}{{subtitle}}{{/view-list}}';
    const template = Handlebars.compile(source)();

    t.true(template.indexOf('1') < template.indexOf('2'));

});

test('sort by date', t => {
    
    Handlebars.registerHelper('view-list', helper);

    const source = '{{#view-list path="assets/views/listings" sortBy="date"}}{{subtitle}}{{/view-list}}';
    const template = Handlebars.compile(source)();

    t.true(template.indexOf('2') < template.indexOf('1'));

});
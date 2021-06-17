const toHex = require('colornames')
const namedColors = require('color-name-list');
const slugify = require('slugify')

const validHexColor = require('valid-hex-color');


module.exports = {

    attrs: {
        width: 300,
        height: 300,
        color: 'grey',
        color_hex: '#666666',
        type: 'stripes',
    },
    init: function (attrs)
    {

        if(!attrs.width)
        {
            attrs.width = 300;
        }


        if(!attrs.height)
        {
            attrs.height = attrs.width;
        }

        if(attrs.color )
        {
            if(validHexColor.check('#'+attrs.color))
            {
                attrs.color_hex = '#'+attrs.color;
            } else{
                let input_color = slugify(attrs.color, {lower:true});
                let slug = null;
                let color = namedColors.find(color => slugify(color.name, {lower: true}) === input_color)
                if(color !== undefined && color && color.hex)
                {
                    attrs.color_hex = color.hex;
                } else{
                    attrs.color_hex = '#666666'
                }
            }

        }

        for (const [key, value] of Object.entries(attrs)) {
            this.attrs[key] = value;
        }

        //console.log('--->this.attrs', this.attrs);

    },
    getSvg: function (attrs)
    {
        this.init(attrs);

        let code = this.stripes();

        switch (this.attrs.type)
        {
            case 'solid-stripes':

                code = this.solidStripes();

                break;
            case 'circle':

                break;
        }

        return code;
    },
    prefixCode: function ()
    {
        let code = '<svg xmlns="http://www.w3.org/2000/svg" width="'+this.attrs.width+'" height="'+this.attrs.height+'" >';
        return code;
    },
    suffixCode: function()
    {
        let code = '</svg>';
        return code;
    },

    circle: function () {
        var svg = require('svg-builder')
            .width(125)
            .height(125);

        var logo = svg
            .circle({
                r: 40,
                fill: '#CB3728',
                'stroke-width': 1,
                stroke: '#CB3728',
                hue: "50",
                saturation: "50",
                cx: 42,
                cy: 82
            }).circle({
                r: 40,
                fill: 'none',
                'stroke-width': 1,
                stroke: '#3B92BC',
                cx: 84,
                cy: 82
            }).text({
                x: 10,
                y: 20,
                'font-family': 'helvetica',
                'font-size': 15,
                stroke : '#fff',
                fill: '#fff'
            }, 'My logo').render();


        return logo;

    },
    polygon: function ()
    {
        let pattern = '<polygon fill="#F4D37D" stroke="#E4AF4C" stroke-width="2" points="622,118.5 583,47.5 494,113.5 430,37.5 378,89.5 506,162.5" />';

        let code = this.prefixCode()+pattern+this.suffixCode();

        return code;
    },
    stripes: function ()
    {

        let pattern = '<defs>\n' +
            '\t\t<pattern id="pattern_310cp0" patternUnits="userSpaceOnUse" width="9.5" height="9.5" ' +
            'patternTransform="rotate(45)">\n' +
            '\t\t\t<line x1="0" y="0" x2="0" y2="9.5" stroke="'+this.attrs.color_hex+'" stroke-width="1" />\n' +
            '\t\t</pattern>\n' +
            '\t</defs>\n' +
            '\t<rect width="100%" height="100%" fill="url(#pattern_310cp0)" opacity="1" />'

        let code = this.prefixCode()+pattern+this.suffixCode();

        return code;

    },
    solidStripes: function ()
    {

        let pattern = '<defs>\n' +
            '\t\t<pattern id="pattern_QysW" patternUnits="userSpaceOnUse" width="6" ' +
            'height="6" patternTransform="rotate(45)">\n' +
            '\t\t\t<line x1="0" y="0" x2="0" y2="6" stroke="'+this.attrs.color_hex+'" stroke-width="10" />\n' +
            '\t\t</pattern>\n' +
            '\t</defs>\n' +
            '\t<rect width="100%" height="100%" fill="url(#pattern_QysW)" opacity="1" />'

        let code = this.prefixCode()+pattern+this.suffixCode();

        return code;

    },


};
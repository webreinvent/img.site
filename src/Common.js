const namedColors = require('color-name-list');
const slugify = require('slugify')
const invert = require('invert-color');

//const validHexColor = require('valid-hex-color');


module.exports = {

    attrs: {},
    getSvg: function (res)
    {

        let attrs = res.params;
        if(Object.keys(res.query).length>0)
        {
            for (const [key, value] of Object.entries(res.query)) {
                attrs[key] = value;
            }
        }


        this.init(attrs);

        let pattern = this.stripes();

        switch (this.attrs.type)
        {
            case 'solid-stripes':

                pattern = this.solidStripes();

                break;
            case 'solid-box':
                pattern = this.solidBox();
                break;
        }

        pattern += this.label();

        return this.prefixCode()+pattern+this.suffixCode();

    },
    //--------------------------------------------------------------
    init: function (attrs)
    {
        this.attrs = {
            width: 300,
            height: 300,
            color: 'grey',
            color_hex: '#666666',
            type: 'stripes',
            size: false,
            label: null,
            label_color: null,
            label_font_size: 15,
        }


        if(!attrs.width  || !Number.isInteger(parseInt(attrs.width)))
        {
            attrs.width = 300;
        }

        if(!attrs.height || !Number.isInteger(parseInt(attrs.height)))
        {
            attrs.height = attrs.width;
        }


        if(attrs.color !== undefined && attrs.color)
        {
            attrs.color_hex = this.getColorHex(attrs.color);
        }


        for (const [key, value] of Object.entries(attrs)) {
            this.attrs[key] = value;
        }



        if(parseInt(this.attrs.width) > 10000)
        {
            this.attrs.width = 10000
        }

        if(parseInt(this.attrs.height) > 10000)
        {
            this.attrs.height = 10000
        }

        //console.log('final attrs--->', this.attrs);

    },
    //--------------------------------------------------------------
    getColorHex: function (string)
    {
        let hex = null;
        /*
        if(validHexColor.check(string))
        {
            hex = string;
        } else if(validHexColor.check('#'+string))
        {
            hex = '#'+string;
        } else {

            let input_color = slugify(string, {lower:true});
            let slug = null;
            let color = namedColors.find(color => slugify(color.name, {lower: true}) === input_color)
            if(color !== undefined && color && color.hex)
            {
                hex = color.hex;
            } else{
                hex = '#666666'
            }
        }*/

        if(string.includes("%23"))
        {
            string = string.replace("%23", "");
            string = string.replace("#", "");
            string = "#"+string;

        }

        if(!string.includes("#"))
        {
            string = "#"+string;
        }

        /*console.log('string--->', string);

        let input_color = slugify(string, {lower:true});
        let slug = null;
        let color = namedColors.find(color => slugify(color.name, {lower: true}) === input_color)

        console.log('color --->', color);

        if(color !== undefined && color && color.hex)
        {
            hex = color.hex;
        } else{
            hex = '#666666'
        }*/

        if(string)
        {
            hex = string;
        } else
        {
            hex = '#666666'
        }

        return hex;
    },
    //--------------------------------------------------------------
    prefixCode: function ()
    {
        let code = '<svg xmlns="http://www.w3.org/2000/svg" width="'+this.attrs.width+'" height="'+this.attrs.height+'" >';
        return code;
    },
    //--------------------------------------------------------------
    suffixCode: function()
    {
        let code = '</svg>';
        return code;
    },
    //--------------------------------------------------------------
    labelText: function ()
    {
        let label = '';

        if(this.attrs.size && this.attrs.size=='true')
        {
            label += this.attrs.width+'x'+this.attrs.height;
        }

        if(this.attrs.size && this.attrs.size=='true' && this.attrs.label)
        {
            label += ' - ';
        }

        if(this.attrs.label)
        {
            label += this.attrs.label;
        }

        return label;
    },
    //--------------------------------------------------------------
    label: function ()
    {
        let label = '';
        let color = invert(this.attrs.color_hex);

        if(this.attrs.label_color && 'null' != this.attrs.label_color)
        {

            color = this.getColorHex(this.attrs.label_color);
        }

        //console.log('--->color label', color);

        if(this.attrs.size || this.attrs.label)
        {
            label = '<text x="50%" y="50%" font-family="arial" font-size="'+this.attrs.label_font_size+'px" fill="'+color+'" dominant-baseline="middle" text-anchor="middle">' +
                this.labelText()
                +'</text>';
        }

        return label;
    },
    //--------------------------------------------------------------
    stripes: function ()
    {


        let pattern = '<defs>\n' +
            '\t\t<pattern id="pattern_310cp0" patternUnits="userSpaceOnUse" width="9.5" height="9.5" ' +
            'patternTransform="rotate(45)">\n' +
            '\t\t\t<line x1="0" y="0" x2="0" y2="9.5" stroke="'+this.attrs.color_hex+'" stroke-width="1" />\n' +
            '\t\t</pattern>\n' +
            '\t</defs>\n' +
            '\t<rect width="100%" height="100%" fill="url(#pattern_310cp0)" opacity="1" />';

        return pattern;

    },
    //--------------------------------------------------------------
    solidStripes: function ()
    {

        let pattern = '<defs>\n' +
            '\t\t<pattern id="pattern_QysW" patternUnits="userSpaceOnUse" width="6" ' +
            'height="6" patternTransform="rotate(45)">\n' +
            '\t\t\t<line x1="0" y="0" x2="0" y2="6" stroke="'+this.attrs.color_hex+'" stroke-width="10" />\n' +
            '\t\t</pattern>\n' +
            '\t</defs>\n' +
            '\t<rect width="100%" height="100%" fill="url(#pattern_QysW)" opacity="1" />'

        return pattern;
    },
    //--------------------------------------------------------------
    solidBox: function ()
    {

        let pattern = '<rect width="100%" height="100%" fill="'+this.attrs.color_hex+'" opacity="1" />'

        return pattern;
    },
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    //--------------------------------------------------------------


};

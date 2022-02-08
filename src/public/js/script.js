let base_url = document.getElementsByTagName('base')[0].getAttribute("href");
new Vue({
    el: '#app',
    components: {
        VSwatches: window['vue-swatches']
    },
    data: {
        base_url: base_url,
        tooltip_label: 'Copy',
        url: null,
        label_color: null,
        inputs: {
            uri: {
                width: null,
                height: null,
                color: null,
                color_hex: null,
                type: null,
            },
            query:{
                size: null,
                label: null,
                label_color: null,
                label_font_size: null,
            }

        },
        output: {
            uri:{
                width: null,
                height: null,
                color: null,
                color_hex: null,
                type: null,
            },
            query:{
                size: null,
                label: null,
                label_color: null,
                label_font_size: null,
            }
        }
    },
    computed: {},
    watch: {
        /*'inputs': {
            deep: true,
            handler(new_val, old_val) {
                this.setOutput()
            }
        },*/
        'inputs.uri.width': {
            deep: true,
            handler(new_val, old_val) {
                this.setOutput()
            }
        },
        'inputs.uri.height': {
            deep: true,
            handler(new_val, old_val) {

                if(!this.inputs.uri.width)
                {
                    this.inputs.uri.width = 300
                }

                this.setOutput()
            }
        },
        'inputs.uri.color': {
            deep: true,
            handler(new_val, old_val) {

                if(!this.inputs.uri.width)
                {
                    this.inputs.uri.width = 300
                }

                if(!this.inputs.uri.height)
                {
                    this.inputs.uri.height = 300
                }

                this.inputs.uri.color_hex = this.removeHash(this.inputs.uri.color);

                this.setOutput()
            }
        },
        'inputs.uri.type': {
            deep: true,
            handler(new_val, old_val) {

                if(!this.inputs.uri.width)
                {
                    this.inputs.uri.width = 300
                }

                if(!this.inputs.uri.height)
                {
                    this.inputs.uri.height = 300
                }

                if(!this.inputs.uri.color)
                {
                    this.inputs.uri.color_hex = '666666';
                }

                if(new_val == 'stripes')
                {
                    this.inputs.uri.type = null;
                }

                this.setOutput()
            }
        },
        'inputs.query': {
            deep: true,
            handler(new_val, old_val) {
                this.setOutput()
            }
        },
        'inputs.query.label_color': {
            deep: true,
            handler(new_val, old_val) {
                this.setOutput()
            }
        },
        'inputs.query.label_font_size': {
            deep: true,
            handler(new_val, old_val) {


                if(parseInt(new_val) < 16)
                {
                    this.inputs.query.label_font_size = null;
                }

                this.setOutput()
            }
        },

    },
    mounted() {
        //---------------------------------------------------------------------
        this.setOutput()
        //---------------------------------------------------------------------
    },
    methods: {

        //-----------------------------------------
        setOutput: function ()
        {
            this.output = JSON.parse(JSON.stringify(this.inputs));

            this.getURLString();
        },
        //-----------------------------------------
        getURLString: function () {
            let url = this.base_url+'/p';

            if (this.output.uri.width) {
                url += '/' + this.output.uri.width;
            }

            if (this.output.uri.height) {
                url += '/' + this.output.uri.height;
            }

            if (this.output.uri.color_hex) {
                url += '/' + this.output.uri.color_hex;
            }

            if (this.output.uri.type) {
                url += '/' + this.output.uri.type;
            }

            for (let param in this.output.query) {

                if (this.output.query[param] === undefined /* In case of undefined assignment */
                    || this.output.query[param] === null
                    || this.output.query[param] === false
                    || this.output.query[param] === "") {
                    delete this.output.query[param];
                }
            }


            for (let param in this.output.query) {
                
                if(param === 'label_font_size' && parseInt(this.output.query[param]) === 15)
                {
                    delete this.output.query[param];
                }

                if(param === 'label_color')
                {
                    this.output.query[param] = this.output.query[param].replace("#", "");
                }

            }

            let query = new URLSearchParams(this.output.query).toString()

            if (query.length > 0) {
                url += '?' + query;
            }

            this.url = url;

        },
        //-----------------------------------------
        setParams: function () {

            if (this.inputs.color_hex && !this.inputs.width) {
                this.inputs.width = 300;
            }

            if (this.inputs.color_hex && !this.inputs.height) {
                this.inputs.height = 300;
            }
        },
        //-----------------------------------------
        copyLink() {
            const inputText = document.getElementById('link-text');
            inputText.select();

            try {
                const success = document.execCommand('copy');
                this.$buefy.toast.open({
                    message: 'Link Copied',
                    type: 'is-success'
                });
            } catch (error) {
                this.message = 'Oops, failed to copy!';
                this.$notification.open({
                    type: 'is-danger',

                });
            } finally {
                window.getSelection().removeAllRanges();
            }
        },
        //-----------------------------------------
        removeHash: function (string)
        {
            return string.replace("#", "");
        },
        //-----------------------------------------
        //-----------------------------------------
    }
})

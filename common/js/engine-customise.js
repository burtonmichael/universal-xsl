(function(){
    var properties = [
        {
            'name': 'text',
            'type': 'color'
        },
        {
            'name': 'font-size',
            'type': 'integer'
        },
        {
            'name': 'primary',
            'type': 'color'
        },
        {
            'name': 'primary-text',
            'type': 'color'
        },
        {
            'name': 'button-text',
            'type': 'color'
        },
        {
            'name': 'button-bg',
            'type': 'color'
        },
        {
            'name': 'button-bg-to',
            'type': 'color'
        },
        {
            'name': 'scene-text',
            'type': 'color'
        },
        {
            'name': 'scene',
            'type': 'string'
        },
        {
            'name': 'form-header',
            'type': 'boolean'
        },
        {
            'name': 'form-bg',
            'type': 'color'
        },
        {
            'name': 'form-hollow',
            'type': 'boolean'
        },
        {
            'name': 'form-text',
            'type': 'color'
        },
        {
            'name': 'form-header-text',
            'type': 'color'
        },
        {
            'name': 'form-padding',
            'type': 'integer'
        },
        {
            'name': 'form-border',
            'type': 'color'
        },
        {
            'name': 'icon-bg',
            'type': 'color'
        },
        {
            'name': 'icon-fill',
            'type': 'color'
        },
        {
            'name': 'panel-head-bg',
            'type': 'color'
        },
        {
            'name': 'panel-body-bg',
            'type': 'color'
        },
        {
            'name': 'panel-text',
            'type': 'color'
        },
        {
            'name': 'radius',
            'type': 'integer'
        },
        {
            'name': 'button-radius',
            'type': 'integer'
        },
        {
            'name': 'full-width',
            'type': 'boolean'
        },
        {
            'name': 'hide-modules',
            'type': 'list'
        },
        {
            'name': 'hide-return',
            'type': 'boolean'
        },
        {
            'name': 'images-import',
            'type': 'string'
        },
        {
            'name': 'css-import',
            'type': 'external'
        }
    ];

    var qs = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1]);
        }
        return b;
    })(window.location.search.substr(1).split('&'));

    less.modifyVars(getURLProperties(properties));

    function getURLProperties(properties){
        var len = properties.length,
            url = window.location.href,
            obj = {};
        for(var i=0; i<len; i++){
            var property = properties[i].name,
                val = qs[property];
                // val = grab(property, url);
            if (val){
                switch(properties[i].type){
                    case 'string':
                        if (val !== "false") {
                            val = '\"' + val + '\"';
                        }
                        obj[property] = val;
                        break;
                    case 'color':
                        if(isColor(val)) {
                            val = '#' + val;
                            obj[property] = val;
                        }
                        break;
                    case 'external':
                        loadExtCSS(val);
                        break;
                    case 'boolean':
                        if(val == 'true' || val == 'false') {
                            obj[property] = val;
                        }
                        break;
                    case 'list':
                        val = (val === 'all') ? ['header', 'cars', 'suppliers', 'icon', 'destinations', 'powered'] : val.split('+');
                        for(l=0; l < val.length; l++) {
                            val[l] = "\"" + val[l] + "\"";
                        }
                        obj[property] = val;
                        break;
                    default :
                        obj[property] = val;
                        break;
                }
            }
        }
        return obj;
    }

    function isColor(color) {
        if(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + color)) {
            return true;
        } else {
            return false;
        }
    }

    function loadExtCSS(argFiles){
        var files = argFiles.split('+'),
            head = document.getElementsByTagName("head")[0];
        for(var i = 0; i < files.length; i++) {
            var file = document.createElement("link");
            file.setAttribute("rel", "stylesheet");
            file.setAttribute("type", "text/css");
            file.setAttribute("href", '/affiliateXmlStylesheets/' + files[i] + '/css/import.css');
            file.setAttribute("class", 'css-import');
            head.appendChild(file);
        }
    }
})();
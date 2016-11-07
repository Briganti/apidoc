var wsMainExtend = new function() {

    var _Handlebars = null;
    var _apiData = [];

    this.init = function(Handlebars)
    {
        _Handlebars = Handlebars;
    };

    this.processApiData = function(apiData)
    {
        _apiData = apiData;

        $.each(_apiData, function(idx, item){

            // Data types
            if (item.group == 'DataTypes') {
                item.name = item.url;
                item.title = item.url;
            }

            _apiData[idx] = item;
        });

        return _apiData;
    };

    this.processNav = function(nav)
    {
        var _nav = [];
        var _dataTypes = []

        // Extragem dataTypes -urile
        $.each(nav, function(idx, item){
            if (item.group == 'DataTypes') {
                _dataTypes.push(item);
            } else {
                _nav.push(item);
            }
        });

        // Prelucram dataTypes-urile
        $.each(_dataTypes, function(idx, item){

            if (item.isHeader) {
                item.title = "Tipuri de date";
            } else {
                item.title = item.name;
            }

            // Titlurile sunt ordonate alfabetica, eliminam numerele daca sunt
            item.title = item.title.replace(/[0-9]+\s+/, '');
        });

        // Readaugam la sfarsit
        Array.prototype.push.apply(_nav, _dataTypes);

        return _nav;
    };

    this.processEntry = function(entry)
    {
        if (entry.group == 'DataTypes') {
            entry.title = entry.name;
        } else {
            // Titlurile sunt ordonate alfabetica, eliminam numerele daca sunt
            entry.title = entry.title.replace(/[0-9]+\s+/, '');
        }

        // In group title spatiile se suprascrie cu _ ...
        if (entry.groupTitle.length > 0) {
            var gtRegex = new RegExp('_+', 'g');
            entry.groupTitle = entry.groupTitle.replace(gtRegex, ' ');
        }



        return entry;
    };

    this.renderArticle = function(group, fields)
    {
        if (typeof fields.article.parameter != 'undefined') {
            fields.article.parameter = orderParameters(fields.article.parameter);
        }

        var templateArticle        = _Handlebars.compile( $('#template-article').html() );
        var templateArticleDataType= _Handlebars.compile( $('#template-article-data-type').html() );

        return (group == 'DataTypes') ? templateArticleDataType(fields) : templateArticle(fields);
    };

    this.renderCompareArticle = function(group, fields)
    {
        if (typeof fields.article.parameter != 'undefined') {
            fields.article.parameter = orderParameters(fields.article.parameter);
        }

        var templateArticle        = _Handlebars.compile( $('#template-compare-article').html() );
        var templateArticleDataType= _Handlebars.compile( $('#template-compare-article-data-type').html() );

        return (group == 'DataTypes') ? templateArticleDataType(fields) : templateArticle(fields);
    };

    function orderParameters(params) {

        var _return = params;

        if (
            typeof _return.fields.Parameter != 'undefined'
            && typeof _return.fields.Parameter != 'undefined'
        ) {
            var _params = [];
            var _token = false;
            $.each(params.fields.Parameter, function(idx, item)
            {
                // Allowe values
                if (typeof item.allowedValues != 'undefined') {
                    $.each(item.allowedValues, function(idx_v, value){
                        // Curatam ghilimele
                        if (/^".*"$/.test(value)) {
                            value = value.replace(/(^"|"$)/g, '');
                        }

                        // Generam referinte interne
                        if (/.*##.*/.test(value)) {
                            var split = value.split('##');
                            value = "<a href='#api-"+split[0]+"-"+split[1]+"' class='api_reference'>"+split[1]+"["+split[2]+"]</a>";
                        }

                        // Setam valoarea noua
                        item.allowedValues[idx_v] = value;
                    });
                }

                // Type
                if ( type_match = item.type.match(/^#(([a-z_0-9]*).*)/i)) {
                    item.type="<a href='#api-DataTypes-"+type_match[2]+"' class='api_reference'>"+type_match[1]+"</a>";
                }

                // Extragem token -ul (!!! Trebuie sa fie ultimul din foreach !!!)
                if (item.field == 'token') {
                    _token = item;
                } else {
                    _params.push(item);
                }
            });
            // Punem token-ul pe primul loc (daca exista)
            if (_token !== false) {
                _params.unshift(_token);
            }
            _return.fields.Parameter = _params;
        }

        return _return;
    }
};  

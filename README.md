### Test Generation
<!doctype html>
<html lang="en">
<head>
    <title>Code coverage report for TestGeneration/subject.js</title>
    <meta charset="utf-8">

    <link rel="stylesheet" href="../prettify.css">

    <style>
        body, html {
            margin:0; padding: 0;
        }
        body {
            font-family: Helvetica Neue, Helvetica,Arial;
            font-size: 10pt;
        }
        div.header, div.footer {
            background: #eee;
            padding: 1em;
        }
        div.header {
            z-index: 100;
            position: fixed;
            top: 0;
            border-bottom: 1px solid #666;
            width: 100%;
        }
        div.footer {
            border-top: 1px solid #666;
        }
        div.body {
            margin-top: 10em;
        }
        div.meta {
            font-size: 90%;
            text-align: center;
        }
        h1, h2, h3 {
            font-weight: normal;
        }
        h1 {
            font-size: 12pt;
        }
        h2 {
            font-size: 10pt;
        }
        pre {
            font-family: Consolas, Menlo, Monaco, monospace;
            margin: 0;
            padding: 0;
            line-height: 14px;
            font-size: 14px;
            -moz-tab-size: 2;
            -o-tab-size:  2;
            tab-size: 2;
        }

        div.path { font-size: 110%; }
        div.path a:link, div.path a:visited { color: #000; }
        table.coverage { border-collapse: collapse; margin:0; padding: 0 }

        table.coverage td {
            margin: 0;
            padding: 0;
            color: #111;
            vertical-align: top;
        }
        table.coverage td.line-count {
            width: 50px;
            text-align: right;
            padding-right: 5px;
        }
        table.coverage td.line-coverage {
            color: #777 !important;
            text-align: right;
            border-left: 1px solid #666;
            border-right: 1px solid #666;
        }

        table.coverage td.text {
        }

        table.coverage td span.cline-any {
            display: inline-block;
            padding: 0 5px;
            width: 40px;
        }
        table.coverage td span.cline-neutral {
            background: #eee;
        }
        table.coverage td span.cline-yes {
            background: #b5d592;
            color: #999;
        }
        table.coverage td span.cline-no {
            background: #fc8c84;
        }

        .cstat-yes { color: #111; }
        .cstat-no { background: #fc8c84; color: #111; }
        .fstat-no { background: #ffc520; color: #111 !important; }
        .cbranch-no { background:  yellow !important; color: #111; }

        .cstat-skip { background: #ddd; color: #111; }
        .fstat-skip { background: #ddd; color: #111 !important; }
        .cbranch-skip { background: #ddd !important; color: #111; }

        .missing-if-branch {
            display: inline-block;
            margin-right: 10px;
            position: relative;
            padding: 0 4px;
            background: black;
            color: yellow;
        }

        .skip-if-branch {
            display: none;
            margin-right: 10px;
            position: relative;
            padding: 0 4px;
            background: #ccc;
            color: white;
        }

        .missing-if-branch .typ, .skip-if-branch .typ {
            color: inherit !important;
        }

        .entity, .metric { font-weight: bold; }
        .metric { display: inline-block; border: 1px solid #333; padding: 0.3em; background: white; }
        .metric small { font-size: 80%; font-weight: normal; color: #666; }

        div.coverage-summary table { border-collapse: collapse; margin: 3em; font-size: 110%; }
        div.coverage-summary td, div.coverage-summary table  th { margin: 0; padding: 0.25em 1em; border-top: 1px solid #666; border-bottom: 1px solid #666; }
        div.coverage-summary th { text-align: left; border: 1px solid #666; background: #eee; font-weight: normal; }
        div.coverage-summary th.file { border-right: none !important; }
        div.coverage-summary th.pic { border-left: none !important; text-align: right; }
        div.coverage-summary th.pct { border-right: none !important; }
        div.coverage-summary th.abs { border-left: none !important; text-align: right; }
        div.coverage-summary td.pct { text-align: right; border-left: 1px solid #666; }
        div.coverage-summary td.abs { text-align: right; font-size: 90%; color: #444; border-right: 1px solid #666; }
        div.coverage-summary td.file { text-align: right; border-left: 1px solid #666; white-space: nowrap;  }
        div.coverage-summary td.pic { min-width: 120px !important;  }
        div.coverage-summary a:link { text-decoration: none; color: #000; }
        div.coverage-summary a:visited { text-decoration: none; color: #333; }
        div.coverage-summary a:hover { text-decoration: underline; }
        div.coverage-summary tfoot td { border-top: 1px solid #666; }

        div.coverage-summary .yui3-datatable-sort-indicator, div.coverage-summary .dummy-sort-indicator {
            height: 10px;
            width: 7px;
            display: inline-block;
            margin-left: 0.5em;
        }
        div.coverage-summary .yui3-datatable-sort-indicator {
            background: url("https://yui-s.yahooapis.com/3.6.0/build/datatable-sort/assets/skins/sam/sort-arrow-sprite.png") no-repeat scroll 0 0 transparent;
        }
        div.coverage-summary .yui3-datatable-sorted .yui3-datatable-sort-indicator {
            background-position: 0 -20px;
        }
        div.coverage-summary .yui3-datatable-sorted-desc .yui3-datatable-sort-indicator {
            background-position: 0 -10px;
        }

        .high { background: #b5d592 !important; }
        .medium { background: #ffe87c !important; }
        .low { background: #fc8c84 !important; }

        span.cover-fill, span.cover-empty {
            display:inline-block;
            border:1px solid #444;
            background: white;
            height: 12px;
        }
        span.cover-fill {
            background: #ccc;
            border-right: 1px solid #444;
        }
        span.cover-empty {
            background: white;
            border-left: none;
        }
        span.cover-full {
            border-right: none !important;
        }
        pre.prettyprint {
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
        }
        .com { color: #999 !important; }
        .ignore-none { color: #999; font-weight: normal; }

    </style>
</head>
<body>
<div class="header high">
    <h1>Code coverage report for <span class="entity">TestGeneration/subject.js</span></h1>
    <h2>
        
        Statements: <span class="metric">100% <small>(34 / 34)</small></span> &nbsp;&nbsp;&nbsp;&nbsp;
        
        
        Branches: <span class="metric">87.5% <small>(14 / 16)</small></span> &nbsp;&nbsp;&nbsp;&nbsp;
        
        
        Functions: <span class="metric">100% <small>(5 / 5)</small></span> &nbsp;&nbsp;&nbsp;&nbsp;
        
        
        Lines: <span class="metric">100% <small>(33 / 33)</small></span> &nbsp;&nbsp;&nbsp;&nbsp;
        
        Ignored: <span class="metric"><span class="ignore-none">none</span></span> &nbsp;&nbsp;&nbsp;&nbsp;
    </h2>
    <div class="path"><a href="../index.html">All files</a> &#187; <a href="index.html">TestGeneration/</a> &#187; subject.js</div>
</div>
<div class="body">
<pre><table class="coverage">
<tr><td class="line-count">1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73</td><td class="line-coverage"><span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-yes">2</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">2</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">2</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">5</span>
<span class="cline-any cline-yes">2</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">3</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">2</span>
<span class="cline-any cline-yes">2</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">4</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">4</span>
<span class="cline-any cline-yes">4</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">4</span>
<span class="cline-any cline-yes">20</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">4</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">2</span>
<span class="cline-any cline-yes">2</span>
<span class="cline-any cline-yes">2</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-yes">1</span>
<span class="cline-any cline-neutral">&nbsp;</span>
<span class="cline-any cline-neutral">&nbsp;</span></td><td class="text"><pre class="prettyprint lang-js">var fs = require("fs");
&nbsp;
function inc(p, q){
    <span class="missing-if-branch" title="else path not taken" >E</span>if(q ==undefined) q =1;
&nbsp;
   if( p &lt; 0 )
   {
   	p = -p;
   }
&nbsp;
    return p + q/q;
}
&nbsp;
&nbsp;
function fileTest(dir, filePath)
{
	if (!fs.existsSync(dir)){
   	return false;
	}
&nbsp;
   if( fs.existsSync(filePath ))
   {
		var buf = fs.readFileSync(filePath, "utf8");
		if( buf.length &gt; 0 )
		{
			return true;
		}
		return false;
	}
}
&nbsp;
function normalize(phoneNumber) {
&nbsp;
    return phoneNumber.replace(
      /^[\+\d{1,3}\-\s]*\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      "$1$2$3"
    );
&nbsp;
}
&nbsp;
function format(phoneNumber, formatString, options) 
{
    // Normalize the phone number first unless not asked to do so in the options
    <span class="missing-if-branch" title="else path not taken" >E</span>if (!options || !options.normalize) {
      phoneNumber = normalize(phoneNumber)
    };
&nbsp;
    for ( var i = 0, l = phoneNumber.length; i &lt; l; i++ ) {
      formatString = formatString.replace("N", phoneNumber[i]);
    }
  
    return formatString;
&nbsp;
}
&nbsp;
function blackListNumber(phoneNumber)
{
	var num = format(phoneNumber, "(NNN) NNN-NNNN");
	var area = num.substring(1,4);
	if( area == "212" )
	{
		return true;
	}
	return false;
}
&nbsp;
exports.fileTest = fileTest;
exports.normalize = normalize;
exports.format = format;
exports.inc = inc;
exports.blackListNumber = blackListNumber;
&nbsp;
&nbsp;</pre></td></tr>
</table></pre>

</div>
<div class="footer">
    <div class="meta">Generated by <a href="http://istanbul-js.org/" target="_blank">istanbul</a> at Fri Feb 13 2015 18:41:44 GMT-0500 (EST)</div>
</div>

<script src="../prettify.js"></script>

<script src="https://yui-s.yahooapis.com/3.6.0/build/yui/yui-min.js"></script>
<script>

    YUI().use('datatable', function (Y) {

        var formatters = {
          pct: function (o) {
              o.className += o.record.get('classes')[o.column.key];
              try {
                  return o.value.toFixed(2) + '%';
              } catch (ex) { return o.value + '%'; }
          },
          html: function (o) {
              o.className += o.record.get('classes')[o.column.key];
              return o.record.get(o.column.key + '_html');
          }
        },
          defaultFormatter = function (o) {
              o.className += o.record.get('classes')[o.column.key];
              return o.value;
          };

        function getColumns(theadNode) {
            var colNodes = theadNode.all('tr th'),
                cols = [],
                col;
            colNodes.each(function (colNode) {
                col = {
                    key: colNode.getAttribute('data-col'),
                    label: colNode.get('innerHTML') || ' ',
                    sortable: !colNode.getAttribute('data-nosort'),
                    className: colNode.getAttribute('class'),
                    type: colNode.getAttribute('data-type'),
                    allowHTML: colNode.getAttribute('data-html') === 'true' || colNode.getAttribute('data-fmt') === 'html'
                };
                col.formatter = formatters[colNode.getAttribute('data-fmt')] || defaultFormatter;
                cols.push(col);
            });
            return cols;
        }

        function getRowData(trNode, cols) {
            var tdNodes = trNode.all('td'),
                    i,
                    row = { classes: {} },
                    node,
                    name;
            for (i = 0; i < cols.length; i += 1) {
                name = cols[i].key;
                node = tdNodes.item(i);
                row[name] = node.getAttribute('data-value') || node.get('innerHTML');
                row[name + '_html'] = node.get('innerHTML');
                row.classes[name] = node.getAttribute('class');
                //Y.log('Name: ' + name + '; Value: ' + row[name]);
                if (cols[i].type === 'number') { row[name] = row[name] * 1; }
            }
            //Y.log(row);
            return row;
        }

        function getData(tbodyNode, cols) {
            var data = [];
            tbodyNode.all('tr').each(function (trNode) {
                data.push(getRowData(trNode, cols));
            });
            return data;
        }

        function replaceTable(node) {
            if (!node) { return; }
            var cols = getColumns(node.one('thead')),
                data = getData(node.one('tbody'), cols),
                table,
                parent = node.get('parentNode');

            table = new Y.DataTable({
                columns: cols,
                data: data,
                sortBy: 'file'
            });
            parent.set('innerHTML', '');
            table.render(parent);
        }

        Y.on('domready', function () {
            replaceTable(Y.one('div.coverage-summary table'));
            if (typeof prettyPrint === 'function') {
                prettyPrint();
            }
        });
    });
</script>
</body>
</html>

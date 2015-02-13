var subject = require('./subject.js')
var mock = require('mock-fs');
subject.inc('',undefined);
subject.inc(-3,undefined);
mock({"path/fileExists":{"file1":"text"},"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":"text"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file1":"text"},"pathContent":{"file1":"text"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file1":"text"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
subject.format('','','true')
subject.format('','','normalize')
subject.blackListNumber('2124054117')
subject.blackListNumber('2254911076')

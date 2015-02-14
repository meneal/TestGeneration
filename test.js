var subject = require('./subject.js')
var mock = require('mock-fs');
subject.inc('',undefined);
subject.inc('',3);
subject.inc(-3,3);
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
subject.format('','', {normalize: false})
subject.format('','', {normalize: true})
subject.blackListNumber('2124915588')
subject.blackListNumber('9382341021')

var dir = __dirname.replace('/src/modules/models', '');
module.exports = {
    root: dir,
    control_dir: dir + '/Control/',
    logger_dir: dir + '/Logger/',
    portName: '/dev/ttyACM',
    production: false
}
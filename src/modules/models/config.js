var dir = __dirname.replace('/src/modules/models', '');
console.log(dir);
module.exports = {
    root: dir,
    control_dir: dir + '/Control/',
    logger_dir: dir + '/Logger/'
}
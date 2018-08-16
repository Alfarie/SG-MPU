const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
var dbdir = path.join(path.resolve(__dirname, '../../DB'));
var dbpath = dbdir + '/db.db';
var moment = require('moment');
var db = null;

var connect = function () {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(dbpath);
        resolve(db);
    })
}

var run = async function (sql) {
    return new Promise((resolve, reject) => {
        db.run(sql, err => {
            if (err) reject(err.message);
        })
    })
}

var GetSql = async function (sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err.message);
            resolve(rows);
        })
    })
}

var ExecSql = async function (sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if (err) reject(err);
            resolve()
        })
    })
}

var initialize = async function () {
    db = await connect();
    var sql = `CREATE TABLE IF NOT EXISTS sensors_logger(
        timestamp INTEGER PRIMARY KEY NOT NULL,
        datetime TEXT NOT NULL,
        soil NUMBER NOT NULL,
        temperature NUMBER NOT NULL,
        humidity NUMBER NOT NULL,
        vpd NUMBER NOT NULL,
        par NUMBER NOT NULL,
        co2 NUMBER NOT NULL,
        paracc NUMBER NOT NULL)
    `
    var res = await run(sql);
}

if (!fs.existsSync(dbdir)) fs.mkdirSync(dbdir);
initialize();

module.exports = {
    ExecSql,
    GetSql
}
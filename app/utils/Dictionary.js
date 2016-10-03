var R;
var root = Node;

var Dictionary = function(alphabet) {
    this.alphabet = alphabet;
    R = alphabet.length;
}

var Node = function () {
    this.val;
    this.next = new Array(R);
}

Dictionary.prototype.put = function(key, value) {
    root = this._put(root, key, value, 0);
}

Dictionary.prototype._put = function(x, key, val, d) {
    if(x == null) x = new Node();
    if(d == key.length) {
        x.val = val;
        return x;
    }
    var c = key[d];
    var i = this.alphabet.indexOf(c);
    x.next[i] = this._put(x.next[i], key, val, d+1);
    return x;
}

Dictionary.prototype.get = function(key) {
    var x = this._get(root, key, 0);
    if(x == null) return null;
    return x.val;
}

Dictionary.prototype._get = function(x, key, d) {
    if(x == null) return null;
    if(d == key.length) return x;
    var c = key[d];
    return this._get(x.next[this.alphabet.indexOf(c)], key, d+1);
}

Dictionary.prototype.subwordsIn = function(string) {
    var data = new Array()
    this._subwordsIn(root, string, 0, data);
    return data;
}

Dictionary.prototype._subwordsIn = function(x, string, d, data) {
    if(x == null) return;
    if(x.val != null) {
        data.push(string.substring(0, d));
        if(d == string.length)
            return;
    }
    var c = string[d];
    this._subwordsIn(x.next[this.alphabet.indexOf(c)], string, d+1, data);
}

Dictionary.prototype.contains = function(key) {
    return this.get(key) != null;
}

module.exports = Dictionary;
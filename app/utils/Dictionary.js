// Implements a Trie Symbol table with get/put/contains operations.
// Based on http://algs4.cs.princeton.edu/52trie/TrieST.java.html
var R; //Radix
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
    // is the key was already in the dictionary update the x.val to new val and return or put for first time
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
        data.push(string.substring(0, d)); // subword has been found do add it to set
        if(d == string.length) // at end of linked list so return
            return;
    }
    var c = string[d];
    this._subwordsIn(x.next[this.alphabet.indexOf(c)], string, d+1, data);
}

Dictionary.prototype.contains = function(key) {
    return this.get(key) != null;
}

module.exports = Dictionary;
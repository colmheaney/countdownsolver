var Permutations = function(input) {
    this.N = input.letters.length;
    this.A = input.letters.split('');
    this.c = repeat(0, this.N);
}

var repeat = function(what, L){
    var arr = [];
    while (L) arr[--L] = what;
    return arr;
}

Permutations.prototype.generate = function() {
    var arr = [];
    arr.push({letters: this.A.join('')});

    var i = 1;
    while(i < this.N) {
        if(this.c[i] < i) {
            if(i % 2 == 0)
                this.swap(0,i);
            else
                this.swap(this.c[i],i);
            arr.push({letters: this.A.join('')});
            this.c[i] += 1;
            i = 1;
        } else {
            this.c[i] = 0;
            i++;
        }
    }
    return arr;
}

Permutations.prototype.swap = function(i, j) {
    var tmp = this.A[i];
    this.A[i] = this.A[j];
    this.A[j] = tmp;
}

module.exports = Permutations;
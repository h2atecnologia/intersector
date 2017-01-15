/* MIT License
Copyright (c) 2016 Simon Y. Blackwell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
(function() {
	function intersector(booleanOrUniqueKeyProperty) {
		let key;
		if(typeof(booleanOrUniqueKeyProperty)==="string") {
			key = booleanOrUniqueKeyProperty;
		}
		return function() {
			let min = Infinity, // length of shortest array argument
				shrtst = 0, // index of shortest array argument
				set = (!key && booleanOrUniqueKeyProperty ? new Set() : {}),
				rslt = [], // result
				mxj = arguments.length-1;
			for(let j=0;j<=mxj;j++) { // find index of shortest array argument
				let l = arguments[j].length;
				if(l<min) {
					shrtst = j;
					min = l;
				}
			}
			let shrt = arguments[shrtst],
				mxi = shrt.length;
			for(let i=0;i<mxi;i++) { // initialize set of possible values from shortest array
				if(key) {
					set[shrt[i][key]] = 1;
				} else if(booleanOrUniqueKeyProperty) { 
					set.add(shrt[i]);
				} else { 
					set[shrt[i]]=1;
				}
			}
			for(let j=0;j<=mxj;j++) { // loop through all array arguments
				var	array = arguments[j],
					mxk = array.length;
				for(let k=0;k<mxk;k++) { // loop through all values
					let item = array[k];
					if((key && set[item[key]]) || (!key && booleanOrUniqueKeyProperty && set.has(item)) || (!booleanOrUniqueKeyProperty && set[item])) { // if value is possible
						if(j===mxj) { // and all arrays have it (or we would not be at this point)
							rslt.push(item); // add to results
						}
					}
				}
			}
			return rslt;
		};
	}
	if(typeof(module)!=="undefined") {
		module.exports = intersector;
	} else {
		this.intersector = intersector;
	}
}).call(this);
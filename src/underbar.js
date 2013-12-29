/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.slice( (array.length-n > 0 ? array.length-n : 0), array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {
      // implementing the null check from underscore, since typeof null = object, which could be a problem.
      if (collection === null) {
        return collection;
      } else
      if (collection.length === +collection.length) {
          for (var i = 0; i < collection.length; i++) {
              iterator(collection[i], i, collection);
          }
      } else {
        var keys = Object.keys(collection);
        for (var i=0; i < keys.length; i++) {
          iterator(collection[keys[i]], keys[i], collection);
        }
      }
  };


  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var trueSet = [];
    _.each (collection, function(item) {
      if (test(item)) {
        trueSet.push(item);
      }
    });
    return trueSet;
  };

  // What reject is doing: 
  // var isEven = function(num) { return num % 2 === 0; };
  //   var odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

  //   expect(odds).to.eql([1, 3, 5]);

  // Return all elements of an array that don't pass a truth test.
  
  _.reject = function(collection, test) {
    return _.filter(collection, function(item){
      return !test(item);
    });
  };

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var set = array.sort();
    var unique = [];
    _.each(set, function(item){
      if (unique.indexOf(item) < 0) {
        unique.push(item);
      }
    });
    return unique;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var set = [];
    _.each(array, function(item){
      set.push(iterator(item));
    });
    return set;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
 
  // If you have an array myParameters and would like to call a function myFunction using the elements in the array as parameters, you can use myFunction.apply(context, myParameters). The first parameter, context, is the execution context for your function call. From inside myFunction, you can access it as this. For this exercise, you should be fine passing in the calling function's this for context. If you're curious, you can read more in the documentation for apply.

  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(item){
       return (typeof functionOrKey === 'function' ? functionOrKey : functionOrKey[functionOrKey]).apply(item);
    });
      };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
  var previousValue;
  _.each(collection, function(item){
    if (previousValue === undefined) {
      previousValue = accumulator;
    }
    previousValue = iterator(previousValue, item);
  });
  return previousValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  
  // this one was pre-defined. attempting to recreate this myself.

  // _.contains = function(collection, target) {
  //   var found = false;
  //   _.each(collection, function(x){
  //     if (x == target && found === false){
  //       found = true;
  //     }
  //   });
  //   return found;
  // };

  // refactor with 'each' worked. now trying to replicate as 'reduce':

  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound){
        return true;
      }
      // can turn next 4 lines into one with the following comment.
      if(item == target){
        wasFound = true;
      }
      return wasFound;
      // aka: return item === target;
    }, false);
  };

  // _.contains = function(collection, target) {
  //   // TIP: Many iteration problems can be most easily expressed in
  //   // terms of reduce(). Here's a freebie to demonstrate!
  //   return _.reduce(collection, function(wasFound, item) {
  //     if (wasFound) {
  //       return true;
  //     }
  //     return item === target;
  //   }, false);
  // };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // the check for the empty array [] or object {}
    if(typeof collection === 'object' && Object.keys(collection).length === 0) {
      return true;
    }
    return _.reduce(collection, function(previousValue, item){
      if(previousValue === false) {
        return false;
      }
      // ignore the linter - the == Must be used to work for boolean comparison!
      // the non-null empty array [] and object {} are true:
       if(item !== null && typeof item === 'object' && Object.keys(item).length === 0) {
      return true;
    }
      return (iterator === undefined ? _.identity : iterator)(item) == true;
    }, true);
  };

  // pasting in underscore's version for clues:

  //  _.every = function(obj, iterator, context) {
  //   iterator || (iterator = _.identity);
  //   var result = true;
  //   if (obj == null) return result;
  //   //if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
  //   _.each(obj, function(value, index, list) {
  //     if (!(result = result && iterator.call(context, value, index, list))) return breaker;
  //   });
  //   return !!result;
  // };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  
  // attempt one:
  // _.some = function(collection, iterator) {
  //   // TIP: There's a very clever way to re-use every() here.
  //   var anyTruth = false;
  //  _.every(collection, function(item){
  //     if (iterator(item) === true){
  //       anyTruth = true;
  //     }
  //   });
  // return anyTruth;
  // };

  // attempt 2 progress, but not all working
  // _.some = function(collection, iterator) {
  //   var anyTruth = _.map(collection, function(item){
  //     return (iterator === 'undefined' ? iterator : _.identity)(item) == true;
  //   });
  //   return anyTruth.indexOf(true) > -1;
  // };

  // attempt 3

  // create a _.map of _.every on _.each value in the collection. if any of them come back true, return true
  _.some = function(collection, iterator) {
    if (iterator === undefined) {
      iterator = _.identity;}
   // TIP: There's a very clever way to re-use every() here.
    var anyTruth = false;
    _.each(collection, function(item){
      if (!!iterator(item) === true  && anyTruth === false){
        anyTruth = true;
      }
    });
    return anyTruth;
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  
  _.extend = function(obj) {
    _.each(arguments, function(item){
      for (var props in item) {
        obj[props] = item[props];
      }
    });
      return obj;
    };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(item){
      for (var props in item) {
        if (obj[props] === undefined){
          obj[props] = item[props];
        }
      }
    });
      return obj;
    };



  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  // _.once = function(func) {
  //   // TIP: These variables are stored in a "closure scope" (worth researching),
  //   // so that they'll remain available to the newly-generated function every
  //   // time it's called.
  //   var alreadyCalled = false;
  //   var result;

  //   // TIP: We'll return a new function that delegates to the old one, but only
  //   // if it hasn't been called before.
  //   return function() {
  //     if (!alreadyCalled) {
  //       // TIP: .apply(this, arguments) is the standard way to pass on all of the
  //       // infromation from one function call to another.
  //       result = func.apply(this, arguments);
  //       alreadyCalled = true;
  //     }
  //     // The new function always returns the originally computed result.
  //     return result;
  //   };
  // };

  // re-creating _.once after studying it above:
_.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var result;
    var previously = false;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
        if (previously === false) {
          result = func.apply(this, arguments);
          previously = true;
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        }
        return result;
      };
      // The new function always returns the originally computed result.
      
  };


  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  };

  // STOP HERE FOR NOW

  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);

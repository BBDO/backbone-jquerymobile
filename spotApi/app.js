
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , db = require('mongoskin').db('localhost:27017/spots')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
 
// Routes

app.get('/', routes.index);


app.get('/reel', function(req,res){
	res.render('reel')
});


// add-spot/:marker/:frame/:xval/:yval
app.get('/add-spots/:marker/:frame/:xval/:yval', function(req,res){
	res.send('/:marker/:frame/:x/:y')
	db.collection('spots').remove({
		marker:req.params.marker,
		frame:req.params.frame
	}, function(err, result) {
	    if (!err) console.log('del');
	});
	db.collection('spots').insert({
		marker:req.params.marker,
		frame:req.params.frame,
		xval:req.params.xval,
		yval:req.params.yval
	}, function(err,res){
		if (err) throw err
		if (res) console.log(res)
	})
})

app.get('/find-spots/:marker/:frame', function(req,res){
	// res.send('done')

	db.collection('spots').find({
		marker:req.params.marker,
		frame:req.params.frame
	}).toArray(function(err, result) {
    	if (err) throw err;
    	console.log(result);
    	res.send(result)
	});
})

app.get('/update-spots', function(req,res){
	res.send('done')
	db.collection('spots').remove({frame:'frame1'}, function(err, result) {
	    if (!err) console.log('del');
	});
})





app.get('/ins2', function(req,res){

	var db = require('./node-mongoskin/examples/config').db;
	db.collection('test').remove()
	db.collection('test').insert([{foo: 'baz'},{baz: 'bat'}], {safe:true}, function(err, result) {
	    console.log(result);
	    db.close(function() {
	        console.log('connection closed');
	    });
	});

})



app.get('/fetch', function(req,res){

	db.collection('marker').find().toArray(function(err, posts){
	    // do something
	});

})


app.get('/insert', function(req,res){
	var Db = require('../mongodb-driver-src/lib/mongodb').Db,
	  Connection = require('../mongodb-driver-src/lib/mongodb').Connection,
	  Server = require('../mongodb-driver-src/lib/mongodb').Server;

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

	console.log("Connecting to " + host + ":" + port);
	var db = new Db('k5tooltip', new Server(host, port, {}), {native_parser:true});
	db.open(function(err, db) {
	  db.collection('markers', function(err, collection) {
	    // Erase all records from collection, if any
	    collection.remove(function(err, result) {

	      var frameVar = 'foo'
	      // Insert 3 records
	      for(var i = 0; i < 3; i++) {
	        // collection.insert({'frame':i});
	        collection.insert({'marker1':{frameVar:[{'x': '50'},{'7': '70'}]}},{safe:true},function(err, result){
	          //assert.equal(null, err)
	          // console.log('ins callback')
	        })
	        // console.log(' inserted obj ')
	      }


	      // next_object returns null if there are no more objects that match
	      collection.find(function(err, cursor) {
	        cursor.nextObject(function(err, item) {
	          cursor.nextObject(function(err, item) {
	            cursor.nextObject(function(err, item) {
	              cursor.nextObject(function(err, item) {
	                console.log("nextObject returned: ");
	                console.dir(item);
	                db.close();
	              });
	            });
	          });
	        });
	      });
	    });
	  });
	});
})

app.get('/simple', function(req,res){
	res.send('test')
	var Db = require('../mongodb-driver-src/lib/mongodb').Db,
	  Connection = require('../mongodb-driver-src/lib/mongodb').Connection,
	  Server = require('../mongodb-driver-src/lib/mongodb').Server;

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

	console.log("Connecting to " + host + ":" + port);
	var db = new Db('markers', new Server(host, port, {}), {native_parser:false});
	db.open(function(err, db) {
	  db.dropDatabase(function(err, result) {
	    db.collection('coords', function(err, collection) {
	      // Erase all records from the collection, if any
	      collection.remove({}, function(err, result) {
	        // Insert 3 records
	        for(var i = 0; i < 3; i++) {
	          collection.insert({marker1:{'frame1': {x:50, y:20},'frame2': {x:60, y:30}}},{marker2:{'frame1': {x:50, y:20},'frame2': {x:60, y:30}}});
	        }

	        collection.count(function(err, count) {
	          console.log("There are " + count + " records in the test collection. Here they are:");

	          collection.find(function(err, cursor) {
	            cursor.each(function(err, item) {
	              if(item != null) {
	                console.dir(item);
	                console.log("created at " + new Date(item._id.generationTime) + "\n")
	              }
	              // Null signifies end of iterator
	              if(item == null) {
	                // Destory the collection
	                collection.drop(function(err, collection) {
	                  db.close();
	                });
	              }
	            });
	          });
	        });
	      });
	    });
	  });
	});
})

app.get('/admin', function(req,res){
		var Db = require('../mongodb-driver-src/lib/mongodb').Db,
		  Connection = require('../mongodb-driver-src/lib/mongodb').Connection,
		  Server = require('../mongodb-driver-src/lib/mongodb').Server;

		var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
		var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

		console.log("Connecting to " + host + ":" + port);
		var db = new Db('node-mongo-examples', new Server(host, port, {}), {native_parser:true});
		db.open(function(err, db) {
		  db.dropDatabase(function(err, result){
		    db.dropCollection('test', function(err, result) {
		      db.createCollection('test', function(err, collection) {

		        // Erase all records in collection
		        collection.remove({}, function(err, r) {
		          db.admin(function(err, admin) {

		            // Profiling level set/get
		            admin.profilingLevel(function(err, profilingLevel) {
		              console.log("Profiling level: " + profilingLevel);
		            });

		            // Start profiling everything
		            admin.setProfilingLevel('all', function(err, level) {
		              console.log("Profiling level: " + level);

		              // Read records, creating a profiling event
		              collection.find(function(err, cursor) {
		                cursor.toArray(function(err, items) {
		                  // Stop profiling
		                  admin.setProfilingLevel('off', function(err, level) {
		                    // Print all profiling info
		                    admin.profilingInfo(function(err, info) {
		                      console.dir(info);

		                      // Validate returns a hash if all is well or return an error hash if there is a
		                      // problem.
		                      admin.validateCollection(collection.collectionName, function(err, result) {
		                        console.dir(result);
		                        db.close();
		                      });
		                    });
		                  });
		                });
		              });
		            });
		          });
		        });
		      });
		    });
		  });
		});
	})



app.get('/cursor',function(req,res){
	var Db = require('../mongodb-driver-src/lib/mongodb').Db,
	  Connection = require('../mongodb-driver-src/lib/mongodb').Connection,
	  Server = require('../mongodb-driver-src/lib/mongodb').Server;

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

	console.log("Connecting to " + host + ":" + port);
	var db = new Db('node-mongo-examples', new Server(host, port, {}), {native_parser:true});
	db.open(function(err, db) {
	  db.collection('test', function(err, collection) {
	    // Erase all records from collection, if any
	    collection.remove(function(err, result) {

	      // Insert 3 records
	      for(var i = 0; i < 3; i++) {
	        collection.insert({'a':i});
	      }

	      // Cursors don't run their queries until you actually attempt to retrieve data
	      // from them.

	      // Find returns a Cursor, which is Enumerable. You can iterate:
	      collection.find(function(err, cursor) {
	        cursor.each(function(err, item) {
	          if(item != null) console.dir(item);
	        });
	      });

	      // You can turn it into an array
	      collection.find(function(err, cursor) {
	        cursor.toArray(function(err, items) {
	          console.log("count: " + items.length);
	        });
	      });

	      // You can iterate after turning it into an array (the cursor will iterate over
	      // the copy of the array that it saves internally.)
	      collection.find(function(err, cursor) {
	        cursor.toArray(function(err, items) {
	          cursor.each(function(err, item) {
	            if(item != null) console.dir(item);
	          });
	        });
	      });

	      // You can get the next object
	      collection.find(function(err, cursor) {
	        cursor.nextObject(function(err, item) {
	          if(item != null) console.dir(item);
	        });
	      });

	      // next_object returns null if there are no more objects that match
	      collection.find(function(err, cursor) {
	        cursor.nextObject(function(err, item) {
	          cursor.nextObject(function(err, item) {
	            cursor.nextObject(function(err, item) {
	              cursor.nextObject(function(err, item) {
	                console.log("nextObject returned: ");
	                console.dir(item);
	                db.close();
	              });
	            });
	          });
	        });
	      });
	    });
	  });
	});
})


app.get('/examples',function(req,res){

	var Db = require('../mongodb-driver-src/lib/mongodb').Db,
	  Connection = require('../mongodb-driver-src/lib/mongodb').Connection,
	  Server = require('../mongodb-driver-src/lib/mongodb').Server,
	  mongo = require('../mongodb-driver-src/lib/mongodb');

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

	console.log(">> Connecting to " + host + ":" + port);
	var db = new Db('node-mongo-examples', new Server(host, port, {}), {native_parser:true});
	db.open(function(err, db) {
	  console.log(">> Dropping collection test");
	  db.dropCollection('test', function(err, result) {
	    console.log("dropped: ");
	    console.dir(result);
	  });

	  console.log(">> Creating collection test");
	  db.collection('test', function(err, collection) {
	    console.log("created: ");
	    console.dir(collection);

	    var objectCount = 100;
	    var objects = [];
	    var messages = ["hola", "hello", "aloha", "ciao"];
	    console.log(">> Generate test data");
	    for(var i = 0; i < objectCount; i++) {
	      objects.push({'number':i, 'rndm':((5*Math.random()) + 1), 'msg':messages[parseInt(4*Math.random())]})
	    }
	    console.log("generated");

	    console.log(">> Inserting data (" + objects.length + ")");
	    collection.insert(objects);
	    console.log("inserted");

	    console.log(">> Creating index")
	    collection.createIndex([['all'], ['_id', 1], ['number', 1], ['rndm', 1], ['msg', 1]], function(err, indexName) {
	      console.log("created index: " + indexName);

	      console.log(">> Gathering index information");

	      collection.indexInformation(function(err, doc) {
	        console.log("indexInformation: ");
	        console.dir(doc);

	        console.log(">> Dropping index");
	        collection.dropIndex('all_1__id_1_number_1_rndm_1_msg_1', function(err, result) {
	          console.log("dropped: ");
	          console.dir(result);

	          console.log(">> Gathering index information");
	          collection.indexInformation(function(err, doc) {
	            console.log("indexInformation: ");
	            console.dir(doc);
	            console.log(">> Closing connection");
	            db.close();
	          });
	        });
	      });
	    });
	  });
	});

})
app.get('/info',function(req,res){
	var Db = require('../mongodb-driver-src/lib/mongodb').Db,
	  Connection = require('../mongodb-driver-src/lib/mongodb').Connection,
	  Server = require('../mongodb-driver-src/lib/mongodb').Server;

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

	console.log("Connecting to " + host + ":" + port);
	var db = new Db('node-mongo-examples', new Server(host, port, {}), {native_parser:true});
	db.open(function(err, db) {
	  db.collection('test', function(err, collection) {

	    // Remove all existing documents in collection
	    collection.remove(function(err, result) {

	      // Insert 3 records
	      for(var i = 0; i < 3; i++) {
	        collection.insert({'a':i});
	      }

	      // Show collection names in the database
	      db.collectionNames(function(err, names) {
	        names.forEach(function(name) {
	          console.dir(name);
	        });
	      });

	      // More information about each collection
	      db.collectionsInfo(function(err, cursor) {
	        cursor.toArray(function(err, items) {
	          items.forEach(function(item) {
	            console.dir(item);
	          });
	        });
	      })

	      // Index information
	      db.createIndex('test', 'a', function(err, indexName) {
	        db.indexInformation('test', function(err, doc) {
	          console.dir(doc);
	          collection.drop(function(err, result) {
	            db.close();
	          });
	        });
	      });
	    });
	  });
	});
})


app.get('/url',function(){
	var Db = require('../mongodb-driver-src/lib/mongodb').Db,
	  connect = require('../mongodb-driver-src/lib/mongodb').connect;

	console.log('Connecting to ' + Db.DEFAULT_URL);
	connect(Db.DEFAULT_URL, function(err, db) {
	  db.dropDatabase(function(err, result) {
	    db.collection('test', function(err, collection) {
	      collection.insert({'a':1});
	      db.close();
	    });
	  });
	});


})

app.get('/types', function(){

	var Db = require('../mongodb-driver-src/lib/mongodb').Db,
	  Connection = require('../mongodb-driver-src/lib/mongodb').Connection,
	  Server = require('../mongodb-driver-src/lib/mongodb').Server,
	  BSON = require('../mongodb-driver-src/lib/mongodb').BSONPure;

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

	console.log("Connecting to " + host + ":" + port);
	var db = new Db('test', new Server(host, port, {}), {});
	db.open(function(err, db) {
	  db.collection('markers', function(err, collection) {
	    // Remove all existing documents in collection
	    collection.remove(function(err, result) {
	      // Insert record with all the available types of values
	      collection.insert({
	      	marker1:{'frame1': {x:50, y:20},'frame2': {x:60, y:30}}
	        // 'array':[1,2,3],
	        // 'string':'hello',
	        // 'hash':{'a':1, 'b':2},
	        // 'date':new Date(),          // Stores only milisecond resolution
	        // 'oid':new BSON.ObjectID(),
	        // 'binary':new BSON.Binary("123"),
	        // 'int':42,
	        // 'float':33.3333,
	        // 'regexp':/foobar/i,
	        // 'regexp2':/foobar2/,
	        // 'boolean':true,
	        // 'where':new BSON.Code('this.x == 3'),
	        // 'dbref':new BSON.DBRef(collection.collectionName, new BSON.ObjectID()),
	        // 'null':null
	        }, function(err, doc) {
	          // Locate the first document
	          collection.findOne(function(err, document) {
	            console.dir(document);
	            collection.remove(function(err, collection) {
	              db.close();
	            });
	          })
	        });
	    });
	  });
	});

})

app.get('gridfs',function(req,res){
	var Db = require('../mongodb-driver-src/lib/mongodb').Db,
	  Connection = require('../mongodb-driver-src/lib/mongodb').Connection,
	  Server = require('../mongodb-driver-src/lib/mongodb').Server,
	  GridStore = require('../mongodb-driver-src/lib/mongodb').GridStore;

	var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
	var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;

	console.log(">> Connecting to " + host + ":" + port);
	var db1 = new Db('node-mongo-examples', new Server(host, port, {}), {native_parser:true});
	db1.open(function(err, db) {
	  // Write a new file
	  var gridStore = new GridStore(db, "foobar", "w");
	  gridStore.open(function(err, gridStore) {
	    gridStore.write("hello world!", function(err, gridStore) {
	      gridStore.close(function(err, result) {
	        // Read the file and dump the contents
	        dump(db, 'foobar');

	        // Append more data
	        gridStore = new GridStore(db, 'foobar', "w+");
	        gridStore.open(function(err, gridStore) {
	          gridStore.write('\n', function(err, gridStore) {
	            gridStore.puts('line two', function(err, gridStore) {
	              gridStore.close(function(err, result) {
	                dump(db, 'foobar');

	                // Overwrite
	                gridStore = new GridStore(db, 'foobar', "w");
	                gridStore.open(function(err, gridStore) {
	                  gridStore.write('hello, sailor!', function(err, gridStore) {
	                    gridStore.close(function(err, result) {
	                      dump(db, 'foobar', function() {
	                        db.close();
	                      });
	                    });
	                  });
	                });
	              });
	            });
	          });
	        });
	      });
	    });
	  });
	});

	var db2 = new Db('node-mongo-examples', new Server(host, port, {}), {native_parser:true});
	db2.open(function(err, db) {
	  // File existence tests
	  var gridStore = new GridStore(db, "foobar2", "w");
	  gridStore.open(function(err, gridStore) {
	    gridStore.write( 'hello sailor', function(err, gridStore) {
	      gridStore.close(function(err, result) {
	        GridStore.exist(db, 'foobar2', function(err, result) {
	          console.log("File 'foobar2' exists: " + result);
	        });

	        GridStore.exist(db, 'does-not-exist', function(err, result) {
	          console.log("File 'does-not-exist' exists: " + result);
	        });

	        // Read with offset(uses seek)
	        GridStore.read(db, 'foobar2', 6, 7, function(err, data) {
	          console.log(data);
	        });

	        // Rewind/seek/tell
	        var gridStore2 = new GridStore(db, 'foobar2', 'w');
	        gridStore2.open(function(err, gridStore) {
	          gridStore.write('hello, world!', function(err, gridStore){});
	          gridStore.rewind(function(){});
	          gridStore.write('xyzzz', function(err, gridStore){});
	          gridStore.tell(function(tell) {
	            console.log("tell: " + tell);       // Should be 5
	          });
	          gridStore.seek(4, function(err, gridStore){});
	          gridStore.write('y', function(){});
	          gridStore.close(function() {
	            dump(db, 'foobar2');

	            // Unlink file (delete)
	            GridStore.unlink(db, 'foobar2', function(err, gridStore) {
	              GridStore.exist(db, 'foobar2', function(err, result) {
	                console.log("File 'foobar2' exists: " + result);
	                db.close();
	              });
	            });
	          });
	        });
	      });
	    });
	  });
	});

	var db3 = new Db('node-mongo-examples', new Server(host, port, {}), {native_parser:true});
	db3.open(function(err, db) {
	  // Metadata
	  var gridStore = new GridStore(db, "foobar3", "w");
	  gridStore.open(function(err, gridStore) {
	    gridStore.write('hello, world!', function(err, gridStore){});
	    gridStore.close(function(err, gridStore) {
	      gridStore = new GridStore(db, 'foobar3', "r");
	      gridStore.open(function(err, gridStore) {
	        console.log("contentType: " + gridStore.contentType);
	        console.log("uploadDate: " + gridStore.uploadDate);
	        console.log("chunkSize: " + gridStore.chunkSize);
	        console.log("metadata: " + gridStore.metadata);
	      });

	      // Add some metadata
	      gridStore = new GridStore(db, 'foobar3', "w+");
	      gridStore.open(function(err, gridStore) {
	        gridStore.contentType = 'text/xml';
	        gridStore.metadata = {'a':1};
	        gridStore.close(function(err, gridStore) {
	          // Print the metadata
	          gridStore = new GridStore(db, 'foobar3', "r");
	          gridStore.open(function(err, gridStore) {
	            console.log("contentType: " + gridStore.contentType);
	            console.log("uploadDate: " + gridStore.uploadDate);
	            console.log("chunkSize: " + gridStore.chunkSize);
	            console.log("metadata: " + gridStore.metadata);
	            db.close();
	          });
	        });
	      });
	    });
	  });

	  // You can also set meta data when initially writing to a file
	  // setting root means that the file and its chunks are stored in a different root
	  // collection: instead of gridfs.files and gridfs.chunks, here we use
	  // my_files.files and my_files.chunks
	  var gridStore = new GridStore(db, "foobar3", "w", {'content_type':'text/plain',
	    'metadata':{'a':1}, 'chunk_size': 1024*4, 'root':'my_files'});
	  gridStore.open(function(err, gridStore) {
	    gridStore.write('hello, world!', function(err, gridStore){});
	    gridStore.close(function() {
	    });
	  });
	});

	function dump(db, filename, callback) {
	  GridStore.read(db, filename, function(err, data) {
	    console.log(data);
	    if(callback != null) callback();
	  });
	}
})


app.get('/appdata', function(){
	var Db = require('../mongodb-driver-src/lib/mongodb').Db,
	  Connection = require('../mongodb-driver-src/lib/mongodb').Connection,
	    Server = require('../mongodb-driver-src/lib/mongodb').Server;

	var host = process.env['127.0.0.1'] != null ? process.env['127.0.0.1'] : 'localhost';
	var port = process.env[''] != null ? process.env[''] : Connection.DEFAULT_PORT;

	console.log("Connecting to " + host + ":" + port);

	var db = new Db('k5Lib', new Server(host, port, {}), {native_parser:true});
	db.open(function(err, db) {
	  db.dropDatabase(function() {
	    // Fetch the collection test
	    db.collection('test', function(err, collection) {
	      // Remove all records in collection if any
	      collection.remove(function(err, result) {
	        // Insert three records
	        collection.insert([{'a':1}, {'a':2}, {'b':3}], function(docs) {
	          // Count the number of records
	          collection.count(function(err, count) {
	            console.log("There are " + count + " records.");
	          });

	          // Find all records. find() returns a cursor
	          collection.find(function(err, cursor) {
	            // Print each row, each document has an _id field added on insert
	            // to override the basic behaviour implement a primary key factory
	            // that provides a 12 byte value
	            console.log("Printing docs from Cursor Each")
	            cursor.each(function(err, doc) {
	              if(doc != null) console.log("Doc from Each ");
	              console.dir(doc);
	            })
	          });
	          // Cursor has an to array method that reads in all the records to memory
	          collection.find(function(err, cursor) {
	            cursor.toArray(function(err, docs) {
	              console.log("Printing docs from Array")
	              docs.forEach(function(doc) {
	                console.log("Doc from Array ");
	                console.dir(doc);
	              });
	            });
	          });

	          // Different methods to access records (no printing of the results)

	          // Locate specific document by key
	          collection.find({'a':1}, function(err, cursor) {
	            cursor.nextObject(function(err, doc) {
	              console.log("Returned #1 documents");
	            });
	          });

	          // Find records sort by 'a', skip 1, limit 2 records
	          // Sort can be a single name, array, associate array or ordered hash
	          collection.find({}, {'skip':1, 'limit':1, 'sort':'a'}, function(err, cursor) {
	            cursor.toArray(function(err, docs) {
	              console.log("Returned #" + docs.length + " documents");
	            })
	          });

	          // Find all records with 'a' > 1, you can also use $lt, $gte or $lte
	          collection.find({'a':{'$gt':1}}, function(err, cursor) {
	            cursor.toArray(function(err, docs) {
	              console.log("Returned #" + docs.length + " documents");
	            });
	          });

	          collection.find({'a':{'$gt':1, '$lte':3}}, function(err, cursor) {
	            cursor.toArray(function(err, docs) {
	              console.log("Returned #" + docs.length + " documents");
	            });
	          });

	          // Find all records with 'a' in a set of values
	          collection.find({'a':{'$in':[1,2]}}, function(err, cursor) {
	            cursor.toArray(function(err, docs) {
	              console.log("Returned #" + docs.length + " documents");
	            });
	          });

	          // Find by regexp
	          collection.find({'a':/[1|2]/}, function(err, cursor) {
	            cursor.toArray(function(err, docs) {
	              console.log("Returned #" + docs.length + " documents");
	            });
	          });

	          // Print Query explanation
	          collection.find({'a':/[1|2]/}, function(err, cursor) {
	            cursor.explain(function(err, doc) {
	              console.log("-------------------------- Explanation");
	              console.dir(doc);
	            })
	          });

	          // Use a hint with a query, hint's can also be store in the collection
	          // and will be applied to each query done through the collection.
	          // Hint's can also be specified by query which will override the
	          // hint's associated with the collection
	          collection.createIndex('a', function(err, indexName) {
	            collection.hint = 'a';

	            // You will see a different explanation now that the hint was set
	            collection.find({'a':/[1|2]/}, function(err, cursor) {
	              cursor.explain(function(err, doc) {
	                console.log("-------------------------- Explanation");
	                console.dir(doc);
	              })
	            });

	            collection.find({'a':/[1|2]/}, {'hint':'a'}, function(err, cursor) {
	              cursor.explain(function(err, doc) {
	                console.log("-------------------------- Explanation");
	                console.dir(doc);
	                db.close();
	              })
	            });
	          });
	        });
	      });
	    });
	  });
	});

})

app.get('/simple-single',function(req,res){
	var Db = require('mongodb').Db,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var db = new Db('integration_tests', new Server("127.0.0.1", 27017,
 {auto_reconnect: false, poolSize: 4}), {native_parser: false});

// Establish connection to db
db.open(function(err, db) {
  assert.equal(null, err);

  db.close();
});
})



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

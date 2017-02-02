Posts = new Mongo.Collection('posts');
Comments = new Mongo.Collection('comments');

Schemas = {};

Schemas.Post = new SimpleSchema({
  title: {
  type: String,
  label: "Title",
  optional:true,
  max: 200
  },
  body: {
  type: String,
  label: "Body",
  optional:true
  },
  timestamp: {
  type: Number,
  label: "Timestamp"  
  },
  user: {
  type: String,
  label: "User",
  optional: true  
  },
  tags: {
  type: [String],
  label: "Tags",
  optional: true
  }
});

Schemas.Comment = new SimpleSchema({
  text: {
  type: String,
  label: "text",
  optional: true
  },
  post_id: {
  type: String,
  label: "post_id"
  },
  timestamp: {
  type: Number,
  label: "Timestamp"  
  },
  user: {
  type: String,
  label: "User",
  optional: true  
  }
});

Schemas.User = new SimpleSchema({
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    profile: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Posts.attachSchema(Schemas.Post);
Comments.attachSchema(Schemas.Comment);
Meteor.users.attachSchema(Schemas.User);

// Config for editable text widget
EditableText.useTransactions = true;
EditableText.maximumImageSize = 20;

EditableText.registerCallbacks({
  addTimestampToDoc : function(doc) {
  var extraFields = {timestamp: Date.now()};
  if (Meteor.user()) {
    extraFields.user = Meteor.user().emails[0].address;
  }
  return _.extend(doc, extraFields);
  }
});

// Config for transactions
tx.requireUser = false; // Means a user who is not logged in gets to undo/redo


if (Meteor.isServer) {
  Meteor.startup(function () {
    
    Posts.remove({});
    Posts.insert({timestamp:Date.now(),title:"http://www.aopen.com.tw",body:'now',tags:['1','2']});
    Posts.insert({timestamp:Date.now(),title:"http://www.aopen.com/taiwan/leisure-and-entertainment",body:'',tags:['1','2']});
    Posts.insert({timestamp:Date.now(),title:"http://www.aopen.com/taiwan/retail-evolution-lab",body:'',tags:['1','2']});
    Posts.insert({timestamp:Date.now(),title:"http://www.aopen.com/taiwan/custom-built",body:'',tags:['1','2']});
    Posts.insert({timestamp:Date.now(),title:"http://www.aopen.com/taiwan/solutiontv",body:'',tags:['1','2']});
	Posts.insert({timestamp:Date.now(),title:"http://www.aopen.com/taiwan/solutiontv",body:'',tags:['1','2']});
    
  });
}
  tx.undoRedoButtonClass = 'btn btn-default undo-redo';

  Template.posts.helpers({
    posts: function() {
      return Posts.find({}, {sort: {_id: -1}});
    },
	comments: function() {
	  return Comments.find({post_id: this._id}, {sort: {timestamp: 1}});
	},
	newCommentDoc: function() {
	  return {};  
	},
	timestamp: function() {
	  var time = (new Date(this.timestamp)).toDateString();
	  return time.substr(0, time.length - 4);	
	},
	postOptions : function() {
	  return {
		collection:"posts",
		field:"title",
		removeEmpty:true,
		acceptEmpty:true,
		placeholder:"http://abc.com",
		substitute:'<i class="fa fa-pencil"></i>'
	  }
	}
  });

   Template.posts.events({
    'click .show': function () {
      //Players.update(this._id, {$inc: {score: 5}});
      //return false;
      Posts.update(Posts.findOne({body:'now'})._id, {$set:{body:''}});
      Posts.update(this._id, {$set:{timestamp:Date.now(), body:'now'}});

      //console.log(this._id);
    }
  });

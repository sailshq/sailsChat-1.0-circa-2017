/**
 * The chat room component.
 *
 * This component comprises the chat transcript and chat controls.
 * It exposes a method for adding messages to the transcript, and
 * handles sending new chats as a result of user input.
 *
 */

/**
 * Constructor
 * @param {object} app A reference to the main chat page app.
 */
function ChatRoom (app) {

  // Save a reference to the app's message list.
  this.messages = app.messages;

  // Save a reference to the app's logged in user.
  this.loggedInUserId = app.loggedInUserId;

}

/**
 * Initialize the chat room component.
 * @param  {array} messages The initial list of messages to put in the transcript.
 */
ChatRoom.prototype.init = function(messages) {

  // Save a reference to this object.
  var self = this;

  // Add each message to the transcript.
  _.each(this.messages, this.renderMessage.bind(this));

  // Add a utility for sending a chat.
  function sendChat (cb) {
    // Get the chat message.
    var msg = $('.chat-input').val();
    // If no message was entered, do nothing.
    if (!msg) { return; }
    // Create a new chat message via the API.
    io.socket.post('/chatmessage', { user: self.loggedInUserId, text: msg}, function(body, response) {
      if (response.statusCode !== 200) {
        return alert('An error occurred sending your chat.  Please try again.');
      }
      return cb(undefined, body);
    });
  }

  // Send a chat whenever the "send-chat" button is pressed, or enter is pressed inside the chat input.
  $('.send-chat-button').click(function() {
    sendChat(function(err, message) {
      // Always scroll to the bottom when adding a new message as a result of user interaction.
      self.renderMessage(message, true);
      $('.chat-input').val('').focus();
    });
  });

  // When enter is pressed in the chat input, "click" the send button.
  $('.chat-input').keydown(function(e) {
    if (e.keyCode === 13) {
      $('.send-chat-button').click();
    }
  });

};

/**
 * Add a new message to the chat transcript.
 * @param  {object} message The message object.
 * @param  {boolean} scroll Whether to force a scroll to the bottom of the transcript.
 */
ChatRoom.prototype.renderMessage = function(message, scroll) {

  // Get the chat transcript container.
  var chatTranscriptContainerEl = $('.chat-page .chat-transcript-container');

  // Declare a var to hold the new line in the transcript.
  var chatLineEl;

  // If the message has a user attached, add a regular chat line.
  if (message.user) {
    chatLineEl = $('<div class="chat-line"><span class="username">' + message.user.username + ':&nbsp;</span><span class="text">' + message.text + '</span></div>');
  }

  // Otherwise add an "admin" chat line.
  else {
    chatLineEl = $('<div class="admin-chat-line"><span class="text">' + message.text + '</span></div>');
  }

  // Determine whether the transcript is scrolled all the way to the bottom.
  var atBottom = chatTranscriptContainerEl.scrollTop() >= (chatTranscriptContainerEl[0].scrollHeight - chatTranscriptContainerEl[0].clientHeight);

  // Add the new chat line to the transcript.
  $('.chat-page .chat-transcript').append(chatLineEl);

  // Scroll to the bottom of the transcript if it was at the bottom before, or if we're asked to.
  if (scroll || atBottom) {
    chatTranscriptContainerEl.scrollTop(chatTranscriptContainerEl[0].scrollHeight - chatTranscriptContainerEl[0].clientHeight);
  }

};

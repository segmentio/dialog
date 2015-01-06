
/**
 * Module dependencies.
 */

var domify = require('domify');
var template = require('./index.html');
var reactive = require('reactive');
var modal = require('modal');
var emitter = require('emitter');

/**
 * Initialize a new `Dialog`.
 *
 * @param {Object} options
 */
function Dialog(options) {
  if(!(this instanceof Dialog)) return new Dialog(options);
  this.el = domify(template);
  this.reactive = reactive(this.el, options || {}, this);
  this.modal = modal(this.el).overlay();
}

/**
 * Mixin
 */

emitter(Dialog.prototype);

/**
 * Make the dialog closable
 *
 * @return {Dialog}
 */
Dialog.prototype.closable =
Dialog.prototype.closeable = function(){
  this.el.classList.add('closable');
  this.modal.closable();
  return this;
};


/**
 * Add an effect when showing and hiding
 *
 * @return {Dialog}
 */
Dialog.prototype.effect = function(name){
  this.modal.effect(name);
  return this;
};


/**
 * Add an action to the dialog
 *
 * @param {String} id
 * @param {String} text
 */
Dialog.prototype.action = function(id, options) {
  var self = this;
  var container = this.el.querySelector('.Dialog-options');
  var el = domify('<a href="'+options.link+'" class="Dialog-button Button Button--'+options.type+' Button--full">'+options.text+'</a>');
  el.addEventListener('click', function(e){
    self.emit(id, e);
  }, true);
  container.appendChild(el);
  return this;
};


/**
 * Show the dialog. Emits "showing" when it
 * starts transitioning in, and "show" when it
 * is ready.
 *
 * @return {Dialog}
 */
Dialog.prototype.show = function(effect){
  if(effect) this.effect(effect);
  this.modal.show();
  return this;
};


/**
 * Hide the dialog.
 *
 * @return {Dialog}
 */
Dialog.prototype.hide = function(){
  this.modal.hide();
  return this;
};


/**
 * @type {Function}
 */
module.exports = Dialog;

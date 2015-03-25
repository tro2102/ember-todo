/**
 * Created by towens on 3/25/15.
 */

Todos.EditTodoView = Ember.TextField.extend({
    didInsertElement: function() {
        this.$().focus()
    }
});

Ember.Handlebars.helper('edit-todo', Todos.EditTodoView);
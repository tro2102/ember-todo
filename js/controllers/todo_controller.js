/**
 * Created by towens on 3/25/15.
 */

Todos.TodoController = Ember.ObjectController.extend({
    actions: {
        editTodo: function() {
            this.set('isEditing', true);
        },
        acceptChanges: function() {
            this.set('isEditing', false);

            if (Ember.isEmpty(this.get('model.title'))) {
                this.send('removeTodo');
            } else {
                this.get('model').save();
            }
        },
        removeTodo: function() {
            var todo = this.get('model');
            todo.deleteRecord();
            todo.save();
        }
    },

    isCompleted: function(key, value) {
        var model = this.get('model');
        if (value === undefined) // GETTER
            return model.get('isCompleted');
        else { // SETTER
            model.set('isCompleted', value);
            model.save();
            return value;
        }
    }.property('model.isCompleted'),

    isEditing: false
});
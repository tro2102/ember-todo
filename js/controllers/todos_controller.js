/**
 * Created by towens on 3/25/15.
 */

Todos.TodosController = Ember.ArrayController.extend({
    actions: {
        createTodo: function() {
            var title = this.get('newTitle');
            if (!title.trim()) { return }

            var todo = this.store.createRecord('todo', {
                title: title,
                isCompleted: false
            });

            this.set('newTitle', '');

            todo.save()
        },
        clearCompleted: function() {
            var completed = this.get('completed');
            completed.invoke('deleteRecord');
            completed.invoke('save');
        }
    },

    remaining: function() {
        return this.filterBy('isCompleted', false).get('length')
    }.property('@each.isCompleted'),

    inflection: function() {
        var remaining = this.get('remaining');
        return remaining === 1 ? 'item' : 'items';
    }.property('remaining'),

    hasCompleted: function() {
        return this.get('completedCount') > 0;
    }.property('completed'),

    completed: function() {
        return this.filterBy('isCompleted', true);
    }.property('@each.isCompleted'),

    completedCount: function() {
        return this.get('completed').get('length');
    }.property('completed'),

    allAreDone: function(key, value) {
        if (value === undefined) // GETTER
            return this.get('completedCount') === this.get('length')
        else {
            this.setEach('isCompleted', value);
            this.invoke('save');
            return value;
        }
    }.property('@each.isCompleted')
});
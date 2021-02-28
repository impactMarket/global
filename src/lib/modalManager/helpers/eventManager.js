export const eventManager = {
    events: new Map(),

    on(event, callback) {
        this.events.has(event) || this.events.set(event, []);

        this.events.get(event).push(callback);

        return this;
    },

    off(event) {
        this.events.delete(event);
        return this;
    },

    emit(e, ...args) {
        if (!this.events.has(e)) {
            return false;
        }
        this.events
            .get(e)
            .forEach((callback) =>
                setTimeout(() => callback.call(null, ...args), 0)
            );
        return true;
    },
};

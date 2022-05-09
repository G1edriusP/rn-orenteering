class EventRegister {
  static Listeners = {
    count: 0,
    refs: {},
  };

  static addEventListener(eventName: string, callback: Function) {
    EventRegister.Listeners.count += 1;
    const eventId = `l${EventRegister.Listeners.count}`;
    EventRegister.Listeners.refs[eventId] = {
      name: eventName,
      callback,
    };
    return eventId;
  }

  static removeEventListener(id: string) {
    return delete EventRegister.Listeners.refs[id];
  }

  static removeAllListeners() {
    let removeError = false;
    Object.keys(EventRegister.Listeners.refs).forEach((id) => {
      const removed = delete EventRegister.Listeners.refs[id];
      removeError = !removeError ? !removed : removeError;
    });
    return !removeError;
  }

  static emit(eventName: string, data: Object) {
    const event = Object.keys(EventRegister.Listeners.refs).find(
      (id) => EventRegister.Listeners.refs[id].name === eventName
    );
    if (event) {
      return EventRegister.Listeners.refs[event].callback(data);
    }
    return () => null;
  }
}

export default EventRegister;
